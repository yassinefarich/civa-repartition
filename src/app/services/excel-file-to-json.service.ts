import {Injectable} from '@angular/core';
import * as XLSX from 'xlsx';
import {DataTable} from '../model/Models';

@Injectable({
  providedIn: 'root'
})
export class ExcelFileToJsonService {

  constructor() {
  }

  public async excelToJson(file: any): Promise<DataTable> {
    console.log(file);
    /* read workbook */
    const bstr: string = file.target.result;
    const wb: XLSX.WorkBook = XLSX.read(bstr, {type: 'binary'});

    /* grab first sheet */
    const wsname: string = wb.SheetNames[0];
    const ws: XLSX.WorkSheet = wb.Sheets[wsname];

    /* save data */
    return (XLSX.utils.sheet_to_json(ws, {header: 1})) as DataTable;
  }

}
