import { Component, OnInit,Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { ReportService } from '../report.service';
import Utils from '../utils'

@Component({
  selector: 'app-print-dialog',
  templateUrl: './print-dialog.component.html',
  styleUrls: ['./print-dialog.component.css']
})
export class PrintDialogComponent implements OnInit {
  public innerHtml: SafeHtml;
  ngOnInit() {
  }

  constructor(
    public dialogRef: MatDialogRef<PrintDialogComponent>,
    private _sanitizer: DomSanitizer,
    private reportService : ReportService,
    @Inject(MAT_DIALOG_DATA) public data: any) {
       this.innerHtml = "리포트 조회중입니다.";
       this.reportService.getReport(data.serviceId,data.model).then(res =>
         {

           this.innerHtml = Utils.getPdfHtml(res,this._sanitizer);
         });

    }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
