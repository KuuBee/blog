import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiBase, ApiType } from '.';

export namespace TagApiType {
  export namespace Response {
    export type Index = ApiType.SuccessResponse<IndexData[]>;
    export interface IndexData {
      tagId: number;
      content: string;
      count: number;
    }
  }
}

@Injectable({
  providedIn: 'root',
})
export class TagApiService extends ApiBase {
  constructor(private _http: HttpClient) {
    super('/tag');
  }
  index() {
    return this._http.get<TagApiType.Response.Index>(this._baseUrl);
  }
}
