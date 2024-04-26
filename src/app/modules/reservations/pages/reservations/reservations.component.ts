import { ChangeDetectorRef, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FullCalendarModule } from '@fullcalendar/angular';
import { CalendarOptions } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import { ButtonBlueComponent } from 'src/app/shared/button-blue/button-blue.component';
import { BookingService } from 'src/app/services/booking.service';
import { ModalNewReservationComponent } from '../../components/modal-new-reservation/modal-new-reservation.component';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { ModalNuevaReservacionComponent } from '../../components/modal-nueva-reservacion/modal-nueva-reservacion.component';

@Component({
  selector: 'app-reservations',
  standalone: true,
  imports: [
    CommonModule,
    FullCalendarModule,
    ButtonBlueComponent,
    MatDialogModule,
    ModalNewReservationComponent,
    MatDatepickerModule,
    MatNativeDateModule,
  ],
  templateUrl: './reservations.component.html',
  styleUrls: ['./reservations.component.css'],
})
export class ReservationsComponent {
  public reservations: any[] = [];
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
    displayEventEnd: true,
    eventTimeFormat: {
      hour: '2-digit',
      minute: '2-digit',
      meridiem: true,
    },
  };

  constructor(
    private bookingService: BookingService,
    public dialog: MatDialog,
    private cdr: ChangeDetectorRef
  ) {
    this.getAllReservations();
  }

  public getAllReservations() {
    this.bookingService.getAllReservations().subscribe((data: any) => {
      this.reservations = data!.map((elem: any) => {
        return {
          id: elem.id,
          title: `${elem.Customers.name} - ${elem.Rooms.name}`,
          start: elem.start,
          end: elem.end,
          color: elem.Rooms.color,
          customer: elem.customer,
          numberOfAdults: elem.numberOfAdults,
          numberOfChilds: elem.numberOfChilds,
          room: elem.room,
          wayToPay: elem.wayToPay,
          total: elem.total,
          paid: elem.paid,
        };
      });
      this.calendarOptions.events = this.reservations;
      this.cdr.detectChanges();
    });
  }
  click(event: any) {
    console.log('click', event.event.id);
    /* const dialogRef = this.dialog.open(ModalNewReservationComponent, {
      data: {
        reservation: this.reservations.filter(
          (elem) => elem.id == event.event.id
        )[0],
      },
    }); */
    const dialogRef = this.dialog.open(ModalNuevaReservacionComponent, {
      data: {
        reservation: this.reservations.filter(
          (elem) => elem.id == event.event.id
        )[0],
      },
    });
  }

  openDialog(): void {
    /*  const dialogRef = this.dialog.open(ModalNewReservationComponent, {
      data: {},
    }); */
    const dialogRef = this.dialog.open(ModalNuevaReservacionComponent, {
      data: {},
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
    });
  }
}
