import {Component, Input, OnInit} from '@angular/core';
import {ExcelFileToJsonService} from '../../services/io/excel-file-to-json.service';
import {Crowder, DataTable, Pivot, PivotAlternative, PivotType, StorageDataTypeKeys} from '../../model/Models';
import {RepartitionService} from '../../services/algo/repartition.service';
import {Store} from '../../services/data/store.service';


@Component({
  selector: 'app-file-selector',
  templateUrl: './file-selector.component.html',
  styleUrls: ['./file-selector.component.scss']
})
export class FileSelectorComponent implements OnInit {

  @Input() nom: string;
  @Input() icone: string;
  @Input() typeDeDonnees: StorageDataTypeKeys;
  isSucess = false;

  constructor(private excelFileToJsonService: ExcelFileToJsonService,
              private dispatcherService: RepartitionService,
              private store: Store) {
  }

  ngOnInit(): void {
  }

  onFileChange(evt: any, dataType: StorageDataTypeKeys): void {
    const target: DataTransfer = (evt.target) as DataTransfer;
    const reader: FileReader = new FileReader();
    reader.onload = file => this.onLoad(file, dataType);
    reader.readAsBinaryString(target.files[0]);
    evt.target.value = '';
  }

  onLoad(file: ProgressEvent<FileReader>, dataType: StorageDataTypeKeys): void {
    this.excelFileToJsonService.excelToJson(file)
      .then((data) => {
        this.handle(dataType, data);
      });
  }

  openFile(name: string): void {
    document.getElementById(name + '_id').click();
  }

  transformData(donnesBrute: DataTable, typeDeDonnes: StorageDataTypeKeys): any[] {
    // Suppression des noms des colonnes
    donnesBrute.shift();

    // Suppression des colonnes vides
    const dataTable = donnesBrute.filter(d => d.length > 1);

    if (typeDeDonnes === StorageDataTypeKeys.CROWDER) {
      return dataTable
        .map(crowder => {
          return {id: crowder[0], name: crowder[1], pivotsDeProposition: [], notationsDePropositions: []} as Crowder;
        });
    }

    if (typeDeDonnes === StorageDataTypeKeys.PIVOTS) {
      return dataTable
        .map(pivot => {
          return {id: pivot[0], question: pivot[1], reponse: pivot[2], alternatives: []} as Pivot;
        });
    }

    if (typeDeDonnes === StorageDataTypeKeys.PROPOSITIONS) {
      return dataTable
        .map(proposition => {
          return {
            idPivot: proposition[0],
            alternative: proposition[1],
            type: proposition[2] === 'Q' ? PivotType.QUESTION : PivotType.REPONSE
          } as PivotAlternative;
        });
    }
    return [];
  }

  private handle(dataType: StorageDataTypeKeys, data: DataTable) {
    if (dataType == StorageDataTypeKeys.CROWDER || dataType == StorageDataTypeKeys.PIVOTS) {
      this.store.setData(dataType, this.transformData(data, dataType));
    } else {
      this.dispatcherService.majAlternative(this.transformData(data, dataType));
    }
    this.isSucess = true;
  }
}
