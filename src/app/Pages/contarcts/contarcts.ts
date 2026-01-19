import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-contarcts',
  imports: [],
  templateUrl: './contarcts.html',
  styleUrl: './contarcts.css',
})
export class Contarcts {
  private router = inject(Router);
  currentYear = new Date().getFullYear();

 
}
