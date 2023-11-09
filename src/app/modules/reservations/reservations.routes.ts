import { Routes } from '@angular/router';
import { ReservationsComponent } from './pages/reservations/reservations.component';
import { RoomsComponent } from './pages/rooms/rooms.component';
import { ChecksComponent } from './pages/checks/checks.component';
import { DesktopLayoutComponent } from './components/desktop-layout/desktop-layout.component';
import { FactureComponent } from '../billing/pages/facture/facture.component';
export const routes: Routes = [
  {
    path: '',
    component: DesktopLayoutComponent,
    children: [
      { path: '', component: ReservationsComponent },
      { path: 'rooms', component: RoomsComponent },
      { path: 'checks', component: ChecksComponent },
    ],
  },
];
