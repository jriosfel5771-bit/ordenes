using Ordenes.Application.Orders;
using Ordenes.Domain.Orders;

namespace Ordenes.Api.GraphQL
{
    public class OrderQueries
    {
        public Task<IReadOnlyList<OrderDto>> GetOrders(OrderStatus? status, [Service] OrderService service, CancellationToken ct) =>
            service.List(status, ct);

        public Task<OrderDto?> GetOrder(Guid id, [Service] OrderService service, CancellationToken ct) =>
            service.GetById(id, ct);

        public Task<OrderStatsDto> GetOrderStats([Service] OrderService service, CancellationToken ct) =>
            service.GetStats(ct);
    }
}
