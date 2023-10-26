import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonBlueComponent } from 'src/app/shared/button-blue/button-blue.component';
import { AccordionCategoriComponent } from '../../components/accordion-categori/accordion-categori.component';
import { CategoryService } from 'src/app/services/category.service';
import { MatDialogModule, MatDialog } from '@angular/material/dialog';
import { ModalNewCategoryComponent } from '../../components/modal-new-category/modal-new-category.component';
import { SectionHandler } from './sectionHandler';
import { FamilyHandler } from './familyHandler';
import { DepartamentHandler } from './departamentHandler';
import { Category } from 'src/app/models/Category';

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [
    CommonModule,
    ButtonBlueComponent,
    AccordionCategoriComponent,
    MatDialogModule,
    ModalNewCategoryComponent,
  ],
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css'],
})
export class CategoriesComponent {
  constructor(
    private categoryService: CategoryService,
    public dialog: MatDialog
  ) {}
  public departamentHandler = new DepartamentHandler(this.categoryService);
  public sectionHandler = new SectionHandler(this.categoryService);
  public familyHandler = new FamilyHandler(this.categoryService);
  public newCategory: Category = {
    id: 0,
    name: '',
    departament: '',
    type: '',
    section: '',
    depth: '',
  };

  public openDialog(): void {
    const dialogRef = this.dialog.open(ModalNewCategoryComponent, {
      data: { newCategory: this.newCategory },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result != undefined) {
        this.newCategory = result;
        if (this.newCategory.id == 0) {
          this.insertNewCategory();
        } else {
          this.updateCategory();
        }
      } else {
        this.cleanNewCategory();
      }
    });
  }

  public insertNewCategory(): void {
    switch (this.newCategory.depth) {
      case 'DEPARTAMENTO':
        this.departamentHandler.insertCategory(this.newCategory);
        break;
      case 'SECCION':
        this.sectionHandler.insertCategory(this.newCategory);
        break;
      case 'FAMILIA':
        this.familyHandler.insertCategory(this.newCategory);
        break;
    }
    this.cleanNewCategory();
  }

  public updateCategory(): void {
    switch (this.newCategory.depth) {
      case 'DEPARTAMENTO':
        this.departamentHandler.updateCategory(this.newCategory);
        break;
      case 'SECCION':
        this.sectionHandler.updateCategory(this.newCategory);
        break;
      case 'FAMILIA':
        this.familyHandler.updateCategory(this.newCategory);
        break;
    }
    this.cleanNewCategory();
  }

  public deleteCategory(event:any): void {
    switch (event.depth) {
      case 'DEPARTAMENTO':
        this.departamentHandler.deleteCategory(event.id);
        break;
      case 'SECCION':
        this.sectionHandler.deleteCategory(event.id);
        break;
      case 'FAMILIA':
        this.familyHandler.deleteCategory(event.id);
        break;
    }
    this.cleanNewCategory();
  }

  public cleanNewCategory(): void {
    this.newCategory = {
      id: 0,
      name: '',
      departament: '',
      type: '',
      section: '',
      depth: '',
    };
  }

  public editCategory(event: any) {
    switch (event.depth) {
      case 'DEPARTAMENTO':
        this.newCategory = this.departamentHandler.getCategoryById(
          event.id,
          event.type
        );
        break;
      case 'SECCION':
        this.newCategory = this.sectionHandler.getCategoryById(
          event.id,
          event.type
        );
        break;
      case 'FAMILIA':
        this.newCategory = this.familyHandler.getCategoryById(
          event.id,
          event.type
        );
        break;
    }
    console.log(this.newCategory);
    
    this.newCategory.depth = event.depth;
    this.openDialog();
    this.cleanNewCategory();
  }
}
