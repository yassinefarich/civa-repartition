import {Component, Input, OnInit} from '@angular/core';
import {Crowder, PivotType} from '../../../model/Models';
import {Store} from '../../../services/data/store.service';
import {ImportExportService} from '../../../services/io/import-export.service';
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
              private excelFileToJsonService: ImportExportService) {
  }

  ngOnInit(): void {
    this.store.crowders.subscribe(crowders =>
      this.crowdersPresentation =
        this.isProposition() ?
          crowders.filter(crowders => crowders.pivotsDeProposition.length > 0) :
          crowders.filter(crowders => crowders.notationsDePropositions.length > 0));

    if (this.crowdersPresentation.length <= 0) {
      this.store.refreshDataFromStorage();
    }
  }

  exportExcel() {
    if (this.isProposition()) {
      this.excelFileToJsonService.aoaToExcel(this.transformToExportablePropositionsTable(this.crowdersPresentation), 'propositions');
    } else {
      this.excelFileToJsonService.aoaToExcel(this.transformToExportableNotationsTable(this.crowdersPresentation), 'notations');
    }
  }

  exportCSV() {
    if (this.isProposition()) {
      this.excelFileToJsonService.aoaToCSV(this.transformToExportablePropositionsTable(this.crowdersPresentation), 'propositions');
    } else {
      this.excelFileToJsonService.aoaToCSV(this.transformToExportableNotationsTable(this.crowdersPresentation), 'notations');
    }
  }

  private transformToExportablePropositionsTable(crowdersPresentation: Crowder[]): any[][] {
    let headers: any[][] = [['Crowder ID', 'Pivot ID', 'Type de proposition(Q : Question, R : Réponse)']];
    let data: any[][] = _.flatMap(crowdersPresentation, crowder => crowder.pivotsDeProposition.map(prop => [crowder.id, prop.idPivot,
      prop.type == PivotType.QUESTION ? 'Q' : 'R']));
    return _.union(headers, data);
  }

  private transformToExportableNotationsTable(crowdersPresentation: Crowder[]): any[][] {
    let headers: any[][] = [['Crowder ID', 'Pivot ID', 'Crowder de proposition', 'Type de notation(Q : Question, R : Réponse)']];
    let data: any[][] = _.flatMap(crowdersPresentation, crowder => crowder.notationsDePropositions
      .map(prop => [crowder.id, prop.idPivot, prop.proposeur, prop.type == PivotType.QUESTION ? 'Q' : 'R']));
    return _.union(headers, data);
  }

  isProposition(): boolean {
    return this.typeDeTable == TypesDeTable.PROPOSITIONS;
  }

}
