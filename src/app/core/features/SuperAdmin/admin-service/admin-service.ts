import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

import { TenantService } from '../../../services/tenant.service';   // ✅ path check
import { Tenant } from '../../../../Types/tenant.model';            // ✅ path check

type ServiceKey = 'Police' | 'Fire' | 'Ambulance' | 'University';

@Component({
  selector: 'app-admin-service',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './admin-service.html',
  styleUrl: './admin-service.css',
})
export class AdminService implements OnInit {
  router = inject(Router);
  tenantService = inject(TenantService);

  currentYear = new Date().getFullYear();
  loading = true;
  error = '';

  // ✅ ONLY 4 cards
  cards: { key: ServiceKey; title: string; icon: string; count: number }[] = [
    { key: 'Police', title: 'Police Tenants', icon: '👮‍♂️', count: 0 },
    { key: 'Fire', title: 'Fire Tenants', icon: '🔥', count: 0 },
    { key: 'Ambulance', title: 'Ambulance Tenants', icon: '🚑', count: 0 },
    { key: 'University', title: 'University Tenants', icon: '🎓', count: 0 },
  ];

  ngOnInit(): void {
    this.loadCounts();
  }

  loadCounts() {
    this.loading = true;
    this.error = '';

    this.tenantService.getAllTenants().subscribe({
      next: (res: Tenant[]) => {
        const depts = res.filter(t => !!t.serviceType);

        // ✅ normalize (case-insensitive)
        const norm = (v: string) => (v ?? '').trim().toLowerCase();

        const policeCount = depts.filter(t => norm(t.serviceType!) === 'police').length;
        const fireCount = depts.filter(t => norm(t.serviceType!) === 'fire').length;
        const ambulanceCount = depts.filter(t => norm(t.serviceType!) === 'ambulance').length;
        const universityCount = depts.filter(t => norm(t.serviceType!) === 'university').length;

        this.setCount('Police', policeCount);
        this.setCount('Fire', fireCount);
        this.setCount('Ambulance', ambulanceCount);
        this.setCount('University', universityCount);

        this.loading = false;
      },
      error: (err) => {
        console.error(err);
        this.error = 'Failed to load tenant counts.';
        this.loading = false;
      },
    });
  }

  private setCount(key: ServiceKey, value: number) {
    const c = this.cards.find(x => x.key === key);
    if (c) c.count = value;
  }

  back() {
    window.history.back();
  }

  // ✅ click -> go details page with query param
  go(serviceType: ServiceKey) {
    this.router.navigate(['/AdminDetails'], {
      queryParams: { serviceType },
      queryParamsHandling: 'merge',
    });
  }
}
