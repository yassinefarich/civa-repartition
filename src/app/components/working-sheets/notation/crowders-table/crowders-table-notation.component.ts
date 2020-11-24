import {Component, Input, OnInit} from '@angular/core';
import {CrowdersDispatcherService} from '../../../../services/crowders-dispatcher.service';
import {Crowder, Groupe} from '../../../../model/Models';

@Component({
  selector: 'app-crowders-table-notation',
  templateUrl: './crowders-table-notation.component.html',
  styleUrls: ['./crowders-table-notation.component.scss']
})
export class CrowdersTableNotationComponent implements OnInit {

  tableData = [];

  constructor(private dispatcherService: CrowdersDispatcherService) {
  }

  ngOnInit(): void {
    this.dispatcherService.crowdersNotationGroupsSubject.subscribe(
      result => {
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
            resultAccumulator.push({
              crowderName: crowder.name, groupeName: groupe.name, pivots: groupe.pivots,
              altQuesRepANoter: CrowdersTableNotationComponent.creatQuestResp(crowder)
            });
          }
        ));

    return resultAccumulator;
  }


  private static creatQuestResp(crowder: Crowder): any[] {

    let reponses: any[] = crowder.alternatives.map(alt => {
      return {alt: alt, type: 'R'};
    });

    return reponses;

  }
}
