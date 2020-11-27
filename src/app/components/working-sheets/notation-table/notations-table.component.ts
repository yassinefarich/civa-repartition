import {Component, OnInit} from '@angular/core';
import {RepartitionService} from '../../../services/algo/repartition.service';
import {Crowder, Groupe} from '../../../model/Models';
import {Store} from '../../../services/data/store.service';

@Component({
  selector: 'notations-table',
  templateUrl: './notations-table.component.html',
  styleUrls: ['./notations-table.component.scss']
})
export class NotationsTableComponent implements OnInit {

  tableData = [];

  constructor(private store: Store) {
  }

  ngOnInit(): void {
    this.store.crowdersNotationGroupsSubject.subscribe(
      result => {
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
            resultAccumulator.push({
              crowderName: crowder.name, groupeName: groupe.name, pivots: groupe.pivots,
              altQuesRepANoter: NotationsTableComponent.creatQuestResp(crowder)
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
