import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableComponent } from 'src/app/shared/table/table.component';
import { BookingService } from 'src/app/services/booking.service';
import { ActivatedRoute } from '@angular/router';
import { ClientService } from 'src/app/services/client.service';
import { DateService } from 'src/app/services/date.service';

@Component({
  selector: 'app-facture',
  standalone: true,
  imports: [CommonModule, TableComponent],
  templateUrl: './facture.component.html',
  styleUrls: ['./facture.component.css'],
})
export class FactureComponent {
  constructor(
    private bookingService: BookingService,
    private route: ActivatedRoute,
    private customerService: ClientService,
    private dateService: DateService
  ) {
    this.route.params.subscribe((data) => {
      this.idCustomer = data['idCustomer'];
      this.valuesCharges = data['values'].split('-');
      /*  console.log(data['values']); */
      console.log(this.valuesCharges);

      this.obtenerCliente();
      this.obtenerReserva();
      this.esperar();
      //window.print();
    });
  }

  idCustomer?: number;
  customer: any;
  reservation: any;
  columsCustomer: string[] = [];
  columsCustomerDisplay: string[] = ['ID', 'CLIENTE', 'TELEFONO'];
  columsReservation: string[] = [];
  columsReservationDisplay: string[] = ['CONCEPTO', 'VALOR'];
  dateFacture: string = '';
  valuesCharges: string[] = [];

  charges = [
    'Estado de las llaves',
    'Estado del colchón',
    'Estado de las sabanas',
    'Estado de las almohadas',
    'Estado de las bombillos',
    'Estado de las toallas',
    'Estado de las ventiladores',
    'Otros cargos adicionales',
  ];

  rowsReservation: any[] = [];
  idReservation!: number;
  date!: string;

  obtenerReserva() {
    const date = new Date();
    const now = this.dateService.convertDateInputToString(date.toString());
    this.dateFacture = now;
    this.bookingService
      .getReservationToCheckOut(this.idCustomer!)
      .then((data: any) => {
        this.idReservation = data[0].id;
        this.date = now;
        this.reservation = {
          name: `Servicios de habitacion o cabaña`,
          value: data[0]!.total,
        };
        this.columsReservation = ['name', 'value'];
        this.rowsReservation.push(this.reservation),
          this.charges.forEach((element, index) => {
            this.rowsReservation.push({
              name: element,
              value: parseInt(this.valuesCharges[index]),
            });
          });
        let suma = 0;
        this.rowsReservation.forEach((elem) => {
          suma += elem.value;
        });
        this.rowsReservation.push({
          name: 'TOTAL',
          value: suma,
        });
        this.rowsReservation = this.rowsReservation
          .filter((data) => {
            return data.value != 0;
          })
          .map((data) => {
            return {
              ...data,
              value: this.formatearMonedaColombiana(data.value),
            };
          });
      });
  }

  obtenerCliente() {
    this.customerService.getClientsById(this.idCustomer!).then((data) => {
      this.customer = data![0];
      this.columsCustomer = ['identification', 'name', 'phone'];
    });
  }

  esperar() {
    /* setTimeout(() => {
      this.bookingService.checkOut(this.idReservation).then(() => {
        window.print();
      });
    }, 2000); */
    setTimeout(() => {
      window.print();
    }, 2000);
  }
  formatearMonedaColombiana(numero): string {
    const formatoColombiano = new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
    });

    return formatoColombiano.format(numero);
  }
}
