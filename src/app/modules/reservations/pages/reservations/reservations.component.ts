import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FullCalendarModule } from '@fullcalendar/angular';
import { CalendarOptions } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import { ButtonBlueComponent } from 'src/app/shared/button-blue/button-blue.component';
import { BookingService } from 'src/app/services/booking.service';

@Component({
  selector: 'app-reservations',
  standalone: true,
  imports: [CommonModule, FullCalendarModule, ButtonBlueComponent],
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

  constructor(private bookingService: BookingService) {
    this.bookingService.getAllReservations().then((data) => {
      this.reservations = data!.map((elem) => {
        return {
          title: `${elem.Customers.name} - ${elem.Rooms.name}`,
          start: elem.start,
          end: elem.end,
          color: elem.Rooms.color,
          textColor: elem.Rooms.textColor,
        };
      });
      this.calendarOptions.events = this.reservations;
    });
  }

  click() {
    console.log('click');
  }
}
