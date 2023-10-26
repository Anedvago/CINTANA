import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ButtonBlueComponent } from 'src/app/shared/button-blue/button-blue.component';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-form-articles',
  standalone: true,
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    ButtonBlueComponent,
    FormsModule,
  ],
  templateUrl: './form-articles.component.html',
  styleUrls: ['./form-articles.component.css'],
})
export class FormArticlesComponent {
  public param: string = '';
  @Output()
  public filterByCode: EventEmitter<string> = new EventEmitter<string>();
  @Output()
  public filterByRef: EventEmitter<string> = new EventEmitter<string>();
  @Output()
  public filterByName: EventEmitter<string> = new EventEmitter<string>();
  @Output()
  public quitFilters: EventEmitter<void> = new EventEmitter<void>();
  @Output()
  public createNew: EventEmitter<void> = new EventEmitter<void>();
  @Input()
  public type = "";

  public emitFilterByCode() {
    this.filterByCode.emit(this.param);
  }

  public emitFilterByRef() {
    this.filterByRef.emit(this.param);
  }

  public emitFilterByName() {
    this.filterByName.emit(this.param);
  }

  public emitQuitFilters() {
    this.quitFilters.emit();
  }

  public emitCreateNew() {
    this.createNew.emit();
  }
}
