import {Component, OnInit} from '@angular/core';
import {CrowdersDispatcherService} from '../../../services/crowders-dispatcher.service';

@Component({
  selector: 'app-working-sheet',
  templateUrl: './working-sheet.component.html',
  styleUrls: ['./working-sheet.component.scss']
})
export class WorkingSheetComponent implements OnInit {

  nbrDeCrowders: number = 0;
  nbrDePivots: number = 0;

  constructor(private dispatcherService: CrowdersDispatcherService) {
  }

  ngOnInit(): void {
    this.dispatcherService.crowders
      .subscribe(data => this.nbrDeCrowders = data.length);

    this.dispatcherService.pivots
      .subscribe(data => this.nbrDePivots = data.length);
  }

}
