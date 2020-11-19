import {Component, Input, OnInit} from '@angular/core';
import {DispatcherService} from '../../services/dispatcher.service';
import {Groupe} from '../../model/Models';

export enum CrowderTableType {//FIXME : Replace with polymorphism
  PROPOSITION,
  NOTATION
}

@Component({
  selector: 'app-crowders-table',
  templateUrl: './crowders-table.component.html',
  styleUrls: ['./crowders-table.component.scss']
})
export class CrowdersTableComponent implements OnInit {

  @Input() type: CrowderTableType;

  tableHeaders = [];

  tableData = [];

  constructor(private dispatcherService: DispatcherService) {
  }

  ngOnInit(): void {
    if (this.type == CrowderTableType.PROPOSITION) {
      this.dispatcherService.crowdersGroupsSubject.subscribe(
        result => {
          this.tableHeaders = result.map(g => g.name);
          this.tableData = this.makeDataTable(result);
        }
      );
    }

    if (this.type == CrowderTableType.NOTATION) {
      this.dispatcherService.crowdersNotationGroupsSubject.subscribe(
        result => {
          this.tableHeaders = result.map(g => g.name);
          this.tableData = this.makeDataTable(result);
        }
      );
    }

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
