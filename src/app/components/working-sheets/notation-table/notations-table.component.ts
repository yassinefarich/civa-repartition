import {Component, OnInit} from '@angular/core';
import {Crowder, Groupe} from '../../../model/Models';
import {Store} from '../../../services/data/store.service';
import * as _ from 'lodash';

@Component({
  selector: 'notations-table',
  templateUrl: './notations-table.component.html',
  styleUrls: ['./notations-table.component.scss']
})

export class NotationsTableComponent implements OnInit {

  crowdersPresentation: Crowder[] = [];

  constructor(private store: Store) {
  }

  ngOnInit(): void {
    this.store.crowders.subscribe(crowders => this.crowdersPresentation = crowders);

    if (this.crowdersPresentation.length <= 0) {
      this.store.refreshDataFromStorage();
    }
  }
}
