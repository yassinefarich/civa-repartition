import {Component, Input, OnInit} from '@angular/core';
import {ExcelFileToJsonService} from '../../services/excel-file-to-json.service';
import {DataTable, StorageDataTypeKeys} from '../../model/Models';
import {CrowdersDispatcherService} from '../../services/crowders-dispatcher.service';


@Component({
  selector: 'app-file-selector',
  templateUrl: './file-selector.component.html',
  styleUrls: ['./file-selector.component.scss']
})
export class FileSelectorComponent implements OnInit {

  @Input() name: string;
  @Input() icon: string;
  @Input() datatype: StorageDataTypeKeys;
  isSucess = false;

  constructor(private excelFileToJsonService: ExcelFileToJsonService,
              private dispatcherService: CrowdersDispatcherService
  ) {
  }

  ngOnInit(): void {
  }

  onFileChange(evt: any, dataType: StorageDataTypeKeys): void {
    const target: DataTransfer = (evt.target) as DataTransfer;
    const reader: FileReader = new FileReader();
    reader.onload = file => this.onLoad(file, dataType);
    reader.readAsBinaryString(target.files[0]);
    evt.target.value = '';
  }

  onLoad(file: ProgressEvent<FileReader>, dataType: StorageDataTypeKeys): void {
    this.excelFileToJsonService.excelToJson(file)
      .then((data) => {
        this.dispatcherService.setData(dataType, this.transformData(data, dataType));
        this.isSucess = true;
      });
  }

  openFile(name: string): void {
    document.getElementById(name + '_id').click();
  }

  transformData(bruteData: DataTable, dataType: StorageDataTypeKeys): any[] {
    // Remove column names
    bruteData.shift();
    // Remove empty columns
    const dataTable = bruteData.filter(d => d.length > 1);

    if (dataType === StorageDataTypeKeys.CROWDER) {
      return dataTable
        .map(cr => {
          return {id: cr[0], name: cr[1]};
        });
    }

    if (dataType === StorageDataTypeKeys.PIVOTS) {
      return dataTable
        .map(pv => {
          return {id: pv[0], question: pv[1], reponse: pv[2]};
        });
    }
    return [];
  }

}
