import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { ClientService } from 'src/app/services/client.service';
import { ButtonBlueComponent } from 'src/app/shared/button-blue/button-blue.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { RoomService } from 'src/app/services/room.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { BookingService } from 'src/app/services/booking.service';
import { DateService } from 'src/app/services/date.service';
import { AlertService } from 'src/app/services/alert.service';
import { debounceTime } from 'rxjs';

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
    MatDatepickerModule,
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
  public metodosDePago = ['EFECTIVO', 'TRANSFERENCIA', 'DATAFONO'];
  formularioCliente = this.formBuilder.group({
    tipoIdentificacion: ['CC', [Validators.required]],
    identificacion: ['', [Validators.required]],
    nombre: ['', [Validators.required]],
    telefono: ['', [Validators.required]],
  });
  cliente: any;
  crearCliente = false;
  formularioReserva: FormGroup = new FormGroup([]);
  /* formularioReserva = this.formBuilder.group({
    fechaEntrada: ['', [Validators.required]],
    horaEntrada: ['12', [Validators.required]],
    minutoEntrada: ['00', [Validators.required]],
    fechaSalida: ['', [Validators.required]],
    horaSalida: ['11', [Validators.required]],
    minutoSalida: ['00', [Validators.required]],
    cantidadAdultos: ['0', [Validators.required]],
    cantidadNiños: ['0', [Validators.required]],
    habitacion: ['', [Validators.required]],
    metodoDePago: ['', [Validators.required]],
    totalAPagar: ['0', [Validators.required]],
    totalCancelado: ['0'],
  }); */
  habitaciones: any = [];
  constructor(
    private formBuilder: FormBuilder,
    private customerService: ClientService,
    private roomService: RoomService,
    private bookingService: BookingService,
    private dateService: DateService,
    private alertService: AlertService,
    public dialogRef: MatDialogRef<ModalNuevaReservacionComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.getHabitaciones();
    this.inicializarFormulario();
    /*  if (data.reservation != undefined) {
      this.cargarReservaenForm();
    } */
  }

  inicializarFormulario() {
    if (this.data.reservation != undefined) {
      const start = new Date(this.data.reservation.start);
      const end = new Date(this.data.reservation.end);
      this.buscarClientePorId(this.data.reservation.customer);
      this.formularioReserva = this.formBuilder.group({
        fechaEntrada: [this.data.reservation.start, [Validators.required]],
        horaEntrada: [
          start.getHours().toString().padStart(2, '0'),
          [Validators.required],
        ],
        minutoEntrada: [
          start.getMinutes().toString().padStart(2, '0'),
          [Validators.required],
        ],
        fechaSalida: [this.data.reservation.end, [Validators.required]],
        horaSalida: [
          end.getHours().toString().padStart(2, '0'),
          [Validators.required],
        ],
        minutoSalida: [
          end.getMinutes().toString().padStart(2, '0'),
          [Validators.required],
        ],
        cantidadAdultos: [
          this.data.reservation.numberOfAdults,
          [Validators.required],
        ],
        cantidadNiños: [
          this.data.reservation.numberOfChilds,
          [Validators.required],
        ],
        habitacion: [this.data.reservation.room, [Validators.required]],
        metodoDePago: [this.data.reservation.wayToPay, [Validators.required]],
        totalAPagar: [this.data.reservation.total, [Validators.required]],
        totalCancelado: [this.data.reservation.paid],
      });
    } else {
      this.formularioReserva = this.formBuilder.group({
        fechaEntrada: ['', [Validators.required]],
        horaEntrada: ['12', [Validators.required]],
        minutoEntrada: ['00', [Validators.required]],
        fechaSalida: ['', [Validators.required]],
        horaSalida: ['11', [Validators.required]],
        minutoSalida: ['00', [Validators.required]],
        cantidadAdultos: ['0', [Validators.required]],
        cantidadNiños: ['0', [Validators.required]],
        habitacion: ['', [Validators.required]],
        metodoDePago: ['', [Validators.required]],
        totalAPagar: ['0', [Validators.required]],
        totalCancelado: ['0'],
      });
    }
    this.detectarCambiosEnFormulario();
  }

  detectarCambiosEnFormulario() {
    /*  this.formularioReserva.valueChanges
      .pipe(
        debounceTime(500) // Ajusta el tiempo de espera según lo necesites
      )
      .subscribe((value) => {
        console.log(value);

        if (this.formularioReserva.valid) {
          this.calcularTotal();
        }
      }); */
    this.formularioReserva
      .get('fechaEntrada')!
      .valueChanges.pipe(
        debounceTime(500) // Ajusta el tiempo de espera según lo necesites
      )
      .subscribe(() => {
        if (this.formularioReserva.valid) {
          this.calcularTotal();
        }
      });
    this.formularioReserva
      .get('fechaSalida')!
      .valueChanges.pipe(
        debounceTime(500) // Ajusta el tiempo de espera según lo necesites
      )
      .subscribe(() => {
        if (this.formularioReserva.valid) {
          this.calcularTotal();
        }
      });
    this.formularioReserva
      .get('cantidadAdultos')!
      .valueChanges.pipe(
        debounceTime(500) // Ajusta el tiempo de espera según lo necesites
      )
      .subscribe(() => {
        if (this.formularioReserva.valid) {
          this.calcularTotal();
        }
      });
    this.formularioReserva
      .get('cantidadNiños')!
      .valueChanges.pipe(
        debounceTime(500) // Ajusta el tiempo de espera según lo necesites
      )
      .subscribe(() => {
        if (this.formularioReserva.valid) {
          this.calcularTotal();
        }
      });
    this.formularioReserva
      .get('metodoDePago')!
      .valueChanges.pipe(
        debounceTime(500) // Ajusta el tiempo de espera según lo necesites
      )
      .subscribe(() => {
        if (this.formularioReserva.valid) {
          this.calcularTotal();
        }
      });
  }

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
  buscarClientePorId(id: number) {
    this.customerService.getClientsById(id).then((data) => {
      this.cliente = data![0];
      this.formularioCliente.patchValue({
        identificacion: this.cliente.identification,
        tipoIdentificacion: this.cliente.typeIdentification,
        nombre: this.cliente.name,
        telefono: this.cliente.phone,
      });
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
  public getHabitaciones() {
    this.roomService.getRoomsNotSuscribe().then((data) => {
      this.habitaciones = data;
    });
  }

  crearReserva() {
    if (this.data.reservation == undefined) {
      this.bookingService
        .createReservation(
          this.dateService.convertDateInputToStringWithTime(
            this.formularioReserva.get('fechaEntrada')?.value!,
            `${this.formularioReserva
              .get('horaEntrada')
              ?.value!.padStart(2, '0')}:${this.formularioReserva
              .get('minutoEntrada')
              ?.value!.padStart(2, '0')}`
          ),
          this.dateService.convertDateInputToStringWithTime(
            this.formularioReserva.get('fechaSalida')?.value!,
            `${this.formularioReserva
              .get('horaSalida')
              ?.value!.padStart(2, '0')}:${this.formularioReserva
              .get('minutoSalida')
              ?.value!.padStart(2, '0')}`
          ),
          parseInt(this.formularioReserva.get('habitacion')?.value!),
          this.cliente.id,
          parseInt(this.formularioReserva.get('totalAPagar')?.value!),
          parseInt(this.formularioReserva.get('totalCancelado')?.value!),
          this.formularioReserva.get('metodoDePago')?.value!,
          parseInt(this.formularioReserva.get('cantidadAdultos')?.value!),
          parseInt(this.formularioReserva.get('cantidadNiños')?.value!)
        )
        .then(() => {
          this.dialogRef.close();
          this.alertService.simpleAlert(
            'success',
            'Reservacion realizada con exito!',
            'Revise el estado de la reserva en el calendario...'
          );
        });
    } else {
      this.bookingService
        .updateReservation(
          this.dateService.convertDateInputToStringWithTime(
            this.formularioReserva.get('fechaEntrada')?.value!,
            `${this.formularioReserva
              .get('horaEntrada')
              ?.value!.padStart(2, '0')}:${this.formularioReserva
              .get('minutoEntrada')
              ?.value!.padStart(2, '0')}`
          ),
          this.dateService.convertDateInputToStringWithTime(
            this.formularioReserva.get('fechaSalida')?.value!,
            `${this.formularioReserva
              .get('horaSalida')
              ?.value!.padStart(2, '0')}:${this.formularioReserva
              .get('minutoSalida')
              ?.value!.padStart(2, '0')}`
          ),
          parseInt(this.formularioReserva.get('habitacion')?.value!),
          this.cliente.id,
          parseInt(this.formularioReserva.get('totalAPagar')?.value!),
          parseInt(this.formularioReserva.get('totalCancelado')?.value!),
          this.formularioReserva.get('metodoDePago')?.value!,
          parseInt(this.formularioReserva.get('cantidadAdultos')?.value!),
          parseInt(this.formularioReserva.get('cantidadNiños')?.value!),
          this.data.reservation.id
        )
        .then(() => {
          this.dialogRef.close();
          this.alertService.simpleAlert(
            'success',
            'Reservacion actualizada con exito!',
            'Revise el estado de la reserva en el calendario...'
          );
        });
    }
  }

  calcularTotal() {
    console.log('Cambio el form');

    let total = 0;
    const dateStart = new Date(
      this.formularioReserva.get('fechaEntrada')?.value!
    );
    const dateEnd = new Date(this.formularioReserva.get('fechaSalida')?.value!);
    dateStart.setHours(0, 0);
    dateEnd.setHours(0, 0);
    const miliSeconds = Math.abs(Number(dateEnd) - Number(dateStart));
    const days = miliSeconds / 86400000;
    console.log(days);
    total =
      days *
      (80000 * parseInt(this.formularioReserva.get('cantidadAdultos')?.value!) +
        40000 * parseInt(this.formularioReserva.get('cantidadNiños')?.value!));
    console.log(
      'El metodo de pago es ' +
        this.formularioReserva.get('metodoDePago')?.value!
    );

    if (this.formularioReserva.get('metodoDePago')?.value! == 'DATAFONO') {
      total = total * 1.05;
    }
    this.formularioReserva.patchValue({ totalAPagar: total.toString() });
  }

  borrarReserva() {
    this.bookingService.deleteReservation(this.data.reservation.id).then(() => {
      this.dialogRef.close();
      this.alertService.simpleAlert(
        'success',
        'Reserva Eliminada Correctamente',
        ''
      );
    });
  }

  checkIn() {}

  checkOut() {}
}
