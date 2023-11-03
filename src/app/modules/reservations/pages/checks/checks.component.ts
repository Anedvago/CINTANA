import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ButtonBlueComponent } from 'src/app/shared/button-blue/button-blue.component';
import { MatSelectModule } from '@angular/material/select';
import { BookingService } from 'src/app/services/booking.service';
import { ClientService } from 'src/app/services/client.service';
import { ModalNewReservationComponent } from '../../components/modal-new-reservation/modal-new-reservation.component';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';

@Component({
  selector: 'app-checks',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    ButtonBlueComponent,
    MatSelectModule,
    MatDialogModule,
    MatDatepickerModule,
    MatNativeDateModule,
  ],
  templateUrl: './checks.component.html',
  styleUrls: ['./checks.component.css'],
})
export class ChecksComponent {
  public typesIdentifications = [
    { name: 'CÉDULA DE CIUDADANÍA', value: 'CC' },
    { name: 'TARJETA DE IDENTIDAD', value: 'TI' },
    { name: 'CÉDULA DE EXTRANJERÍA', value: 'CE' },
    { name: 'PASAPORTE', value: 'PA' },
  ];
  public typeIdentification: string = '';
  public dniCustomer: string = '';

  constructor(
    private bookingService: BookingService,
    private customerservice: ClientService,
    public dialog: MatDialog
  ) {}

  getReservationToCheck() {
    this.customerservice
      .getClientsByDni(this.typeIdentification, this.dniCustomer)
      .then((data: any) => {
        this.bookingService
          .getReservationToCheck(data[0].id)
          .then((data: any) => {
            console.log(data);
            this.dialog.open(ModalNewReservationComponent, {
              data: { reservation: data[0], origin: 'CHECK' },
            });
          });
      });
  }
}
