import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Auth } from '../../services/auth';
import { ActivatedRoute, Router } from '@angular/router';
import { ChangePasswordRequest } from '../../../Types/change-password-request.type';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-change-password',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './change-password.html',
  styleUrl: './change-password.css',
})
export class ChangePassword {

  fb = inject(FormBuilder);
  auth = inject(Auth);
  route = inject(ActivatedRoute);
  router = inject(Router);
  currentYear = new Date().getFullYear();
  email = this.route.snapshot.queryParamMap.get('email') || '';
  message = '';
  loading = false;

  form = this.fb.group({
    oldPassword: ['', Validators.required,Validators.minLength(6)],
    newPassword: ['', [Validators.required]],
  });

  submit() {
    if (this.form.invalid) return;

    const request: ChangePasswordRequest = {
      email: this.email,
      oldPassword: this.form.value.oldPassword!,
      newPassword: this.form.value.newPassword!
    };

    this.loading = true;
    this.auth.changePassword(request).subscribe({
      next: () => {
        this.loading = false;
        this.message = '✅ Password changed successfully!';
        setTimeout(() => this.router.navigate(['/login']), 1500);
      },
      error: () => {
        this.loading = false;
        this.message = '❌ Password change failed. Check your current password.';
      }
    });
  }
 
}
