import { Component, computed, inject, input, signal } from '@angular/core';
import { NEXT_STATUSES, Order, OrderStatus, STATUS_LABEL } from '../../../core/models/order.model';
import { OrdersService } from '../data/orders.service';
import { NotificationService } from '../../../core/services/notification.service';

@Component({
  selector: 'app-status-update',
  template: `
    @if (options().length) {
      <div class="d-flex flex-wrap align-items-center gap-2">
        <span class="small text-body-secondary me-1">Cambiar estado a:</span>
        @for (s of options(); track s) {
          <button type="button" class="btn btn-sm" [class]="s === 'CANCELLED' ? 'btn-outline-danger' : 'btn-primary'"
                  [disabled]="saving()" (click)="change(s)">{{ labels[s] }}</button>
        }
      </div>
    } @else {
      <span class="small text-body-secondary">Estado final: esta orden no admite mas cambios.</span>
    }
  `,
})
export class StatusUpdateComponent {
  order = input.required<Order>();
  private ordersService = inject(OrdersService);
  private notify = inject(NotificationService);

  protected labels = STATUS_LABEL;
  protected saving = signal(false);
  protected options = computed(() => NEXT_STATUSES[this.order().status]);

  change(status: OrderStatus): void {
    this.saving.set(true);
    this.ordersService.updateStatus(this.order().id, status).subscribe({
      next: () => {
        this.notify.success(`Estado actualizado a ${this.labels[status]}.`);
        this.saving.set(false);
      },
      error: () => this.saving.set(false),
    });
  }
}