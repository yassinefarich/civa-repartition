import {Component, Input, OnInit} from '@angular/core';
import {CrowdersDispatcherService} from '../../../services/crowders-dispatcher.service';
import {Groupe} from '../../../model/Models';
import {ExcelFileToJsonService} from '../../../services/excel-file-to-json.service';

export enum GroupsTableType {//FIXME : Replace with polymorphism
  PROPOSITION,
  NOTATION
}

@Component({
  selector: 'app-groups-table',
  templateUrl: './groups-table.component.html',
  styleUrls: ['./groups-table.component.scss']
})
export class GroupsTableComponent implements OnInit {

  @Input() type: GroupsTableType;

  tableHeaders = [];

  tableData = [];

  constructor(private dispatcherService: CrowdersDispatcherService,
              private excelFileToJsonService: ExcelFileToJsonService) {
  }

  ngOnInit(): void {

    if (this.type == GroupsTableType.PROPOSITION) {
      this.dispatcherService.crowdersGroupsSubject.subscribe(
        result => {
          this.tableHeaders = result.map(g => g.name + ' (' + g.crowders.length + ')');
          this.tableData = GroupsTableComponent.makeDataTable(result);
        }
      );
    }

    if (this.type == GroupsTableType.NOTATION) {
      this.dispatcherService.crowdersNotationGroupsSubject.subscribe(
        result => {
          this.tableHeaders = result.map(g => g.name);
          this.tableData = GroupsTableComponent.makeDataTable(result);
        }
      );
    }

    if (this.tableData.length <= 0) {
      this.dispatcherService.refreshDataFromStorage();
    }
  }

  private static makeDataTable(result: Groupe[]): any[][] {
    if (result.length == 0) {
      return [];
    }

    let maxNumberOfCrowders = result.map(g => g.crowders.length).reduce((p, v) => p > v ? p : v);
    let resultAcc = [];//Fixme : Make it more readable
    for (let i = 0; i < maxNumberOfCrowders; i++) {
      let accumulator = [];
      for (let j = 0; j < result.length && result[j].crowders.length > i;
           accumulator.push(result[j++].crowders[i].name)) {
      }
      resultAcc.push(accumulator);
    }
    return resultAcc;
  }

  exportExcel() {
    this.excelFileToJsonService.jsonToExcel(this.tableData);
  }
}
