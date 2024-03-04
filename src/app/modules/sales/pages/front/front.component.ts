import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormHeadComponent } from '../../components/form-head/form-head.component';
import { ListArticlesComponent } from '../../components/list-articles/list-articles.component';
import { TotalsComponent } from '../../components/totals/totals.component';
@Component({
  selector: 'app-front',
  standalone: true,
  imports: [CommonModule, FormHeadComponent, ListArticlesComponent, TotalsComponent],
  templateUrl: './front.component.html',
  styleUrls: ['./front.component.css'],
})
export class FrontComponent {

  listaDeArticulos: any[] = [];

  manejadorDeArticuloEncontrado(event: any) {
    //aqui se puede hacer algo para sumar las unidades automaticamente
    this.listaDeArticulos.push(event);
    this.listaDeArticulos = this.listaDeArticulos.map((articulo: any) => {
      return { ...articulo, unidades: "1", descuento: "0", valorTotal: articulo.value }
    })
  }
}
