import {Component, OnInit} from '@angular/core';
import {DispatcherService} from '../../../services/dispatcher.service';

@Component({
  selector: 'app-working-sheet',
  templateUrl: './working-sheet.component.html',
  styleUrls: ['./working-sheet.component.scss']
})
export class WorkingSheetComponent implements OnInit {


  nbrDeCrowders: number = 0;
  nbrDePivots: number = 0;

  nbrDeGroupsDeNotation: number = 0;
  nbrDeGroupsDeProposition: number = 0;

  nbrDeCrowdersParGrpDeNot: number = 0;
  nbrDeCrowdersParGrpPropo: number = 0;


  constructor(private dispatcherService : DispatcherService) {
    dispatcherService.crowders
      .subscribe(data => this.nbrDeCrowders = data.length)

    dispatcherService.pivots
      .subscribe(data => this.nbrDePivots = data.length)

  }

  ngOnInit(): void {
  }

}
