export type DataTable = any[][];

export enum StorageDataTypeKeys {
  CROWDER = '_crowders',
  PIVOTS = '_pivots',
  PROPOSITIONS = '_propositions',
  CROWDERS_GROUPS = '_crowdersGroups',
  CROWDERS_NOTATIONS_GROUPS = '_crowdersNotationGroups'
}

export interface Crowder {
  name: string,
  pivotsEvaluation: Array<Pivot>
  pivotsNotation: Array<Pivot>
}

export interface Pivot {
  id: string;
  question: string;
  reponse?: string;
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
