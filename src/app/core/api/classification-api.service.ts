import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { ApiBase, ApiType } from '.';

export namespace ClassificationApiType {
  export namespace Response {
    export type Index = ApiType.SuccessResponse<IndexData[]>;
    export type Info = ApiType.SuccessResponse<InfoData>;
    export interface IndexData {
      classificationId: number;
      content: string;
      count: number;
    }
    export interface InfoData extends Omit<IndexData, 'count'> {
      createdAt: string;
    }
  }
}

@Injectable({
  providedIn: 'root',
})
export class ClassificationApiService extends ApiBase {
  constructor(private _http: HttpClient) {
    super('/classification');
  }

  index() {
    return this._http.get<ClassificationApiType.Response.Index>(this._baseUrl);
  }

  info(id: string) {
    return this._http.get<ClassificationApiType.Response.Info>(
      `${this._baseUrl}/${id}`
    );
  }
}
