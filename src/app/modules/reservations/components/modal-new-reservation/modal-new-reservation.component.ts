import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { RoomService } from 'src/app/services/room.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { DateAdapter, MatNativeDateModule } from '@angular/material/core';
@Component({
  selector: 'app-modal-new-reservation',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
  ],
  templateUrl: './modal-new-reservation.component.html',
  styleUrls: ['./modal-new-reservation.component.css'],
})
export class ModalNewReservationComponent {
  public rooms: any = [];
  public dniCustomer: string = '';
  public nameCustomer: string = '';
  public telCustomer: string = '';
  public dateStart: string = '';
  public dateEnd: string = '';

  constructor(
    public dialogRef: MatDialogRef<ModalNewReservationComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private roomService: RoomService
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  public getAllRooms() {
    this.roomService.getRoomsNotSuscribe().then((data) => {
      this.rooms = data;
    });
  }

  public getCustomerByDni() {}
}
