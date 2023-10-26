import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { ArticlesComponent } from './pages/articles/articles.component';
import { DesktopLayoutComponent } from './components/desktop-layout/desktop-layout.component';
import { CategoriesComponent } from './pages/categories/categories.component';
import { ServicesComponent } from './pages/services/services.component';
import { PurchasesComponent } from './pages/purchases/purchases.component';
import { DischargesComponent } from './pages/discharges/discharges.component';
export const routes: Routes = [
  {
    path: '',
    component: DesktopLayoutComponent,
    children: [
      {
        path: '',
        component: HomeComponent,
      },
      {
        path: 'articles',
        component: ArticlesComponent,
      },
      {
        path: 'services',
        component: ServicesComponent,
      },
      {
        path: 'categories',
        component: CategoriesComponent,
      },
      {
        path: 'purchases',
        component: PurchasesComponent,
      },
      {
        path: 'discharges',
        component: DischargesComponent,
      },
    ],
  },
];
