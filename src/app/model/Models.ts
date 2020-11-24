export type DataTable = any[][];

export enum StorageDataTypeKeys {
  CROWDER = '_crowders',
  PIVOTS = '_pivots',
  PROPOSITIONS = '_propositions',
  CROWDERS_GROUPS = '_crowdersGroups',
  CROWDERS_NOTATIONS_GROUPS = '_crowdersNotationGroups'
}

export const ALL_TYPES = [
  StorageDataTypeKeys.CROWDERS_NOTATIONS_GROUPS,
  StorageDataTypeKeys.CROWDERS_GROUPS,
  StorageDataTypeKeys.PROPOSITIONS,
  StorageDataTypeKeys.PIVOTS,
  StorageDataTypeKeys.CROWDER,
];


export enum PivotAlternativeType {
  QUESTION,
  REPONSE
}

export interface PivotAlternative {
  idPivot: string;
  alternative: string;
  type?: PivotAlternativeType;
}

export interface ReponseAlternative extends PivotAlternative {
}

export interface Crowder {
  id: string
  name: string;
  pivotsEvaluation: Pivot[];
  alternatives: PivotAlternative[];
}

export interface Pivot {
  id: string;
  question: string;
  reponse: string;
  alternatives: PivotAlternative[];
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
