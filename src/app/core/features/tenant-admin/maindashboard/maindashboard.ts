import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../../services/user.service';
import { Storage } from '../../../../Store/storage';


@Component({
  selector: 'app-main-dashboard',
  templateUrl: './maindashboard.html',
  styleUrls: ['./maindashboard.css']
})
export class Maindashboard {

  service = inject(UserService);
  storage = inject(Storage);
  router = inject(Router);

  tenantName = 'Unknown Tenant';
  tenantId = '';
 currentYear: number = new Date().getFullYear();
  users: any[] = [];
  totalUsers = 0;

  loading = true;
  menuOpen = false;

  // ✅ profile dropdown open/close
  profileOpen = false;
  constructor() {}

  toggleProfileMenu() {
    this.profileOpen = !this.profileOpen;
  }

  closeProfileMenu() {
    this.profileOpen = false;
  }

 
  onDocClick(event: MouseEvent) {
    const target = event.target as HTMLElement;

    // if clicked inside profile area, don't close
    if (target.closest('.profile-area')) return;

    this.profileOpen = false;
  }

  // ✅ navigate to profile page
  goProfile() {
    this.closeProfileMenu();
    this.router.navigate(['/tenant-profile']);   // ✅ change route if your profile route is different
  }

 
  ngOnInit() {

    // ⭐ Load Tenant ID + Name
    this.tenantId = localStorage.getItem('tenantId') ?? '';
    this.tenantName = localStorage.getItem('tenantName') ?? 'Unknown Tenant';

    if (!this.tenantId) {
      this.loading = false;
      return;
    }

    // ⭐ Load user list
    this.loadUsers();
  }

  // -----------------------------------
  // ⭐ LOAD ALL USERS OF THIS TENANT
  // -----------------------------------
  loadUsers() {
    this.service.getTenantUsers().subscribe({
      next: (res) => {
        // ❗ Do NOT include TenantAdmin
        this.users = res.filter(u => u.role !== 'TenantAdmin');

        // ⭐ Count all remaining users
        this.totalUsers = this.users.length;

        this.loading = false;
      },
      error: () => this.loading = false
    });
  }
  

  logout() {
   this.router.navigate(['/login']);
  }
  goTo() {
   this.router.navigate(['/tenant-dashboard']);
  }

  goSettings(){
     this.closeProfileMenu();
  this.router.navigate(['/tenant/update/:id']);
  }
  
    

}
