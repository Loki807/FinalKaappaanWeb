import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../../services/user.service';
import { Storage } from '../../../../Store/storage';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-user-edit',
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './user-edit.html',
  styleUrl: './user-edit.css',
})
export class UserEdit {
 fb = inject(FormBuilder);
  route = inject(ActivatedRoute);
  api = inject(UserService);
  router = inject(Router);
  storage = inject(Storage);

  userId = '';
  loading = true;
  message = '';
  formDirty = false;

  form = this.fb.group({
    name: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    phone: ['', Validators.required],
    role: ['', Validators.required],
    isActive: [true]
  });

  ngOnInit() {
    this.userId = this.route.snapshot.params['id'];

    this.api.getUserById(this.userId).subscribe({
      next: res => {
        this.form.patchValue(res);
        this.loading = false;
      },
      error: err => {
        console.error(err);
        this.loading = false;
      }
    });

    // Track changes
    this.form.valueChanges.subscribe(() => {
      this.formDirty = true;
    });
  }

  // 🔥 Prevent leaving page with unsaved changes
  canDeactivate() {
    if (this.formDirty && this.form.dirty) {
      return confirm("⚠ You have unsaved changes! Do you really want to leave?");
    }
    return true;
  }

  submit() {
    if (this.form.invalid) {
      this.message = '⚠ Please fill all fields correctly.';
      return;
    }

    const req = {
      tenantId: this.storage.getTenantId(),
      ...this.form.value
    };

    this.api.updateUser(this.userId, req).subscribe({
      next: () => {
        this.message = '✅ Updated successfully!';

        // Clear dirty state so back button won't show warning
        this.formDirty = false;
        this.form.markAsPristine();

        setTimeout(() => {
          this.router.navigate(['/tenant-dashboard']);
        }, 800);
      },
      error: () => {
        this.message = '❌ Update failed.';
      }
    });
  }

  back() {
    // Trigger unsaved changes alert only if required
    this.router.navigate(['/tenant-dashboard']);
  }
}
