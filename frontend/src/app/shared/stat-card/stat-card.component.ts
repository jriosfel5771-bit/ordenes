import { Component, input } from '@angular/core';

@Component({
  selector: 'app-stat-card',
  template: `
    <div class="card h-100 border-0 shadow-sm" [class]="cssClass()">
      <div class="card-body">
        <div class="small text-uppercase opacity-75">{{ label() }}</div>
        <div class="display-6 fw-semibold">{{ value() }}</div>
      </div>
    </div>
  `,
})
export class StatCardComponent {
  label = input.required<string>();
  value = input.required<number>();
  cssClass = input<string>('');
}