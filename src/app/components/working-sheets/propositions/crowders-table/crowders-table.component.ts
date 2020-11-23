import {Component, OnInit} from '@angular/core';
import {CrowdersDispatcherService} from '../../../../services/crowders-dispatcher.service';
import {Groupe} from '../../../../model/Models';

@Component({
  selector: 'app-crowders-table',
  templateUrl: './crowders-table.component.html',
  styleUrls: ['./crowders-table.component.scss']
})
export class CrowdersTableComponent implements OnInit {

  tableHeaders = [];
  tableData = [];

  constructor(private dispatcherService: CrowdersDispatcherService) {
  }

  ngOnInit(): void {
    this.dispatcherService.crowdersGroupsSubject.subscribe(
      result => {
        this.tableHeaders = result.map(g => g.name);
        this.tableData = this.makeDataTable(result);
      }
    );

    if (this.tableData.length <= 0) {
      this.dispatcherService.refreshDataFromStorage();
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
