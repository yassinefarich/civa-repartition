import {Injectable} from '@angular/core';
import * as XLSX from 'xlsx';
import {Observable, Subject} from 'rxjs';
import {DataTable} from '../model/types';
import {DATA_TYPE} from '../model/enums';
import {DispatcherService} from './dispatcher.service';

@Injectable({
  providedIn: 'root'
})
export class ExcelFileToJsonService {

  private wopts: XLSX.WritingOptions = {bookType: 'xlsx', type: 'array'};
  private fileName: string = 'SheetJS.xlsx';

  constructor(private dispatcherService: DispatcherService) {
  }

  public async excelToJson(type: DATA_TYPE, file: any): Promise<DataTable> {
    console.log(file);
    /* read workbook */
    const bstr: string = file.target.result;
    const wb: XLSX.WorkBook = XLSX.read(bstr, {type: 'binary'});

    /* grab first sheet */
    const wsname: string = wb.SheetNames[0];
    const ws: XLSX.WorkSheet = wb.Sheets[wsname];

    /* save data */
    let data = <DataTable> (XLSX.utils.sheet_to_json(ws, {header: 1}));

    this.dispatcherService.setData(type, data);
    console.log(data);

    return data;
  }

}
