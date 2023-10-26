import { Component, Inject, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { ModalCreateNewComponent } from '../modal-create-new/modal-create-new.component';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import { ButtonBlueComponent } from 'src/app/shared/button-blue/button-blue.component';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-modal-new-category',
  standalone: true,
  imports: [CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    FormsModule,
    ButtonBlueComponent, MatDialogModule],
  templateUrl: './modal-new-category.component.html',
  styleUrls: ['./modal-new-category.component.css']
})
export class ModalNewCategoryComponent {
  constructor(
    public dialogRef: MatDialogRef<ModalCreateNewComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private categoryService: CategoryService
  ) {
    this.getAllArticlesDepartaments();
    this.getAllServicesDepartaments();
    this.getAllArticlesSections();
    this.getAllServicesSections();
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  public types = [{ name: "Articulos", value: "A" }, { name: "Servicios", value: "S" }];
  public categories = ["DEPARTAMENTO", "SECCION", "FAMILIA"];
  public articlesDepartaments: any[] = [];
  public articlesSections: any[] = [];
  public servicesDepartaments: any[] = [];
  public servicesSections: any[] = [];
  public filteredArtilcesSections: any[] = [];
  public filteredServicesSections: any[] = [];

  public getAllArticlesDepartaments() {
    this.categoryService.getAllArticlesDepartaments().then((data: any) => {
      this.articlesDepartaments = data;
    })
  }

  public getAllServicesDepartaments() {
    this.categoryService.getAllServicesDepartaments().then((data: any) => {
      this.servicesDepartaments = data;
    })
  }

  public getAllArticlesSections() {
    this.categoryService.getAllArticlesSections().then((data: any) => {
      this.articlesSections = data;
      this.filteredArtilcesSections = data;
    })
  }
  public getAllServicesSections() {
    this.categoryService.getAllServicesSections().then((data: any) => {
      this.servicesSections = data;
    })
  }

  public filterSection(): void {
    this.filteredArtilcesSections = this.articlesSections.filter((elem) => {
      return elem.departament == this.data.newCategory.departament;
    })
  }


}
