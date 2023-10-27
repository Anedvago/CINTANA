import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonBlueComponent } from 'src/app/shared/button-blue/button-blue.component';
import { MatCardModule } from '@angular/material/card';
import { RoomService } from 'src/app/services/room.service';
import { CardRoomComponent } from '../../components/card-room/card-room.component';

@Component({
  selector: 'app-rooms',
  standalone: true,
  imports: [CommonModule, ButtonBlueComponent, MatCardModule, CardRoomComponent],
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
      this.rooms = data!.map((obj) => {
        return { ...obj, state: "free" }
      });
      this.getRoomsOcuped();
    })
  }

  getRoomsOcuped() {
    this.roomService.getRoomsOcupedSuscribe().subscribe((data: any) => {
      data!.forEach((element:any) => {
        const index = this.rooms.findIndex(objeto => objeto.id === element.room);
        this.rooms[index].state = "OCUPED"
      });
      
    })

  }
}
