import { Component, OnInit } from '@angular/core';
import { Router }            from '@angular/router';
import { ReportService } from '../report.service';
import { ExcelService } from '../excel.service';
import { Condition } from '../condition';
import { saveAs } from 'file-saver';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import Utils from '../utils'

@Component({
  selector: 'my-transactionalStatements',
  templateUrl: './transactional-statements.component.html',
  styleUrls: [ '../app.component.css' ]
})
export class TransactionalStatementsComponent implements OnInit {
  model = new Condition();
  pdf:any = null;
  src = "asset/pdf/mypdf.pdf";
  public innerHtml: SafeHtml;
  constructor(
    private reportService:ReportService,
    private excelService:ExcelService,
    private _sanitizer: DomSanitizer,
  ) { }

  ngOnInit(): void {
    this.model.cust = JSON.parse(localStorage.getItem('currentUser')).CUST;
    this.reportService.getInventory("lastClsYmd",this.model).then(res =>
    {
        if(res[0].CLSYMD){
          this.model.fromDt= res[0].CLSYMD;
        }else{
          this.model.fromDt= Utils.today();
        }
        this.getReport();
    });
  }

  public setInnerHtml(pdfurl: string) {
    this.innerHtml = this._sanitizer.bypassSecurityTrustHtml(
      "<object #someVar  data='" + pdfurl + "' type='application/pdf' class='embed-responsive-item' width='100%' height='1000px'>" +
        "Object " + pdfurl + " failed" +
        "</object>"
       // "<embed ng-src='"+pdfurl+ "' width='500' height='500' alt='pdf' pluginspage='http://www.adobe.com/products/acrobat/readstep2.html'>"
     );
  }

  public getReport():void{
     this.reportService.getReport('transactionalStatements',this.model).then(res =>{
        this.innerHtml = Utils.getPdfHtml(res,this._sanitizer);
     });
  }


}
