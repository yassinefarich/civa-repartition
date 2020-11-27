import {Injectable} from '@angular/core';
import {Crowder, Pivot, PivotAlternative, PivotAlternativeType} from '../../model/Models';
import * as _ from 'lodash';

@Injectable({
  providedIn: 'root'
})
export class SimulationsService {

  constructor() {
  }

  crowders(num: number): Crowder[] {
    return _.range(num)
      .map(i => {
          return {
            id: i,
            name: 'Crowder ' + i,
            alternatives: [],
            pivotsEvaluation: []
          };
        }
      );
  }

  pivots(nombreDesPivots: number, propositionParPivot: number): Pivot[] {
    return _.range(nombreDesPivots)
      .map(value => {
          return {
            id: value,
            question: 'Est ce que ' + value + ' est un nombre pair ?',
            reponse: value % 2 == 0 ? 'Oui ' + value + 'est un nombre pair' : 'Non ' + value + ' n\'est pas un nombre pair',
            alternatives: propositionParPivot == 0 ? [] : this.alternatives(value, propositionParPivot)
          } as Pivot;
        }
      );
  }

  private alternatives(pivotId: number, nombreDesPropAlternatives: number): PivotAlternative[] {
    return _.range(nombreDesPropAlternatives)
      .map(val => {
        return [
          {
            idPivot: pivotId,
            alternative: val + ' est une question alternative au pivot ' + pivotId,
            type: PivotAlternativeType.QUESTION
          },
          {
            idPivot: pivotId,
            alternative: val + ' est une reponse alternative au pivot ' + pivotId,
            type: PivotAlternativeType.REPONSE
          }
        ];
      }).reduce((a1, a2) => a1.concat(a2), []);
  }

}
