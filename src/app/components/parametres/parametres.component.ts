import {Component, OnInit} from '@angular/core';
import {RepartitionService} from '../../services/algo/repartition.service';
import {MenuItem, MessageService} from 'primeng/api';
import {StorageDataTypeKeys} from '../../model/Models';
import {SimulationsService} from '../../services/data/simulations.service';
import {Store} from '../../services/data/store.service';
import {GestionTempsService} from '../../services/algo/gestion-temps.service';
import {ImportExportService} from '../../services/io/import-export.service';
import {Router} from '@angular/router';


export interface ParametresGlobales {
  // Paramétre de répartition
  nombreDeCrowders: number
  nombreDePivots: number
  nombreDePropositionsParPivot: number
  nombreDeNotationsParProposition: number

  // Paramétres de gestion du temps
  tempsDePropositonDeQuest: number;
  tempsDePropositonDeRep: number;
  tempsDeNotationDeQue: number;
  tempsDeNotationDeRep: number;
  nbrDeSessionsParSemaine: number;
  dureeDeSession: number

}

@Component({
  selector: 'app-parametres',
  templateUrl: './parametres.component.html',
  styleUrls: ['./parametres.component.scss'],
  providers: [MessageService]
})
export class ParametresComponent implements OnInit {

  public dataType: typeof StorageDataTypeKeys = StorageDataTypeKeys;

  parametres: ParametresGlobales = {
    // Paramétre de répartition
    nombreDeCrowders: 120,
    nombreDePivots: 30,
    nombreDePropositionsParPivot: 20,
    nombreDeNotationsParProposition: 30,
    // Paramétres de gestion du temps
    tempsDePropositonDeQuest: 0.06,
    tempsDePropositonDeRep: 0.06,
    tempsDeNotationDeQue: 0.02,
    tempsDeNotationDeRep: 0.02,
    nbrDeSessionsParSemaine: 10,
    dureeDeSession: 2.5,
  };

  items: MenuItem[];

  constructor(private repartitionService: RepartitionService,
              private messageService: MessageService,
              private simulations: SimulationsService,
              private store: Store,
              private gestionDuTemps: GestionTempsService,
              private importExportService: ImportExportService,
              private router: Router) {

    this.items = [
      {
        label: 'Importer',
        icon: 'fa fa-file-import',
        command: () => this.importParametres()
      },
      {
        label: 'Exporter',
        icon: 'fa fa-file-export',
        command: () => this.exportParametres()
      },
      {
        label: 'Exporter tout',
        icon: 'fa fa-download',
        command: () => this.exportTout()
      }
    ];
  }

  ngOnInit(): void {
    let paramsFromLocalStorage = this.store.getFromLocalStorage(StorageDataTypeKeys.PARAMETRES)[0];
    if (paramsFromLocalStorage !== undefined) {
      this.parametres = paramsFromLocalStorage;
    }

    this.store.crowders
      .subscribe(data => this.parametres.nombreDeCrowders = data.length)

    this.store.pivots
      .subscribe(data => this.parametres.nombreDePivots = data.length)

    this.store.refreshDataFromStorage()

  }

  onGenerateSamples(): void {
    let crowders = this.simulations.crowders(this.parametres.nombreDeCrowders);
    let pivots = this.simulations.pivots(this.parametres.nombreDePivots);
    let propositions = this.simulations.propositions(crowders, pivots, this.parametres.nombreDePropositionsParPivot);

    this.store.setData(StorageDataTypeKeys.CROWDER, crowders);
    this.store.setData(StorageDataTypeKeys.PIVOTS, pivots);
    this.store.setData(StorageDataTypeKeys.PROPOSITIONS, propositions);
  }

  onGenerateGroups(): void {
    this.saveParameters();
    this.repartitionService.repartitionerPivotsParCrowders(this.parametres.nombreDePropositionsParPivot);
    this.repartitionService.repartitionerNotationsParCrowders(this.parametres.nombreDeNotationsParProposition);
    this.router.navigate(['repartitions']);
  }

  generatePlaning(): void {
    this.saveParameters();
    this.gestionDuTemps.calculerTemps(
      {
        nombreDeCrowders: this.parametres.nombreDeCrowders,
        nombreDePivots: this.parametres.nombreDePivots,
        nombreDePropositionsParPivots: this.parametres.nombreDePropositionsParPivot,
        nombreDeNotationParProposition: this.parametres.nombreDeNotationsParProposition,
        tempsDePropositonDeQuest: this.parametres.tempsDePropositonDeQuest,
        tempsDePropositonDeRep: this.parametres.tempsDePropositonDeRep,
        tempsDeNotationDeQue: this.parametres.tempsDeNotationDeQue,
        tempsDeNotationDeRep: this.parametres.tempsDeNotationDeRep,
        nbrDeSessionsParSemaine: this.parametres.nbrDeSessionsParSemaine,
        dureeDeSession: this.parametres.dureeDeSession
      }
    );
    this.router.navigate(['gestionTemps']);
  }

  onReinitPlaning(): void {
    this.store.clear(StorageDataTypeKeys.GESTION_DU_TEMPS)
  }

  onReinit(): void {
    this.store.clearAll();
  }

  isValid(): boolean {
    return true;
  }

  private importParametres() {
    document.getElementById('importFileSelector').click();
  }

  private exportParametres() {
    this.importExportService
      .exportJsonFile(`parametres_${new Date().getTime()}.json`, JSON.stringify(this.parametres, null, 2));
  }

  onParamFileChange(evt): void {

    const target: DataTransfer = (evt.target) as DataTransfer;
    const reader: FileReader = new FileReader();

    reader.onload = event => {
      this.parametres = JSON.parse(event.target.result.toString());
      this.saveParameters();
    };

    reader.readAsBinaryString(target.files[0]);
    evt.target.value = '';

  }

  private saveParameters() {
    this.store.setData(StorageDataTypeKeys.PARAMETRES, [this.parametres]);
  }

  private exportTout() {

    let allData = {
      crowders: this.store.getFromLocalStorage(StorageDataTypeKeys.CROWDER),
      pivots: this.store.getFromLocalStorage(StorageDataTypeKeys.PIVOTS),
      propositons: this.store.getFromLocalStorage(StorageDataTypeKeys.PROPOSITIONS),
      parametres: this.store.getFromLocalStorage(StorageDataTypeKeys.PARAMETRES),
      gestionDuTemps: this.store.getFromLocalStorage(StorageDataTypeKeys.GESTION_DU_TEMPS),
    };

    this.importExportService
      .exportJsonFile(`donnees_${new Date().getTime()}.json`, JSON.stringify(allData, null, 2));
  }
}
