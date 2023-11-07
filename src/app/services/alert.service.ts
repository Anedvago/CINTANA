import { Injectable } from '@angular/core';
import Swal, { SweetAlertIcon } from 'sweetalert2';

@Injectable({
  providedIn: 'root',
})
export class AlertService {
  constructor() {}

  simpleAlert(icon: SweetAlertIcon, title: string, message: string) {
    Swal.fire({
      icon: icon,
      title: title,
      html: message,
      timer: 2000,
      timerProgressBar: true,
    });
  }
}
