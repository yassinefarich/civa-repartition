import {Injectable} from '@angular/core';
import {DATA_TYPE} from '../model/enums';
import {DataTable} from '../model/types';
import {Observable, Subject} from 'rxjs';
import {CalculParameters, Crowder, EvaluationGroups, Groupe, Pivot} from '../model/CrowdersGroups';

@Injectable({
  providedIn: 'root'
})
export class DispatcherService {

  private _data: Map<DATA_TYPE, DataTable> = new Map<DATA_TYPE, DataTable>();
  private readonly _crowdersSubject: Subject<DataTable>;
  private readonly _pivotsSubject: Subject<DataTable>;
  private readonly _propositionsSubject: Subject<DataTable>;

  private readonly _crowdersGroupsSubject: Subject<Groupe[]>;

  public setData(type: DATA_TYPE, values: DataTable) {
    values.shift();
    let filtredData = values
      .filter(d => d.length > 1);

    this._data.set(type, filtredData);

    switch (type) {
      case DATA_TYPE.CROWDER:
        return this._crowdersSubject.next(filtredData);
      case DATA_TYPE.PIVOTS:
        return this._pivotsSubject.next(filtredData);
      case DATA_TYPE.PROPOSITIONS:
        return this._propositionsSubject.next(filtredData);
    }
  }

  constructor() {
    this._crowdersSubject = new Subject();
    this._pivotsSubject = new Subject();
    this._propositionsSubject = new Subject();
    this._crowdersGroupsSubject = new Subject();
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

  dispatchGroups(propositionParQuest: number, notationsParProposition: number) {

    let evaluationGroups = new EvaluationGroups(this.makeParameters(propositionParQuest, notationsParProposition))
    let groups = evaluationGroups.distribuerGroupsCrowders();
    let pivotsParGroupe = evaluationGroups.distribuerPivotsCrowders(groups)
    this._crowdersGroupsSubject.next(pivotsParGroupe)
    console.log(groups);
  }

  makeParameters(propositionParQuest: number, notationsParProposition: number): CalculParameters {

    let crowders = this._data.get(DATA_TYPE.CROWDER)
      .map(cr => {
        return {name: cr[1]} as Crowder;
      });

    let pivots = this._data.get(DATA_TYPE.PIVOTS)
      .map(pv => {
        return {id: pv[0], question: pv[1]} as Pivot;
      });

    return {
      crowders: crowders,
      pivots: pivots,
      propositionParQuest: propositionParQuest,
      notationsParProposition: notationsParProposition
    };

  }
}
