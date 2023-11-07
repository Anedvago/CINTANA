import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { BookingService } from 'src/app/services/booking.service';
import { ButtonBlueComponent } from 'src/app/shared/button-blue/button-blue.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-modal-check-out',
  standalone: true,
  imports: [
    CommonModule,
    ButtonBlueComponent,
    MatFormFieldModule,
    MatSelectModule,
  ],
  templateUrl: './modal-check-out.component.html',
  styleUrls: ['./modal-check-out.component.css'],
})
export class ModalCheckOutComponent {
  public states: string[] = ['Bueno', 'Malo'];

  constructor(
    public dialogRef: MatDialogRef<ModalCheckOutComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private bookingService: BookingService
  ) {}

  public checkOut() {
    this.bookingService.checkOut(this.data.reservation.id).then(() => {
      this.dialogRef.close();
    });
  }
}
