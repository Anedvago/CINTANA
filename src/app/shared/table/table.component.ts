import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatChipsModule } from '@angular/material/chips';
import { Article } from 'src/app/models/Article';

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatChipsModule],
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css'],
})
export class TableComponent {
  @Input()
  public columns: any[] = [];
  @Input()
  public columnsDisplay: any[] = [];
  @Input()
  public data: any[] = [];
  @Input()
  public active?: number = 0;
  @Output()
  public clickTr: EventEmitter<Article> = new EventEmitter<Article>();

  public emitClickTr(elem: any) {
    //console.log(elem);
    this.clickTr.emit(elem);
  }
}
