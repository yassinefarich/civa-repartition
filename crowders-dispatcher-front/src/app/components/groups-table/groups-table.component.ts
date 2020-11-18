import {Component, Input, OnInit} from '@angular/core';
import {DispatcherService} from '../../services/dispatcher.service';
import {DATA_TYPE} from '../../model/enums';
import {Groupe} from '../../model/CrowdersGroups';

function makeDataTable(result: Groupe[]) {
  let maxNumberOfCrowders = result.map(g => g.crowders.length).reduce((p, v) => p > v ? p : v);
  let resultAcc = [];
  for (let i = 0; i < maxNumberOfCrowders; i++) {
    let accumulator = [];
    for (let j = 0; j < result.length && result[j].crowders.length > i;
         accumulator.push(result[j++].crowders[i].name)) {
    }
    resultAcc.push(accumulator);
  }
  return resultAcc;
}

@Component({
  selector: 'app-groups-table',
  templateUrl: './groups-table.component.html',
  styleUrls: ['./groups-table.component.scss']
})
export class GroupsTableComponent implements OnInit {

  @Input() type: DATA_TYPE;

  tableHeaders = [];

  tableData = [];

  constructor(private dispatcherService: DispatcherService) {
  }

  ngOnInit(): void {

    if (this.type == DATA_TYPE.CROWDER) {
      this.dispatcherService.crowdersGroupsSubject.subscribe(
        result => {
          this.tableHeaders = result.map(g => g.name);
          this.tableData = makeDataTable(result);
        }
      );
    }


  }

}
