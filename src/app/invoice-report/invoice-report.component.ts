import { Component, OnInit} from '@angular/core';
import { Router }            from '@angular/router';
import { MatTableDataSource, MatSort,MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { PrintDialogComponent} from '../print-dialog/print-dialog.component';
import { ReportService } from '../report.service';
import { ExcelService } from '../excel.service';
import { Condition } from '../condition';
import {Sort} from '@angular/material';
import Utils from '../utils'

@Component({
  selector: 'my-invoiceReport',
  templateUrl: './invoice-report.component.html',
  styleUrls: [ '../app.component.css' ]
})
export class InvoiceReportComponent implements OnInit{
  model = new Condition();
  ents1 = [
    {value: '0', viewValue: '포함'},
    {value: '1', viewValue: '제외'},
    {value: '2', viewValue: '일치'}
  ];
  ents2 = [
    {value: '0', viewValue: '모두'},
    {value: '1', viewValue: '입고'},
    {value: '2', viewValue: '출고'},
    {value: '3', viewValue: '이입'},
    {value: '4', viewValue: '이출'}
  ];
  pdf:any = null;
  sortedData;
  IO_Q:number = 0;
  IO_W:number = 0;
  constructor(
    private reportService : ReportService,
    private excelService:ExcelService,
    public dialog: MatDialog) { }

  getReport():void{
    this.sortedData = null;
    this.reportService.getInventory('invoice',this.model)
      .then(data => {
        this.sortedData = data;
        this.IO_Q = 0;
        this.IO_W = 0;
        for (var i = 0; i < this.sortedData.length; i++) {
             this.IO_Q += Number(this.sortedData[i].IO_Q.toString().replace(/,/g, ''));
             this.IO_W += Number(this.sortedData[i].IO_W.toString().replace(/,/g, ''));
        }
      });
  }
  ngOnInit(): void {
    this.model.cust = JSON.parse(localStorage.getItem('currentUser')).CUST;
    this.model.CUSTNM = JSON.parse(localStorage.getItem('currentUser')).CO;
    this.model.fromDt = Utils.today();
    this.model.toDt = Utils.today();
    this.model.blno = "";
    this.model.goodn = "";
    this.model.org = "";
    this.model.ent2 = "0";
    this.model.keyG = "";
    this.model.lotno1 = "";
    this.model.SEND = "";
  }

  sortData(sort: Sort) {
    const data = this.sortedData.slice();
    if (!sort.active || sort.direction == '') {
      this.sortedData = data;
      return;
    }

    this.sortedData = data.sort((a, b) => {
      let isAsc = sort.direction == 'asc';
      switch (sort.active) {
        case 'goodn': return compare(a['GOODN'], b['GOODN'], isAsc);
        default: return 0;
      }
    });
  }



  public print():void{
    this.reportService.getReport('transactionalStatements',this.model).then(res =>{
            const blobUrl = URL.createObjectURL(res);
                  const iframe = document.createElement('iframe');
                  iframe.style.display = 'none';
                  iframe.src = blobUrl;
                  document.body.appendChild(iframe);
                  iframe.contentWindow.print();
    });
  }

  public openPrint():void{
       var dialogRef = this.dialog.open(PrintDialogComponent, {
        width: '100%',
        data: {
          serviceId:'invoice',
          model:this.model
        }
      });

      dialogRef.afterClosed().subscribe(result => {
        console.log('The dialog was closed');

      });
  }

  public openGegun(keyg:string):void{
     this.model.keyG = keyg;
     var dialogRef = this.dialog.open(PrintDialogComponent, {
      width: '100%',
      data: {
        serviceId:'invoceGegun',
        model:this.model
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');

    });
  }

  public exportExcel(){
    var cols:string[] = ['IODT','GOODN','SIZE','UNIT','GUBN_M','INV_Q','INV_W','WT_Q',
    'LOTNO1','LOTNO2','BLNO','PRODATE_F','EXPDATE_F','EXP_DIFF','ORG', 'ESTNO', 'BRAND', 'CTNO','SEND','CUST_S'];
    this.excelService.exportAsExcelFile(this.sortedData,cols,"입출내역");
  }

}

function compare(a, b, isAsc) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
