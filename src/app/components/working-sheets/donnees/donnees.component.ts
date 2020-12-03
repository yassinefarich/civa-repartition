import {Component, OnInit} from '@angular/core';
import {Crowder, Pivot, PivotAlternative} from '../../../model/Models';
import {Store} from '../../../services/data/store.service';

@Component({
  selector: 'app-donnees',
  templateUrl: './donnees.component.html',
  styleUrls: ['./donnees.component.scss']
})
export class DonneesComponent implements OnInit {


  crowders: Crowder[] = [];
  pivots: Pivot[] = [];
  pivotsAlternatives: PivotAlternative[] = [];

  constructor(private store: Store) {
  }

  ngOnInit(): void {
    this.store.crowders.subscribe(
      crowders => this.crowders = crowders
    );

    this.store.pivots.subscribe(
      pivots => this.pivots = pivots
    );

    this.store.propositions.subscribe(
      proposition => this.pivotsAlternatives = proposition
    );

    if (this.crowders.length <= 0) {
      this.store.refreshDataFromStorage();
    }
  }

}
