import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-list-articles',
  standalone: true,
  imports: [CommonModule, MatCardModule],
  templateUrl: './list-articles.component.html',
  styleUrls: ['./list-articles.component.css']
})
export class ListArticlesComponent {

}
