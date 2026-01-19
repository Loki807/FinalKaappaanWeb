import { Component, inject, OnInit } from '@angular/core';
import { Tenant } from '../../../../Types/tenant.model';
import { ActivatedRoute, Router } from '@angular/router';
import { TenantService } from '../../../services/tenant.service';

import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-tenant-view',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './tenant-view.html',
  styleUrl: './tenant-view.css',
})
export class TenantView implements OnInit {
  route = inject(ActivatedRoute);
  router = inject(Router);
  tenantService = inject(TenantService);
  currentYear = new Date().getFullYear();

  tenant!: Tenant;
  loading = true;
  message = '';

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (!id) {
      this.message = "Invalid Tenant ID";
      return;
    }

    this.tenantService.getTenantById(id).subscribe({
      next: (data) => {
        this.tenant = data;
        this.loading = false;
      },
      error: () => {
        this.message = "❌ Failed to load tenant details.";
        this.loading = false;
      }
    });
  }

  Back() {
    this.router.navigate(['/tenant-details']);
  }

  // ✏️ 4️⃣ UPDATE BUTTON
  // ------------------------------------------------------------------
  editTenant(id: string) {
    this.router.navigate(['/tenant/update', id], {
      queryParams: { from: 'view' }
    });
  }


  Delete(id: string) {
    if (!confirm("⚠ Are you sure you want to delete this tenant?")) return;

    this.tenantService.deleteTenant(id).subscribe({
      next: () => {
        alert("Tenant deleted successfully!");
        this.router.navigate(['/tenant-details']);
      },
      error: () => {
        alert("❌ Failed to delete tenant!");
      }
    });
  }
}
