import { Routes } from '@angular/router';
import { OrderListComponent } from './order-list/order-list.component';
import { OrderFormComponent } from './order-form/order-form.component';
import { OrderDetailComponent } from './order-detail/order-detail.component';

export const ORDERS_ROUTES: Routes = [
  { path: '', component: OrderListComponent },
  { path: 'new', component: OrderFormComponent },
  { path: ':id', component: OrderDetailComponent },
];