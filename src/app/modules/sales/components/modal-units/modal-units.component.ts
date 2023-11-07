import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-modal-units',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './modal-units.component.html',
  styleUrls: ['./modal-units.component.css']
})
export class ModalUnitsComponent {
  constructor(
    public dialogRef: MatDialogRef<ModalUnitsComponent>,

    @Inject(MAT_DIALOG_DATA) public data: any,

  ) {

  }
}
