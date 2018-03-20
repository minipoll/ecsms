import { Component, OnInit} from '@angular/core';
import { Router }            from '@angular/router';
import { MatTableDataSource, MatSort} from '@angular/material';
import { SelectionModel } from '@angular/cdk/collections';
import { ReportService } from '../report.service';
import { ExcelService } from '../excel.service';
import { Condition } from '../condition';
import Utils from '../utils'

@Component({
  selector: 'app-request-release',
  templateUrl: './request-release.component.html',
  styleUrls: [ '../app.component.css' ]
})
export class RequestReleaseComponent implements OnInit {

  model = new Condition();

  displayedColumns1= ['reqno', 'good', 'goodn', 'size', 'mark',
                      'unit', 'wgt', 'expdateF', 'lotno1', 'lotno2',
                      'rmno', 'outq', 'reqyn' ,'smsdate'];
  displayedColumns2= ['select','good', 'goodn', 'size', 'unit', 'wgt',
                      'expdateF', 'expcnt', 'lotno1', 'lotno2', 'rmno',
                      'blno', 'entno', 'brand' ,'prodateF','ctno',
                      'grade', 'estno', 'org'];
  requestData;
  stockData;

  constructor(
       private reportService : ReportService,
       private excelService : ExcelService,
   ){}

  convertDate(){
    // var result = Utils.convertDate(this.model.reqDt);
    // this.model.reqDt = result;
  }
  getReport():void{
    this.reportService.getInventory('inventory',this.model)
      .then(data => this.requestData = data);
  }
  ngOnInit(): void {
    this.model.cust = JSON.parse(localStorage.getItem('currentUser')).CUST;
    this.model.reqDt = Utils.convertDate(Utils.today());
    this.model.lotno1 = "";
    this.model.goodn = "";
    this.model.org = "";
    this.model.blno = "";
    this.model.ctno = "";
    this.getInventory();
  }

  getInventory():void{
    if(!this.model.reqDt || this.model.reqDt.length < 8){
      return;
    }

    this.retrieveRequestRelease();
    this.requestStock();
  }

  choiceItem(item :any){
    if(this.requestData && this.requestData.length > 0){
      for (var i = 0; i < this.requestData.length; i++) {
        var good = this.requestData[i];
        if(item.GOOD == good['GOOD'] &&
            item.RMNO == good['RMNO'] &&
            item.LOTNO1 == good['LOTNO1'] &&
            item.LOTNO2 == good['LOTNO2'] &&
            item.BLNO == good['BLNO'] &&
            item.CTNO == good['CTNO'] &&
            item.BRAND == good['BRAND'] &&
            item.GRADE == good['GRADE'] &&
            item.ESTNO == good['ESTNO'] &&
            item.ENTNO == good['ENTNO'] &&
            item.IODT == good['IODT'] ){
              alert('이미등록된 물품입니다.');
             return;
        }
      }
    }


    item.cust = JSON.parse(localStorage.getItem('currentUser')).CUST;
    item.REQDT = this.model.reqDt;
    item.CRUR = JSON.parse(localStorage.getItem('currentUser')).ID;
    item.UPUR = JSON.parse(localStorage.getItem('currentUser')).ID;
    if(this.requestData && this.requestData.length > 0){
      this.requestData = this.requestData.concat(item);
    }else{
      this.requestData = new Array(item);
    }


    // this.reportService.getInventory('requestGood',item)
    //   .then(data => {
    //     if(!data || data.length == 0){
    //
    //       alert('해당하는 물품정보가 없습니다.');
    //       return;
    //     }
    //     this.requestData = this.requestData.concat(data);
    // });
  }

  retrieveRequestRelease(){
    this.model.SEND = '';
    this.model.SEND2 = '';
    this.model.PLATENO = '';
    this.model.RMK = '';
    this.reportService.getInventory('retrieveRequestRelease',this.model)
      .then(data => {
        this.requestData = data;
        if(data && data.length > 0){

          this.model.SEND = data[0].SEND;
          this.model.SEND2 = data[0].SEND2;
          this.model.PLATENO = data[0].PLATENO;
          this.model.RMK = data[0].RMK;
        }
      });
  }

  requestStock(){
    this.reportService.getInventory('requestRelease',this.model)
      .then(data => this.stockData = data);
  }

  saveRequest(){
    if(!this.requestData || this.requestData.length == 0){
      alert('저장할 데이터가 없습니다.');
      return;
    }
    for (var i = 0; i < this.requestData.length; i++) {
      var good = this.requestData[i];
      good['SEND'] = this.model.SEND;
      good['SEND2'] = this.model.SEND2;
      good['PLATENO'] = this.model.PLATENO;
      good['RMK'] = this.model.RMK;
    }
    this.reportService.saveRequestRelease('saveRequestRelease',this.model,this.requestData)
      .then(data => {
        alert('저장되었습니다');
        this.requestData = data;
    });
  }

  exportExcel(){
    var cols:string[] = ['REQNO', 'GOOD','GOODN','SIZE','MARK','UNIT','WGT','PRODATE_F','LOTNO1','LOTNO2'
    ,'RMNO','OUTQ','REQYN','SMSDATE'];
    this.excelService.exportAsExcelFile(this.requestData,cols,"거래내역");
  }

}
