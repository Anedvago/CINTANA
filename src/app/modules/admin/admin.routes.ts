import { Routes } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { DesktopLayoutComponent } from './components/desktop-layout/desktop-layout.component';
export const routes: Routes = [
  {
    path: '',
    component: DesktopLayoutComponent,
    children: [
      {
        path: 'dashboard',
        component: DashboardComponent,
      },
      {
        path: 'inventory',
        loadChildren: () =>
          import('../inventory/inventory.routes').then((m) => m.routes),
      },
      {
        path: 'reservations',
        loadChildren: () =>
          import('../reservations/reservations.routes').then((m) => m.routes),
      },
      {
        path: 'sales',
        loadChildren: () =>
          import('../sales/sales.routes').then((m) => m.routes),
      },
    ],
  },
];
