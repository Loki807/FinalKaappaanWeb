import { Component, inject } from '@angular/core';
import { TenantService } from '../../../services/tenant.service';
import { Router } from '@angular/router';
import { Tenant } from '../../../../Types/tenant.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-firstpage',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './firstpage.html',
  styleUrl: './firstpage.css',
})
export class Firstpage {

  router = inject(Router);

  searchText: string = "";
  noResults = false;
  currentYear = new Date().getFullYear();

  // All Sri Lanka districts
  districts: string[] = [
    "Ampara", "Anuradhapura", "Badulla", "Batticaloa", "Colombo",
    "Galle", "Gampaha", "Hambantota", "Jaffna", "Kalutara",
    "Kandy", "Kegalle", "Kilinochchi", "Kurunegala", "Mannar",
    "Matale", "Matara", "Monaragala", "Mullaitivu", "Nuwara Eliya",
    "Polonnaruwa", "Puttalam", "Ratnapura", "Trincomalee", "Vavuniya"
  ];

  filteredDistricts = [...this.districts];

  // ✨ Search districts
  filterDistricts() {
    const txt = this.searchText.toLowerCase().trim();
    this.filteredDistricts = this.districts.filter(d =>
      d.toLowerCase().includes(txt)
    );

    this.noResults = this.filteredDistricts.length === 0;
  }

  // ✨ When user clicks a district → go to dashboard
  viewDistrict(district: string) {
    this.router.navigate(['/dashboard'], {
      queryParams: { district }
    });
  }
  goBack() {
    this.router.navigate(['/maindashboard']);
  }
}