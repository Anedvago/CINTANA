import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormDocumentComponent } from '../../components/form-document/form-document.component';
import { TableComponent } from 'src/app/shared/table/table.component';
import { DischargedService } from 'src/app/services/discharged.service';

@Component({
  selector: 'app-discharges',
  standalone: true,
  imports: [CommonModule, FormDocumentComponent, TableComponent],
  templateUrl: './discharges.component.html',
  styleUrls: ['./discharges.component.css']
})
export class DischargesComponent {
  public columnsList = ['date', 'id'];
  public columnsDisplayList = ['Fecha', 'Num'];
  public rowsList: any[] = [];
  public rowsListF: any[] = [];

  public columnsDetails = [
    'reference',
    'description',
    'units',
    'value',
    'discount',
    'total',
  ];
  public columnsDisplayDetails = [
    'Ref',
    'Descripcion',
    'Unidades',
    'Precio',
    'Descuento',
    'Total',
  ];
  public rowsDetails: any[] = [];

  public columnsTotals = ['references', 'units', 'gross', 'discount', 'net'];
  public columnsDisplayTotals = [
    'Refernecias',
    'Unidades',
    'Bruto',
    'Descuento',
    'Neto',
  ];
  public rowsTotals = [
    { references: '2', units: '4', raw: '15600', discount: '0', total: '4600' },
  ];

  public factureActive: number = 0;
  constructor(private dischargedService:DischargedService) {
    this.getListFactures();
  }

  public getListFactures() {
    this.dischargedService.getAllDischargesCab().then((data) => {
      this.rowsList = data!.map(function (obj) {
        return { id: obj.id, date: obj.date.substring(0, 10) };
      });
      this.rowsListF = data!.map(function (obj) {
        return { id: obj.id, date: obj.date.substring(0, 10) };
      });
      this.selectFacture(this.rowsListF[0])
    });
  }

  public getTotalsActive() {
    this.dischargedService.getAllDischargesCab().then((data) => {
      this.rowsTotals = data!.filter((elem) => {
        return elem.id == this.factureActive;
      });
    });
  }

  public getDeailsById() {
    this.dischargedService
      .getDischargesLinById(this.factureActive)
      .then((data) => {
        this.rowsDetails = data!;
      });
  }

  public selectFacture(event: any) {
    this.factureActive = event.id;
    this.rowsDetails = [];
    this.rowsTotals = [];
    this.getTotalsActive();
    this.getDeailsById();
  }

  public filterByInitialDate(event: any) {
    this.rowsListF = this.rowsList.filter((elem) => {
      return elem.date >= event;
    })
    if (this.rowsListF.length > 0) {
      this.selectFacture(this.rowsListF[0])
    } else {
      this.rowsDetails = [];
      this.rowsTotals = [];
    }
  }

  public filterByFinalDate(event: any) {
    this.rowsListF = this.rowsList.filter((elem) => {
      return elem.date <= event;
    })
    if (this.rowsListF.length > 0) {
      this.selectFacture(this.rowsListF[0])
    } else {
      this.rowsDetails = [];
      this.rowsTotals = [];
    }
  }

  public filterByRangeDate(event: any) {
    this.rowsListF = this.rowsList.filter((elem) => {
      return elem.date >= event.initialDate && elem.date <= event.finalDate;
    })
    if (this.rowsListF.length > 0) {
      this.selectFacture(this.rowsListF[0])
    } else {
      this.rowsDetails = [];
      this.rowsTotals = [];
    }

  }
  public filterByNumberFacture(event: any) {
    this.rowsListF = this.rowsList.filter((elem) => {
      return elem.id == event;
    })
    if (this.rowsListF.length > 0) {
      this.selectFacture(this.rowsListF[0])
    } else {
      this.rowsDetails = [];
      this.rowsTotals = [];
    }
  }

  public quitFilters():void{
    this.rowsListF = this.rowsList;
    if (this.rowsListF.length > 0) {
      this.selectFacture(this.rowsListF[0])
    } else {
      this.rowsDetails = [];
      this.rowsTotals = [];
    }
  }
}
