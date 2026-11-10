using Ordenes.Domain.Orders;
using System;
using System.Collections.Generic;
using System.Text;

namespace Ordenes.Application.Orders
{
    public interface IOrderRepository
    {
        Task<Order?> GetById(Guid id, CancellationToken ct = default);
        Task<IReadOnlyList<Order>> List(OrderStatus? status, CancellationToken ct = default);
        Task<Dictionary<OrderStatus, int>> CountByStatus(CancellationToken ct = default);
        Task Add(Order order, CancellationToken ct = default);
        Task SaveChanges(CancellationToken ct = default);
    }
}
