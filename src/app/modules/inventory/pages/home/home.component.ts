import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { CardModuleComponent } from '../../components/card-module/card-module.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, CardModuleComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  constructor(private router: Router) {}
  public navigateTo(route: string): void {
    this.router.navigate([`/admin/inventory/${route}`]);
  }
}
