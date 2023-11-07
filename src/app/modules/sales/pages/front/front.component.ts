import { ChangeDetectorRef, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule } from '@angular/forms';
import { ArticleService } from 'src/app/services/article.service';
import { AlertService } from 'src/app/services/alert.service';
import { MatListModule } from '@angular/material/list';
import { TableComponent } from 'src/app/shared/table/table.component';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { ModalUnitsComponent } from '../../components/modal-units/modal-units.component';
@Component({
  selector: 'app-front',
  standalone: true,
  imports: [CommonModule, FormsModule, MatCardModule, MatFormFieldModule, MatInputModule, MatSelectModule, MatListModule, TableComponent, MatDialogModule],
  templateUrl: './front.component.html',
  styleUrls: ['./front.component.css'],
})
export class FrontComponent {

  public typesIdentifications = [
    { name: 'CÉDULA DE CIUDADANÍA', value: 'CC' },
    { name: 'TARJETA DE IDENTIDAD', value: 'TI' },
    { name: 'CÉDULA DE EXTRANJERÍA', value: 'CE' },
    { name: 'PASAPORTE', value: 'PA' },
  ];
  public typesPay = ['EFECTIVO', 'TRANSFERENCIA'];

  dniCustomer: string = "";
  typeIdentification: string = "";
  ref: string = "";
  typePay: string = "";
  articles: any = [];

  //List

  colums: string[] = ["ref", "name", "units", "value"]
  columsDisplay: string[] = ["Referencia", "Nombre", "Unidades", "Precio"]
  rows: any = []
  constructor(private articleService: ArticleService, private alertService: AlertService, public dialog: MatDialog) {

  }

  getArticle() {
    this.articleService.getArticleByRef(this.ref).then((data) => {
      if (data?.length == 0) {
        this.articleService.getArticleById(parseInt(this.ref)).then((data) => {
          if (data?.length == 0) {
            this.alertService.simpleAlert("error", "Articulo no encontrado", "Verifique la referencia o codigo del articulo")
          } else {
            console.log(data);
            this.articles.push({ ...data![0], units: 1 });
            this.rows = this.articles.slice()
          }

        })
      } else {
        console.log(data);
        this.articles.push({ ...data![0], units: 1 });
        this.rows = this.articles.slice()
      }
      this.ref = ""
    })

  }

  openDialog(event:any): void {
    //const this.articles
    const dialogRef = this.dialog.open(ModalUnitsComponent, {
      data: {units:event.units},
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
    });
  }
}
