import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  apiUrl = 'http://localhost:5000/api/users';

  constructor(private http: HttpClient) {}

  getUsers(params?: any) {
    return this.http.get(
      this.apiUrl,
      { params }
    );
  }

  getStats() {
    return this.http.get(
      `${this.apiUrl}/stats`
    );
  }
}