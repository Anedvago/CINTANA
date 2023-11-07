import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlertService } from 'src/app/services/alert.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ButtonBlueComponent } from 'src/app/shared/button-blue/button-blue.component';

@Component({
  selector: 'app-modal-create-new-document',
  standalone: true,
  imports: [CommonModule,ButtonBlueComponent],
  templateUrl: './modal-create-new-document.component.html',
  styleUrls: ['./modal-create-new-document.component.css']
})
export class ModalCreateNewDocumentComponent {
  constructor(
    public dialogRef: MatDialogRef<ModalCreateNewDocumentComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private alertService: AlertService
  ) {

  }
}
