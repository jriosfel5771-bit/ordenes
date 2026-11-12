import { Component, inject, signal } from '@angular/core';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { OrdersService } from '../data/orders.service';
import { NotificationService } from '../../../core/services/notification.service';

type Field = 'customerStore' | 'originCountry' | 'destinationCity' | 'bouquetQuantity';

@Component({
  selector: 'app-order-form',
  imports: [ReactiveFormsModule, RouterLink],
  template: `
    <h1 class="h3 mb-4">Nueva orden</h1>

    <form [formGroup]="form" (ngSubmit)="submit()" class="card card-body shadow-sm" novalidate style="max-width: 640px">
      <div class="mb-3">
        <label for="customerStore" class="form-label">Tienda cliente</label>
        <input id="customerStore" class="form-control" formControlName="customerStore" [class.is-invalid]="invalid('customerStore')" />
        <div class="invalid-feedback">Obligatoria, maximo 150 caracteres.</div>
      </div>

      <div class="row g-3 mb-3">
        <div class="col-sm-6">
          <label for="originCountry" class="form-label">Pai­s de origen</label>
          <select id="originCountry" class="form-select" formControlName="originCountry">
            @for (c of countries; track c) { <option [value]="c">{{ c }}</option> }
          </select>
        </div>
        <div class="col-sm-6">
          <label for="destinationCity" class="form-label">Ciudad destino</label>
          <input id="destinationCity" class="form-control" formControlName="destinationCity" [class.is-invalid]="invalid('destinationCity')" />
          <div class="invalid-feedback">Obligatoria, maximo 100 caracteres.</div>
        </div>
      </div>

      <div class="mb-4">
        <label for="bouquetQuantity" class="form-label">Cantidad de ramos</label>
        <input id="bouquetQuantity" type="number" min="1" class="form-control" formControlName="bouquetQuantity" [class.is-invalid]="invalid('bouquetQuantity')" />
        <div class="invalid-feedback">Debe ser un numero mayor a 0.</div>
      </div>

      <div class="d-flex justify-content-end gap-2">
        <a routerLink="/orders" class="btn btn-outline-secondary">Cancelar</a>
        <button type="submit" class="btn btn-primary" [disabled]="saving()">
          @if (saving()) { <span class="spinner-border spinner-border-sm me-1"></span> }
          Crear orden
        </button>
      </div>
    </form>
  `,
})
export class OrderFormComponent {
  private fb = inject(NonNullableFormBuilder);
  private ordersService = inject(OrdersService);
  private notify = inject(NotificationService);
  private router = inject(Router);

  protected readonly countries = ['Colombia', 'Ecuador', 'Peru', 'Mexico', 'Costa Rica', 'Guatemala'];
  protected saving = signal(false);

  form = this.fb.group({
    customerStore: ['', [Validators.required, Validators.maxLength(150)]],
    originCountry: ['Colombia', Validators.required],
    destinationCity: ['', [Validators.required, Validators.maxLength(100)]],
    bouquetQuantity: [1, [Validators.required, Validators.min(1)]],
  });

  invalid(field: Field): boolean {
    const control = this.form.controls[field];
    return control.invalid && (control.touched || control.dirty);
  }

  submit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    this.saving.set(true);
    this.ordersService.createOrder(this.form.getRawValue()).subscribe({
      next: order => {
        this.notify.success('Orden creada correctamente.');
        this.router.navigate(['/orders', order.id]);
      },
      error: () => this.saving.set(false),
    });
  }
}