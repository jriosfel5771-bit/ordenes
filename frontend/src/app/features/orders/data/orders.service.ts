import { Injectable, inject } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { EMPTY, Observable, catchError, map, mergeMap, of, throwError } from 'rxjs';
import { CreateOrderInput, Order, OrderStats, OrderStatus } from '../../../core/models/order.model';
import { NotificationService } from '../../../core/services/notification.service';
import { CREATE_ORDER, GET_ORDER, GET_ORDERS, GET_ORDER_STATS, UPDATE_ORDER_STATUS } from './orders.graphql';

@Injectable({ providedIn: 'root' })
export class OrdersService {
    private apollo = inject(Apollo);
    private notify = inject(NotificationService);

    getOrders(status?: OrderStatus | null): Observable<Order[]> {
        return this.apollo
            .watchQuery<{ orders: Order[] }>({ query: GET_ORDERS, variables: { status: status ?? null }, fetchPolicy: 'cache-and-network' })
            .valueChanges.pipe(
                mergeMap(r => (r.dataState === 'complete' ? of(r.data.orders) : EMPTY)),
                this.handleError(),
            );
    }

    getOrder(id: string): Observable<Order | null> {
        return this.apollo
            .watchQuery<{ order: Order | null }>({ query: GET_ORDER, variables: { id } })
            .valueChanges.pipe(
                mergeMap(r => (r.dataState === 'complete' ? of(r.data.order) : EMPTY)),
                this.handleError(),
            );
    }

    getStats(): Observable<OrderStats> {
        return this.apollo
            .watchQuery<{ orderStats: OrderStats }>({ query: GET_ORDER_STATS, fetchPolicy: 'cache-and-network' })
            .valueChanges.pipe(
                mergeMap(r => (r.dataState === 'complete' ? of(r.data.orderStats) : EMPTY)),
                this.handleError(),
            );
    }
    createOrder(input: CreateOrderInput): Observable<Order> {
        return this.apollo
            .mutate<{ createOrder: Order }>({ mutation: CREATE_ORDER, variables: { input }, refetchQueries: ['GetOrders', 'GetOrderStats'] })
            .pipe(map(r => r.data!.createOrder), this.handleError());
    }

    updateStatus(id: string, status: OrderStatus): Observable<Pick<Order, 'id' | 'status'>> {
        return this.apollo
            .mutate<{ updateOrderStatus: Pick<Order, 'id' | 'status'> }>({
                mutation: UPDATE_ORDER_STATUS, variables: { id, status }, refetchQueries: ['GetOrders', 'GetOrderStats'],
            })
            .pipe(map(r => r.data!.updateOrderStatus), this.handleError());
    }

    private handleError<T>() {
        return (source: Observable<T>) => source.pipe(
            catchError(err => {
                this.notify.error(this.messageFrom(err));
                return throwError(() => err);
            }),
        );
    }

    private messageFrom(err: unknown): string {
        const e = err as {
            message?: string;
            errors?: { message?: string }[]; 
            graphQLErrors?: { message?: string }[];
            networkError?: unknown;
        } | null;

        return e?.errors?.[0]?.message
            ?? e?.graphQLErrors?.[0]?.message
            ?? (e?.networkError ? 'No hay conexión con el servidor.' : undefined)
            ?? e?.message
            ?? 'Ocurrió un error inesperado.';
    }
}