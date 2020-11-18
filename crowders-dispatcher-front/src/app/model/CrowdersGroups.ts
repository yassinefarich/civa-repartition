export interface Crowder {
  name: string,
  pivotsEvaluation: Array<Pivot>
  pivotsNotation: Array<Pivot>
}

export interface Pivot {
  id: string;
  question: string;
}

export interface Groupe {
  name: string;
  crowders: Array<Crowder>;
  pivots: Array<Pivot>;
}

export interface CalculParameters {
  crowders: Array<Crowder>;
  pivots: Array<Pivot>;
  propositionParQuest: number;
  notationsParProposition: number;
}

class CrowdersGroups {
  parameters: CalculParameters;
  diviseur: number;

  constructor(parameters: CalculParameters, diviseur: number) {
    this.parameters = parameters;
    this.diviseur = diviseur;
  }

  public distribuerGroupsCrowders(): Groupe[] {
    let nombreDeGroups = this.parameters.crowders.length / this.diviseur;
    let nombreDeCrowdersRestant = this.parameters.crowders.length % nombreDeGroups;
    let nbrDeCrowderParGroupe = (this.parameters.crowders.length - nombreDeCrowdersRestant) / nombreDeGroups;

    let crowders = this.parameters.crowders
      .slice(0, this.parameters.crowders.length - nombreDeCrowdersRestant);

    let crowdersRestants = this.parameters.crowders
      .slice(this.parameters.crowders.length - nombreDeCrowdersRestant, this.parameters.crowders.length);

    return CrowdersGroups.dispatchCrowders(crowders, crowdersRestants, nbrDeCrowderParGroupe);
  }

  public distribuerPivotsCrowders(groups: Groupe[]): Groupe[] {
    let nombreDePivotParGroupe = this.parameters.pivots.length / groups.length;
    let nombreDePivotRestant = this.parameters.pivots.length % groups.length;

    let pivots = this.parameters.pivots
      .slice(0, this.parameters.pivots.length - nombreDePivotRestant);

    let pivotsRestants = this.parameters.pivots
      .slice(this.parameters.pivots.length - nombreDePivotRestant, this.parameters.pivots.length);

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
