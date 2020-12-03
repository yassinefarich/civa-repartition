import {Component, OnInit} from '@angular/core';
import {RepartitionService} from '../../services/algo/repartition.service';
import {MessageService} from 'primeng/api';
import {StorageDataTypeKeys} from '../../model/Models';
import {SimulationsService} from '../../services/data/simulations.service';
import {Store} from '../../services/data/store.service';

@Component({
  selector: 'app-parametres',
  templateUrl: './parametres.component.html',
  styleUrls: ['./parametres.component.scss'],
  providers: [MessageService]
})
export class ParametresComponent implements OnInit {

  public dataType: typeof StorageDataTypeKeys = StorageDataTypeKeys;

  nombreDeCrowders: number = 120;
  nombreDePivots: number = 30;
  nombreDePropositionsParPivot: number = 20;
  nombreDeNotationsParProposition: number = 30;

  constructor(private dispatcherService: RepartitionService,
              private messageService: MessageService,
              private simulations: SimulationsService,
              private store: Store) {
  }

  ngOnInit(): void {
  }

  onGenerateSamples(): void {
    this.store.setData(StorageDataTypeKeys.CROWDER, this.simulations.crowders(this.nombreDeCrowders));
    this.store.setData(StorageDataTypeKeys.PIVOTS, this.simulations.pivots(this.nombreDePivots));
    // this.store.setData(StorageDataTypeKeys.PROPOSITIONS, this.simulations.propositions(this.nombreDePivots, this.propositionParPivot));
  }

  onGenerateGroups(): void {
    if (this.isValid()) {
      this.dispatcherService.repartitionerPivotsParCrowders(this.nombreDePropositionsParPivot);
      this.dispatcherService.repartitionerNotationsParCrowders(this.nombreDeNotationsParProposition);
    }
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
