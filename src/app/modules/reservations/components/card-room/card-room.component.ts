import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { ModalNewRoomComponent } from '../modal-new-room/modal-new-room.component';

@Component({
  selector: 'app-card-room',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule, MatDialogModule,ModalNewRoomComponent],
  templateUrl: './card-room.component.html',
  styleUrls: ['./card-room.component.css']
})
export class CardRoomComponent {
  @Input()
  room!: any;
  constructor(public dialog: MatDialog) { }

  openDialog(): void {
    const dialogRef = this.dialog.open(ModalNewRoomComponent, {
      data: {},
    });

    dialogRef.afterClosed().subscribe((result) => {

    });
  }
}
