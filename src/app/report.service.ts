import { environment } from '../environments/environment';
import { Injectable }    from '@angular/core';
import { Headers, Http,RequestOptions,ResponseContentType } from '@angular/http';
import { Condition} from './condition';

import { HttpClient ,HttpHeaders} from '@angular/common/http';
import { UtilService } from './util.service';
import { ApiResponse } from './api-response';

@Injectable()
export class ReportService {

  private headers = new Headers({'Content-Type': 'application/json'});
  private headersPdf = new Headers({'Content-Type': 'application/json','Accept':'application/pdf'});
  private headers2 = new HttpHeaders({'Content-Type':'application/json; charset=utf-8'});
  constructor(
    private http: Http,
    private http2: HttpClient,
    private utilService: UtilService
  ) { }

  

  getInventory(service:string,condition:Condition): Promise<any[]> {
    this.setCondition(condition);
    var url = `${environment.apiBaseUrl}/report/`+service;
    return this.http2.post(url, JSON.stringify(condition),{headers:this.headers2})
               .toPromise()
               .then(this.utilService.checkSuccess)
               .then(response => {
                 return response.data;
               })
               .catch(this.utilService.handleApiError);
  }

  saveRequestRelease(service:string,condition:Condition,items): Promise<any[]> {

    this.setCondition(condition);
    var noticesUrl = `${environment.apiBaseUrl}/report/`+service;
    return this.http2.post(noticesUrl, JSON.stringify({condition:condition,items:items}),{headers:this.headers2})
               .toPromise()
               .then(this.utilService.checkSuccess)
               .then(response => {
                 return response.data;
               })
               .catch(this.utilService.handleApiError);
  }
  // getkk() {
  //   this.http.get('https://vadimdez.github.io/ng2-pdf-viewer/pdf-test.pdf', { responseType: 'arraybuffer' })
  //   .subscribe((file: ArrayBuffer) => {
  //     var k = new Uint8Array(file);
  //     console.log(k);
  //     // or directly passing ArrayBuffer
  //     // this.pdfSrc = file;
  //   });
  // }
  getReport(service:string,condition:Condition):Promise<any>{
    this.setCondition(condition);
    var url = `${environment.apiBaseUrl}/reports/`+service;
    var options = new RequestOptions({ headers: this.headersPdf });
    options.responseType = ResponseContentType.ArrayBuffer;
    return this.http
               .post(url, JSON.stringify(condition),options)
               .toPromise()
               .then(response => response.blob())
               .catch(this.utilService.handleApiError);
  }

  setCondition(condition:Condition){
    condition.entDate = this.convertDate(condition.entDate);
    condition.fromDt = this.convertDate(condition.fromDt);
    condition.toDt = this.convertDate(condition.toDt);
    condition.reqDt = this.convertDate(condition.reqDt);
    condition.lotno1 = this.convertDate(condition.lotno1);
  }

  convertDate(p:string):string {
    if(p == null){
      return "";
    }
    var timestamp = Date.parse(p)
    if (isNaN(timestamp)==false)
    {
      let date = new Date(p);
      var yyyy = date.getFullYear().toString();
      var mm = (date.getMonth()+1).toString();
      var dd  = date.getDate().toString();

      var mmChars = mm.split('');
      var ddChars = dd.split('');
      p = yyyy +  (mmChars[1]?mm:"0"+mmChars[0]) + (ddChars[1]?dd:"0"+ddChars[0])
    }
    return p;
  }

}
