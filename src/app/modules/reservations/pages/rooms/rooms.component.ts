import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonBlueComponent } from 'src/app/shared/button-blue/button-blue.component';
import { MatCardModule } from '@angular/material/card';
import { RoomService } from 'src/app/services/room.service';

@Component({
  selector: 'app-rooms',
  standalone: true,
  imports: [CommonModule, ButtonBlueComponent, MatCardModule],
  templateUrl: './rooms.component.html',
  styleUrls: ['./rooms.component.css']
})
export class RoomsComponent {
  rooms: any[] = [];
  constructor(private roomService: RoomService) {
    this.getAllRooms();
  }

  getAllRooms() {
    this.roomService.getAllRooms().then((data) => {
      this.rooms = data!;
    })
  }
}
