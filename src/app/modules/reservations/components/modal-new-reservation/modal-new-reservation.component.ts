import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { RoomService } from 'src/app/services/room.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatCardModule } from '@angular/material/card';
import { ButtonBlueComponent } from 'src/app/shared/button-blue/button-blue.component';
import { ClientService } from 'src/app/services/client.service';
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
  public typesPay = [
    { value: 'EF', name: 'EFECTIVO' },
    { value: 'TR', name: 'TRANSFERENCIA' },
  ];
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
    private customerService: ClientService
  ) {
    this.getAllRooms();
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
    /* this.total =  */

    console.log(this.dateStart);
  }
}
