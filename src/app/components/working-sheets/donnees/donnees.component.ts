import {Component, OnInit} from '@angular/core';
import {CrowdersDispatcherService} from '../../../services/crowders-dispatcher.service';

@Component({
  selector: 'app-donnees',
  templateUrl: './donnees.component.html',
  styleUrls: ['./donnees.component.scss']
})
export class DonneesComponent implements OnInit {


  crowders: any[] = [];
  pivots: any[] = [];
  propositions: any[] = [];

  constructor(private dispatcherService: CrowdersDispatcherService) {
  }

  ngOnInit(): void {
    this.dispatcherService
      .crowders.subscribe(
      data => this.crowders = data
    );
    this.dispatcherService
      .pivots.subscribe(
      data => this.pivots = data
    );
    this.dispatcherService
      .propositions.subscribe(
      data => this.propositions = data
    );

    if (this.crowders.length <= 0) {
      this.dispatcherService.refreshDataFromStorage();
    }

  }

}