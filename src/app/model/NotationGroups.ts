import {CalculParameters, Groupe, QuestionAlternative, ReponseAlternative} from './Models';
import {CrowdersGroups} from './CrowdersGroups';

export class NotationGroups extends CrowdersGroups {

  constructor(parameters: CalculParameters) {
    super(parameters, parameters.notationsParProposition);
  }

  public dispatch(): NotationGroups {
    this.distribuerGroupsCrowders();
    this.distribuerPivotsCrowders();
    this.dispatchNotation();
    return this;
  }

  public dispatchNotation(): void {
    this.groupes = this.groupes.map(
      g => this.dispatchNotationsGroupe(g)
    );
  }

  private dispatchNotationsGroupe(notationGroupe: Groupe): Groupe {

    let reponseAlternatives: ReponseAlternative[] = notationGroupe
      .pivots.map(p => p.reponseAlternatives).reduce((a1, a2) => a1.concat(a2), []);

    let questionsAlternatives: QuestionAlternative[] = notationGroupe
      .pivots.map(p => p.questionAlternative).reduce((a1, a2) => a1.concat(a2), []);

    reponseAlternatives.forEach(
      (rep, i) => {

        if (notationGroupe.crowders[i % notationGroupe.crowders.length].altReponsesANoter === undefined) {
          notationGroupe.crowders[i % notationGroupe.crowders.length].altReponsesANoter = [];
        }

        notationGroupe.crowders[i % notationGroupe.crowders.length].altReponsesANoter.push(rep);
      }
    );

    questionsAlternatives.forEach(
      (rep, i) => {
        if (notationGroupe.crowders[i % notationGroupe.crowders.length].altQuestionsANoter === undefined) {
          notationGroupe.crowders[i % notationGroupe.crowders.length].altQuestionsANoter = [];
        }

        notationGroupe.crowders[i % notationGroupe.crowders.length].altQuestionsANoter.push(rep);
      }
    );

    return notationGroupe;
  }

}
