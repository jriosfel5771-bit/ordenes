using Ordenes.Application.Orders;
using Ordenes.Domain.Orders;

namespace Ordenes.Api.GraphQL
{
    public class OrderMutations
    {
        public Task<OrderDto> CreateOrder(CreateOrderInput input, [Service] OrderService service, CancellationToken ct) =>
            service.Create(input, ct);

        public Task<OrderDto> UpdateOrderStatus(Guid id, OrderStatus status, [Service] OrderService service, CancellationToken ct) =>
            service.ChangeStatus(id, status, ct);
    }
}
