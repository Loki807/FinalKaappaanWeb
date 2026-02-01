import { Component, HostListener, inject } from '@angular/core';
import { Router } from '@angular/router';
import { TenantService } from '../../../services/tenant.service';

import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-main-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './maindashboard.html',
  styleUrls: ['./maindashboard.css']
})
export class Maindashboard {

  menuOpen = false;

  toggleMenu() { this.menuOpen = !this.menuOpen; }
  closeMenu() { this.menuOpen = false; }

  totalDepartments = 0;
  totalTenants = 0;
  currentYear = new Date().getFullYear();
  // ⭐ MUST HAVE
  tenantService = inject(TenantService);   // ⭐ MUST HAVE
  profileOpen = false;
  ngOnInit(): void {
    this.tenantService.getAllTenants().subscribe({
      next: (data) => {

        // ⭐ Count all tenants
        this.totalTenants = data.length;

        // ⭐ Count only departments (Police / Fire / Ambulance)
        this.totalDepartments = data.filter(t => t.serviceType != null).length;

      },
      error: (err) => {
        console.error("Failed to load tenants:", err);
      }
    });
  }

  openTenants() {
    this.router.navigate(['/dashboard']); // ⭐ Works now
  }

  openUsers() {
    this.router.navigate(['/citizens']);  // ⭐ Works now
  }

  logout() {
    this.router.navigate(['/login']);
  }
  goTo() {
    this.router.navigate(['/firstpage']);
  }
  goAdmin() {
    this.router.navigate(['/AdminService']);
  }


  constructor(private router: Router) { }

  toggleProfileMenu() {
    this.profileOpen = !this.profileOpen;
  }

  closeProfileMenu() {
    this.profileOpen = false;
  }

  // ✅ click outside -> close menu
  @HostListener('document:click', ['$event'])
  onDocClick(event: MouseEvent) {
    const target = event.target as HTMLElement;

    // if clicked inside profile area, don't close
    if (target.closest('.profile-area')) return;

    this.profileOpen = false;
  }

  // ✅ navigate to profile page
  goProfile() {
    this.closeProfileMenu();
    this.router.navigate(['/profile']);
  }
}
