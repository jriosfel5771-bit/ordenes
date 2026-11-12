import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { of } from 'rxjs';
import { OrderFormComponent } from './order-form.component';
import { OrdersService } from '../data/orders.service';

describe('OrderFormComponent', () => {
  let calls: unknown[] = [];
  const ordersServiceStub = {
    createOrder: (input: unknown) => { calls.push(input); return of({ id: 'abc' }); },
  };

  beforeEach(async () => {
    calls = [];
    await TestBed.configureTestingModule({
      imports: [OrderFormComponent],
      providers: [provideRouter([]), { provide: OrdersService, useValue: ordersServiceStub }],
    }).compileComponents();
  });

  it('es inválido si la cantidad de ramos es 0', () => {
    const component = TestBed.createComponent(OrderFormComponent).componentInstance;
    component.form.setValue({ customerStore: 'Miami Market', originCountry: 'Colombia', destinationCity: 'Miami', bouquetQuantity: 0 });

    expect(component.form.valid).toBe(false);
  });

  it('no llama al servicio si el formulario es inválido', () => {
    const component = TestBed.createComponent(OrderFormComponent).componentInstance;

    component.submit();

    expect(calls.length).toBe(0);
  });
});