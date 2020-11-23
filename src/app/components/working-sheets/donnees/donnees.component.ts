import {Component, OnInit} from '@angular/core';
import {CrowdersDispatcherService} from '../../../services/crowders-dispatcher.service';
import {Crowder, Pivot, PivotAlternative} from '../../../model/Models';

@Component({
  selector: 'app-donnees',
  templateUrl: './donnees.component.html',
  styleUrls: ['./donnees.component.scss']
})
export class DonneesComponent implements OnInit {


  crowders: Crowder[] = [];
  pivots: Pivot[] = [];
  propositions: PivotAlternative[] = [];

  constructor(private dispatcherService: CrowdersDispatcherService) {
  }

  ngOnInit(): void {
    this.dispatcherService
      .crowders.subscribe(
      data => this.crowders = data
    );
    this.dispatcherService
      .pivots.subscribe(
      data => {
        this.pivots = data;
        this.propositions = DonneesComponent.getPropositionFromPivots(this.pivots);
      }
    );
    this.dispatcherService
      .propositions.subscribe(
      data => this.propositions = data
    );

    if (this.crowders.length <= 0) {
      this.dispatcherService.refreshDataFromStorage();
    }

  }

  private static getPropositionFromPivots(pivots: Pivot[]): any[] {
    return pivots.flatMap(
      pivot =>
        pivot.questionAlternative.concat(pivot.reponseAlternatives)
    );
  }
}
