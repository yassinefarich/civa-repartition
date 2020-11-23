import {CalculParameters, Crowder, Groupe, Pivot} from './Models';

export class CrowdersGroups {
  private readonly _parameters: CalculParameters;
  private readonly _diviseur: number;
  private _groupes: Groupe[];

  constructor(parameters: CalculParameters, diviseur: number) {
    this._parameters = parameters;
    this._diviseur = diviseur;
  }

  get groupes(): Groupe[] {
    return this._groupes;
  }

  set groupes(value: Groupe[]) {
    this._groupes = value;
  }

  public distribuerGroupsCrowders(): void {
    let nombreDeGroups = Math.floor(this._parameters.crowders.length / this._diviseur);
    let nombreDeCrowdersRestant = this._parameters.crowders.length % nombreDeGroups;
    let nbrDeCrowderParGroupe = (this._parameters.crowders.length - nombreDeCrowdersRestant) / nombreDeGroups;

    let crowders = this._parameters.crowders
      .slice(0, this._parameters.crowders.length - nombreDeCrowdersRestant);

    let crowdersRestants = this._parameters.crowders
      .slice(this._parameters.crowders.length - nombreDeCrowdersRestant, this._parameters.crowders.length);

    this.groupes = CrowdersGroups.dispatchCrowders(crowders, crowdersRestants, nbrDeCrowderParGroupe);
  }

  public distribuerPivotsCrowders(): void {
    let groups = this.groupes;

    let nombreDePivotParGroupe = Math.floor(this._parameters.pivots.length / groups.length);
    let nombreDePivotRestant = this._parameters.pivots.length % groups.length;

    let pivots = this._parameters.pivots
      .slice(0, this._parameters.pivots.length - nombreDePivotRestant);

    let pivotsRestants = this._parameters.pivots
      .slice(this._parameters.pivots.length - nombreDePivotRestant, this._parameters.pivots.length);

    this.groupes = CrowdersGroups.dispatchPivots(pivots, pivotsRestants, nombreDePivotParGroupe, groups);
  }

  private static dispatchCrowders(array: Crowder[], arraySuppl: Crowder[], numberOfElements: number): Groupe[] {
    let resultAccumulator: Groupe[] = [];
    let accumulator: Crowder[] = [];
    let groupeOrder = 1;

    //Fixme : Dirty code!
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
      let accumulator = [];//Fixme : Dirty code!
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
