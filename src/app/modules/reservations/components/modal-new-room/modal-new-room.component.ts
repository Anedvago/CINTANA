import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ButtonBlueComponent } from 'src/app/shared/button-blue/button-blue.component';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
@Component({
  selector: 'app-modal-new-room',
  standalone: true,
  imports: [CommonModule, CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    ButtonBlueComponent],
  templateUrl: './modal-new-room.component.html',
  styleUrls: ['./modal-new-room.component.css']
})
export class ModalNewRoomComponent {
  constructor(
    public dialogRef: MatDialogRef<ModalNewRoomComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {

  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
