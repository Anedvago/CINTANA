import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { CardRoomComponent } from '../../components/card-room/card-room.component';
import { RoomService } from 'src/app/services/room.service';
import { VerticalBarsComponent } from '../../components/vertical-bars/vertical-bars.component';
import { TableComponent } from 'src/app/shared/table/table.component';
import { ClientService } from 'src/app/services/client.service';
import { ArticleService } from 'src/app/services/article.service';
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
    private articleService: ArticleService
  ) {
    this.setCardRooms();
    this.getClientsReserved();
    this.getClientsOcuped();
    this.getArticlesWithLowStock();
  }

  public setCardRooms() {
    this.roomService.getAllRooms().then((data) => {
      this.totalRooms = data!.length;
      this.roomService.getRoomsReserved().then((data) => {
        this.reservedRooms = data!.length;
        this.roomService.getRoomsOcuped().then((data) => {
          this.ocupedRooms = data!.length;
          this.freeRooms =
            this.totalRooms - this.reservedRooms - this.ocupedRooms;
        });
      });
    });
  }

  columnsInd: string[] = ['nombre', 'estado', 'habitacion'];
  columnsIndDisplay: string[] = ['Nombre Cliente', 'Estado', 'Habitacion'];
  rowsInd: any[] = [];

  public columnsStock = ['Articulo', 'Estado', 'Stock'];
  public rowsStock: any[] = [];

  public getClientsReserved() {
    this.clientService.getClientsReserved().then((data) => {
      const arr = data!.map((item: any) => {
        return {
          nombre: item.Customers.name,
          estado: 'Reservado',
          habitacion: item.Rooms.name,
        };
      });
    
      this.rowsInd = this.rowsInd.concat(arr);
     
    });
  }
  public getClientsOcuped() {
    this.clientService.getClientsOcuped().then((data) => {
      const arr = data!.map((item: any) => {
        return {
          nombre: item.Customers.name,
          estado: 'Ocupado',
          habitacion: item.Rooms.name,
        };
      });
      this.rowsInd = this.rowsInd.concat(arr);
    
    });
  }

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
