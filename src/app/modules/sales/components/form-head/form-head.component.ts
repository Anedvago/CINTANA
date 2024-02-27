import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-form-head',
  standalone: true,
  imports: [CommonModule, MatCardModule],
  templateUrl: './form-head.component.html',
  styleUrls: ['./form-head.component.css']
})
export class FormHeadComponent {

}
