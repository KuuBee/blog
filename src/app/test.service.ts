import { Injectable } from '@angular/core';

@Injectable()
export class TestService {
  #_testNum = 0;
  get testNum() {
    return this.#_testNum;
  }
  addTestNum() {
    this.#_testNum += 1;
  }
}
