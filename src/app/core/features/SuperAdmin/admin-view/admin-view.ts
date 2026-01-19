import { Component, inject, OnInit } from '@angular/core';
import { Tenant } from '../../../../Types/tenant.model';
import { ActivatedRoute, Router } from '@angular/router';
import { TenantService } from '../../../services/tenant.service';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-admin-view',
  imports: [CommonModule, FormsModule],
  templateUrl: './admin-view.html',
  styleUrl: './admin-view.css',
})
export class AdminView implements OnInit {
  allDepartments: Tenant[] = [];
   currentYear = new Date().getFullYear();
  // ✅ filtered data (table uses this)
  departments: Tenant[] = [];

  loading = true;
  error = '';

  // ✅ dropdown/query selected value
  selectedServiceType: string = 'All';

  tenantService = inject(TenantService);
  router = inject(Router);
  route = inject(ActivatedRoute);

  ngOnInit(): void {

    // ✅ 1) URL query param read (serviceType)
    this.route.queryParamMap.subscribe((q) => {
      this.selectedServiceType = q.get('serviceType') ?? 'All';

      // ✅ if data already loaded, just apply filter
      this.applyFilter();
    });

    // ✅ 2) load tenants
    this.loadDepartments();
  }

  loadDepartments() {
    this.loading = true;

    this.tenantService.getAllTenants().subscribe({
      next: (res) => {

        // ✅ only departments (serviceType not null)
        this.allDepartments = res.filter(t => t.serviceType != null);

        // ✅ apply filter based on selectedServiceType
        this.applyFilter();

        this.loading = false;
      },
      error: (err) => {
        console.error(err);
        this.error = "Failed to load departments.";
        this.loading = false;
      }
    });
  }

  // ✅ apply serviceType filter
  applyFilter() {
    if (!this.allDepartments || this.allDepartments.length === 0) {
      this.departments = [];
      return;
    }

    // ✅ "All" => show all
    if (!this.selectedServiceType || this.selectedServiceType === 'All') {
      this.departments = this.allDepartments;
      return;
    }

    // ✅ specific => show only selected
    this.departments = this.allDepartments.filter(
      d => d.serviceType === this.selectedServiceType
    );
  }

  // ✅ dropdown change -> update URL (keeps filter on refresh)
  onServiceTypeChange() {
    this.router.navigate([], {
      queryParams: {
        serviceType: this.selectedServiceType === 'All' ? null : this.selectedServiceType
      },
      queryParamsHandling: 'merge',
    });
  }

  // 👉 VIEW DEPARTMENT
  viewDept(id: string) {
    this.router.navigate(['/tenant/view', id]);
  }

  // 👉 EDIT DEPARTMENT
  editDept(id: string) {
    this.router.navigate(['/tenant/update', id]);
  }

  // 👉 DELETE DEPARTMENT
  deleteDept(id: string) {
    if (!confirm("⚠ Are you sure you want to delete this department?"))
      return;

    this.tenantService.deleteTenant(id).subscribe({
      next: () => {
        alert("Department deleted successfully!");

        // ✅ remove from both arrays
        this.allDepartments = this.allDepartments.filter(d => d.id !== id);
        this.applyFilter();
      },
      error: (err) => {
        console.error(err);
        alert("❌ Delete failed!");
      }
    });
  }}