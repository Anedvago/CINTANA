import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ButtonBlueComponent } from 'src/app/shared/button-blue/button-blue.component';
import { FormsModule } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { DateService } from 'src/app/services/date.service';

@Component({
  selector: 'app-form-document',
  standalone: true,
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    ButtonBlueComponent,
    FormsModule,
    MatDatepickerModule,
    MatNativeDateModule
  ],
  templateUrl: './form-document.component.html',
  styleUrls: ['./form-document.component.css']
})
export class FormDocumentComponent {
  public numberFacture: string = "";
  public initialDate: string = "";
  public finalDate: string = "";
  public factureNumber: string = "";

  @Output()
  public filterByInitialDate: EventEmitter<string> = new EventEmitter<string>();
  @Output()
  public filterByFinalDate: EventEmitter<string> = new EventEmitter<string>();
  @Output()
  public filterByRangeDate: EventEmitter<{ initialDate: string, finalDate: string }> = new EventEmitter<{ initialDate: string, finalDate: string }>();
  @Output()
  public filterByNumberFacture: EventEmitter<string> = new EventEmitter<string>();
  @Output()
  public quitFilters: EventEmitter<void> = new EventEmitter<void>();

  constructor(private dateService: DateService) {

  }
  /* @Output()
  public filterByCode: EventEmitter<string> = new EventEmitter<string>();
  @Output()
  public filterByRef: EventEmitter<string> = new EventEmitter<string>();
  @Output()
  public filterByName: EventEmitter<string> = new EventEmitter<string>();
  
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
  } */

  public filterFacture(): void {
    if (this.numberFacture != "") {
      this.filterByNumberFacture.emit(this.numberFacture)
    } else {
      if (this.initialDate != "" && this.finalDate != "") {
        this.filterByRangeDate.emit({
          initialDate: this.dateService.convertDateInputToString(this.initialDate),
          finalDate: this.dateService.convertDateInputToString(this.finalDate)
        });
      } else if (this.initialDate != "") {
        this.filterByInitialDate.emit(this.dateService.convertDateInputToString(this.initialDate))
      } else if (this.finalDate != "") {
        this.filterByFinalDate.emit(this.dateService.convertDateInputToString(this.finalDate))
      }
    }
  }


  public emitQuitFilters(): void {
    this.quitFilters.emit();
    this.initialDate = "";
    this.finalDate = "";
    this.numberFacture = "";
  }
}
