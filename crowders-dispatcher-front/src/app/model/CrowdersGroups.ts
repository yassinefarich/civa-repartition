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

    return this.splitArray(crowders, crowdersRestants, nbrDeCrowderParGroupe);
  }

  private splitArray(array: Crowder[], arraySuppl: Crowder[], numberOfElements: number): Groupe[] {
    let resultAccumulator: Groupe[] = [];
    let accumulator: Crowder[] = [];
    let groupeOrder = 1;

    for (let i = 0; i < array.length; i++) {
      if (i != 0 && i % numberOfElements == 0) {
        let supplValue = arraySuppl.shift();
        if (supplValue != undefined) {
          accumulator.push(supplValue);
        }
        resultAccumulator.push({name: 'Groupe ' + groupeOrder++, crowders: accumulator} as Groupe);
        accumulator = [];
      }
      accumulator.push(array[i]);
    }
    resultAccumulator.push({name: 'Groupe ' + groupeOrder, crowders: accumulator} as Groupe);
    return resultAccumulator;
  }

}

export class EvaluationGroups extends CrowdersGroups {
  constructor(parameters: CalculParameters) {
    super(parameters, parameters.propositionParQuest);
  }
}
