import {CalculParameters} from './Models';
import {CrowdersGroups} from './CrowdersGroups';

export class EvaluationGroups extends CrowdersGroups {
  constructor(parameters: CalculParameters) {
    super(parameters, parameters.propositionParQuest);
  }

  public dispatch(): EvaluationGroups {
    this.distribuerGroupsCrowders();
    this.distribuerPivotsCrowders();
    return this;
  }
}
