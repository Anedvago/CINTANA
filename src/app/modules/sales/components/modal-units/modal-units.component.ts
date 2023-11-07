import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-modal-units',
  standalone: true,
  imports: [CommonModule,MatFormFieldModule,MatInputModule,FormsModule],
  templateUrl: './modal-units.component.html',
  styleUrls: ['./modal-units.component.css']
})
export class ModalUnitsComponent {

  constructor(
    public dialogRef: MatDialogRef<ModalUnitsComponent>,

    @Inject(MAT_DIALOG_DATA) public data: any,

  ) {

  }

  close(){
    this.dialogRef.close(this.data.units)
  }
}
