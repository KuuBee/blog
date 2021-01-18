import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor() {}
  get authorizationToken() {
    const token = localStorage.token ?? '';
    return `Bearer ${token}`;
  }
}
