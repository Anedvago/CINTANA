import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
@Component({
  selector: 'app-card-module',
  standalone: true,
  imports: [CommonModule, MatCardModule],
  templateUrl: './card-module.component.html',
  styleUrls: ['./card-module.component.css'],
})
export class CardModuleComponent {
  @Input()
  public img!: string;
  @Input()
  public title!: string;
}
