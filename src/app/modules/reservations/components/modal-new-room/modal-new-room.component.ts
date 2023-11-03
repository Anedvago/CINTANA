import { ChangeDetectorRef, Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ButtonBlueComponent } from 'src/app/shared/button-blue/button-blue.component';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';
import { RoomService } from 'src/app/services/room.service';
@Component({
  selector: 'app-modal-new-room',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    ButtonBlueComponent,
    MatSelectModule,
  ],
  templateUrl: './modal-new-room.component.html',
  styleUrls: ['./modal-new-room.component.css'],
})
export class ModalNewRoomComponent {
  constructor(
    public dialogRef: MatDialogRef<ModalNewRoomComponent>,
    private roomService: RoomService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private cdr: ChangeDetectorRef
  ) {
    this.room = data.room;
  }

  public types: string[] = ['Habitación', 'Cabaña'];

  public room: any;

  onNoClick(): void {
    this.dialogRef.close();
  }

  public createNewRoom() {
    if (this.room.id != undefined) {
      console.log(this.room, 'ACTUALIZA');

      this.roomService.updateRoom(this.room).then(() => {
        this.dialogRef.close();
      });
    } else {
      this.roomService.createNewRoom(this.room).then(() => {
        this.dialogRef.close();
      });
    }
  }

  deleteRoom() {
    this.roomService.deleteRoom(this.room.id).then(() => {
      this.dialogRef.close();
    });
  }
}
