import { Injectable } from '@angular/core';
import { combineLatest, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { SearchListService } from '../../shared/services/search-list.service';

@Injectable({
  providedIn: 'root',
})
export class StartupService {
  constructor(private _searchList: SearchListService) {}
  load(): Promise<any> {
    return new Promise((resolve, reject) => {
      combineLatest([this._searchList.init()])
        .pipe(
          catchError((res) => {
            resolve(null);
            return throwError(res);
          })
        )
        .subscribe(
          (res) => {},
          () => reject(),
          () => resolve(null)
        );
    });
  }
}
