import {Component, Input, OnInit} from '@angular/core';
import {ExcelFileToJsonService} from '../../services/io/excel-file-to-json.service';
import {Crowder, DataTable, Pivot, PivotAlternative, PivotType, StorageDataTypeKeys} from '../../model/Models';
import {RepartitionService} from '../../services/algo/repartition.service';
import {Store} from '../../services/data/store.service';
import {AoaToObjects} from './aoa-to-objects';


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
  chargementMessage: string = '';
  afficherMessage = false;

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



  private handle(dataType: StorageDataTypeKeys, data: DataTable) {

    let mapper = new AoaToObjects();

    if (dataType == StorageDataTypeKeys.CROWDER) {
      let crowders = mapper.transformData(data, dataType);
      this.store.setData(dataType, mapper.transformData(data, dataType));
      this.chargementMessage = `${crowders.length} Crowders importés`;
      // this.afficherMessage = true;
      this.isSucess = true;

    } else if (dataType == StorageDataTypeKeys.PIVOTS) {
      let pivots = mapper.transformData(data, dataType);
      this.store.setData(dataType, mapper.transformData(data, dataType));
      this.chargementMessage = `${pivots.length} pivots importés`;
      // this.afficherMessage = true;
      this.isSucess = true;
    } else {
      this.dispatcherService.majAlternative(mapper.transformData(data, dataType));
    }
    this.isSucess = true;
  }
}
