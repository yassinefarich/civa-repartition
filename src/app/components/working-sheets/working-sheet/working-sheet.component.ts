import {Component, OnInit} from '@angular/core';
import {NavigationEnd, Router} from '@angular/router';
import {Store} from '../../../services/data/store.service';

@Component({
  selector: 'app-working-sheet',
  templateUrl: './working-sheet.component.html',
  styleUrls: ['./working-sheet.component.scss']
})
export class WorkingSheetComponent implements OnInit {

  nbrDeCrowders: number = 0;
  nbrDePivots: number = 0;

  isData = false;

  constructor(private store: Store, private router: Router) {}

  ngOnInit(): void {
    this.store.crowders.subscribe(data => this.nbrDeCrowders = data.length);
    this.store.pivots.subscribe(data => this.nbrDePivots = data.length);

    this.router.events.subscribe(
      e => {
        if (e instanceof NavigationEnd) {
          this.isData = e.url.includes('donnees');
        }
      }
    );
  }

}
