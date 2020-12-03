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

  // private propositions(nombreDesPivots: number, nombrePropAlterParPivot: number): PivotAlternative[] {
  //   return _.range(nombreDesPivots * nombrePropAlterParPivot)
  //     .map(val => {
  //       return [
  //         {
  //           idPivot: pivotId,
  //           alternative: val + ' est une question alternative au pivot ' + pivotId,
  //           type: PivotType.QUESTION
  //         },
  //         {
  //           idPivot: pivotId,
  //           alternative: val + ' est une reponse alternative au pivot ' + pivotId,
  //           type: PivotType.REPONSE
  //         }
  //       ];
  //     }).reduce((a1, a2) => a1.concat(a2), []);
  // }

}
