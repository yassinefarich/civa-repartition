import {Component, OnInit} from '@angular/core';
import {GroupsTableType} from '../groups-table/groups-table.component';

@Component({
  selector: 'app-groups',
  templateUrl: './groups.component.html',
  styleUrls: ['./groups.component.scss']
})
export class GroupsComponent implements OnInit {

  groupsTableType: typeof GroupsTableType = GroupsTableType;

  constructor() {
  }

  ngOnInit(): void {

  }

}
