import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TenantService } from '../../../services/tenant.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-tenant-update',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './tenant-update.html',
  styleUrl: './tenant-update.css',

})
export class TenantUpdate implements OnInit {

  form!: FormGroup;
  loading = true;
  tenantId!: string;
  fromPage: string = 'details';

  fb = inject(FormBuilder);
  route = inject(ActivatedRoute);
  router = inject(Router);
  tenantService = inject(TenantService);
  currentYear = new Date().getFullYear();

  districts = [
    "Ampara", "Anuradhapura", "Badulla", "Batticaloa", "Colombo",
    "Galle", "Gampaha", "Hambantota", "Jaffna", "Kalutara",
    "Kandy", "Kegalle", "Kilinochchi", "Kurunegala", "Mannar",
    "Matale", "Matara", "Monaragala", "Mullaitivu", "Nuwara Eliya",
    "Polonnaruwa", "Puttalam", "Ratnapura", "Trincomalee", "Vavuniya"
  ];

  ngOnInit(): void {
    this.tenantId = this.route.snapshot.paramMap.get('id')!;
    // 2️⃣ Read from where page came (details OR view)
    this.fromPage = this.route.snapshot.queryParamMap.get('from') || 'details';

    this.form = this.fb.group({

      name: [''],
      email: [''],
      code: [''],
      postalCode: [''],
      addressLine1: [''],
      addressLine2: [''],
      city: [''],
      stateOrDistrict: [''],
      contactNumber: [''],
      serviceType: [''],
      logoUrl: ['']


    });

    this.loadTenant();
  }

  loadTenant() {
    this.tenantService.getTenantById(this.tenantId).subscribe({
      next: (data) => {
        this.form.patchValue(data);
        this.loading = false;
      },
      error: () => alert('❌ Failed to load tenant!')
    });
  }

  submit() {
    if (this.form.invalid) return;

    this.tenantService.updateTenant(this.tenantId, this.form.value).subscribe({
      next: () => {
        alert('✔ Tenant updated successfully!');
        // 🔙 Correct navigation after update
        if (this.fromPage === 'view') {
          // go back to VIEW page
          this.router.navigate(['/tenant/view', this.tenantId]);
        } else {
          // go back to DETAILS list
          this.router.navigate(['/tenant-details']);
        }
      },
      error: () => alert('❌ Update failed!')
    });
  }

  Back() {
    // 🔙 Manual Back button
    if (this.fromPage === 'view') {
      this.router.navigate(['/tenant/view', this.tenantId]);
    } else {
      this.router.navigate(['/tenant-details']);
    }
  }
}



