import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CommentService {
  constructor() {
    this.mainObs$ = new Subject();
  }
  mainObs$: Subject<any>;
  commentUpdate() {
    this.mainObs$.next('');
  }
}
