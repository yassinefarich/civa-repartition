import {Component, Input, OnInit} from '@angular/core';
import {Crowder} from '../../../model/Models';
import {Store} from '../../../services/data/store.service';
import {ExcelFileToJsonService} from '../../../services/io/excel-file-to-json.service';
import * as _ from 'lodash';

export enum TypesDeTable {
  PROPOSITIONS,
  NOTATIONS
}

@Component({
  selector: 'table-de-crowders',
  templateUrl: './table-de-crowders.component.html',
  styleUrls: ['./table-de-crowders.component.scss']
})
export class TableDeCrowdersComponent implements OnInit {

  @Input() typeDeTable: TypesDeTable;

  crowdersPresentation: Crowder[] = [];

  constructor(private store: Store,
              private excelFileToJsonService: ExcelFileToJsonService) {
  }

  ngOnInit(): void {

    this.store.crowders.subscribe(crowders => this.crowdersPresentation = crowders);

    if (this.crowdersPresentation.length <= 0) {
      this.store.refreshDataFromStorage();
    }
  }

  exportExcel() {
    this.excelFileToJsonService.jsonToExcel(this.transformToExportableTable(this.crowdersPresentation));
  }

  private transformToExportableTable(crowdersPresentation: Crowder[]): any[] {
    let nombreMaxDesPivots: number = _.max(crowdersPresentation.map(crowder => crowder.pivotsDeProposition.length));

    let headers = ['Crowder ID', 'Nom du crowder'].concat(_.range(1, nombreMaxDesPivots + 1).map(val => 'ID Pivot ' + val));
    let data = _.map(crowdersPresentation, crowder => [crowder.id, crowder.name].concat(_.map(crowder.pivotsDeProposition, pivot => pivot.id)));

    return _.union([headers], data);
  }

  isProposition(): boolean {
    return this.typeDeTable == TypesDeTable.PROPOSITIONS;
  }

}
