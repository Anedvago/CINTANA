import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonBlueComponent } from 'src/app/shared/button-blue/button-blue.component';
import { FullCalendarModule } from '@fullcalendar/angular';
import { CalendarOptions } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
@Component({
  selector: 'app-calendario',
  standalone: true,
  imports: [CommonModule, ButtonBlueComponent, FullCalendarModule],
  templateUrl: './calendario.component.html',
  styleUrls: ['./calendario.component.css'],
})
export class CalendarioComponent {
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
  openDialog() {}
  click(event: any) {}
}
