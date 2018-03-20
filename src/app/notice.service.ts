import { environment } from '../environments/environment';
import { Injectable }    from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Notice } from './notice';
import { UtilService } from './util.service';
import { ApiResponse } from './api-response';

@Injectable()
export class NoticeService {
  private apiBaseUrl = environment.apiBaseUrl;
  private noticesUrl = `${this.apiBaseUrl}/notices`;

  constructor(
    private http: HttpClient,
    private utilService: UtilService
  ) { }

  getNotices(): Promise<Notice[]> {
    return this.http.get<ApiResponse>(this.noticesUrl)
               .toPromise()
               .then(this.utilService.checkSuccess)
               .then(response => {
                 return response.data as Notice[]
               })
               .catch(this.utilService.handleApiError);
  }
}
