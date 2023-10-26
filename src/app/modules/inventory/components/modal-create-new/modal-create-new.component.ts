import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { CategoryService } from 'src/app/services/category.service';
import { FormsModule } from '@angular/forms';
import { ButtonBlueComponent } from 'src/app/shared/button-blue/button-blue.component';
import { ArticleService } from 'src/app/services/article.service';

@Component({
  selector: 'app-modal-create-new',
  standalone: true,
  imports: [CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    FormsModule,
    ButtonBlueComponent,
    MatDialogModule],
  templateUrl: './modal-create-new.component.html',
  styleUrls: ['./modal-create-new.component.css']
})
export class ModalCreateNewComponent {
  constructor(
    public dialogRef: MatDialogRef<ModalCreateNewComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private categoryService: CategoryService, private articleService: ArticleService
  ) {
    this.getAllDepartaments();
    this.getAllSections();
    this.getAllfamilies();
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  public departaments: any[] = [];
  public sections: any[] = [];
  public families: any[] = [];
  public sectionsF: any[] = [];
  public familiesF: any[] = [];

  public getAllDepartaments() {
    this.categoryService.getAllArticlesDepartaments().then((data: any) => {
      this.departaments = data;
    })
  }

  public getAllSections() {
    this.categoryService.getAllArticlesSections().then((data: any) => {
      this.sections = data;
      this.sectionsF = data;
    })
  }

  public getAllfamilies() {
    this.categoryService.getAllArticlesFamilies().then((data: any) => {
      this.families = data;
      this.familiesF = data;
    })
  }

  public filterSection(): void {
    this.sectionsF = this.sections.filter((elem) => {
      return elem.departament == this.data.newArticle.dpto;
    })    
  }

  public filterFamily(): void {
    this.familiesF = this.families.filter((elem) => {
      return elem.departament == this.data.newArticle.dpto && elem.section == this.data.newArticle.section;
    })
  }

  public deleteArticle() {
    this.articleService.deleteArticle(this.data.newArticle.id).then(() => { })
  }
}
