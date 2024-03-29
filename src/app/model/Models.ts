export type DataTable = any[][];

export enum StorageDataTypeKeys {
  CROWDER = '_crowders',
  PIVOTS = '_pivots',
  PROPOSITIONS = '_propositions',
  PARAMETRES = '_parametres',
  GESTION_DU_TEMPS = '_gestion_du_temps',
}

export const ALL_TYPES = [
  StorageDataTypeKeys.PROPOSITIONS,
  StorageDataTypeKeys.PIVOTS,
  StorageDataTypeKeys.CROWDER,
  StorageDataTypeKeys.PARAMETRES,
  StorageDataTypeKeys.GESTION_DU_TEMPS,
];


export enum PivotType {
  QUESTION,
  REPONSE
}

export interface PivotAlternative {
  idPivot: number;
  alternative: string;
  proposeur?: string
  type?: PivotType;
}

export interface PivotsDeProposition {
  idPivot: number;
  text: string;
  type?: PivotType;
}

export interface Crowder {
  id: number
  name: string;
  pivotsDeProposition: PivotsDeProposition[];
  notationsDePropositions: PivotAlternative[]
}

export interface Pivot {
  id: number;
  question: string;
  reponse: string;
}

export interface Groupe {
  name: string;
  crowders: Array<Crowder>;
  pivots: Array<Pivot>;
}
