import { Component, OnInit,ViewChild} from '@angular/core';
import { Router }            from '@angular/router';
import { MatTableDataSource, MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { ReportService } from '../report.service';
import { ExcelService } from '../excel.service';

import { PrintDialogComponent} from '../print-dialog/print-dialog.component';
import { Condition } from '../condition';
import * as FileSaver from 'file-saver';
import Utils from '../utils'

@Component({
  selector: 'my-inventoryReport1',
  templateUrl: './inventory-report1.component.html',
  styleUrls: [ '../app.component.css' ]
})
export class InventoryReport1Component implements OnInit{
  model = new Condition();
  ents1 = [
    {value: '0', viewValue: '포함'},
    {value: '1', viewValue: '제외'},
    {value: '2', viewValue: '일치'}
  ];
  ents2 = [
    {value: '0', viewValue: '모두'},
    {value: '2', viewValue: '통관'},
    {value: '1', viewValue: '미통관'},
    {value: '3', viewValue: '부분통관'}
  ];
  displayedColumns = ['goodn', 'size', 'unit', 'bdayQ', 'tdayInQ',
                      'tdayOutQ', 'invQ', 'bdayW', 'tdayInW', 'tdayOutW',
                      'invW', 'iodt', 'lotno2' ,'blno','entyn',
                      'entdate', 'expdateF', 'diff', 'org', 'dd',
                      'brand', 'ctno'];
  sortedData;
  BDAY_Q:number = 0;
  TDAY_IN_Q:number = 0;
  TDAY_OUT_Q:number = 0;
  INV_Q:number = 0;
  BDAY_W:number = 0;
  TDAY_IN_W:number = 0;
  TDAY_OUT_W:number = 0;
  INV_W:number = 0;
  constructor( private router: Router,
    private reportService : ReportService,
    private excelService:ExcelService,
    public dialog: MatDialog,
  ) { }

  getReport():void{
    this.reportService.getInventory('inventory',this.model)
      .then(data => {
        this.sortedData = data;
        this.BDAY_Q = 0;
        this.TDAY_IN_Q = 0;
        this.TDAY_OUT_Q = 0;
        this.INV_Q = 0;
        this.BDAY_W = 0;
        this.TDAY_IN_W = 0;
        this.TDAY_OUT_W = 0;
        this.INV_W = 0;
        for (var i = 0; i < this.sortedData.length; i++) {
             this.BDAY_Q += Number(this.sortedData[i].BDAY_Q.toString().replace(/,/g, ''));
             this.TDAY_IN_Q += Number(this.sortedData[i].TDAY_IN_Q.toString().replace(/,/g, ''));
             this.TDAY_OUT_Q += Number(this.sortedData[i].TDAY_OUT_Q.toString().replace(/,/g, ''));
             this.INV_Q += Number(this.sortedData[i].INV_Q.toString().replace(/,/g, ''));
             this.BDAY_W += Number(this.sortedData[i].BDAY_W.toString().replace(/,/g, ''));
             this.TDAY_IN_W += Number(this.sortedData[i].TDAY_IN_W.toString().replace(/,/g, ''));
             this.TDAY_OUT_W += Number(this.sortedData[i].TDAY_OUT_W.toString().replace(/,/g, ''));
             this.INV_W += Number(this.sortedData[i].INV_W.toString().replace(/,/g, ''));
        }
        this.BDAY_W = Number(this.BDAY_W.toFixed(2));
        this.TDAY_IN_W = Number(this.TDAY_IN_W.toFixed(2));
        this.TDAY_OUT_W = Number(this.TDAY_OUT_W.toFixed(2));
        this.INV_W = Number(this.INV_W.toFixed(2));
      });
  }
  ngOnInit(): void {
    this.model.cust = JSON.parse(localStorage.getItem('currentUser')).CUST;
    this.model.CUSTNM = JSON.parse(localStorage.getItem('currentUser')).CO;
    this.model.fromDt = Utils.firstDayOfMonth();
    this.model.toDt = Utils.today();
    this.model.blno = "";
    this.model.goodn = "";
    this.model.org = "";
    this.model.ent1 = "0";
    this.model.ent2 = "0";
    this.model.lotno1 = "";
  }

  public openPrint():void{
       var dialogRef = this.dialog.open(PrintDialogComponent, {
        width: '100%',
        data: {
          serviceId:'inventory-report1',
          model:this.model
        }
      });

      dialogRef.afterClosed().subscribe(result => {
        console.log('The dialog was closed');

      });
  }

  public exportExcel(){
    var cols:string[] = ['GOODN','SIZE','UNIT','BDAY_Q','TDAY_IN_Q','TDAY_OUT_Q','INV_Q','BDAY_W','TDAY_IN_W','TDAY_OUT_W','INV_W',
    'LOTNO1','LOTNO2','BLNO','ENTNM','ENTDATE','EXPDATE_F','EXP_DIFF','ORG', 'ESTNO', 'BRAND', 'CTNO'];
    this.excelService.exportAsExcelFile(this.sortedData,cols,"재고현황(1)");
  }
}
