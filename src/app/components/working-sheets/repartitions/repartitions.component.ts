import {Component, OnInit} from '@angular/core';
import {GroupsTableType} from '../groups-table/groups-table.component';

@Component({
  selector: 'repartitions',
  templateUrl: './repartitions.component.html',
  styleUrls: ['./repartitions.component.scss']
})
export class RepartitionsComponent implements OnInit {

  groupsTableType: typeof GroupsTableType = GroupsTableType;

  constructor() {
  }

  ngOnInit(): void {
  }

}
