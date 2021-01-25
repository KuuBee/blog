import { Component, OnInit } from '@angular/core';
import { UserApiService } from '@app/core/api/user-api.service';
import { AppCryptoService } from '@app/shared/services/app-crypto.service';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss'],
})
export class ArticleComponent implements OnInit {
  constructor(
    private _UserApi: UserApiService,
    private _appCryptoService: AppCryptoService
  ) {}

  ngOnInit(): void {
    const key = this._appCryptoService.generateKey();
    const encryptRes = this._appCryptoService.aesEncrypt('111', key);
    const decryptRes = this._appCryptoService.aesDecrypt(encryptRes, key);
    console.log(encryptRes);
    console.log(decryptRes);

    this._UserApi.test().subscribe((res) => {
      console.log(res);
    });
  }
}
