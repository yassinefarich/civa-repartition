import {Component, OnInit} from '@angular/core';
import {RepartitionService} from '../../services/algo/repartition.service';
import {MenuItem, MessageService} from 'primeng/api';
import {StorageDataTypeKeys} from '../../model/Models';
import {SimulationsService} from '../../services/data/simulations.service';
import {Store} from '../../services/data/store.service';
import {GestionTempsService} from '../../services/algo/gestion-temps.service';

@Component({
  selector: 'app-parametres',
  templateUrl: './parametres.component.html',
  styleUrls: ['./parametres.component.scss'],
  providers: [MessageService]
})
export class ParametresComponent implements OnInit {

  public dataType: typeof StorageDataTypeKeys = StorageDataTypeKeys;

  // Paramétre de répartition
  nombreDeCrowders: number = 120;
  nombreDePivots: number = 30;
  nombreDePropositionsParPivot: number = 20;
  nombreDeNotationsParProposition: number = 30;

  // Paramétres de gestion du temps
  tempsDePropositonDeQuest: number = 0.06;
  tempsDePropositonDeRep: number = 0.06;
  tempsDeNotationDeQue: number = 0.02;
  tempsDeNotationDeRep: number = 0.02;

  nbrDeSessionsParSemaine: number = 10;
  dureeDeSession: number = 2.5;

  items: MenuItem[];

  constructor(private repartitionService: RepartitionService,
              private messageService: MessageService,
              private simulations: SimulationsService,
              private store: Store,
              private gestionDuTemps : GestionTempsService) {

    this.items = [
      {
        label: 'Importer',
        icon: 'fa fa-file-import',
        // command: event => alert(event)
      },
      {
        label: 'Exporter',
        icon: 'fa fa-file-export',
        // command: event => alert(event)
      }
    ];
  }

  ngOnInit(): void {
  }

  onGenerateSamples(): void {
    let crowders = this.simulations.crowders(this.nombreDeCrowders);
    let pivots = this.simulations.pivots(this.nombreDePivots);
    let propositions = this.simulations.propositions(crowders, pivots, this.nombreDePropositionsParPivot);

    this.store.setData(StorageDataTypeKeys.CROWDER, crowders);
    this.store.setData(StorageDataTypeKeys.PIVOTS, pivots);
    this.store.setData(StorageDataTypeKeys.PROPOSITIONS, propositions);
  }

  onGenerateGroups(): void {
    this.repartitionService.repartitionerPivotsParCrowders(this.nombreDePropositionsParPivot);
    this.repartitionService.repartitionerNotationsParCrowders(this.nombreDeNotationsParProposition);
  }

  generatePlaning(): void {
    this.gestionDuTemps.calculerTemps(
      {
        nombreDeCrowders: this.nombreDeCrowders,
        nombreDePivots: this.nombreDePivots,
        nombreDePropositionsParPivots: this.nombreDePropositionsParPivot,
        nombreDeNotationParProposition: this.nombreDeNotationsParProposition,
        tempsDePropositonDeQuest: this.tempsDePropositonDeQuest,
        tempsDePropositonDeRep: this.tempsDePropositonDeRep,
        tempsDeNotationDeQue: this.tempsDeNotationDeQue,
        tempsDeNotationDeRep: this.tempsDeNotationDeRep,
        nbrDeSessionsParSemaine: this.nbrDeSessionsParSemaine,
        dureeDeSession: this.dureeDeSession
      }
    );
  }

  onReinitPlaning(): void {
    // if (this.isValid()) {
    //   this.dispatcherService.repartitionerPivotsParCrowders(this.nombreDePropositionsParPivot);
    //   this.dispatcherService.repartitionerNotationsParCrowders(this.nombreDeNotationsParProposition);
    // }
  }

  onReinit(): void {
    this.store.clearAll();
  }

  isValid(): boolean {

    if (this.nombreDePropositionsParPivot === undefined) {

    }

    if (this.nombreDeNotationsParProposition != undefined) {

    }

    return true;
  }

}
