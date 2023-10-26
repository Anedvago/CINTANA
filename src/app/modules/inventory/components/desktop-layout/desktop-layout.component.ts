import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
@Component({
  selector: 'app-desktop-layout',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  templateUrl: './desktop-layout.component.html',
  styleUrls: ['./desktop-layout.component.css'],
})
export class DesktopLayoutComponent {}
