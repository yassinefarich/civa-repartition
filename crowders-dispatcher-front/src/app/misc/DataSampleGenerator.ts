export class DataSampleGenerator {

  generateCrowders(num: number): any[] {
    return DataSampleGenerator.range(num)
      .map(i => [i, 'Crowder_' + i]);
  }

  generatePivots(num: number): any[] {
    return DataSampleGenerator.range(num)
      .map(i => [i, 'Pivot_' + i, 'Reponse_' + i]);
  }

  generatePropositions(num: number): any[] {
    return DataSampleGenerator.range(num)
      .map(i => [i, 'Pivot_' + i]);
  }

  private static range(n: number): any[] {
    let result = Array();
    for (let i = 0; i <= n; i++) {
      result.push(i);
    }
    return result;
  }

}
