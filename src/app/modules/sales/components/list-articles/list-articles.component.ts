import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { TableComponent } from 'src/app/shared/table/table.component';
@Component({
  selector: 'app-list-articles',
  standalone: true,
  imports: [CommonModule, MatCardModule, TableComponent],
  templateUrl: './list-articles.component.html',
  styleUrls: ['./list-articles.component.css']
})
export class ListArticlesComponent implements OnChanges {
  @Input() listaDeArticulos: any[] = [];
  columnasDelObjeto: string[] = ['ref', 'name', 'unidades', 'value', 'descuento', 'valorTotal'];
  columnasDeLaTabla: string[] = ['Referencia', 'Descripcion', "Unidades", 'Precio', 'Descuento', 'Total'];

  ngOnChanges(changes: SimpleChanges) {

  }
}
