import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2';
import { FormsModule } from '@angular/forms';
import { ButtonBlueComponent } from 'src/app/shared/button-blue/button-blue.component';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    ButtonBlueComponent,
    FormsModule,
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  public email: string = '';
  public password: string = '';

  constructor(private router: Router, private authService: AuthService) {}

  public login(): void {
    this.authService.login(this.email, this.password).then((result: any) => {
      if (result.user != undefined) {
        this.navigateTo();
      } else {
        this.loginError();
      }
    });
  }

  public navigateTo(): void {
    this.router.navigate(['/admin/dashboard']);
  }

  public emailOnChange(event: any): void {
    this.email = event;
  }
  public passwordOnChange(event: any): void {
    this.password = event;
  }

  public loginError(): void {
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'Error en la autenticacion!',
      timer: 2000,
    });
  }
}
