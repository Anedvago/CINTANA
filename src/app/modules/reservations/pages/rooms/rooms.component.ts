import { ChangeDetectorRef, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonBlueComponent } from 'src/app/shared/button-blue/button-blue.component';
import { MatCardModule } from '@angular/material/card';
import { RoomService } from 'src/app/services/room.service';
import { CardRoomComponent } from '../../components/card-room/card-room.component';
import { ModalNewRoomComponent } from '../../components/modal-new-room/modal-new-room.component';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';

@Component({
  selector: 'app-rooms',
  standalone: true,
  imports: [
    CommonModule,
    ButtonBlueComponent,
    MatCardModule,
    CardRoomComponent,
    MatDialogModule, ModalNewRoomComponent
  ],
  templateUrl: './rooms.component.html',
  styleUrls: ['./rooms.component.css'],
})
export class RoomsComponent {
  rooms: any[] = [];
  room = { name: "", type: "", color: "#000000" };
  constructor(private roomService: RoomService, private cdr: ChangeDetectorRef, public dialog: MatDialog) {
    this.getAllRooms();
  }

  getAllRooms() {
    this.roomService.getRoomsSuscribe().subscribe((data: any) => {
      this.rooms = data;
      this.cdr.detectChanges();
    });
  }

  openDialog(): void {
   
    const dialogRef = this.dialog.open(ModalNewRoomComponent, {
      data: { room: this.room },
    });

    dialogRef.afterClosed().subscribe((result) => {
      this.room = { name: "", type: "", color: "#000000" };
      this.getAllRooms()
    });
  }

  selectRoom(room: any) {
    this.room = room;
    console.log(room);

  }
}
