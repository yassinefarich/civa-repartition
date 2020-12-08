import {Component, OnInit} from '@angular/core';
import {TypesDeTable} from '../table-de-crowders/table-de-crowders.component';

@Component({
  selector: 'repartitions',
  templateUrl: './repartitions.component.html',
  styleUrls: ['./repartitions.component.scss']
})
export class RepartitionsComponent implements OnInit {

  typesDeTable: typeof TypesDeTable = TypesDeTable;

  constructor() {
  }

  ngOnInit(): void {
  }

}
