import {Component, Input, OnInit} from '@angular/core';
import {DispatcherService} from '../../services/dispatcher.service';
import {Groupe} from '../../model/Models';

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

  constructor(private dispatcherService: DispatcherService) {
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

  exportExcel() {
    import('xlsx').then(xlsx => {
      const worksheet = xlsx.utils.json_to_sheet(this.tableData);
      const workbook = {Sheets: {'data': worksheet}, SheetNames: ['data']};
      const excelBuffer: any = xlsx.write(workbook, {bookType: 'xlsx', type: 'array'});
      this.saveAsExcelFile(excelBuffer, 'crowders');
    });
  }

  saveAsExcelFile(buffer: any, fileName: string): void {
    import('file-saver').then(FileSaver => {
      let EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
      let EXCEL_EXTENSION = '.xlsx';
      const data: Blob = new Blob([buffer], {
        type: EXCEL_TYPE
      });
      FileSaver.saveAs(data, fileName + '_export_' + new Date().getTime() + EXCEL_EXTENSION);
    });
  }

}
