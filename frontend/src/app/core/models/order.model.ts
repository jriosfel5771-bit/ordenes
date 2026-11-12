export type OrderStatus = 'CREATED' | 'IN_TRANSIT' | 'DELIVERED' | 'CANCELLED';

export interface Order {
  id: string;
  customerStore: string;
  originCountry: string;
  destinationCity: string;
  bouquetQuantity: number;
  status: OrderStatus;
  createdAt: string;
}

export interface CreateOrderInput {
  customerStore: string;
  originCountry: string;
  destinationCity: string;
  bouquetQuantity: number;
}

export interface OrderStats {
  total: number;
  byStatus: { status: OrderStatus; count: number }[];
}

export const STATUS_LABEL: Record<OrderStatus, string> = {
  CREATED: 'Creada',
  IN_TRANSIT: 'En transito',
  DELIVERED: 'Entregada',
  CANCELLED: 'Cancelada',
};

export const NEXT_STATUSES: Record<OrderStatus, OrderStatus[]> = {
  CREATED: ['IN_TRANSIT', 'CANCELLED'],
  IN_TRANSIT: ['DELIVERED'],
  DELIVERED: [],
  CANCELLED: [],
};