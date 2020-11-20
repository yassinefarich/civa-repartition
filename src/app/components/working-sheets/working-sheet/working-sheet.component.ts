import {Component, OnInit} from '@angular/core';
import {CrowdersDispatcherService} from '../../../services/crowders-dispatcher.service';
import {NavigationEnd, Router} from '@angular/router';

@Component({
  selector: 'app-working-sheet',
  templateUrl: './working-sheet.component.html',
  styleUrls: ['./working-sheet.component.scss']
})
export class WorkingSheetComponent implements OnInit {

  nbrDeCrowders: number = 0;
  nbrDePivots: number = 0;

  isData = false;

  constructor(private dispatcherService: CrowdersDispatcherService,
              private router: Router) {
  }

  ngOnInit(): void {
    this.dispatcherService.crowders
      .subscribe(data => this.nbrDeCrowders = data.length);

    this.dispatcherService.pivots
      .subscribe(data => this.nbrDePivots = data.length);
    this.router.events.subscribe(
      e => {
        if (e instanceof NavigationEnd) {
          this.isData = e.url.includes('donnees');
        }

      }
    );
  }

}
