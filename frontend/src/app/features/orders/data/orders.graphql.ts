import { gql } from 'apollo-angular';

const ORDER_FIELDS = gql`
  fragment OrderFields on Order {
    id customerStore originCountry destinationCity bouquetQuantity status createdAt
  }
`;

export const GET_ORDERS = gql`
  query GetOrders($status: OrderStatus) {
    orders(status: $status) { ...OrderFields }
  }
  ${ORDER_FIELDS}
`;

export const GET_ORDER = gql`
  query GetOrder($id: UUID!) {
    order(id: $id) { ...OrderFields }
  }
  ${ORDER_FIELDS}
`;

export const GET_ORDER_STATS = gql`
  query GetOrderStats {
    orderStats { total byStatus { status count } }
  }
`;

export const CREATE_ORDER = gql`
  mutation CreateOrder($input: CreateOrderInput!) {
    createOrder(input: $input) { ...OrderFields }
  }
  ${ORDER_FIELDS}
`;

export const UPDATE_ORDER_STATUS = gql`
  mutation UpdateOrderStatus($id: UUID!, $status: OrderStatus!) {
    updateOrderStatus(id: $id, status: $status) { id status }
  }
`;