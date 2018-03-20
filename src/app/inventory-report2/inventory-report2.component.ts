import { Component, OnInit} from '@angular/core';
import { Router }            from '@angular/router';
import { MatDialog} from '@angular/material';
import { PrintDialogComponent} from '../print-dialog/print-dialog.component';
import { ReportService } from '../report.service';
import { ExcelService } from '../excel.service';
import { Condition } from '../condition';
import Utils from '../utils'

@Component({
  selector: 'my-inventoryReport2',
  templateUrl: './inventory-report2.component.html',
  styleUrls: [ '../app.component.css' ]
})
export class InventoryReport2Component implements OnInit{
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
  displayedColumns = ['goodn', 'size', 'unit', 'invQ','invW', 'iodt', 'lotno2' ,'blno','entyn',
                      'entdate', 'expdateF', 'diff', 'org', 'dd','brand', 'ctno'];
  sortedData;
  INV_Q:number = 0;
  INV_W:number = 0;
  constructor(
    private router: Router,
    private reportService : ReportService,
    private excelService:ExcelService,
    public dialog: MatDialog
) { }

  getReport():void{
    this.model.toDt = this.model.fromDt;
    this.reportService.getInventory('inventory',this.model)
      .then(data => {
        console.log(data);
        this.sortedData = data;
        this.INV_Q = 0;
        this.INV_W = 0;
        for (var i = 0; i < this.sortedData.length; i++) {
             this.INV_Q += Number(this.sortedData[i].INV_Q.toString().replace(/,/g, ''));
             this.INV_W += Number(this.sortedData[i].INV_W.toString().replace(/,/g, ''));
        }
        this.INV_W = Number(this.INV_W.toFixed(2));
      });
  }
  ngOnInit(): void {
    this.model.cust = JSON.parse(localStorage.getItem('currentUser')).CUST;
    this.model.CUSTNM = JSON.parse(localStorage.getItem('currentUser')).CO;
    this.model.fromDt = Utils.today();
    this.model.blno = "";
    this.model.goodn = "";
    this.model.org = "";
    this.model.ent1 = "0";
    this.model.ent2 = "0";
    this.model.lotno1 = "";
  }

  public openPrint():void{
       // let filename = 'mypdf.pdf';
       // FileSaver.saveAs(res, filename);
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
    var cols:string[] = ['GOODN','SIZE','UNIT','INV_Q','INV_W',
    'LOTNO1','LOTNO2','BLNO','ENTNM','ENTDATE','EXPDATE_F','EXP_DIFF','ORG', 'ESTNO', 'BRAND', 'CTNO'];
    this.excelService.exportAsExcelFile(this.sortedData,cols,"재고현황(2)");
  }

}
