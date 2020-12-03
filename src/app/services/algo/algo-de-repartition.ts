import {Crowder, Pivot, PivotAlternative, PivotsDeProposition, PivotType} from '../../model/Models';
import * as _ from 'lodash';

export interface ParametresDeRepartitionnement {
  crowders: Crowder[];
  pivots: Pivot[];
  propositionsParPivot?: number;
  notationsParProposition?: number;
}

export class AlgoDeRepartition {

  private readonly nombreDeCrowders: number = 3;
  private readonly nombreDePivots: number = 10;
  private readonly nombreDePropositionsParPivots: number = 2;
  private readonly nombreDeNotationParProposition: number = 3;
  private readonly pivots: PivotsDeProposition[];

  // Variables pour le calculer
  private nombreDePropositionsTotal: number = 0;
  private nombreDePropostitionsParCrowder: number = 0;
  private nombreDePropostitionsRestantes: number = 0;

  private nombreDeNotationTotal: number = 0;
  private nombreDeNotationParCrowder: number = 0;
  private nombreDeNotationRestantes: number = 0;


  constructor(private parametres: ParametresDeRepartitionnement) {
    this.pivots = this.transformToPivotDeProposition(this.parametres.pivots);

    this.nombreDeCrowders = parametres.crowders.length;
    this.nombreDePivots = this.pivots.length;
    this.nombreDePropositionsParPivots = parametres.propositionsParPivot ?? 0;
    this.nombreDeNotationParProposition = parametres.notationsParProposition ?? 0;
  }

  public creePivotsDePropositions(): Crowder[] {

    this.log('\n## Paramétres ##\n');
    this.log(`Nombre de crowders : ${this.nombreDeCrowders}\n`);
    this.log(`Nombre de pivots : ${this.nombreDePivots}\n`);
    this.log(`Nombre de propositions par pivot : ${this.nombreDePropositionsParPivots}\n`);
    this.log(`Nombre de notations par proposition : ${this.nombreDeNotationParProposition}\n`);

    this.nombreDePropositionsTotal = this.nombreDePivots * this.nombreDePropositionsParPivots;
    this.nombreDePropostitionsParCrowder = Math.floor(this.nombreDePropositionsTotal / this.nombreDeCrowders);
    this.nombreDePropostitionsRestantes = this.nombreDePropositionsTotal % this.nombreDeCrowders;

    this.log('\n## Propositions ##\n');
    this.log(`Nombre de propositions Total : ${this.nombreDePropositionsTotal}\n`);
    this.log(`Nombre de propositions par crowder : ${this.nombreDePropostitionsParCrowder}\n`);
    this.log(`Nombre de crowders avec une proposition de plus : ${this.nombreDePropostitionsRestantes}\n`);

    return this.dispatcherPropositions();
  }

  private dispatcherPropositions(): Crowder[] {
    let crowders = this.parametres.crowders;
    let pivots = this.pivots;
    let compteurDePropositions = 0;

    for (let currentCrowderIndex = 0; currentCrowderIndex < crowders.length; currentCrowderIndex++) {
      let nombreDesPivotsPourCeCrowder = currentCrowderIndex < this.nombreDePropostitionsRestantes ?
        this.nombreDePropostitionsParCrowder + 1 : this.nombreDePropostitionsParCrowder;

      let nombreDePropositionProchainPivot = compteurDePropositions + nombreDesPivotsPourCeCrowder;

      crowders[currentCrowderIndex].pivotsDeProposition = [];
      while (compteurDePropositions < nombreDePropositionProchainPivot) {
        crowders[currentCrowderIndex].pivotsDeProposition.push(pivots[compteurDePropositions % pivots.length]);
        compteurDePropositions++;
      }
    }

    return crowders;
  }

  public creePivotsDeNotation(): Crowder[] {
    this.nombreDeNotationTotal = (this.nombreDePropositionsTotal + this.nombreDePivots) * this.nombreDeNotationParProposition;
    this.nombreDeNotationParCrowder = Math.floor(this.nombreDeNotationTotal / this.nombreDeCrowders);
    this.nombreDeNotationRestantes = this.nombreDeNotationTotal % this.nombreDeCrowders;
    this.log('\n\n## Notations ##\n');
    this.log(`Nombre de notations Total : ${this.nombreDeNotationTotal}\n`);
    this.log(`Nombre de notations par crowder : ${this.nombreDeNotationParCrowder}\n`);
    this.log(`Nombre de crowders avec une notation de plus : ${this.nombreDeNotationRestantes}\n`);

    return this.dispatcherNotations();
  }

  private dispatcherNotations(): Crowder[] {

    let crowders = this.parametres.crowders;
    let pivotsDeBase = this.getPivotsDeBase();

    let propositions = _.concat(pivotsDeBase, _.flatMap(this.parametres.pivots, pivot => pivot.alternatives));
    let compteurDeNotations = 0;

    for (let currentCrowderIndex = 0; currentCrowderIndex < crowders.length; currentCrowderIndex++) {
      let nombreDeNotationPourCeCrowder = currentCrowderIndex < this.nombreDeNotationRestantes ?
        this.nombreDeNotationParCrowder + 1 : this.nombreDeNotationParCrowder;
      let nombreDeNotationProchainPivot = compteurDeNotations + nombreDeNotationPourCeCrowder;

      crowders[currentCrowderIndex].notationsDePropositions = []
      while (compteurDeNotations < nombreDeNotationProchainPivot) {
        crowders[currentCrowderIndex].notationsDePropositions.push(propositions[compteurDeNotations % propositions.length]);
        compteurDeNotations++;
      }
    }

    return crowders;
  }

  private getPivotsDeBase() {
    return _.map(this.pivots, pivot => {
      return {
        idPivot: pivot.idPivot,
        type: pivot.type,
        alternative: pivot.text,
        proposeur: 'Pivot'
      } as PivotAlternative;
    });
  }

  log(message: any): void {
    console.log(message);
  }

  private transformToPivotDeProposition(pivots: Pivot[]): PivotsDeProposition[] {
    let questions = _.map(pivots, pivot => {
      return {
        idPivot: pivot.id,
        text: pivot.question,
        type: PivotType.QUESTION
      } as PivotsDeProposition;
    });

    let reponses = _.map(pivots, pivot => {
      return {
        idPivot: pivot.id,
        text: pivot.reponse,
        type: PivotType.REPONSE
      } as PivotsDeProposition;
    });

    let accumulator = [];
    for (let i = 0; i < pivots.length; i++) {
      accumulator.push(questions[i]);
      accumulator.push(reponses[pivots.length - i - 1]);
    }
    return accumulator;
  }
}
