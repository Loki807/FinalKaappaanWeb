import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {
  private router = inject(Router);
  currentYear = new Date().getFullYear();

  goToLogin(): void {
    this.router.navigate(['/login']);
  }



    go(): void {
    this.router.navigate(['/Contracts']);
}
gowith():void
{
  this.router.navigate(['/Privacy']);
}
}
