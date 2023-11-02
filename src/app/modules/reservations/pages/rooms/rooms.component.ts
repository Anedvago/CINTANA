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
    MatDialogModule
  ],
  templateUrl: './rooms.component.html',
  styleUrls: ['./rooms.component.css'],
})
export class RoomsComponent {
  rooms: any[] = [];
  constructor(private roomService: RoomService, private cdr:ChangeDetectorRef,public dialog: MatDialog) {
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
      data: {},
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
    });
  }
}
