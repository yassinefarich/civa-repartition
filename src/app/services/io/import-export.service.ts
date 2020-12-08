import {Injectable} from '@angular/core';
import * as XLSX from 'xlsx';
import {DataTable} from '../../model/Models';

@Injectable({
  providedIn: 'root'
})
export class ImportExportService {

  private dynamicDownload: HTMLElement = null;
  private dynamicImport: HTMLElement = null;

  constructor() {
  }

  public async excelToJson(file: any): Promise<DataTable> {
    /* read workbook */
    const bstr: string = file.target.result;
    const wb: XLSX.WorkBook = XLSX.read(bstr, {type: 'binary'});

    /* grab first sheet */
    const wsname: string = wb.SheetNames[0];
    const ws: XLSX.WorkSheet = wb.Sheets[wsname];

    /* save data */
    return (XLSX.utils.sheet_to_json(ws, {header: 1})) as DataTable;
  }

  public aoaToExcel(exportData: any, type: string): void {
    const worksheet = XLSX.utils.aoa_to_sheet(exportData);
    const workbook = {Sheets: {'data': worksheet}, SheetNames: ['data']};
    let fileName = `crowders_${type}_${new Date().getTime()}.xlsx`;
    XLSX.writeFile(workbook, fileName, {bookType: 'xlsx'});
  }

  public aoaToCSV(exportData: any, type: string): void {
    const worksheet = XLSX.utils.aoa_to_sheet(exportData);
    const workbook = {Sheets: {'data': worksheet}, SheetNames: ['data']};
    let fileName = `crowders_${type}_${new Date().getTime()}.csv`;
    XLSX.writeFile(workbook, fileName, {bookType: 'csv'});
  }

  public exportJsonFile(fileName: string, jsonString: string) {
    if (!this.dynamicDownload) {
      this.dynamicDownload = document.createElement('a');
    }
    const element = this.dynamicDownload;
    element.setAttribute('href', `data:text/json;charset=utf-8,${encodeURIComponent(jsonString)}`);
    element.setAttribute('download', fileName);
    const event = new MouseEvent('click');
    element.dispatchEvent(event);
  }

}
