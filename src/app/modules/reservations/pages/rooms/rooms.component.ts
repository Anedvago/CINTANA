import { ChangeDetectorRef, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonBlueComponent } from 'src/app/shared/button-blue/button-blue.component';
import { MatCardModule } from '@angular/material/card';
import { RoomService } from 'src/app/services/room.service';
import { CardRoomComponent } from '../../components/card-room/card-room.component';
import { REALTIME_CHANNEL_STATES } from '@supabase/supabase-js';

@Component({
  selector: 'app-rooms',
  standalone: true,
  imports: [CommonModule, ButtonBlueComponent, MatCardModule, CardRoomComponent],
  templateUrl: './rooms.component.html',
  styleUrls: ['./rooms.component.css']
})
export class RoomsComponent {
  rooms: any[] = [];
  constructor(private roomService: RoomService, private cdr:ChangeDetectorRef) {
    this.getAllRooms();

  }

  getAllRooms() {
    this.roomService.getAllRooms().then((data) => {
      this.rooms = data!.map((obj) => {
        return { ...obj, state: "libre" }
      });
      this.getRoomsOcuped();
     
    })
  }

  getRoomsOcuped() {    
    this.roomService.getRoomsOcupedSuscribe().subscribe((data: any) => {
      console.log(data);
      data.forEach((room:any) => {
        this.rooms.find((elem:any) => room.room == elem.id).state = 'ocupada';
      });
      this.getRoomsReserved();
      this.cdr.detectChanges()
    })
  }
  getRoomsReserved() {    
    this.roomService.getRoomsReservedSuscribe().subscribe((data: any) => {
      console.log(data);
      data.forEach((room:any) => {
        this.rooms.find((elem:any) => room.room == elem.id).state = 'reservada';
      });
      this.cdr.detectChanges()
    })
  }
}
