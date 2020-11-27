import {Injectable} from '@angular/core';
import {Crowder, Pivot, PivotAlternative, StorageDataTypeKeys} from '../../model/Models';
import {Store} from '../data/store.service';
import * as _ from 'lodash';
import {AlgoDeRepartition, ParametresDeRepartitionnement} from './algo-de-repartition';

@Injectable({
  providedIn: 'root'
})
export class RepartitionService {

  constructor(private store: Store) {
  }

  public repartitionerPivotsParCrowders(propositionsParPivot: number) {

    let parametres: ParametresDeRepartitionnement = {
      crowders: this.store.getFromLocalStorage(StorageDataTypeKeys.CROWDER),
      pivots: this.store.getFromLocalStorage(StorageDataTypeKeys.PIVOTS),
      propositionsParPivot: propositionsParPivot
    };

    let crowdersAvecPivotsDeProposition: Crowder[] = new AlgoDeRepartition(parametres).creePivotsDePropositions();
    this.store.setData(StorageDataTypeKeys.CROWDER, crowdersAvecPivotsDeProposition);
  }

  public repartitionerNotationsParCrowders(notationsParProposition: number) {

    let parametres: ParametresDeRepartitionnement = {
      crowders: this.store.getFromLocalStorage(StorageDataTypeKeys.CROWDER),
      pivots: this.store.getFromLocalStorage(StorageDataTypeKeys.PIVOTS),
      notationsParProposition: notationsParProposition
    };

    let resultat: Crowder[] = new AlgoDeRepartition(parametres).creePivotsDeNotation();
    this.store.setData(StorageDataTypeKeys.CROWDER, resultat);
  }

  public majAlternative(pivotAlternative: PivotAlternative[]): void {
    let alternatives = _.groupBy(pivotAlternative, alternative => alternative.idPivot);

    let pivots: Pivot[] = this.store.getFromLocalStorage(StorageDataTypeKeys.PIVOTS)
      .filter(pivot => pivot.id in alternatives);

    this.store.setData(StorageDataTypeKeys.PIVOTS,
      _.forEach(pivots, pivot => pivot.alternatives = alternatives[pivot.id]));
  }

}
