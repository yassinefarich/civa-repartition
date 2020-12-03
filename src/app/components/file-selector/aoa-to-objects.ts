import {Crowder, DataTable, Pivot, PivotAlternative, PivotType, StorageDataTypeKeys} from '../../model/Models';

export class AoaToObjects {

  public transformData(donnesBrute: DataTable, typeDeDonnes: StorageDataTypeKeys): any[] {
    // Suppression des noms des colonnes
    donnesBrute.shift();

    const dataTable = donnesBrute
      // Suppression des colonnes vides
      .filter(d => d.length > 1)
      //Suppression des colonnes avec des ID Vides
      .filter(d => d[0] !== undefined && d[0] !== '');

    if (typeDeDonnes === StorageDataTypeKeys.CROWDER) {
      return this.mapCrowder(dataTable);
    }

    if (typeDeDonnes === StorageDataTypeKeys.PIVOTS) {
      return this.mapPivot(dataTable);
    }

    if (typeDeDonnes === StorageDataTypeKeys.PROPOSITIONS) {
      return this.mapProposition(dataTable);
    }
    return [];
  }


  private mapProposition(dataTable: any[][]) {
    return dataTable
      .map(proposition => {
        return {
          proposeur: proposition[0],
          idPivot: proposition[1],
          alternative: proposition[2],
          type: proposition[10].includes('REPONSES') ? PivotType.REPONSE : PivotType.QUESTION
        } as PivotAlternative;
      });
  }

  private mapPivot(dataTable: any[][]) {
    return dataTable
      .map(pivot => {
        return {id: pivot[0], question: pivot[1], reponse: pivot[2], alternatives: []} as Pivot;
      });
  }

  private mapCrowder(dataTable: any[][]) {
    return dataTable
      .map(crowder => {
        return {id: crowder[0], name: crowder[1], pivotsDeProposition: [], notationsDePropositions: []} as Crowder;
      });
  }
}
