import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonToolbarComponent } from '../button-toolbar/button-toolbar.component';
import { ButtonToolbarToggleComponent } from '../button-toolbar-toggle/button-toolbar-toggle.component';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-toolbar',
  standalone: true,
  imports: [
    CommonModule,
    ButtonToolbarComponent,
    ButtonToolbarToggleComponent,
    RouterModule,
  ],
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css'],
})
export class ToolbarComponent {
  public buttons = [
    { name: 'inicio', active: true, route: 'dashboard' },
    { name: 'inventario', active: false, route: 'inventory' },
    { name: 'reservaciones', active: false, route: 'reservations' },
    { name: 'pasadias', active: false, route: 'pasadias' },
    { name: 'punto de venta', active: false, route: 'sales' },
    { name: 'Cerrar Sesión', active: false, route: '' },
  ];

  public buttonsDropDownInventory = [
    { name: 'Articulos', active: false, route: 'inventory/articles' },
    { name: 'Servicios', active: false, route: 'inventory/services' },
    { name: 'Categorias', active: false, route: 'inventory/categories' },
    { name: 'Compras', active: false, route: 'inventory/purchases' },
    { name: 'Bajas', active: false, route: 'inventory/discharges' },
  ];
  public buttonsDropDownReservations = [
    { name: 'Habitaciones', active: false, route: 'reservations/rooms' },
    { name: 'Checks', active: false, route: 'reservations/checks' },
  ];

  constructor(private router: Router) {}

  public tabClicked(index: number): void {
    const indexActive = this.findActive(this.buttons);
    this.buttons[indexActive].active = false;
    this.buttons[index].active = true;
  }

  public findActive(list: any[]): number {
    const index = list.findIndex((elem) => {
      return elem.active == true;
    });
    return index;
  }

  logOut() {
    this.router.navigate(['../login']).then(() => {
      // Después de la redirección, recargar la página
      location.reload();
    });
  }
}
