import { Component, inject, input } from '@angular/core';
import { AsyncPipe, DatePipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { toObservable } from '@angular/core/rxjs-interop';
import { map, switchMap } from 'rxjs';
import { OrdersService } from '../data/orders.service';
import { StatusBadgeComponent } from '../../../shared/status-badge/status-badge.component';
import { StatusUpdateComponent } from '../status-update/status-update.component';

@Component({
  selector: 'app-order-detail',
  imports: [AsyncPipe, DatePipe, RouterLink, StatusBadgeComponent, StatusUpdateComponent],
  template: `
    <a routerLink="/orders" class="btn btn-link px-0 mb-2">Volver a Ordenes</a>

    @if (vm$ | async; as vm) {
      @if (vm.order; as order) {
        <div class="card shadow-sm" style="max-width: 720px">
          <div class="card-header d-flex flex-wrap justify-content-between align-items-center gap-2">
            <span class="font-monospace small text-break">{{ order.id }}</span>
            <app-status-badge [status]="order.status" />
          </div>
          <dl class="card-body row mb-0">
            <dt class="col-sm-4">Tienda cliente</dt>   <dd class="col-sm-8">{{ order.customerStore }}</dd>
            <dt class="col-sm-4">Pai­s de origen</dt>   <dd class="col-sm-8">{{ order.originCountry }}</dd>
            <dt class="col-sm-4">Ciudad destino</dt>   <dd class="col-sm-8">{{ order.destinationCity }}</dd>
            <dt class="col-sm-4">Cantidad de ramos</dt><dd class="col-sm-8">{{ order.bouquetQuantity }}</dd>
            <dt class="col-sm-4">Creada</dt>           <dd class="col-sm-8">{{ order.createdAt | date: 'medium' }}</dd>
          </dl>
          <div class="card-footer bg-transparent">
            <app-status-update [order]="order" />
          </div>
        </div>
      } @else {
        <div class="alert alert-warning">La orden no existe.</div>
      }
    } @else {
      <div class="text-center py-5"><div class="spinner-border" role="status"></div></div>
    }
  `,
})
export class OrderDetailComponent {
  id = input.required<string>();
  private ordersService = inject(OrdersService);

  protected vm$ = toObservable(this.id).pipe(
    switchMap(id => this.ordersService.getOrder(id)),
    map(order => ({ order })),
  );
}