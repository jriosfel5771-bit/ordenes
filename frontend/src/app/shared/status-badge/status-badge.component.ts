import { Component, input } from '@angular/core';
import { OrderStatus, STATUS_LABEL } from '../../core/models/order.model';

@Component({
  selector: 'app-status-badge',
  template: `<span class="badge rounded-pill" [class]="'status-' + status().toLowerCase()">{{ labels[status()] }}</span>`,
})
export class StatusBadgeComponent {
  status = input.required<OrderStatus>();
  protected readonly labels = STATUS_LABEL;
}