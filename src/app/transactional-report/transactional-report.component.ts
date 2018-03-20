import { Component, OnInit,ViewChild} from '@angular/core';
import { Router }            from '@angular/router';
import { MatTableDataSource, MatSort,MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { ReportService } from '../report.service';
import { ExcelService } from '../excel.service';
import { PrintDialogComponent} from '../print-dialog/print-dialog.component';
import { Condition } from '../condition';
import * as FileSaver from 'file-saver';
import Utils from '../utils'

@Component({
  selector: 'my-transactionalReport',
  templateUrl: './transactional-report.component.html',
  styleUrls: [ '../app.component.css' ]
})
export class TransactionalReportComponent implements OnInit {
  @ViewChild(MatSort) sort: MatSort;
  model = new Condition();
  dataSource = new MatTableDataSource();
  sortedData;

  PRERCP:number = 0;
  TAMT:number = 0;
  RCPAMT:number = 0;
  constructor(
    private reportService : ReportService,
    private excelService : ExcelService,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    console.log(Utils.firstDayOfMonth(-6));
    this.model.cust = JSON.parse(localStorage.getItem('currentUser')).CUST;
    this.model.fromDt = Utils.firstDayOfMonth(-6);
    this.model.toDt = Utils.today();
    this.getReport();
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }
  getReport():void{
    this.reportService.getInventory('transactionalReport',this.model)
      .then(data =>{
        this.sortedData = data;
        this.PRERCP = 0;
        this.TAMT = 0;
        this.RCPAMT = 0;
        for (var i = 0; i < this.sortedData.length; i++) {
             this.PRERCP += Number(this.sortedData[i].PRERCP.toString().replace(/,/g, ''));
             this.TAMT += Number(this.sortedData[i].TAMT.toString().replace(/,/g, ''));
             this.RCPAMT += Number(this.sortedData[i].RCPAMT.toString().replace(/,/g, ''));
        }
      });
  }

  exportExcel(){
    var cols:string[] = ['IODT','GOODN','SIZE','UNIT','GUBN_M','INV_Q','INV_W','WT_Q',
    'LOTNO1','LOTNO2','BLNO','PRODATE_F','EXPDATE_F','EXP_DIFF','ORG', 'ESTNO', 'BRAND', 'CTNO','SEND','CUST_S'];
    this.excelService.exportAsExcelFile(this.sortedData,cols,"거래내역");
  }


}
