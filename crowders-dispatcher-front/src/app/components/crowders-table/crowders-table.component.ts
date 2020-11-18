import {Component, Input, OnInit} from '@angular/core';
import {DispatcherService} from '../../services/dispatcher.service';
import {DATA_TYPE} from '../../model/enums';
import {Groupe} from '../../model/CrowdersGroups';

@Component({
  selector: 'app-crowders-table',
  templateUrl: './crowders-table.component.html',
  styleUrls: ['./crowders-table.component.scss']
})
export class CrowdersTableComponent implements OnInit {

  @Input() type: DATA_TYPE;

  tableHeaders = [];

  tableData = [];

  constructor(private dispatcherService: DispatcherService) {
    this.dispatcherService.crowdersGroupsSubject.subscribe(
      result => {
        this.tableHeaders = result.map(g => g.name);
        this.tableData = this.makeDataTable(result);
      }
    );
  }

  ngOnInit(): void {
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
