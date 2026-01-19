import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class Storage {
  private TOKEN_KEY = 'kaappaan_token';

  private TENANT_ID_KEY = 'tenantId';
  private TENANT_NAME_KEY = 'tenantName';
  private TENANT_SERVICE_TYPE_KEY = 'tenantServiceType';

  // generic
  set(key: string, value: string) { localStorage.setItem(key, value); }
  get(key: string) { return localStorage.getItem(key); }

  // token
  setToken(tok: string) { localStorage.setItem(this.TOKEN_KEY, tok); }
  getToken() { return localStorage.getItem(this.TOKEN_KEY); }

  // tenant helpers (optional but clean)
  setTenantId(id: string) { localStorage.setItem(this.TENANT_ID_KEY, id); }
  getTenantIdFromStorage() { return localStorage.getItem(this.TENANT_ID_KEY); }

  setTenantName(name: string) { localStorage.setItem(this.TENANT_NAME_KEY, name); }
  getTenantName() { return localStorage.getItem(this.TENANT_NAME_KEY); }

  setTenantServiceType(type: string) { localStorage.setItem(this.TENANT_SERVICE_TYPE_KEY, type); }
  getTenantServiceType() { return localStorage.getItem(this.TENANT_SERVICE_TYPE_KEY); }

  // JWT decode -> tenantId
  private b64urlDecode(s: string) {
    s = s.replace(/-/g, '+').replace(/_/g, '/');
    const pad = s.length % 4;
    if (pad) s += '='.repeat(4 - pad);
    return atob(s);
  }

  getTenantId(): string | null {
    const t = this.getToken(); if (!t) return null;
    const p = t.split('.'); if (p.length !== 3) return null;

    try {
      const payload = JSON.parse(this.b64urlDecode(p[1]));
      return payload['tenantId'] || payload['tid'] || payload['tenant_id'] || null;
    } catch {
      return null;
    }
  }

  clearAll() {
    localStorage.removeItem(this.TOKEN_KEY);
    localStorage.removeItem(this.TENANT_ID_KEY);
    localStorage.removeItem(this.TENANT_NAME_KEY);
    localStorage.removeItem(this.TENANT_SERVICE_TYPE_KEY);
  }

}

