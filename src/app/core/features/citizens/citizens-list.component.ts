import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CitizenService } from '../../services/citizen.service';

@Component({
  selector: 'app-citizens-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './citizens-list.component.html',
  styleUrls: ['./citizens-list.component.css']
})
export class CitizensListComponent implements OnInit {

  loading = true;
  citizens: any[] = [];
  filteredCitizens: any[] = [];   // ⭐ NEW
  paginatedCitizens: any[] = [];

  totalCitizens = 0;

  itemsPerPage = 50;
  currentPage = 1;
  totalPages = 1;

  totalPagesArray: number[] = [];

  searchText: string = "";   // ⭐ NEW

  constructor(private citizenService: CitizenService) {}

  ngOnInit(): void {
    this.loadCitizens();
  }

  loadCitizens() {
    this.citizenService.getAllCitizens().subscribe({
      next: (data) => {
        this.citizens = data;
        this.filteredCitizens = data; // ⭐ DEFAULT
        this.totalCitizens = data.length;

        this.setupPagination();
        this.updatePage();
        this.loading = false;
      },
      error: () => {
        this.loading = false;
        alert("Failed to load citizens ❌");
      }
    });
  }

  setupPagination() {
    this.totalPages = Math.ceil(this.filteredCitizens.length / this.itemsPerPage);
    this.totalPagesArray = Array.from({ length: this.totalPages }, (_, i) => i + 1);
  }

  updatePage() {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    const end = start + this.itemsPerPage;
    this.paginatedCitizens = this.filteredCitizens.slice(start, end);
  }

  goToPage(page: number) {
    this.currentPage = page;
    this.updatePage();
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.updatePage();
    }
  }

  prevPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updatePage();
    }
  }

  // ⭐ SEARCH FUNCTION
  applySearch() {
    const value = this.searchText.toLowerCase();

    this.filteredCitizens = this.citizens.filter(c =>
      c.fullName?.toLowerCase().includes(value) ||
      c.nic?.toLowerCase().includes(value)
    );

    this.totalCitizens = this.filteredCitizens.length;

    this.currentPage = 1;
    this.setupPagination();
    this.updatePage();
  }
}
