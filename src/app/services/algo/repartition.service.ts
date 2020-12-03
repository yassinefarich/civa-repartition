import {Injectable} from '@angular/core';
import {Crowder, StorageDataTypeKeys} from '../../model/Models';
import {Store} from '../data/store.service';
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
      pivotsAlternatives: this.store.getFromLocalStorage(StorageDataTypeKeys.PROPOSITIONS),
      propositionsParPivot: propositionsParPivot
    };

    let crowdersAvecPivotsDeProposition: Crowder[] = new AlgoDeRepartition(parametres).creePivotsDePropositions();
    this.store.setData(StorageDataTypeKeys.CROWDER, crowdersAvecPivotsDeProposition);
  }

  public repartitionerNotationsParCrowders(notationsParProposition: number) {

    let parametres: ParametresDeRepartitionnement = {
      crowders: this.store.getFromLocalStorage(StorageDataTypeKeys.CROWDER),
      pivots: this.store.getFromLocalStorage(StorageDataTypeKeys.PIVOTS),
      pivotsAlternatives: this.store.getFromLocalStorage(StorageDataTypeKeys.PROPOSITIONS),
      notationsParProposition: notationsParProposition
    };

    let resultat: Crowder[] = new AlgoDeRepartition(parametres).creePivotsDeNotation();
    this.store.setData(StorageDataTypeKeys.CROWDER, resultat);
  }

}
