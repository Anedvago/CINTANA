import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule } from '@angular/forms';
import { RoomService } from 'src/app/services/room.service';

@Component({
  selector: 'app-form-head',
  standalone: true,
  imports: [CommonModule, FormsModule, MatCardModule, MatButtonModule, MatFormFieldModule, MatInputModule, MatSelectModule],
  templateUrl: './form-head.component.html',
  styleUrls: ['./form-head.component.css']
})
export class FormHeadComponent implements OnInit {

  opcionesFormasDePago: string[] = ["EFECTIVO", "TRANSFERENCIA", "DATAFONO", "CHECK-OUT"]
  opcionesVentaPara: string[] = ["CLIENTE", "HABITACION"]
  ventaPara: string = "";
  habitaciones: any[] = [];
  constructor(private habitacionService: RoomService) {

  }
  ngOnInit(): void {

    this.habitacionService.getAllRooms().then((data) => {
      this.habitaciones = data

    })
  }

}
