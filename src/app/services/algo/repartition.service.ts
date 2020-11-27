import {Injectable} from '@angular/core';
import {Pivot, PivotAlternative, StorageDataTypeKeys} from '../../model/Models';
import {EvaluationGroups} from '../../model/EvaluationGroups';
import {NotationGroups} from '../../model/NotationGroups';
import {Store} from '../data/store.service';
import * as _ from 'lodash';

@Injectable({
  providedIn: 'root'
})
export class RepartitionService {

  constructor(private store: Store) {
  }

  public dispatchGroups(propositionParQuest: number, notationsParProposition: number) {
    let evaluationGroups = new EvaluationGroups(this.makeParameters(propositionParQuest, notationsParProposition))
      .dispatch()
      .groupes;

    this.store.setData(StorageDataTypeKeys.CROWDERS_GROUPS, evaluationGroups);
  }

  public dispatchNotationGroups(propositionParQuest: number, notationsParProposition: number) {
    let notationGroupes = new NotationGroups(this.makeParameters(propositionParQuest, notationsParProposition))
      .dispatch()
      .groupes;

    this.store.setData(StorageDataTypeKeys.CROWDERS_GROUPS, notationGroupes);
  }

  public updateAlternative(pivotAlternative: PivotAlternative[]): void {

    let alternatives = _.groupBy(pivotAlternative, alternative => alternative.idPivot);

    let pivots: Pivot[] = this.store.getFromLocalStorage(StorageDataTypeKeys.PIVOTS)
      .filter(pivot => pivot.id in alternatives);

    // Maj les alternatives
    pivots.forEach(
      pivot => pivot.alternatives = alternatives[pivot.id]
    );

    this.store.setData(StorageDataTypeKeys.PIVOTS, pivots);
  }

  makeParameters(propositionParQuest: number, notationsParProposition: number) {

    const crowdersBrute = this.store.getFromLocalStorage(StorageDataTypeKeys.CROWDER);
    const pivotsBrute = this.store.getFromLocalStorage(StorageDataTypeKeys.PIVOTS);

    return {
      crowders: crowdersBrute,
      pivots: pivotsBrute,
      propositionParQuest,
      notationsParProposition
    };

  }

}
