import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { ClientService } from 'src/app/services/client.service';
import { ButtonBlueComponent } from 'src/app/shared/button-blue/button-blue.component';

@Component({
  selector: 'app-modal-nueva-reservacion',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    ButtonBlueComponent,
  ],
  templateUrl: './modal-nueva-reservacion.component.html',
  styleUrls: ['./modal-nueva-reservacion.component.css'],
})
export class ModalNuevaReservacionComponent {
  public tiposDeIdentificacion = [
    { name: 'CÉDULA DE CIUDADANÍA', value: 'CC' },
    { name: 'TARJETA DE IDENTIDAD', value: 'TI' },
    { name: 'CÉDULA DE EXTRANJERÍA', value: 'CE' },
    { name: 'PASAPORTE', value: 'PA' },
  ];
  formularioCliente = this.formBuilder.group({
    tipoIdentificacion: ['CC', [Validators.required]],
    identificacion: ['', [Validators.required]],
    nombre: ['', [Validators.required]],
    telefono: ['', [Validators.required]],
  });
  cliente: any;
  crearCliente = false;
  constructor(
    private formBuilder: FormBuilder,
    private customerService: ClientService
  ) {}

  public buscarClientePorIdentificacion() {
    this.customerService
      .getClientsByDni(
        this.formularioCliente.get('tipoIdentificacion')?.value!,
        this.formularioCliente.get('identificacion')?.value!
      )
      .then((data) => {
        if (data != undefined && data.length != 0) {
          this.cliente = data![0];
          this.formularioCliente.patchValue({
            nombre: this.cliente.name,
            telefono: this.cliente.phone,
          });
        } else {
          this.crearCliente = true;
        }
      });
  }
  public crearNuevoCliente() {
    this.customerService
      .createNewCustomer(
        this.formularioCliente.get('tipoIdentificacion')?.value!,
        this.formularioCliente.get('identificacion')?.value!,
        this.formularioCliente.get('nombre')?.value!,
        this.formularioCliente.get('telefono')?.value!
      )
      .then(() => {
        this.crearCliente = false;
        this.buscarClientePorIdentificacion();
      });
  }
}
