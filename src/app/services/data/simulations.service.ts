import {Injectable} from '@angular/core';
import {Crowder, Pivot, PivotAlternative, PivotType} from '../../model/Models';
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
            notationsDePropositions: [],
            pivotsDeProposition: []
          };
        }
      );
  }

  pivots(nombreDesPivots: number): Pivot[] {
    return _.range(nombreDesPivots)
      .map(value => {
          return {
            id: value,
            question: 'Est ce que ' + value + ' est un nombre pair ?',
            reponse: value % 2 == 0 ? 'Oui ' + value + 'est un nombre pair' : 'Non ' + value + ' n\'est pas un nombre pair',
          } as Pivot;
        }
      );
  }

  propositions(crowders: Crowder[], pivots: Pivot[], propositionParPivot: number): PivotAlternative[] {
    return pivots.map((pivot, pivotIndex) => {
      return _.range(0, propositionParPivot)
        .map(index => {
          return [
            {
              idPivot: pivot.id,
              alternative: index + ' est une question alternative au pivot ' + pivot.id,
              type: PivotType.QUESTION,
              proposeur: crowders[(pivotIndex + index) % crowders.length].name
            } as PivotAlternative,
            {
              idPivot: pivot.id,
              alternative: index + ' est une reponse alternative au pivot ' + pivot.id,
              type: PivotType.REPONSE,
              proposeur: crowders[(pivotIndex + index + 1) % crowders.length].name
            } as PivotAlternative
          ];
        }).reduce((a1, a2) => a1.concat(a2), []);
    }).reduce((a1, a2) => a1.concat(a2), []);
  }
}
