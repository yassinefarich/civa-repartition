import {Component, Input, OnInit} from '@angular/core';
import {ImportExportService} from '../../services/io/import-export.service';
import {DataTable, StorageDataTypeKeys} from '../../model/Models';
import {RepartitionService} from '../../services/algo/repartition.service';
import {Store} from '../../services/data/store.service';
import {AoaToObjects} from './aoa-to-objects';
import {Router} from '@angular/router';


@Component({
  selector: 'app-file-selector',
  templateUrl: './file-selector.component.html',
  styleUrls: ['./file-selector.component.scss']
})
export class FileSelectorComponent implements OnInit {

  @Input() nom: string;
  @Input() icone: string;
  @Input() typeDeDonnees: StorageDataTypeKeys;
  isGreen = false;
  chargementMessage: string = '';
  afficherMessage = false;
  label: string = '';

  constructor(private excelFileToJsonService: ImportExportService,
              private dispatcherService: RepartitionService,
              private store: Store,
              private router: Router){
  }

  ngOnInit(): void {
    this.label = this.nom;
    this.store.onReinit.subscribe(
      () => {
        this.isGreen = false;
        this.chargementMessage = '';
        this.afficherMessage = false;
        this.label = this.nom;
      }
    );
    this.refreshColors();

  }

  private refreshColors() {
    if (this.typeDeDonnees == StorageDataTypeKeys.CROWDER) {
      this.store.crowders
        .subscribe(donnees => {
          if (donnees.length > 0) {
            this.isGreen = true;
            this.label = `(${donnees.length}) crowders importés`;
          }
        });

    } else if (this.typeDeDonnees == StorageDataTypeKeys.PIVOTS) {
      this.store.pivots
        .subscribe(donnees => {
          if (donnees.length > 0) {
            this.isGreen = true;
            this.label = `(${donnees.length}) pivots importés`;
          }
        });
    } else {
      this.store.propositions
        .subscribe(donnees => {
          if (donnees.length > 0) {
            this.isGreen = true;
            this.label = `(${donnees.length}) propositions chargées`;
          }
        });
    }
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

    try {
      let mapper = new AoaToObjects();
      let donnees = mapper.transformData(data, dataType);
      this.store.setData(dataType, donnees);

      if (dataType == StorageDataTypeKeys.CROWDER) {
        this.succes(`${donnees.length} Crowders importés`);
      } else if (dataType == StorageDataTypeKeys.PIVOTS) {
        this.succes(`${donnees.length} pivots importés`);
      } else {
        this.succes(`${donnees.length} propositions chargées`);
      }

    } catch (e) {
      this.echec(JSON.stringify(e));
    }

  }

  private succes(message: string): void {
    this.chargementMessage = message;
    this.afficherMessage = true;
    this.router.navigate(['donnees']);
    this.isGreen = true
  }

  private echec(message: string): void {
    this.chargementMessage = message;
    this.afficherMessage = true;
  }

}
