import {Crowder, Pivot} from '../model/Models';

export class DataSampleGenerator {

  private static range(n: number): any[] {
    const result = Array();
    for (let i = 0; i < n; i++) {
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

  generatePivots(num: number, notationParPivot: number): Pivot[] {
    let pivots = DataSampleGenerator.range(num)
      .map(i => {
          return {id: i, question: 'Question ' + i, reponse: 'Reponse ' + i,} as Pivot;
        }
      );

    if (notationParPivot !== 0) {
      this.generateQuestionAlternatives(pivots, notationParPivot);
      this.generateReponsesAlternatives(pivots, notationParPivot);
    }

    return pivots;
  }

  private generateQuestionAlternatives(pivots: Pivot[], num: number): void {
    pivots.forEach(
      pivot => pivot.questionAlternative = DataSampleGenerator.range(num).map(i => {
          return {
            idPivot: pivot.id,
            alternative: pivot.id + '_question_alternative_' + i
          };
        }
      ));
  }

  private generateReponsesAlternatives(pivots: Pivot[], num: number): void {
    pivots.forEach(
      pivot => pivot.reponseAlternatives = DataSampleGenerator.range(num).map(i => {
          return {
            idPivot: pivot.id,
            alternative: pivot.id + '_reponse_alternative_' + i
          };
        }
      ));
  }

}
