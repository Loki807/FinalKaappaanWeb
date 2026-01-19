import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { LoginRequest } from '../../../Types/login-request.type';
import { Auth } from '../../services/auth';
import { Router } from '@angular/router';
import { Storage } from '../../../Store/storage';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {

  fb = inject(FormBuilder);
  auth = inject(Auth);
  router = inject(Router);
  storage = inject(Storage);
  currentYear = new Date().getFullYear();

  form = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required]
  });

  message = '';
  loading = false;

  submit() {
    if (this.form.invalid) {
      this.message = '⚠️ Please enter valid email and password.';
      return;
    }

    // Trim inputs
    const raw = this.form.getRawValue();
    const request: LoginRequest = {
      email: raw.email?.trim() || '',
      password: raw.password || ''
    };

    console.log('📤 Logging in with:', request.email); // Debug log

    this.loading = true;
    this.message = '';

    this.auth.login(request).subscribe({
      next: (res) => {
        this.loading = false;

        // 1️⃣ First-time login → change password
        if (res.message?.includes('Password change required')) {
          this.router.navigate(['/change-password'], {
            queryParams: { email: request.email },
          });
          return;
        }

        // 2️⃣ Save token
        this.storage.setToken(res.token);

        // 3️⃣ Extract tenantId from the token
        const tid = this.storage.getTenantId();

        // 4️⃣ Save tenantId so dashboard can read it
        if (tid) {
          this.storage.setTenantId(tid);     // ✅ CHANGE (instead of localStorage.setItem)
        }

        // ⭐ 5️⃣ Save tenantName (THIS IS THE FIX)
        const tname = (res as any).tenantName || (res as any).name;   // tenantName preferred
        if (tname) {
          this.storage.setTenantName(tname); // ✅ NEW
        }

        const serviceType = (res as any).serviceType;
        if (serviceType) {
          this.storage.setTenantServiceType(serviceType);
        }

        // ⭐ 5️⃣ Save tenant info (NEW)

        console.log('✅ Login successful:', res);

        // Handle case sensitivity for Role/role
        const role = res.role || (res as any).Role;

        // 5️⃣ Role-based navigation
        const normalizedRole = role?.toLowerCase();

        switch (normalizedRole) {
          case 'superadmin':
            this.router.navigate(['/maindashboard']);
            break;

          case 'tenantadmin':
            this.router.navigate(['/tenatadminmain']);
            break;

          // ⭐ Allow Responders to access the Web Portal
          case 'universitystaff':
          case 'police':
          case 'fire':
          case 'ambulance':
          case 'traffic':
            console.log(`👨‍🚒 Responder login (${normalizedRole}) - Redirecting to Tenant Dashboard`);
            this.router.navigate(['/tenatadminmain']);
            break;

          default:
            console.warn('Unknown role:', role);
            this.message = '🚫 Access denied. Role not recognized: ' + role;
            setTimeout(() => this.router.navigate(['/home']), 1500);
            break;
        }
      },

      error: (err) => {
        this.loading = false;
        console.error('Login error full details:', err);

        if (err.status === 0) {
          this.message = '⚠️ Network Error! Check API is running or SSL Cert.';
        } else if (err.status === 401) {
          this.message = '❌ Invalid email or password.';
        } else {
          this.message = `❌ Server Error (${err.status || 'Unknown'}).`;
        }

        this.form.controls['email'].setValue('');
        this.form.controls['password'].setValue('');
      }
    });

  }
}
