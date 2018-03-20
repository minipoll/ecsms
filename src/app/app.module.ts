import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule }    from '@angular/http';
import { HttpClientModule,HTTP_INTERCEPTORS} from '@angular/common/http';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatProgressBarModule,
         MatDatepickerModule,
         MatFormFieldModule,
         MatInputModule,
         MatTableModule,
         MatRadioModule,
         MatSelectModule,
         MatButtonModule,
         MatCheckboxModule,
         MatCardModule,
         MatSortModule,
         MatDialogModule} from '@angular/material'
import { MatMomentDateModule,MAT_MOMENT_DATE_FORMATS, MomentDateAdapter} from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';
import { AppComponent }        from './app.component';
import { LoginComponent } from './login/login.component';
import { WelcomeComponent }  from './welcome/welcome.component';
import { NoticeComponent }  from './notice/notice.component';
import { InventoryReport1Component }  from './inventory-report1/inventory-report1.component';
import { InventoryReport2Component }  from './inventory-report2/inventory-report2.component';
import { InvoiceReportComponent }  from './invoice-report/invoice-report.component';
import { TransactionalReportComponent }  from './transactional-report/transactional-report.component';
import { TransactionalStatementsComponent }  from './transactional-statements/transactional-statements.component';
import { PrintDialogComponent } from './print-dialog/print-dialog.component';

import { AuthGuard } from './auth.guard';
import { UtilService } from './util.service';
import { AuthService } from './auth.service';
import { NoticeService } from './notice.service';
import { ReportService } from './report.service';
import { RequestInterceptor } from './request-interceptor.service';
import { ExcelService } from './excel.service';

import { AppRoutingModule } from './app-routing.module';
import { Error404Component } from './error404/error404.component';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import { RequestReleaseComponent } from './request-release/request-release.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { SharedModule } from './shared/shared.module';

@NgModule({
  imports: [
    SharedModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    HttpClientModule,
    AppRoutingModule,
    MatProgressBarModule,
    MatTableModule,
    MatRadioModule,
    MatSelectModule,
    MatCardModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatDatepickerModule,
    MatMomentDateModule,
    MatButtonModule,
    MatDialogModule,
    MatCheckboxModule,
    MatSortModule,
  ],
  entryComponents:[
    PrintDialogComponent
  ],
  declarations: [
    AppComponent,
    LoginComponent,
    WelcomeComponent,
    NoticeComponent,
    InventoryReport1Component,
    InventoryReport2Component,
    InvoiceReportComponent,
    TransactionalReportComponent,
    TransactionalStatementsComponent,
    Error404Component,
    PrintDialogComponent,
    RequestReleaseComponent,
    ChangePasswordComponent
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: RequestInterceptor,
      multi: true,
    },
    AuthGuard,
    UtilService,
    AuthService,
    NoticeService,
    ReportService,
    ExcelService,
    {provide: MAT_DATE_LOCALE, useValue: 'ko-kr'},
    {provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE]},
    {provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS},
 ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }


/*
Copyright 2017 Google Inc. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/
