import { Component, inject } from '@angular/core';
import { AsyncPipe, DatePipe } from '@angular/common';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { catchError, of, startWith, switchMap } from 'rxjs';
import { OrderStatus, STATUS_LABEL } from '../../../core/models/order.model';
import { OrdersService } from '../data/orders.service';
import { StatusBadgeComponent } from '../../../shared/status-badge/status-badge.component';

@Component({
  selector: 'app-order-list',
  imports: [AsyncPipe, DatePipe, ReactiveFormsModule, RouterLink, StatusBadgeComponent],
  template: `
    <div class="d-flex flex-wrap justify-content-between align-items-center gap-2 mb-3">
      <h1 class="h3 m-0">Ordenes</h1>
      <div class="d-flex flex-wrap gap-2">
        <select id="statusFilter" class="form-select w-auto" [formControl]="statusFilter" aria-label="Filtrar por estado">
          <option [ngValue]="null">Todos los estados</option>
          @for (s of statuses; track s) { <option [ngValue]="s">{{ labels[s] }}</option> }
        </select>
        <a routerLink="new" class="btn btn-primary">+ Nueva orden</a>
      </div>
    </div>

    @if (orders$ | async; as orders) {
      @if (orders.length === 0) {
        <div class="alert alert-light border">No hay Ordenes para este filtro.</div>
      } @else {
        <div class="table-responsive">
          <table class="table table-hover align-middle">
            <thead>
              <tr><th>Tienda</th><th>Origen</th><th>Destino</th><th class="text-end">Ramos</th><th>Estado</th><th>Creada</th><th></th></tr>
            </thead>
            <tbody>
              @for (o of orders; track o.id) {
                <tr>
                  <td>{{ o.customerStore }}</td>
                  <td>{{ o.originCountry }}</td>
                  <td>{{ o.destinationCity }}</td>
                  <td class="text-end">{{ o.bouquetQuantity }}</td>
                  <td><app-status-badge [status]="o.status" /></td>
                  <td class="text-nowrap">{{ o.createdAt | date: 'short' }}</td>
                  <td class="text-end"><a [routerLink]="o.id" class="btn btn-sm btn-outline-secondary">Ver detalle</a></td>
                </tr>
              }
            </tbody>
          </table>
        </div>
      }
    } @else {
      <div class="text-center py-5"><div class="spinner-border" role="status"></div></div>
    }
  `,
})
export class OrderListComponent {
  private ordersService = inject(OrdersService);
  protected labels = STATUS_LABEL;
  protected statuses = Object.keys(STATUS_LABEL) as OrderStatus[];
  protected statusFilter = new FormControl<OrderStatus | null>(null);
  const mmmm = 1;

  protected orders$ = this.statusFilter.valueChanges.pipe(
    startWith(this.statusFilter.value),
    switchMap(status => this.ordersService.getOrders(status).pipe(catchError(() => of([])))),
  );
}