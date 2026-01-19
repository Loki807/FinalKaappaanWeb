import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Tenant } from '../../../../Types/tenant.model';
import { TenantService } from '../../../services/tenant.service';
import { CommonModule } from '@angular/common'; // Added this import as it's in the target imports array

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard {

  tenants: Tenant[] = [];

  policeCount = 0;
  fireCount = 0;
  ambulanceCount = 0;
  universityCount = 0;

  selectedDistrict: string | null = null;
  currentYear = new Date().getFullYear();

  constructor(
    private tenantService: TenantService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {

    // 1️⃣ Read district from URL
    this.selectedDistrict = this.route.snapshot.queryParamMap.get('district');

    // 2️⃣ Get all tenants
    console.log("🚀 Dashboard Initialized for district:", this.selectedDistrict);
    console.log("🎓 University card should be visible in HTML");

    this.tenantService.getAllTenants().subscribe({
      next: (data) => {

        // 3️⃣ Apply district filter
        if (this.selectedDistrict) {
          data = data.filter(t =>
            t.stateOrDistrict?.toLowerCase() === this.selectedDistrict!.toLowerCase()
          );
        }

        this.tenants = data;

        // 4️⃣ Count service types (case-insensitive)
        const norm = (val: string | undefined) => (val || '').trim().toLowerCase();

        this.policeCount = data.filter(t => norm(t.serviceType) === 'police').length;
        this.fireCount = data.filter(t => norm(t.serviceType) === 'fire').length;
        this.ambulanceCount = data.filter(t => norm(t.serviceType) === 'ambulance').length;
        this.universityCount = data.filter(t => norm(t.serviceType) === 'university').length;

        console.log('📊 Dashboard Counts:', {
          District: this.selectedDistrict,
          Police: this.policeCount,
          Fire: this.fireCount,
          Ambulance: this.ambulanceCount,
          University: this.universityCount
        });
      }
    });
  }

  // When clicking Police / Fire / Ambulance / University cards
  viewTenants(serviceType: string) {
    console.log('🔍 Navigating to tenant list for:', serviceType);
    this.router.navigate(['/tenant-details'], {
      queryParams: {
        serviceType,
        district: this.selectedDistrict
      }
    });
  }



  logout() {
    console.log('⬅️ Navigating back to firstpage');
    this.router.navigate(['/firstpage']);
  }

  createTenant() {
    console.log('➕ Navigating to tenant-create');
    this.router.navigate(['/tenant-create']);
  }

}

