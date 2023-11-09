import { Component, ElementRef, Inject, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { BookingService } from 'src/app/services/booking.service';
import { ButtonBlueComponent } from 'src/app/shared/button-blue/button-blue.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { DateService } from 'src/app/services/date.service';
import { AlertService } from 'src/app/services/alert.service';
import { ClientService } from 'src/app/services/client.service';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import * as html2pdf from 'html2pdf.js';
@Component({
  selector: 'app-modal-check-out',
  standalone: true,
  imports: [
    CommonModule,
    ButtonBlueComponent,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    FormsModule
  ],
  templateUrl: './modal-check-out.component.html',
  styleUrls: ['./modal-check-out.component.css'],
})
export class ModalCheckOutComponent {
  public states: string[] = ['Bueno', 'Malo'];

  public rooms: any = [];
  public typeIdentification: string = '';
  public dniCustomer: string = '';
  public dateStart: string = '';
  public hourStart: string = '12';
  public minuteStart: string = '00';
  public dateEnd: string = '';
  public hourEnd: string = '11';
  public minuteEnd: string = '00';
  public typesIdentifications = [
    { name: 'CÉDULA DE CIUDADANÍA', value: 'CC' },
    { name: 'TARJETA DE IDENTIDAD', value: 'TI' },
    { name: 'CÉDULA DE EXTRANJERÍA', value: 'CE' },
    { name: 'PASAPORTE', value: 'PA' },
  ];
  public typesPay = ['EFECTIVO', 'TRANSFERENCIA'];
  customer?: any;
  numberOfAdults = 0;
  numberOfChilds = 0;
  room?: number;
  metodPay?: string;
  total: number = 0;
  payed: number = 0;
  createCustomerState = false;
  nameNewCustomer = '';
  phoneNewCustomer = '';

  charges = [{ name: "Estado de las llaves", state: "Bueno", value: 0 },
  { name: "Estado del colchón", state: "Bueno", value: 0 },
  { name: "Estado de las sabanas", state: "Bueno", value: 0 },
  { name: "Estado de las almohadas", state: "Bueno", value: 0 },
  { name: "Estado de las bombillos", state: "Bueno", value: 0 },
  { name: "Estado de las toallas", state: "Bueno", value: 0 },
  { name: "Estado de las ventiladores", state: "Bueno", value: 0 },
  { name: "Otros cargos adicionales", state: "Bueno", value: 0 }]

  @ViewChild('facturaContent', { static: false }) facturaContent!: ElementRef;

  constructor(
    public dialogRef: MatDialogRef<ModalCheckOutComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private bookingService: BookingService,
    private dateService: DateService,
    private alertService: AlertService,
    private customerService: ClientService
  ) {
    this.setReservationInStage();
  }

  setReservationInStage() {
    const start = new Date(this.data.reservation.start);
    const end = new Date(this.data.reservation.end);
    this.getCustomerById(this.data.reservation.customer);
    this.dateStart = this.data.reservation.start;
    this.dateEnd = this.data.reservation.end;
    this.numberOfAdults = this.data.reservation.numberOfAdults;
    this.numberOfChilds = this.data.reservation.numberOfChilds;
    this.room = this.data.reservation.room;
    this.metodPay = this.data.reservation.wayToPay;
    this.total = this.data.reservation.total;
    this.payed = this.data.reservation.paid;
    this.hourStart = start.getHours().toString().padStart(2, '0');
    this.minuteStart = start.getMinutes().toString().padStart(2, '0');
    this.hourEnd = end.getHours().toString().padStart(2, '0');
    this.minuteEnd = end.getMinutes().toString().padStart(2, '0');
  }
  public checkOut() {

    const url = 'https://cintana-dihi-a7k44gkg--4200--5a198b5c.local-corp.webcontainer.io/billing';
    window.open(url, '_blank');
    

     /*const content: HTMLElement = this.facturaContent.nativeElement;

    const options = {
      margin: 10,
      filename: 'factura.pdf',
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
    };

    html2pdf()
      .from(content)
      .set(options)
      .outputPdf((pdf:any) => {
        const blob = new Blob([pdf], { type: 'application/pdf' });
        const url = window.URL.createObjectURL(blob);
        window.open(url);
      });*/

    /*this.bookingService.checkOut(this.data.reservation.id).then(() => {
      this.bookingService
        .updateReservation(
          this.dateService.convertDateInputToStringWithTime(
            this.dateStart,
            `${this.hourStart.padStart(2, '0')}:${this.minuteStart.padStart(
              2,
              '0'
            )}`
          ),
          this.dateService.convertDateInputToStringWithTime(
            this.dateEnd,
            `${this.hourEnd.padStart(2, '0')}:${this.minuteEnd.padStart(
              2,
              '0'
            )}`
          ),
          this.room!,
          this.customer.id,
          this.total,
          this.payed,
          this.metodPay!,
          this.numberOfAdults,
          this.numberOfChilds,
          this.data.reservation.id
        )
        .then(() => {
          this.dialogRef.close();
          this.alertService.simpleAlert(
            'success',
            'Check In Realizado con exito!!',
            'Revise el estado de la reserva en el calendario...'
          );
        });
    });*/
  }

  public getCustomerById(id: number) {
    this.customerService.getClientsById(id).then((data) => {
      this.customer = data![0];
      (this.dniCustomer = this.customer.identification),
        (this.typeIdentification = this.customer.typeIdentification);
    });
  }
}
