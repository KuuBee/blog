import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiBase, ApiType } from '.';

export namespace TagApiType {
  export namespace Response {
    export type Index = ApiType.SuccessResponse<IndexData[]>;
    export type Info = ApiType.SuccessResponse<InfoData>;
    export interface IndexData {
      tagId: number;
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
export class TagApiService extends ApiBase {
  constructor(private _http: HttpClient) {
    super('/tag');
  }
  index() {
    return this._http.get<TagApiType.Response.Index>(this._baseUrl);
  }
  info(id: string | number) {
    return this._http.get<TagApiType.Response.Info>(`${this._baseUrl}/${id}`);
  }
}
