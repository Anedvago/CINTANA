import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { CategoryService } from 'src/app/services/category.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule } from '@angular/forms';
import { ButtonBlueComponent } from 'src/app/shared/button-blue/button-blue.component';
import { ServicesService } from 'src/app/services/services.service';

@Component({
  selector: 'app-modal-create-new-service',
  standalone: true,
  imports: [CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    FormsModule,
    ButtonBlueComponent,
    MatDialogModule],
  templateUrl: './modal-create-new-service.component.html',
  styleUrls: ['./modal-create-new-service.component.css']
})
export class ModalCreateNewServiceComponent {
  constructor(
    public dialogRef: MatDialogRef<ModalCreateNewServiceComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private categoryService: CategoryService, private serviceService:ServicesService
  ) {
    this.getAllDepartaments();
    this.getAllSections();
    this.getAllfamilies();
    console.log(this.data.newService);
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
    this.categoryService.getAllServicesDepartaments().then((data: any) => {
      this.departaments = data;
      console.log(this.departaments);

    })
  }

  public getAllSections() {
    this.categoryService.getAllServicesSections().then((data: any) => {
      this.sections = data;
      this.sectionsF = data;
    })
  }

  public getAllfamilies() {
    this.categoryService.getAllServicesFamilies().then((data: any) => {
      this.families = data;
      this.familiesF = data;
    })
  }

  public filterSection(): void {
    this.sectionsF = this.sections.filter((elem) => {
      return elem.departament == this.data.newService.dpto;
    })        
  }

  public filterFamily(): void {
    this.familiesF = this.families.filter((elem) => {
      return elem.departament == this.data.newService.dpto && elem.section == this.data.newService.section;
    })
  }

  public deleteArticle() {
    this.serviceService.deleteService(this.data.newService.id).then(() => { })
  }

}
