import { Component, OnInit } from '@angular/core';
import { ApiUserService } from '@app/core/api/api-user.service';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss'],
})
export class ArticleComponent implements OnInit {
  constructor(private _apiUser: ApiUserService) {}

  ngOnInit(): void {
    console.log('开始请求');
    // this._apiUser.create().subscribe((res) => {
    //   console.log(res);
    // });
  }
}
