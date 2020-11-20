import {Injectable} from '@angular/core';
import {Observable, Subject} from 'rxjs';
import {EvaluationGroups, NotationGroups,} from '../model/CrowdersGroups';
import {CalculParameters, Crowder, StorageDataTypeKeys, DataTable, Groupe, Pivot} from '../model/Models';
import {LocalStorageService} from './local-storage-service';
import {enumKeys} from '../misc/Commons';

@Injectable({
  providedIn: 'root'
})
export class CrowdersDispatcherService {

  private readonly _crowdersSubject: Subject<DataTable>;
  private readonly _pivotsSubject: Subject<DataTable>;
  private readonly _propositionsSubject: Subject<DataTable>;

  private readonly _crowdersGroupsSubject: Subject<Groupe[]>;
  private readonly _crowdersNotationGroupsSubject: Subject<Groupe[]>;

  public setData(type: StorageDataTypeKeys, values: DataTable) {
    values.shift();
    let filtredData = values
      .filter(d => d.length > 1);

    this.$storage.set(type, filtredData);

    switch (type) {
      case StorageDataTypeKeys.CROWDER:
        return this._crowdersSubject.next(filtredData);
      case StorageDataTypeKeys.PIVOTS:
        return this._pivotsSubject.next(filtredData);
      case StorageDataTypeKeys.PROPOSITIONS:
        return this._propositionsSubject.next(filtredData);
    }
  }

  constructor(private $storage: LocalStorageService) {
    this._crowdersSubject = new Subject();
    this._pivotsSubject = new Subject();
    this._propositionsSubject = new Subject();
    this._crowdersGroupsSubject = new Subject<Groupe[]>();
    this._crowdersNotationGroupsSubject = new Subject<Groupe[]>();
  }

  get crowders(): Observable<DataTable> {
    return this._crowdersSubject.asObservable();
  }

  get pivots(): Observable<DataTable> {
    return this._pivotsSubject.asObservable();
  }

  get propositions(): Observable<DataTable> {
    return this._propositionsSubject.asObservable();
  }

  get crowdersGroupsSubject(): Observable<Groupe[]> {
    return this._crowdersGroupsSubject.asObservable();
  }

  get crowdersNotationGroupsSubject(): Observable<Groupe[]> {
    return this._crowdersNotationGroupsSubject.asObservable();
  }

  refreshDataFromStorage() {
    this.notifyDataConsumers(StorageDataTypeKeys.CROWDERS_GROUPS, this._crowdersGroupsSubject);
    this.notifyDataConsumers(StorageDataTypeKeys.CROWDERS_NOTATIONS_GROUPS, this._crowdersNotationGroupsSubject);
    this.notifyDataConsumers(StorageDataTypeKeys.CROWDER, this._crowdersSubject);
    this.notifyDataConsumers(StorageDataTypeKeys.PIVOTS, this._pivotsSubject);
  }

  private notifyDataConsumers(dataKey: StorageDataTypeKeys, dataSubject: Subject<any[]>) {
    let data = this.$storage.get(dataKey);
    dataSubject.next(data !== null ? data : []);
  }

  dispatchGroups(propositionParQuest: number, notationsParProposition: number) {
    let evaluationGroups = new EvaluationGroups(this.makeParameters(propositionParQuest, notationsParProposition));
    let groups = evaluationGroups.distribuerGroupsCrowders();
    let pivotsParGroupe = evaluationGroups.distribuerPivotsCrowders(groups);
    this.$storage.set(StorageDataTypeKeys.CROWDERS_GROUPS, groups);
    this._crowdersGroupsSubject.next(pivotsParGroupe);
  }

  dispatchNotationGroups(propositionParQuest: number, notationsParProposition: number) {
    let notationGroupes = new NotationGroups(this.makeParameters(propositionParQuest, notationsParProposition));
    let groups = notationGroupes.distribuerGroupsCrowders();
    let pivotsParGroupe = notationGroupes.distribuerPivotsCrowders(groups);
    this.$storage.set(StorageDataTypeKeys.CROWDERS_NOTATIONS_GROUPS, groups);
    this._crowdersNotationGroupsSubject.next(pivotsParGroupe);
  }

  makeParameters(propositionParQuest: number, notationsParProposition: number): CalculParameters {

    let crowdersBrute = this.$storage.get(StorageDataTypeKeys.CROWDER);
    let pivotsBrute = this.$storage.get(StorageDataTypeKeys.PIVOTS);
    if (crowdersBrute == null || pivotsBrute == null) {
      alert('Erreur de données..');//Fixme
      return {
        crowders: [],
        pivots: [],
        propositionParQuest: propositionParQuest,
        notationsParProposition: notationsParProposition
      };
    }

    let crowders: Crowder[] = crowdersBrute
      .map(cr => {
        return {name: cr[1]};
      });

    let pivots: Pivot[] = pivotsBrute
      .map(pv => {
        return {id: pv[0], question: pv[1], reponse: pv[2]};
      });

    return {
      crowders: crowders,
      pivots: pivots,
      propositionParQuest: propositionParQuest,
      notationsParProposition: notationsParProposition
    };

  }

  clearAll() {
    for (const key of enumKeys(StorageDataTypeKeys)) {
      this.$storage.remove(key);
    }
    this.refreshDataFromStorage();
  }

}
