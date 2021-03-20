import { Injectable } from '@angular/core';
import { filterXSS, IFilterXSSOptions } from 'xss';

@Injectable({
  providedIn: 'root',
})
// make love,no xss!
export class XssService {
  constructor() {}
  filterXSS(html: string, options?: IFilterXSSOptions): string {
    return filterXSS(html, options);
  }
}
