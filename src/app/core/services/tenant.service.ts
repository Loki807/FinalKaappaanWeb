// src/app/services/tenant.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';  // Import environment file
import { Tenant } from '../../Types/tenant.model';
  // Import Tenant model

@Injectable({
  providedIn: 'root',
})
export class TenantService {

  
  getAdmins() {
    throw new Error('Method not implemented.');
  }
  private apiUrl = `${environment.apiBase}/admin/tenant`;  // Base URL for tenant APIs

  constructor(private http: HttpClient) {}

  // 🧾 Create new tenant
  createTenant(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/create`, data);
  }

  // 🔍 Get all tenants
  getAllTenants(): Observable<Tenant[]> {
    return this.http.get<Tenant[]>(`${this.apiUrl}/all`);
  }

  // 🔍 Get tenant by ID
  getTenantById(id: string): Observable<Tenant> {
    return this.http.get<Tenant>(`${this.apiUrl}/${id}`);
  }

  // 📝 Update tenant details
  updateTenant(id: string, data: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/update/${id}`, data);
  }

deleteTenant(id: string): Observable<any> {
  return this.http.delete(`${this.apiUrl}/delete/${id}`);
}

}
