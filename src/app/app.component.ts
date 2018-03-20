import { Component } from '@angular/core';
import {
  Router,
  Event as RouterEvent,
  NavigationStart,
  NavigationEnd,
  NavigationCancel,
  NavigationError,
} from '@angular/router'
import { AuthService } from './auth.service';
import { ReportService } from './report.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
   loading: boolean = false;
   shop:string;
   co:string;
   seledtedIndex:number;
   constructor(
    private router: Router,
    public authService: AuthService,
  ) {
    this.authService.getShop().then(res =>
    {
      console.log(res);
        this.shop = res[0].CO;
    });
    router.events.subscribe((event: RouterEvent) => {
      this.refreshToken(event);
      this.updateLoadingBar(event);
      if(localStorage.getItem('currentUser')){
        this.co = JSON.parse(localStorage.getItem('currentUser')).CO;
      }else{
        this.co = "";
      }
    });
  }

  private refreshToken(event: RouterEvent): void {
     if (event instanceof NavigationStart && this.authService.isLoggedIn()) {
       this.authService.refresh().catch(response => null);
     }
  }


  private updateLoadingBar(event: RouterEvent): void { //3
    if (event instanceof NavigationStart) {
      this.loading = true;
    }
    if (event instanceof NavigationEnd
      || event instanceof NavigationCancel
      || event instanceof NavigationError) {
      this.loading = false;
    }
  }
}
