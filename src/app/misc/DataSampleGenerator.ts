import {Crowder, Pivot} from '../model/Models';

export class DataSampleGenerator {

  private static range(n: number): any[] {
    const result = Array();
    for (let i = 0; i <= n; i++) {
      result.push(i);
    }
    return result;
  }

  generateCrowders(num: number): Crowder[] {
    return DataSampleGenerator.range(num)
      .map(i => {
          return {id: i, name: 'Cowder ' + i} as Crowder;
        }
      );
  }

  generatePivots(num: number): Pivot[] {
    return DataSampleGenerator.range(num)
      .map(i => {
          return {id: i, question: 'Question ' + i, reponse: 'Reponse ' + i,} as Pivot;
        }
      );
  }

  generateQuestionAlternatives(pivots: Pivot[], num: number): Pivot[] {
    pivots.forEach(
      pivot => pivot.questionAlternative = DataSampleGenerator.range(num).map(i => pivot.id + '_question_alternative_' + i)
    );
    return pivots;
  }

}
