import {Injectable} from '@angular/core';
import {Observable, Subject} from 'rxjs';
import {ALL_TYPES, CalculParameters, Crowder, Groupe, Pivot, StorageDataTypeKeys} from '../model/Models';
import {LocalStorageService} from './local-storage-service';
import {EvaluationGroups} from '../model/EvaluationGroups';
import {NotationGroups} from '../model/NotationGroups';

@Injectable({
  providedIn: 'root'
})
export class CrowdersDispatcherService {

  private readonly _dataObservers: Map<StorageDataTypeKeys, Subject<any>>;

  public setData(type: StorageDataTypeKeys, values: any[]): void {
    this.$storage.set(type, values);
    this._dataObservers.get(type).next(values);
  }

  constructor(private $storage: LocalStorageService) {
    this._dataObservers = new Map();

    ALL_TYPES.forEach(
      type => this._dataObservers.set(type, new Subject<any>())
    );

    console.log(this._dataObservers);
  }

  get crowders(): Observable<Crowder[]> {
    return this._dataObservers.get(StorageDataTypeKeys.CROWDER).asObservable();
  }

  get pivots(): Observable<Pivot[]> {
    return this._dataObservers.get(StorageDataTypeKeys.PIVOTS).asObservable();
  }

  get propositions(): Observable<any> {
    return this._dataObservers.get(StorageDataTypeKeys.PROPOSITIONS).asObservable();
  }

  get crowdersGroupsSubject(): Observable<Groupe[]> {
    return this._dataObservers.get(StorageDataTypeKeys.CROWDERS_GROUPS).asObservable();
  }

  get crowdersNotationGroupsSubject(): Observable<Groupe[]> {
    return this._dataObservers.get(StorageDataTypeKeys.CROWDERS_NOTATIONS_GROUPS).asObservable();
  }

  refreshDataFromStorage(): void {
    ALL_TYPES.forEach(
      type => this.notifyDataConsumers(type, this._dataObservers.get(type))
    );
  }

  private notifyDataConsumers(dataKey: StorageDataTypeKeys, dataSubject: Subject<any[]>): void {
    const data = this.$storage.get(dataKey);
    dataSubject.next(data !== null ? data : []);
  }

  dispatchGroups(propositionParQuest: number, notationsParProposition: number) {
    let evaluationGroups = new EvaluationGroups(this.makeParameters(propositionParQuest, notationsParProposition))
      .dispatch()
      .groupes;

    this.$storage.set(StorageDataTypeKeys.CROWDERS_GROUPS, evaluationGroups);
    this._dataObservers.get(StorageDataTypeKeys.CROWDERS_GROUPS).next(evaluationGroups);
  }

  dispatchNotationGroups(propositionParQuest: number, notationsParProposition: number) {
    let notationGroupes = new NotationGroups(this.makeParameters(propositionParQuest, notationsParProposition))
      .dispatch()
      .groupes;

    this.$storage.set(StorageDataTypeKeys.CROWDERS_NOTATIONS_GROUPS, notationGroupes);
    this._dataObservers.get(StorageDataTypeKeys.CROWDERS_NOTATIONS_GROUPS).next(notationGroupes);
  }

  makeParameters(propositionParQuest: number, notationsParProposition: number): CalculParameters {

    const crowdersBrute = this.$storage.get(StorageDataTypeKeys.CROWDER);
    const pivotsBrute = this.$storage.get(StorageDataTypeKeys.PIVOTS);
    if (crowdersBrute == null || pivotsBrute == null) {
      alert('Erreur de données..');//Fixme
      return {
        crowders: [],
        pivots: [],
        propositionParQuest,
        notationsParProposition
      };
    }
    return {
      crowders: crowdersBrute,
      pivots: pivotsBrute,
      propositionParQuest,
      notationsParProposition
    };

  }

  clearAll(): void {
    ALL_TYPES.forEach(
      type => this.$storage.remove(type)
    );
    this.refreshDataFromStorage();
  }

}
