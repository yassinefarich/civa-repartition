import {Component, OnInit} from '@angular/core';
import {DispatcherService} from '../../services/dispatcher.service';
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

  constructor(private dispatcherService: DispatcherService,
              private messageService: MessageService) {
  }

  ngOnInit(): void {
  }

  onGenerateSamples() {
    let dataSampleGen = new DataSampleGenerator();
    this.dispatcherService.setData(StorageDataTypeKeys.CROWDER, dataSampleGen.generateCrowders(this.crowders));
    this.dispatcherService.setData(StorageDataTypeKeys.PIVOTS, dataSampleGen.generatePivots(this.pivots));
  }

  onGenerateGroups() {
    if (this.isValid()) {
      this.dispatcherService.dispatchGroups(this.pprpoParPivot, this.notParPivot);
      this.dispatcherService.dispatchNotationGroups(this.pprpoParPivot, this.notParPivot);
    }
  }

  onReinit() {
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
