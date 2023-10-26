import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableComponent } from 'src/app/shared/table/table.component';
import { ArticleService } from 'src/app/services/article.service';
import { FormArticlesComponent } from '../../components/form-articles/form-articles.component';
import { MatDialogModule, MatDialog } from '@angular/material/dialog';
import { ModalCreateNewComponent } from '../../components/modal-create-new/modal-create-new.component';
import { Article } from 'src/app/models/Article';
@Component({
  selector: 'app-articles',
  standalone: true,
  imports: [CommonModule, TableComponent, FormArticlesComponent, MatDialogModule, ModalCreateNewComponent],
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.css'],
})
export class ArticlesComponent {
  public columnsDisplay = [
    'Cod',
    'Ref',
    'Nombre',
    'Precio',
    'Stock',
    'Dpto',
    'Seccion',
    'Familia',
  ];
  public columns = [
    'id',
    'ref',
    'name',
    'value',
    'stock',
    'dpto',
    'section',
    'family',
  ];

  public newArticle?: Article = { ref: "", name: "", value: 0, stock: 0, dpto: 0, section: 0, family: 0 };

  public rows: any[] = [];
  public filterRows: any[] = [];

  constructor(private articlesService: ArticleService, public dialog: MatDialog) {
    this.getArticles();
  }

  public getArticles(): void {
    this.articlesService.getAllArticles().then((data: any) => {
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
    const dialogRef = this.dialog.open(ModalCreateNewComponent, {
      data: { newArticle: this.newArticle },
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result != undefined) {
        this.newArticle = result;
        if (this.newArticle!.id == 0 || this.newArticle!.id == undefined) {
          this.insertNewArticle();
        } else {
          this.updateArticle();
        }
      } else {
        this.cleanArticle();
      }
    });
  }

  editArticle(article: Article) {
    this.newArticle = article;
    console.log(this.newArticle);

    this.openDialog()
  }

  cleanArticle() {
    this.newArticle = { ref: "", name: "", value: 0, stock: 0, dpto: 0, section: 0, family: 0 };
  }

  insertNewArticle() {
    this.articlesService.insertNewArticle(this.newArticle!).then(() => { this.getArticles() })
    this.cleanArticle()

  }

  updateArticle() {
    this.articlesService.updateArticle(this.newArticle!).then(() => { this.getArticles() })
    this.cleanArticle()
  }
}
