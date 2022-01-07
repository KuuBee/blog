import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
// import { parse } from '@textlint/markdown-to-ast';
import { lexer } from 'marked';
@Injectable({
  providedIn: 'root',
})
export class MarkdownParserService {
  constructor(private _http: HttpClient) {}
  init() {
    // const url = 'https://autocode.icu/assets/markdown/1615969512395/index.md';
    // this._http
    //   .get(url, {
    //     responseType: 'arraybuffer',
    //   })
    //   .subscribe((res) => {
    //     const decode = new TextDecoder();
    //     const str = decode.decode(res);
    //     this._parser(str);
    //   });
    const tokens = lexer('**# 2*2[1__2__](22)*22x_2_22**');
    console.log(tokens);
  }
  private _parser(str: string) {
    const lines = str.split('\n').filter((item) => item);
    console.log(lines);
    for (let i = 0; i < str.split('\n').length; i++) {
      if (!str[i]) continue;
    }
  }
}
