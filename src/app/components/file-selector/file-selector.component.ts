import {Component, Input, OnInit} from '@angular/core';
import {ExcelFileToJsonService} from '../../services/excel-file-to-json.service';
import {StorageDataTypeKeys} from '../../model/Models';


@Component({
  selector: 'app-file-selector',
  templateUrl: './file-selector.component.html',
  styleUrls: ['./file-selector.component.scss']
})
export class FileSelectorComponent implements OnInit {

  @Input() name: string;
  @Input() icon: string;
  @Input() datatype: StorageDataTypeKeys;

  fileName: string = '';
  isSucess: boolean = false;

  constructor(private excelFileToJsonService: ExcelFileToJsonService) {
  }

  ngOnInit(): void {
  }

  onFileChange(evt: any, dataType: StorageDataTypeKeys) {
    /* wire up file reader */
    const target: DataTransfer = <DataTransfer> (evt.target);
    if (target.files.length !== 1) {
      throw new Error('Cannot use multiple files');
    }
    const reader: FileReader = new FileReader();
    console.log('Type' + this.datatype);
    reader.onload = v => this.excelFileToJsonService.excelToJson(dataType, v)
      .then(
        result => {
          this.isSucess = true;
        }
      );

    this.fileName = target.files.item(0).name;

    console.log(target.files);
    reader.readAsBinaryString(target.files[0]);
  }

}
