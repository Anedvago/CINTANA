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
import { AlertService } from 'src/app/services/alert.service';

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
    public dialog: MatDialog,
    private alertService: AlertService
  ) {}

  getReservationToCheck() {
    if (
      this.typeIdentification == undefined ||
      this.typeIdentification == '' ||
      this.dniCustomer == undefined ||
      this.dniCustomer == ''
    ) {
      this.alertService.simpleAlert(
        'error',
        'Error en los datos',
        'Complete el formulario de forma correcta...'
      );
    } else {
      this.customerservice
        .getClientsByDni(this.typeIdentification, this.dniCustomer)
        .then((data: any) => {
          if (data.length == 0) {
            this.alertService.simpleAlert(
              'error',
              'Error en la consulta',
              'El cliente no existe...'
            );
          } else {
            this.bookingService
              .getReservationToCheck(data[0].id)
              .then((data: any) => {
                if (data.length == 0) {
                  this.alertService.simpleAlert(
                    'error',
                    'Error en la consulta',
                    'El cliente no tiene reservaciones activas...'
                  );
                } else {
                  const start = new Date();
                  start.setMonth(start.getMonth());
                  this.dialog.open(ModalNewReservationComponent, {
                    data: {
                      reservation: { ...data[0], start: start },
                      origin: 'CHECK',
                    },
                  });
                }
              });
          }
        });
    }
  }
}
