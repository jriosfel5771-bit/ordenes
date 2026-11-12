import { Component, inject } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { STATUS_LABEL } from '../../core/models/order.model';
import { OrdersService } from '../orders/data/orders.service';
import { StatCardComponent } from '../../shared/stat-card/stat-card.component';

@Component({
  selector: 'app-dashboard',
  imports: [AsyncPipe, RouterLink, StatCardComponent],
  template: `
    <div class="d-flex flex-wrap justify-content-between align-items-center gap-2 mb-4">
      <h1 class="h3 m-0">Dashboard</h1>
      <a routerLink="/orders/new" class="btn btn-primary">+ Nueva orden</a>
    </div>

    @if (stats$ | async; as stats) {
      <div class="row g-3">
        <div class="col-12 col-lg">
          <app-stat-card label="Total Ordenes" [value]="stats.total" cssClass="text-bg-dark" />
        </div>
        @for (s of stats.byStatus; track s.status) {
          <div class="col-6 col-md-3 col-lg">
            <app-stat-card [label]="labels[s.status]" [value]="s.count" [cssClass]="'status-' + s.status.toLowerCase()" />
          </div>
        }
      </div>
    } @else {
      <div class="text-center py-5"><div class="spinner-border" role="status"></div></div>
    }
  `,
})
export class DashboardComponent {
  private orders = inject(OrdersService);
  protected stats$ = this.orders.getStats();
  protected labels = STATUS_LABEL;
}