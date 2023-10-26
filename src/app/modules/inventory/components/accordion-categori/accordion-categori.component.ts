import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-accordion-categori',
  standalone: true,
  imports: [CommonModule, MatExpansionModule, MatCardModule, MatButtonModule],
  templateUrl: './accordion-categori.component.html',
  styleUrls: ['./accordion-categori.component.css'],
})
export class AccordionCategoriComponent {
  @Input()
  public departaments!: any[];
  @Input()
  public sections!: any[];
  @Input()
  public families!: any[];
  @Output()
  public editCategory: EventEmitter<{ id: number, depth: string, type: string }> = new EventEmitter<{ id: number, depth: string, type: string }>();
  @Output()
  public deleteCategory: EventEmitter<{ id: number, depth: string, type: string }> = new EventEmitter<{ id: number, depth: string, type: string }>();

  public emitEditCategory(id: number, depth: string, type: string) {       
    this.editCategory.emit({ id: id, depth: depth, type: type });
  }

  public emitDeleteCategory(id: number, depth: string, type: string) {
    this.deleteCategory.emit({ id: id, depth: depth, type: type });
  }
}
