import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Storage } from '../../Store/storage';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { CreateUserRequest, UserDto } from '../../Types/user';

@Injectable({ providedIn: 'root' })
export class UserService {

  private http = inject(HttpClient);
  private storage = inject(Storage);

  private baseUrl = `${environment.apiBase}/admin/tenant`;

  getTenantUsers(): Observable<any[]> {
    const tid = this.storage.getTenantId();
    return this.http.get<any[]>(`${this.baseUrl}/user/all/${tid}`);
  }

  getUserById(id: string): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/user/${id}`);
  }
deleteUser(id: string) {
  return this.http.delete(`${this.baseUrl}/user/delete/${id}`);
  // or use the correct backend route you have
}


   // 🧾 Create new tenant
createUser(req: CreateUserRequest) {
  return this.http.post(`${this.baseUrl}/user/create`, req);
}
 updateUser(id: string, req: any) {
  return this.http.put(`${this.baseUrl}/user/update/${id}`, req);
}

   
}
