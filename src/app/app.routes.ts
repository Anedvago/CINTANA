import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'login',
    loadChildren: () =>
      import('./modules/auth/auth.routes').then((m) => m.routes),
  },
  {
    path: 'admin',
    loadChildren: () =>
      import('./modules/admin/admin.routes').then((m) => m.routes),
  },
  {
    path: 'billing/:idCustomer/:values',
    loadChildren: () =>
      import('./modules/billing/billing.routes').then((m) => m.routes),
  },
];
