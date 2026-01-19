import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../../services/user.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-user-view',
  imports: [CommonModule],
  templateUrl: './user-view.html',
  styleUrl: './user-view.css',
})
export class UserView {
 private route = inject(ActivatedRoute);
  private api = inject(UserService);
  private router = inject(Router);

  user: any = null;
  loading = true;

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (!id) return;

    this.api.getUserById(id).subscribe({
      next: res => {
        this.user = res;
        this.loading = false;
      },
      error: () => {
        this.loading = false;
      }
    });
  }

  editUser(id: string) {
    this.router.navigate(['/user-edit', id]);
  }

  deleteUser(id: string) {
    if (!confirm("⚠ Are you sure you want to delete this user?")) return;

    this.api.deleteUser(id).subscribe(() => {
      alert("User deleted!");
      this.router.navigate(['/tenant-dashboard']);
    });
  }

  back() {
    this.router.navigate(['/tenant-dashboard']);
  }
}
