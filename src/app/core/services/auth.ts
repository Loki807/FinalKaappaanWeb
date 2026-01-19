import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { LoginRequest } from '../../Types/login-request.type';
import { LoginResponse } from '../../Types/login-response.type';
import { ChangePasswordRequest } from '../../Types/change-password-request.type';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class Auth {

  private http = inject(HttpClient);
  private base = `${environment.apiBase}/auth`;

  login(data: LoginRequest): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.base}/login`, data);
  }

  changePassword(data: ChangePasswordRequest): Observable<any> {
    return this.http.post(`${this.base}/change-password`, data);
  }
  
}
