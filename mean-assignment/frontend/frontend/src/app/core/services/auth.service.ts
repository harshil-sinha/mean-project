import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  apiUrl = 'http://localhost:5000/api/auth';


  constructor(private http: HttpClient) { }

  login(data: any) {
    return this.http.post(
      `${this.apiUrl}/login`,
      data
    )
  }

  saveToken(token: string) {
    localStorage.setItem('token', token);
  }

  getToken(){
    return localStorage.getItem('token');
  }

  logout() {
    localStorage.removeItem('token');
  }

  isLoggedIn(){
    return !!this.getToken();
  }
}
