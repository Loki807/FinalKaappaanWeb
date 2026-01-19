import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../../services/user.service';
import { Storage } from '../../../../Store/storage';
@Component({
  selector: 'app-dashboard',
  imports: [CommonModule],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
  
})
export class Dashboard {
   service = inject(UserService);
  storage = inject(Storage);
  router = inject(Router);
  currentYear = new Date().getFullYear();
  tenantName = 'Unknown Tenant';
  tenantId = '';
  users: any[] = [];
  loading = true;
  serviceType = '';
 

  // ------------------------------
  // 1️⃣ LOAD DASHBOARD
ngOnInit() {
  this.tenantId =
    this.storage.getTenantIdFromStorage() ??
    this.storage.getTenantId() ??
    '';

  this.tenantName = this.storage.getTenantName() ?? 'Unknown Tenant';

  if (!this.tenantId) {
    this.loading = false;
    return;
  }

  this.loadUsers();
}

  

  // ------------------------------
  // 2️⃣ LOAD USERS OF THIS TENANT
  // ------------------------------
    loadUsers() {
    this.service.getTenantUsers().subscribe({
      next: (res) => {
        this.users = res.filter(u => u.role !== "TenantAdmin");
        this.loading = false;
      },
      error: () => this.loading = false
    });
  }

  // ------------------------------
  // 3️⃣ VIEW USER
  // ------------------------------
  viewUser(id: string) {
    this.router.navigate(['/user-view', id]);
  }

  // ------------------------------
  // 4️⃣ EDIT USER
  // ------------------------------
  editUser(id: string) {
    this.router.navigate(['/user-edit', id]);
  }

  // ------------------------------
  deleteUser(id: string) {
  if (!confirm("⚠ Are you sure you want to delete this user?")) return;

  this.service.deleteUser(id).subscribe({
    next: () => {
      alert("User deleted successfully!");
      this.users = this.users.filter(u => u.id !== id); // update table
    },
    error: err => {
      console.error(err);
      alert("❌ Delete failed!");
    }
  });

}


createUser() {
    this.router.navigate(['/users-create']);
}
Back() {
    this.router.navigate(['/users-create']);
}
}
