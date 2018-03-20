import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from './auth.guard';

import { Error404Component } from './error404/error404.component';
import { WelcomeComponent }  from './welcome/welcome.component';
import { LoginComponent } from './login/login.component';
import { NoticeComponent }  from './notice/notice.component';
import { InventoryReport1Component }  from './inventory-report1/inventory-report1.component';
import { InventoryReport2Component }  from './inventory-report2/inventory-report2.component';
import { InvoiceReportComponent }  from './invoice-report/invoice-report.component';
import { TransactionalReportComponent }  from './transactional-report/transactional-report.component';
import { TransactionalStatementsComponent }  from './transactional-statements/transactional-statements.component';
import { RequestReleaseComponent} from './request-release/request-release.component';
import { ChangePasswordComponent } from './change-password/change-password.component';

const routes: Routes = [
  { path: '',  component: WelcomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'notice',  canActivate: [AuthGuard],
    children: [
      { path: '', component: NoticeComponent },
    ]
  },
  { path: 'report',  canActivate: [AuthGuard],
    children: [
      { path: 'inventory-report1',  component: InventoryReport1Component },
      { path: 'inventory-report2',  component: InventoryReport2Component },
      { path: 'invoice-report',  component: InvoiceReportComponent },
      { path: 'transactional-statements',  component: TransactionalStatementsComponent },
      { path: 'transactional-report',  component: TransactionalReportComponent },
      { path: 'request-release',  component: RequestReleaseComponent },
      { path: 'change-password',  component: ChangePasswordComponent },
    ]
  },

  { path: '**', component: Error404Component },
];

@NgModule({
  imports: [ RouterModule.forRoot(routes, {useHash: true}) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
