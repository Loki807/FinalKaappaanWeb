import { Component, OnInit, inject } from '@angular/core';
import { Tenant } from '../../../../Types/tenant.model';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { TenantService } from '../../../services/tenant.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-tenant-details',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './tenant-details.html',
  styleUrls: ['./tenant-details.css'],
})
export class TenantDetails implements OnInit {

  tenants: Tenant[] = [];
  filteredTenants: Tenant[] = [];

  selectedServiceType: string | null = null;
  selectedDistrict: string | null = null;

  searchText = "";
  loading = true;
  currentYear = new Date().getFullYear();

  router = inject(Router);
  route = inject(ActivatedRoute);
  tenantService = inject(TenantService);

  ngOnInit(): void {

    // 1️⃣ Get serviceType + district from URL
    this.selectedServiceType = this.route.snapshot.queryParamMap.get('serviceType');
    this.selectedDistrict = this.route.snapshot.queryParamMap.get('district');

    // 2️⃣ Load tenants from resolver
    this.tenants = this.route.snapshot.data['tenants'];

    // 3️⃣ Start with all tenants
    this.filteredTenants = [...this.tenants];

    // 4️⃣ Apply district filter
    if (this.selectedDistrict) {
      this.filteredTenants = this.filteredTenants.filter(t =>
        t.stateOrDistrict?.toLowerCase() === this.selectedDistrict!.toLowerCase()
      );
    }

    // 5️⃣ Apply service type filter
    if (this.selectedServiceType) {
      const targetType = this.selectedServiceType.toLowerCase();
      this.filteredTenants = this.filteredTenants.filter(t =>
        t.serviceType?.toLowerCase() === targetType
      );
    }

    this.loading = false;
  }

  // 🔍 Search tenants
  applySearch() {
    const text = this.searchText.toLowerCase().trim();

    this.filteredTenants = this.tenants.filter(t =>
      (t.name?.toLowerCase().includes(text) || t.code?.toLowerCase().includes(text))
    );
  }

  viewTenant(id: string) {
    this.router.navigate(['/tenant/view', id]);
  }

  editTenant(id: string) {
    this.router.navigate(['/tenant/update', id], { queryParams: { from: 'details' } });
  }

  deleteTenant(id: string) {
    if (!confirm("Are you sure you want to delete this tenant?")) return;

    this.tenantService.deleteTenant(id).subscribe(() => {
      this.filteredTenants = this.filteredTenants.filter(t => t.id !== id);
    });
  }

  Back() {
    this.router.navigate(['/dashboard'], {
      queryParams: { district: this.selectedDistrict }
    });
  }
  goToTenantCreate() { this.router.navigate(['/tenant-create']); }

}
