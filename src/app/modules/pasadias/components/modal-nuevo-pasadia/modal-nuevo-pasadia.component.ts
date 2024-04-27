import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonBlueComponent } from 'src/app/shared/button-blue/button-blue.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { ClientService } from 'src/app/services/client.service';
import { PasadiaService } from 'src/app/services/pasadia.service';
import { DateService } from 'src/app/services/date.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AlertService } from 'src/app/services/alert.service';

@Component({
  selector: 'app-modal-nuevo-pasadia',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ButtonBlueComponent,
    MatFormFieldModule,
    MatDatepickerModule,
    MatSelectModule,
    MatInputModule,
  ],
  templateUrl: './modal-nuevo-pasadia.component.html',
  styleUrls: ['./modal-nuevo-pasadia.component.css'],
})
export class ModalNuevoPasadiaComponent {
  constructor(
    private formBuilder: FormBuilder,
    private customerService: ClientService,
    private pasadiaService: PasadiaService,
    private fechaService: DateService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private alertService: AlertService,
    public dialogRef: MatDialogRef<ModalNuevoPasadiaComponent>
  ) {
    this.inicializarFormularios();
  }
  public tiposDeIdentificacion = [
    { name: 'CÉDULA DE CIUDADANÍA', value: 'CC' },
    { name: 'TARJETA DE IDENTIDAD', value: 'TI' },
    { name: 'CÉDULA DE EXTRANJERÍA', value: 'CE' },
    { name: 'PASAPORTE', value: 'PA' },
  ];
  cliente: any;
  crearCliente = false;
  formularioPasaDia: FormGroup = new FormGroup([]);

  inicializarFormularios() {
    console.log(this.data);

    if (this.data.pasadia) {
      this.cliente = this.data.pasadia.Customers;
      this.formularioPasaDia = this.formBuilder.group({
        tipoIdentificacion: [
          this.cliente.typeIdentification,
          [Validators.required],
        ],
        identificacion: [this.cliente.identification, [Validators.required]],
        nombre: [this.cliente.name, [Validators.required]],
        telefono: [this.cliente.phone, [Validators.required]],
        fecha: [this.data.pasadia.fecha, Validators.required],
      });
    } else {
      this.formularioPasaDia = this.formBuilder.group({
        tipoIdentificacion: ['CC', [Validators.required]],
        identificacion: ['', [Validators.required]],
        nombre: ['', [Validators.required]],
        telefono: ['', [Validators.required]],
        fecha: [new Date(), Validators.required],
      });
    }
  }

  public crearNuevoCliente() {
    this.customerService
      .createNewCustomer(
        this.formularioPasaDia.get('tipoIdentificacion')?.value!,
        this.formularioPasaDia.get('identificacion')?.value!,
        this.formularioPasaDia.get('nombre')?.value!,
        this.formularioPasaDia.get('telefono')?.value!
      )
      .then(() => {
        this.crearCliente = false;
        this.buscarClientePorIdentificacion();
      });
  }
  public buscarClientePorIdentificacion() {
    this.customerService
      .getClientsByDni(
        this.formularioPasaDia.get('tipoIdentificacion')?.value!,
        this.formularioPasaDia.get('identificacion')?.value!
      )
      .then((data) => {
        if (data != undefined && data.length != 0) {
          this.cliente = data![0];
          this.formularioPasaDia.patchValue({
            nombre: this.cliente.name,
            telefono: this.cliente.phone,
          });
        } else {
          this.crearCliente = true;
        }
      });
  }
  crearPasadia() {
    if (this.data.operacion == 'creacion') {
      this.pasadiaService
        .crearPasadia(
          this.cliente.id,
          this.fechaService.convertDateInputToString(
            this.formularioPasaDia.get('fecha')?.value!.toString()!
          )
        )
        .then((data) => {
          console.log(data);
          this.alertService.simpleAlert(
            'success',
            'Pasadia guardado con exito!',
            'Revise el estado del pasadia en el calendario...'
          );
          this.dialogRef.close();
        });
    } else {
      this.pasadiaService
        .actualizarPasadia(
          this.cliente.id,
          this.fechaService.convertDateInputToString(
            this.formularioPasaDia.get('fecha')?.value!.toString()!
          ),
          this.data.pasadia.id
        )
        .then((data) => {
          console.log(data);
          this.alertService.simpleAlert(
            'success',
            'Pasadia actualizado con exito!',
            'Revise el estado del pasadia en el calendario...'
          );
          this.dialogRef.close();
        });
    }
  }
  eliminarPasadia() {
    this.pasadiaService.eliminarPasadia(this.data.pasadia.id).then((data) => {
      console.log(data);
      this.alertService.simpleAlert(
        'success',
        'Pasadia eliminado con exito!',
        'Revise el nuevo estado del calendario...'
      );
      this.dialogRef.close();
    });
  }
}
