import {Crowder, Pivot, PivotAlternativeType} from '../model/Models';

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
          return {id: i, name: 'Cowder ' + i, alternatives: [], pivotsEvaluation: []} as Crowder;
        }
      );
  }

  generatePivots(num: number, notationParPivot: number): Pivot[] {
    let pivots = DataSampleGenerator.range(num)
      .map(i => {
          return {
            id: i, question: 'Question ' + i, reponse: 'Reponse ' + i,
            alternatives: Array()
          } as Pivot;
        }
      );

    if (notationParPivot !== 0) {
      this.generateQuestionAlternatives(pivots, notationParPivot);
    }

    return pivots;
  }

  private generateQuestionAlternatives(pivots: Pivot[], num: number): void {

    pivots.forEach(
      pivot => {
        for (let i = 0; i < num; i++) {
          pivot.alternatives.push(
            {
              idPivot: pivot.id,
              alternative: pivot.id + '_question_alternative_' + i,
              type: PivotAlternativeType.QUESTION
            },
            {
              idPivot: pivot.id,
              alternative: pivot.id + '_reponse_alternative_' + i,
              type: PivotAlternativeType.REPONSE
            },
          );
        }
      }
    );
  }

}
