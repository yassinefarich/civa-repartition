import {Component, OnInit} from '@angular/core';
import {CrowdersDispatcherService} from '../../services/crowders-dispatcher.service';
import {MessageService} from 'primeng/api';
import {DataSampleGenerator} from '../../misc/DataSampleGenerator';
import {StorageDataTypeKeys} from '../../model/Models';

@Component({
  selector: 'app-parametres',
  templateUrl: './parametres.component.html',
  styleUrls: ['./parametres.component.scss'],
  providers: [MessageService]
})
export class ParametresComponent implements OnInit {

  public dataType: typeof StorageDataTypeKeys = StorageDataTypeKeys;

  crowders: number = 120;
  pivots: number = 30;
  pprpoParPivot: number = 20;
  notParPivot: number = 30;

  constructor(private dispatcherService: CrowdersDispatcherService,
              private messageService: MessageService) {
  }

  ngOnInit(): void {
  }

  onGenerateSamples() {
    let dataSampleGen = new DataSampleGenerator();

    const crowders = dataSampleGen.generateCrowders(this.crowders);
    const pivots = dataSampleGen.generatePivots(this.pivots, this.pprpoParPivot);

    this.dispatcherService.setData(StorageDataTypeKeys.CROWDER, crowders);
    this.dispatcherService.setData(StorageDataTypeKeys.PIVOTS, pivots);
  }

  onGenerateGroups() {
    if (this.isValid()) {
      this.dispatcherService.dispatchGroups(this.pprpoParPivot, this.notParPivot);
      this.dispatcherService.dispatchNotationGroups(this.pprpoParPivot, this.notParPivot);
    }
  }

  onReinit() {
    this.dispatcherService.clearAll();
    this.messageService.add({severity: 'Error', summary: 'Service Message', detail: 'Via MessageService'});
  }

  isValid(): boolean {

    if (this.pprpoParPivot === undefined) {

    }

    if (this.notParPivot != undefined) {

    }

    return true;
  }

}
