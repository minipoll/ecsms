import { Injectable } from '@angular/core';
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';

const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
const EXCEL_EXTENSION = '.xlsx';

@Injectable()
export class ExcelService {

  constructor() { }

  public exportAsExcelFile(datas: any[],cols:string[], excelFileName: string): void {
    if(!datas || datas.length == 0){
        alert('저장 할 데이터가 업습니다.')
        return;
    }

    var json:any=[];
    for(var i in datas){
      var item:any = {};
      for(var j in cols){
        item[cols[j]] = datas[i][cols[j]];
      }
      json.push(item);
    }

    json = JSON.parse(JSON.stringify(json).split('"GOODN":').join('"상품명":'));
    json = JSON.parse(JSON.stringify(json).split('"SIZE":').join('"규격":'));
    json = JSON.parse(JSON.stringify(json).split('"UNIT":').join('"단위":'));
    json = JSON.parse(JSON.stringify(json).split('"BDAY_Q":').join('"전일수량":'));
    json = JSON.parse(JSON.stringify(json).split('"TDAY_IN_Q":').join('"입고수량":'));
    json = JSON.parse(JSON.stringify(json).split('"TDAY_OUT_Q":').join('"출고수량":'));
    json = JSON.parse(JSON.stringify(json).split('"INV_Q":').join('"재고수량":'));
    json = JSON.parse(JSON.stringify(json).split('"BDAY_W":').join('"전일중량":'));
    json = JSON.parse(JSON.stringify(json).split('"TDAY_IN_W":').join('"입고중량":'));
    json = JSON.parse(JSON.stringify(json).split('"TDAY_OUT_W":').join('"출고중량":'));
    json = JSON.parse(JSON.stringify(json).split('"INV_W":').join('"재고중량":'));
    json = JSON.parse(JSON.stringify(json).split('"LOTNO1":').join('"입고일자":'));
    json = JSON.parse(JSON.stringify(json).split('"LOTNO2":').join('"Lot No":'));
    json = JSON.parse(JSON.stringify(json).split('"BLNO":').join('"B/L No":'));
    json = JSON.parse(JSON.stringify(json).split('"ENTNM":').join('"통관여부":'));
    json = JSON.parse(JSON.stringify(json).split('"ENTDATE":').join('"통관일자":'));
    json = JSON.parse(JSON.stringify(json).split('"EXPDATE_F":').join('"유효일자":'));
    json = JSON.parse(JSON.stringify(json).split('"EXP_DIFF":').join('"잔여일수":'));
    json = JSON.parse(JSON.stringify(json).split('"ORG":').join('"원산지":'));
    json = JSON.parse(JSON.stringify(json).split('"ESTNO":').join('"가공공장":'));
    json = JSON.parse(JSON.stringify(json).split('"BRAND":').join('"브랜드":'));
    json = JSON.parse(JSON.stringify(json).split('"CTNO":').join('"C/T No":'));
    json = JSON.parse(JSON.stringify(json).split('"PRODATE_F":').join('"가공일자":'));
    json = JSON.parse(JSON.stringify(json).split('"IODT":').join('"거래일자":'));
    json = JSON.parse(JSON.stringify(json).split('"SEND":').join('"발송지":'));
    json = JSON.parse(JSON.stringify(json).split('"CUST_S":').join('"이체위탁자":'));
    json = JSON.parse(JSON.stringify(json).split('"GUBN_M":').join('"구분":'));

    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(json);
    const workbook: XLSX.WorkBook = { Sheets: { 'data': worksheet }, SheetNames: ['data']};
    const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'buffer' });
    this.saveAsExcelFile(excelBuffer, excelFileName);
  }

  private saveAsExcelFile(buffer: any, fileName: string): void {
    const data: Blob = new Blob([buffer], {
      type: EXCEL_TYPE
    });
    FileSaver.saveAs(data, fileName + '_' + new Date().getTime() + EXCEL_EXTENSION);
  }

}
interface LooseObject {
    [key: string]: any
}
