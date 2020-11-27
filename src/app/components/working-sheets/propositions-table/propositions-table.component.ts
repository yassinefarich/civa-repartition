import {Component, OnInit} from '@angular/core';
import {RepartitionService} from '../../../services/algo/repartition.service';
import {Groupe} from '../../../model/Models';
import {Store} from '../../../services/data/store.service';

@Component({
  selector: 'propositions-table',
  templateUrl: './propositions-table.component.html',
  styleUrls: ['./propositions-table.component.scss']
})
export class PropositionsTableComponent implements OnInit {

  tableHeaders = [];
  tableData = [];

  constructor(private store: Store) {
  }

  ngOnInit(): void {
    this.store.crowdersGroups.subscribe(
      result => {
        this.tableHeaders = result.map(g => g.name);
        this.tableData = this.makeDataTable(result);
      }
    );

    if (this.tableData.length <= 0) {
      this.store.refreshDataFromStorage();
    }
  }

  makeDataTable(result: Groupe[]): any[] {
    let resultAccumulator = [];
    result
      .forEach(groupe =>
        groupe.crowders.forEach(
          crowder => {
            resultAccumulator.push({crowderName: crowder.name, groupeName: groupe.name, pivots: groupe.pivots});
          }
        ));

    return resultAccumulator;
  }

}
