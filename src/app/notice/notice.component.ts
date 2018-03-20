import { Component, OnInit } from '@angular/core';

import { Notice } from '../notice';
import { NoticeService } from '../notice.service';

@Component({
  selector: 'my-notice',
  templateUrl: './notice.component.html',
  styleUrls: [ './notice.component.css' ]
})
export class NoticeComponent implements OnInit {

  notices: Notice[] = [];
  reportData:Object;
  constructor(private noticeService: NoticeService) { }

  ngOnInit(): void {
    //this.noticeService.getReport();
    this.noticeService.getNotices()
      .then(notices => this.notices = notices);
  }
}
