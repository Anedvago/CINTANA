import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableComponent } from 'src/app/shared/table/table.component';
import { BookingService } from 'src/app/services/booking.service';
import { ActivatedRoute } from '@angular/router';
import { ClientService } from 'src/app/services/client.service';

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
    private customerService: ClientService
  ) {
    this.route.params.subscribe((data) => {
      window.print();
      this.bookingService
        .getReservationToCheck(data['idCustomer'])
        .then((data: any) => {
          this.customerService
            .getClientsById(data[0]!.customer)
            .then((data: any) => {
              console.log(data);

              this.rowsCustomer.push({
                ID: data[0].identification,
                CLIENTE: data[0].name,
                TELEFONO: data[0].phone,
              });
            });
        });
    });
  }

  columsCustomer = ['ID', 'CLIENTE', 'TELEFONO'];
  rowsCustomer: any[] = [];
}
