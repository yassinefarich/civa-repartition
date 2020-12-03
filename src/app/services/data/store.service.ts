import {Injectable} from '@angular/core';
import {ALL_TYPES, Crowder, Groupe, Pivot, PivotAlternative, StorageDataTypeKeys} from '../../model/Models';
import {Observable, Subject} from 'rxjs';
import {LocalStorageService} from './local-storage-service';

@Injectable({
  providedIn: 'root'
})
export class Store {

  private readonly _dataObservers: Map<StorageDataTypeKeys, Subject<any>> = new Map();
  private readonly _onReinit: Subject<any> = new Subject<any>();

  constructor(private $storage: LocalStorageService) {
    this.initSubjects();
  }

  private initSubjects(): void {
    ALL_TYPES.forEach(
      type => this._dataObservers.set(type, new Subject<any>())
    );
  }

  get crowders(): Observable<Crowder[]> {
    return this._dataObservers.get(StorageDataTypeKeys.CROWDER).asObservable();
  }

  get pivots(): Observable<Pivot[]> {
    return this._dataObservers.get(StorageDataTypeKeys.PIVOTS).asObservable();
  }

  get propositions(): Observable<PivotAlternative[]> {
    return this._dataObservers.get(StorageDataTypeKeys.PROPOSITIONS).asObservable();
  }

  get onReinit(): Observable<any> {
    return this._onReinit.asObservable();
  }

  public setData(type: StorageDataTypeKeys, values: any[]): void {
    this.$storage.set(type, values);
    this._dataObservers.get(type).next(values);
  }

  public refreshDataFromStorage(): void {
    ALL_TYPES.forEach(
      type => this.notifyDataConsumers(type, this._dataObservers.get(type))
    );
  }

  public clearAll(): void {
    ALL_TYPES.forEach(
      type => this.$storage.remove(type)
    );
    this.refreshDataFromStorage();
    this._onReinit.next();
  }

  private notifyDataConsumers(dataKey: StorageDataTypeKeys, dataSubject: Subject<any[]>): void {
    const data = this.$storage.get(dataKey);
    dataSubject.next(data !== null ? data : []);
  }

  getFromLocalStorage(dataType: StorageDataTypeKeys): any[] {
    let result = this.$storage.get(dataType);
    return result != null ? result : [];
  }
}
