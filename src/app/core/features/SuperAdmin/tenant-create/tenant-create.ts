import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { TenantService } from '../../../services/tenant.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tenant-create',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './tenant-create.html',
  styleUrl: './tenant-create.css',
})
export class TenantCreate {
  currentYear: number = new Date().getFullYear(); // ⭐ FIXED HERE

  constructor() { }
  fb = inject(FormBuilder);
  service = inject(TenantService);
  router = inject(Router);

  message = '';
  loading = false;

  // Sri Lankan districts
  districts = [
    "Ampara", "Anuradhapura", "Badulla", "Batticaloa", "Colombo",
    "Galle", "Gampaha", "Hambantota", "Jaffna", "Kalutara",
    "Kandy", "Kegalle", "Kilinochchi", "Kurunegala", "Mannar",
    "Matale", "Matara", "Monaragala", "Mullaitivu", "Nuwara Eliya",
    "Polonnaruwa", "Puttalam", "Ratnapura", "Trincomalee", "Vavuniya"
  ];

  form = this.fb.group({
    name: ['', Validators.required],
    email: [
      '',
      [
        Validators.required,
        Validators.email
      ]
    ],
    addressLine1: ['', Validators.required],
    addressLine2: ['', Validators.required],
    city: ['', Validators.required],
    stateOrDistrict: ['', Validators.required],
    postalCode: ['', [Validators.required, Validators.pattern(/^\d{5}$/)]],
    contactNumber: ['', [
      Validators.required,
      Validators.pattern(/^(?:\+94|0)\d{9}$/), Validators.maxLength(12)
    ]],
    serviceType: ['', Validators.required],
    logoUrl: ['']


  });


  formDirty = false;

  ngOnInit() {
    this.form.valueChanges.subscribe(() => {
      this.formDirty = true;
    });
  }

  canDeactivate() {
    // only show if user has unsaved changes and form is still dirty
    if (this.formDirty && this.form.dirty && !this.loading) {
      return confirm('⚠ You have unsaved changes! Do you really want to leave?');
    }
    return true;
  }

  submit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      this.message = '⚠ Please fill all required fields correctly.';
      return;
    }

    this.loading = true;
    this.message = '';

    // 🧹 TRIM VALUES before sending
    const rawValue = this.form.value;
    const cleanData = {
      ...rawValue,
      name: rawValue.name?.trim(),
      email: rawValue.email?.trim(),
      addressLine1: rawValue.addressLine1?.trim(),
      addressLine2: rawValue.addressLine2?.trim(),
      city: rawValue.city?.trim(),
      contactNumber: rawValue.contactNumber?.trim(),
      serviceType: rawValue.serviceType // Select box, no trim needed usually
    };

    this.service.createTenant(cleanData).subscribe({
      next: () => {
        this.loading = false;
        this.message = '✅ Tenant created successfully!';

        // 🟢 FIX: prevent "unsaved changes" warning
        this.form.markAsPristine();
        this.formDirty = false;
        this.form.reset();

        // ✅ Redirect smoothly after a short delay
        setTimeout(() => this.router.navigate(['/firstpage']), 1200);
      },
      error: (err) => {
        this.loading = false;
        console.error(err);

        // 🔍 Better Error Handling
        if (err.error?.errors) {
          // Flatten validation errors
          const errors = Object.values(err.error.errors).flat().join(', ');
          this.message = `❌ Validation Failed: ${errors}`;
        } else {
          this.message = err.error?.message || '❌ Tenant creation failed. Please try again.';
        }
      }
    });


  }
  back() {
    // User confirmed → go back
    this.router.navigate(['/dashboard']);
  }
}
