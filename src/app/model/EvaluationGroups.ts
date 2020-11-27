import {ParametresDeRepartitionnement} from './Models';
import {CrowdersGroups} from './CrowdersGroups';

export class EvaluationGroups extends CrowdersGroups {
  constructor(parameters: ParametresDeRepartitionnement) {
    super(parameters, parameters.propositionParQuest);
  }

  public dispatch(): EvaluationGroups {
    this.distribuerGroupsCrowders();
    this.distribuerPivotsCrowders();
    return this;
  }
}
