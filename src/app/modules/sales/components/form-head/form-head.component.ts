import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-form-head',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule, MatFormFieldModule, MatInputModule, MatSelectModule],
  templateUrl: './form-head.component.html',
  styleUrls: ['./form-head.component.css']
})
export class FormHeadComponent {

  formasDePago: string[] = ["1", "2"]
  opcionesVentaPara: string[] = ["3", "4"]
}
