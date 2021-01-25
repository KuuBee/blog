import { Injectable } from '@angular/core';

import omit from 'lodash/omit';
import omitBy from 'lodash/omitBy';
import isNil from 'lodash/isNil';

@Injectable({
  providedIn: 'root',
})
export class AppUtilsService {
  constructor() {}
  omit<T extends { [key: string]: any }, K extends keyof T>(
    object: T | null | undefined,
    ...paths: K[]
  ) {
    return omit(object, paths);
  }
  removeNil(data: { [key: string]: any } | any[]) {
    return omitBy<any>(data, isNil);
  }
}
