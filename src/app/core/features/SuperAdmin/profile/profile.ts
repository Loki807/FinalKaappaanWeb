import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
    selector: 'app-profile',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './profile.html',
    styleUrl: './profile.css'
})
export class Profile {
    router = inject(Router);
    currentYear = new Date().getFullYear();

    goBack() {
        this.router.navigate(['/maindashboard']);
    }
}
