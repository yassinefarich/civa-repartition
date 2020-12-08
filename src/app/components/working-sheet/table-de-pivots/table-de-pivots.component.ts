import {Component, OnInit} from '@angular/core';
import {Crowder, PivotsDeProposition} from '../../../model/Models';
import {Store} from '../../../services/data/store.service';
import * as _ from 'lodash';

export interface PivotsParCrowder {
  pivot: PivotsDeProposition;
  crowders: Crowder[]
}

@Component({
  selector: 'table-de-pivots',
  templateUrl: './table-de-pivots.component.html',
  styleUrls: ['./table-de-pivots.component.scss']
})
export class TableDePivots implements OnInit {

  pivotsPresentation: PivotsParCrowder[] = [];

  constructor(private store: Store) {
  }

  ngOnInit(): void {
    this.store.crowders.subscribe(crowders => this.pivotsPresentation = this.transpose(crowders));

    if (this.pivotsPresentation.length <= 0) {
      this.store.refreshDataFromStorage();
    }
  }

  private transpose(crowders: Crowder[]): PivotsParCrowder[] {
    let pivotCrowder: [PivotsDeProposition, Crowder][] = _.flatMap(crowders,
        crowder => _.map(crowder.pivotsDeProposition, pivot => [pivot, crowder] as [PivotsDeProposition, Crowder]));

    let groups = _.groupBy(pivotCrowder, pivotCrowder => pivotCrowder[0].idPivot);
    return _.values(groups)
      .map(array => {
        return {
          pivot: array[0][0],
          crowders: array.map(a => a[1])
        } as PivotsParCrowder;
      })
  }
}
