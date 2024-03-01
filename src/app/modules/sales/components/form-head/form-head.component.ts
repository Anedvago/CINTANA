import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule } from '@angular/forms';
import { RoomService } from 'src/app/services/room.service';
import { ArticleService } from 'src/app/services/article.service';
import { AlertService } from 'src/app/services/alert.service';

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
  referencia: string = ""
  listaDeArticulos: any[] = [];

  constructor(private habitacionService: RoomService, private articuloService: ArticleService, private alertaService: AlertService) {

  }
  ngOnInit(): void {

    this.obtenerTodasLasHabitaciones()
  }

  obtenerTodasLasHabitaciones() {
    this.habitacionService.getAllRooms().then((data) => {
      this.habitaciones = data
    })
  }
  buscarArticuloPorReferencia() {
    this.articuloService.getArticleByRef(this.referencia).then((data: any) => {
      if (data.length > 0) {
        this.listaDeArticulos.push(data[0]);
        console.log(this.listaDeArticulos);
        //AQUI CAMBIAR Y COLOCAR UN OUTPUT CADA QUE SE BUSQUE UN ARTICULO
        //EN EL COMPONENTE PADRE QUE SE VAYA GUARDANDO LA LISTA DE ARTICULOS
        //QUE EL COMPONENTE PADRE LE ENVIE LA LISTA AL OTRO COMPONENTE QUE LISTA LOS ARTICULOS
      } else {
        this.alertaService.simpleAlert(
          'error',
          'Articulo No Encontrado',
          'Digite el codigo nuevamente...'
        );
      }
      this.referencia = "";
    })
  }
}
