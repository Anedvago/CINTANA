import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableComponent } from 'src/app/shared/table/table.component';
import { FormArticlesComponent } from '../../components/form-articles/form-articles.component';
import { ServicesService } from 'src/app/services/services.service';
import { Service } from 'src/app/models/Service';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { ModalCreateNewServiceComponent } from '../../components/modal-create-new-service/modal-create-new-service.component';

@Component({
  selector: 'app-services',
  standalone: true,
  imports: [CommonModule, TableComponent, FormArticlesComponent, MatDialogModule, ModalCreateNewServiceComponent ],
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.css'],
})
export class ServicesComponent {
  public columnsDisplay = [
    'Cod',
    'Nombre',
    'Precio',
    'Dpto',
    'Seccion',
    'Familia',
  ];
  public columns = [
    'id',
    'name',
    'value',
    'dpto',
    'section',
    'family',
  ];

  public rows: any[] = [];
  public filterRows: any[] = [];
  public newService?: Service = {  name: "", value: 0, dpto: 0, section: 0, family: 0 };

  constructor(private servicesService: ServicesService,public dialog: MatDialog) {
    this.getServices();
    
  }

  public getServices() {
    this.servicesService.getAllServices().then((data: any) => {
      this.rows = data;
      this.filterRows = data;
    });
  }

  public filterByCode(event: any) {
    this.filterRows = this.rows.filter((elem) => elem.id == event).slice();
  }

  public filterByRef(event: any) {
    this.filterRows = this.rows.filter((elem) => elem.ref == event).slice();
  }

  public filterByName(event: any) {
    this.filterRows = this.rows.filter(function (objeto) {
      function cleanString(text: string): string {
        return text
          .normalize('NFD')
          .replace(/[\u0300-\u036f]/g, '')
          .toLowerCase();
      }
      return cleanString(objeto.name)
        .toLowerCase()
        .includes(cleanString(event.toLowerCase()));
    });
  }

  public quitFilters() {
    this.filterRows = this.rows.slice();
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(ModalCreateNewServiceComponent, {
      data: { newService: this.newService },
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result != undefined) {
        this.newService = result;
        if (this.newService!.id == 0 || this.newService!.id == undefined) {
          this.insertnewService();
        } else {
          this.updateService();
        }
      } else {
        this.cleanService();
      }
    });
  }

  editArticle(article: Service) {
    this.newService = article;
    console.log(this.newService);

    this.openDialog()
  }

  cleanService() {
    this.newService = { name: "", value: 0, dpto: 0, section: 0, family: 0 };
  }

  insertnewService() {
    console.log(this.newService);
    this.servicesService.insertNewService(this.newService!).then(() => { this.getServices() })

  }

  updateService() {
    this.servicesService.updateService(this.newService!).then(() => { this.getServices() })
  }
}
