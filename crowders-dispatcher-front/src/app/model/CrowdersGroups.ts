import {CalculParameters, Crowder, Groupe, Pivot} from './Models';

class CrowdersGroups {
  private readonly _parameters: CalculParameters;
  private readonly _diviseur: number;

  constructor(parameters: CalculParameters, diviseur: number) {
    this._parameters = parameters;
    this._diviseur = diviseur;
  }

  public distribuerGroupsCrowders(): Groupe[] {
    let nombreDeGroups = Math.floor(this._parameters.crowders.length / this._diviseur);
    let nombreDeCrowdersRestant = this._parameters.crowders.length % nombreDeGroups;
    let nbrDeCrowderParGroupe = (this._parameters.crowders.length - nombreDeCrowdersRestant) / nombreDeGroups;

    let crowders = this._parameters.crowders
      .slice(0, this._parameters.crowders.length - nombreDeCrowdersRestant);

    let crowdersRestants = this._parameters.crowders
      .slice(this._parameters.crowders.length - nombreDeCrowdersRestant, this._parameters.crowders.length);

    return CrowdersGroups.dispatchCrowders(crowders, crowdersRestants, nbrDeCrowderParGroupe);
  }

  public distribuerPivotsCrowders(groups: Groupe[]): Groupe[] {
    let nombreDePivotParGroupe = this._parameters.pivots.length / groups.length;
    let nombreDePivotRestant = this._parameters.pivots.length % groups.length;

    let pivots = this._parameters.pivots
      .slice(0, this._parameters.pivots.length - nombreDePivotRestant);

    let pivotsRestants = this._parameters.pivots
      .slice(this._parameters.pivots.length - nombreDePivotRestant, this._parameters.pivots.length);

    return CrowdersGroups.dispatchPivots(pivots, pivotsRestants, nombreDePivotParGroupe, groups);
  }

  private static dispatchCrowders(array: Crowder[], arraySuppl: Crowder[], numberOfElements: number): Groupe[] {
    let resultAccumulator: Groupe[] = [];
    let accumulator: Crowder[] = [];
    let groupeOrder = 1;

    //Fixme : Dirty !!
    for (let i = 0; i < array.length; i++) {
      if (i != 0 && i % numberOfElements == 0) {
        this.addSupplValueIfExists(arraySuppl, accumulator);
        resultAccumulator.push({name: 'Groupe ' + groupeOrder++, crowders: accumulator} as Groupe);
        accumulator = [];
      }
      accumulator.push(array[i]);
    }
    resultAccumulator.push({name: 'Groupe ' + groupeOrder, crowders: accumulator} as Groupe);
    return resultAccumulator;
  }

  private static dispatchPivots(pivots: Pivot[], pivotsSuppl: Pivot[], numberOfElements: number, groups: Groupe[]): Groupe[] {
    for (let i = 0; i < groups.length; i++) {
      let accumulator = [];
      for (let j = 0; j < numberOfElements; j++) {
        accumulator.push(pivots.shift());
      }
      this.addSupplValueIfExists(pivotsSuppl, accumulator);
      groups[i].pivots = accumulator;

    }
    return groups;
  }

  private static addSupplValueIfExists(suppArray: any[], destArray: any[]) {
    let value = suppArray.shift();
    if (value != undefined) {
      destArray.push(value);
    }
  }
}

export class EvaluationGroups extends CrowdersGroups {
  constructor(parameters: CalculParameters) {
    super(parameters, parameters.propositionParQuest);
  }
}

export class NotationGroups extends CrowdersGroups {
  constructor(parameters: CalculParameters) {
    super(parameters, parameters.notationsParProposition);
  }
}
