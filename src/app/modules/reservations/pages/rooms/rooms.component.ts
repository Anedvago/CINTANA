import { ChangeDetectorRef, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonBlueComponent } from 'src/app/shared/button-blue/button-blue.component';
import { MatCardModule } from '@angular/material/card';
import { RoomService } from 'src/app/services/room.service';
import { CardRoomComponent } from '../../components/card-room/card-room.component';

@Component({
  selector: 'app-rooms',
  standalone: true,
  imports: [
    CommonModule,
    ButtonBlueComponent,
    MatCardModule,
    CardRoomComponent,
  ],
  templateUrl: './rooms.component.html',
  styleUrls: ['./rooms.component.css'],
})
export class RoomsComponent {
  rooms: any[] = [];
  constructor(private roomService: RoomService) {
    this.getAllRooms();
  }

  getAllRooms() {
    this.roomService.getRoomsSuscribe().subscribe((data: any) => {
      this.rooms = data;
    });
  }
}
