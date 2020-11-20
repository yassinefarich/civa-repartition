import {Component, OnInit} from '@angular/core';
import {CrowderTableType} from '../../crowders-table/crowders-table.component';
import {GroupsTableType} from '../../groups-table/groups-table.component';
import {CrowdersDispatcherService} from '../../../services/crowders-dispatcher.service';

@Component({
  selector: 'app-groups',
  templateUrl: './groups.component.html',
  styleUrls: ['./groups.component.scss']
})
export class GroupsComponent implements OnInit {

  crowderTableType: typeof CrowderTableType = CrowderTableType;
  groupsTableType: typeof GroupsTableType = GroupsTableType;

  constructor(private dispatcherService: CrowdersDispatcherService) {
  }

  ngOnInit(): void {

  }

}
