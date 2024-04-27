import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonBlueComponent } from 'src/app/shared/button-blue/button-blue.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { ClientService } from 'src/app/services/client.service';
import { PasadiaService } from 'src/app/services/pasadia.service';
import { DateService } from 'src/app/services/date.service';

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
    private fechaService: DateService
  ) {}
  public tiposDeIdentificacion = [
    { name: 'CÉDULA DE CIUDADANÍA', value: 'CC' },
    { name: 'TARJETA DE IDENTIDAD', value: 'TI' },
    { name: 'CÉDULA DE EXTRANJERÍA', value: 'CE' },
    { name: 'PASAPORTE', value: 'PA' },
  ];
  cliente: any;
  crearCliente = false;
  formularioPasaDia = this.formBuilder.group({
    tipoIdentificacion: ['CC', [Validators.required]],
    identificacion: ['', [Validators.required]],
    nombre: ['', [Validators.required]],
    telefono: ['', [Validators.required]],
    fecha: [new Date(), Validators.required],
  });

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
    this.pasadiaService
      .crearPasadia(
        this.cliente.id,
        this.fechaService.convertDateInputToString(
          this.formularioPasaDia.get('fecha')?.value!.toString()!
        )
      )
      .then((data) => {
        console.log(data);
      });
  }
}
