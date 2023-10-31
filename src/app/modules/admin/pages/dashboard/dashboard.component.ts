import { ChangeDetectorRef, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { CardRoomComponent } from '../../components/card-room/card-room.component';
import { RoomService } from 'src/app/services/room.service';
import { VerticalBarsComponent } from '../../components/vertical-bars/vertical-bars.component';
import { TableComponent } from 'src/app/shared/table/table.component';
import { ClientService } from 'src/app/services/client.service';
import { ArticleService } from 'src/app/services/article.service';
import { BookingService } from 'src/app/services/booking.service';
@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    CardRoomComponent,
    VerticalBarsComponent,
    TableComponent,
  ],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent {
  public totalRooms: number = 0;
  public reservedRooms: number = 0;
  public freeRooms: number = 0;
  public ocupedRooms: number = 0;

  constructor(
    private roomService: RoomService,
    private clientService: ClientService,
    private articleService: ArticleService,
    private bookingService: BookingService,
    private cdr: ChangeDetectorRef
  ) {
    this.setCardRooms();
    //this.getClientsReserved();
    //this.getClientsOcuped();
    this.getArticlesWithLowStock();
    this.getClientsInTransit()
  }

  public setCardRooms() {
    this.roomService.getRoomsSuscribe().subscribe((data: any) => {
      this.totalRooms = data.length;
      this.ocupedRooms = 0;
      this.reservedRooms = 0;
      this.freeRooms = 0;
      data.forEach((element: any) => {
        if (element.state == 'ocupada') {
          this.ocupedRooms++;
        } else if (element.state == 'reservada') {
          this.reservedRooms++;
        } else {
          this.freeRooms++;
        }
      });
      this.cdr.detectChanges();
    });
  }

  columnsInd: string[] = ['nombre', 'estado', 'habitacion'];
  columnsIndDisplay: string[] = ['Nombre Cliente', 'Estado', 'Habitacion'];
  rowsInd: any[] = [];

  public columnsStock = ['Articulo', 'Estado', 'Stock'];
  public rowsStock: any[] = [];

  public getClientsInTransit(){
    this.clientService.getClientsInTransitSubscribe().subscribe((data:any)=>{
      this.rowsInd = data;
      this.cdr.detectChanges();
    })
  }

  /*public getClientsReserved() {
    this.clientService.getClientsReserved().subscribe((data: any) => {
      const arr = data!.map((item: any) => {
        return {
          nombre: item.Customers.name,
          estado: 'Reservado',
          habitacion: item.Rooms.name,
        };
      });

      this.rowsInd = this.rowsInd.concat(arr);
      this.cdr.detectChanges();
    });
  }
  public getClientsOcuped() {
    this.clientService.getClientsOcuped().subscribe((data: any) => {
      const arr = data!.map((item: any) => {
        return {
          nombre: item.Customers.name,
          estado: 'Ocupado',
          habitacion: item.Rooms.name,
        };
      });
      this.rowsInd = this.rowsInd.concat(arr);
      this.cdr.detectChanges();
    });
  }*/

  public getArticlesWithLowStock() {
    this.articleService.getArticlesWithLowStock().then((data) => {
      this.rowsStock = data!.map((item: any) => {
        return {
          Articulo: item.name,
          Estado: item.stock == 0 ? 'Agotado' : 'Por Agotar',
          Stock: item.stock,
        };
      });
    });
  }
}
