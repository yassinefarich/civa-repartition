import {Component, OnInit} from '@angular/core';
import {Crowder} from '../../../model/Models';
import {Store} from '../../../services/data/store.service';

@Component({
  selector: 'propositions-table',
  templateUrl: './propositions-table.component.html',
  styleUrls: ['./propositions-table.component.scss']
})
export class PropositionsTableComponent implements OnInit {

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
