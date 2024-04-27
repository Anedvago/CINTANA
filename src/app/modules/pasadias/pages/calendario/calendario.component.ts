import { ChangeDetectorRef, Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonBlueComponent } from 'src/app/shared/button-blue/button-blue.component';
import { FullCalendarModule } from '@fullcalendar/angular';
import { CalendarOptions } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogModule,
} from '@angular/material/dialog';
import { ModalNuevoPasadiaComponent } from '../../components/modal-nuevo-pasadia/modal-nuevo-pasadia.component';
import { MatNativeDateModule } from '@angular/material/core';
import { PasadiaService } from 'src/app/services/pasadia.service';
@Component({
  selector: 'app-calendario',
  standalone: true,
  imports: [
    CommonModule,
    ButtonBlueComponent,
    FullCalendarModule,
    MatDialogModule,
    MatNativeDateModule,
  ],
  templateUrl: './calendario.component.html',
  styleUrls: ['./calendario.component.css'],
})
export class CalendarioComponent {
  pasadias: any = [];
  constructor(
    public dialog: MatDialog,
    private pasadiaService: PasadiaService,
    private cdr: ChangeDetectorRef
  ) {
    this.obtenerTodosLosPasadias();
  }
  @Inject(MAT_DIALOG_DATA) public data: any;
  calendarOptions: CalendarOptions = {
    initialView: 'dayGridMonth',
    plugins: [dayGridPlugin, timeGridPlugin],
    eventClick: this.click.bind(this),
    headerToolbar: {
      start: 'dayGridMonth,timeGridWeek,timeGridDay,today',
      center: 'title',
      end: 'prevYear,prev,next,nextYear',
    },
    nowIndicator: true,
    displayEventTime: false,
    eventTimeFormat: {
      meridiem: true,
    },
  };
  crearNuevoPasadia() {
    const dialogRef = this.dialog.open(ModalNuevoPasadiaComponent, {
      /* data: {
        reservation: this.reservations.filter(
          (elem) => elem.id == event.event.id
        )[0],
      }, */
      data: { operacion: 'creacion' },
    });
  }
  click(event: any) {
    const dialogRef = this.dialog.open(ModalNuevoPasadiaComponent, {
      /* data: {
        reservation: this.reservations.filter(
          (elem) => elem.id == event.event.id
        )[0],
      }, */
      data: {
        operacion: 'actualizacion',
        pasadia: this.pasadias.filter((elem) => elem.id == event.event.id)[0],
      },
    });
  }
  obtenerTodosLosPasadias() {
    this.pasadiaService.obtenerPasadias().subscribe((data) => {
      this.pasadias = data;
      this.calendarOptions.events = this.pasadias.map((element) => {
        return {
          id: element.id,
          date: element.fecha,
          title: element.Customers.name,
          cliente: element.cliente,
        };
      });
      this.cdr.detectChanges();
    });
  }
}
