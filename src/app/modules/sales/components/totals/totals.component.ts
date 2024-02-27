import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-totals',
  standalone: true,
  imports: [CommonModule, MatCardModule],
  templateUrl: './totals.component.html',
  styleUrls: ['./totals.component.css']
})
export class TotalsComponent {

}
