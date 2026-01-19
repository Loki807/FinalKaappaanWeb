import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class CitizenService {

  private http = inject(HttpClient);
  private baseUrl = `${environment.apiBase}/citizen`;

  // GET all citizens
  getAllCitizens(): Observable<any[]> {
    return this.http.get<any[]>(this.baseUrl);
  }
}
