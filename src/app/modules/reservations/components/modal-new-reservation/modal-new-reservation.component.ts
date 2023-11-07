import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogRef,
} from '@angular/material/dialog';
import { RoomService } from 'src/app/services/room.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatCardModule } from '@angular/material/card';
import { ButtonBlueComponent } from 'src/app/shared/button-blue/button-blue.component';
import { ClientService } from 'src/app/services/client.service';
import { DateService } from 'src/app/services/date.service';
import { BookingService } from 'src/app/services/booking.service';
import { ModalCheckOutComponent } from '../modal-check-out/modal-check-out.component';
import { AlertService } from 'src/app/services/alert.service';
@Component({
  selector: 'app-modal-new-reservation',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
    MatCardModule,
    ButtonBlueComponent,
  ],
  templateUrl: './modal-new-reservation.component.html',
  styleUrls: ['./modal-new-reservation.component.css'],
})
export class ModalNewReservationComponent {
  public rooms: any = [];
  public typeIdentification: string = '';
  public dniCustomer: string = '';
  public dateStart: string = '';
  public dateEnd: string = '';
  public typesIdentifications = [
    { name: 'CÉDULA DE CIUDADANÍA', value: 'CC' },
    { name: 'TARJETA DE IDENTIDAD', value: 'TI' },
    { name: 'CÉDULA DE EXTRANJERÍA', value: 'CE' },
    { name: 'PASAPORTE', value: 'PA' },
  ];
  public typesPay = ['EFECTIVO', 'TRANSFERENCIA'];
  customer?: any;
  numberOfPeople = 0;
  room?: number;
  metodPay?: string;
  total: number = 0;
  payed: number = 0;
  createCustomerState = false;
  nameNewCustomer = '';
  phoneNewCustomer = '';

  constructor(
    public dialogRef: MatDialogRef<ModalNewReservationComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private roomService: RoomService,
    private customerService: ClientService,
    private dateService: DateService,
    private bookingService: BookingService,
    public dialog: MatDialog,
    private alertService: AlertService
  ) {
    this.getAllRooms();
    if (data.reservation != undefined) {
      this.setReservationInStage();
    }
  }

  setReservationInStage() {
    this.getCustomerById(this.data.reservation.customer);
    this.dateStart = this.data.reservation.start;
    this.dateEnd = this.data.reservation.end;
    this.numberOfPeople = this.data.reservation.numberOfPeople;
    this.room = this.data.reservation.room;
    this.metodPay = this.data.reservation.wayToPay;
    this.total = this.data.reservation.total;
    this.payed = this.data.reservation.paid;
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  public getAllRooms() {
    this.roomService.getRoomsNotSuscribe().then((data) => {
      this.rooms = data;
    });
  }

  public getCustomerByDni() {
    this.customerService
      .getClientsByDni(this.typeIdentification, this.dniCustomer)
      .then((data) => {
        console.log(data);

        if (data != undefined && data.length != 0) {
          this.customer = data![0];
        } else {
          this.createCustomerState = true;
        }
      });
  }

  public getCustomerById(id: number) {
    this.customerService.getClientsById(id).then((data) => {
      this.customer = data![0];
      (this.dniCustomer = this.customer.identification),
        (this.typeIdentification = this.customer.typeIdentification);
    });
  }

  public createNewCustomer() {
    this.customerService
      .createNewCustomer(
        this.typeIdentification,
        this.dniCustomer,
        this.nameNewCustomer,
        this.phoneNewCustomer
      )
      .then(() => {
        this.createCustomerState = false;
        this.getCustomerByDni();
      });
  }
  public calcTotal() {
    this.total = 0;
    const dateStart = new Date(this.dateStart);
    const dateEnd = new Date(this.dateEnd);
    const miliSeconds = Math.abs(Number(dateEnd) - Number(dateStart));
    const days = miliSeconds / 86400000;
    console.log(days);

    this.total = days * 80000 * this.numberOfPeople;
  }

  public createReservation() {
    if (
      this.dateStart == undefined ||
      this.dateEnd == undefined ||
      this.room == undefined ||
      this.customer == undefined ||
      this.total == 0 ||
      this.total == undefined ||
      this.payed == 0 ||
      this.payed == undefined ||
      this.metodPay == undefined ||
      this.numberOfPeople == undefined
    ) {
      this.alertService.simpleAlert(
        'error',
        'Error en los datos',
        'Revise si llenó correctamente el formulario'
      );
    } else {
      if (this.data.reservation != undefined) {
        this.bookingService
          .updateReservation(
            this.dateService.convertDateInputToStringWithTime(
              this.dateStart,
              '12:00'
            ),
            this.dateService.convertDateInputToStringWithTime(
              this.dateEnd,
              '11:00'
            ),
            this.room!,
            this.customer.id,
            this.total,
            this.payed,
            this.metodPay!,
            this.numberOfPeople,
            this.data.reservation.id
          )
          .then(() => {
            this.dialogRef.close();
            this.alertService.simpleAlert(
              'success',
              'Reservacion actualizada con exito!',
              'Revise el estado de la reserva en el calendario...'
            );
          });
      } else {
        this.bookingService
          .createReservation(
            this.dateService.convertDateInputToStringWithTime(
              this.dateStart,
              '12:00'
            ),
            this.dateService.convertDateInputToStringWithTime(
              this.dateEnd,
              '11:00'
            ),
            this.room!,
            this.customer.id,
            this.total,
            this.payed,
            this.metodPay!,
            this.numberOfPeople
          )
          .then(() => {
            this.dialogRef.close();
            this.alertService.simpleAlert(
              'success',
              'Reservacion realizada con exito!',
              'Revise el estado de la reserva en el calendario...'
            );
          });
      }
    }
  }

  public deleteReservation() {
    this.bookingService.deleteReservation(this.data.reservation.id).then(() => {
      this.dialogRef.close();
      this.alertService.simpleAlert(
        'success',
        'Reserva Eliminada Correctamente',
        ''
      );
    });
  }

  public checkIn() {
    this.bookingService.checkIn(this.data.reservation.id).then(() => {
      this.dialogRef.close();
    });
  }
  public checkOut() {
    const dialogRef = this.dialog.open(ModalCheckOutComponent, {
      data: { reservation: this.data.reservation },
    });
    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
      this.dialog.closeAll();
    });
  }

  openDialog(): void {}
}
