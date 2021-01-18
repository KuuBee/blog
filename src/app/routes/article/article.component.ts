import { Component, OnInit } from '@angular/core';
import { UserApiService } from '@app/core/api/user-api.service';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss'],
})
export class ArticleComponent implements OnInit {
  constructor(private _UserApi: UserApiService) {}

  ngOnInit(): void {
    console.log('开始请求');
    // this._UserApi.create().subscribe((res) => {
    //   console.log(res);
    // });
  }
}
