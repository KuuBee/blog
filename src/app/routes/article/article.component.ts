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
    // const key = this._appCryptoService.generateKey();
    // const encryptRes = this._appCryptoService.aesEncrypt('2', key);
    // const decryptRes = this._appCryptoService.aesDecrypt(encryptRes, key);
    // console.log('encryptRes:', encryptRes);
    // console.log('decryptRes:', decryptRes);
    // console.log('rsa:', this._appCryptoService.rsaEncrypt('222'));

    this._UserApi.test().subscribe((res) => {
      console.log(res);
    });
    // this._UserApi.test2().subscribe((res) => {
    //   console.log(res);
    // });
  }
}
