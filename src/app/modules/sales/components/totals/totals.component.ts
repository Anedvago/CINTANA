import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { TableComponent } from 'src/app/shared/table/table.component';

@Component({
  selector: 'app-totals',
  standalone: true,
  imports: [CommonModule, MatCardModule, TableComponent],
  templateUrl: './totals.component.html',
  styleUrls: ['./totals.component.css']
})
export class TotalsComponent {
  @Input() totales: any;
  nombresColumnas = ["Total Bruto", "Total Descuento", "Total Neto"]
  columnas = ["totalBruto", "totalDescuento", "totalNeto"]
}
