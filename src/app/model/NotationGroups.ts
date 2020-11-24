import {CalculParameters, Groupe, ReponseAlternative} from './Models';
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

    let alternatives: ReponseAlternative[] = notationGroupe
      .pivots.map(p => p.alternatives).reduce((a1, a2) => a1.concat(a2), []);

    alternatives.forEach(
      (rep, i) => {
        notationGroupe.crowders[i % notationGroupe.crowders.length].alternatives.push(rep);
      }
    );
    return notationGroupe;
  }

}
