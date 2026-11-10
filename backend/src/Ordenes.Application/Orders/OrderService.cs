using Ordenes.Application.Common;
using Ordenes.Domain.Orders;
using System;
using System.Collections.Generic;
using System.Text;

namespace Ordenes.Application.Orders
{
    public class OrderService(IOrderRepository repository)
    {
        public async Task<OrderDto> Create(CreateOrderInput input, CancellationToken ct = default)
        {
            var order = Order.Create(input.CustomerStore, input.OriginCountry, input.DestinationCity, input.BouquetQuantity);
            await repository.Add(order, ct);
            await repository.SaveChanges(ct);
            return OrderDto.From(order);
        }

        public async Task<IReadOnlyList<OrderDto>> List(OrderStatus? status, CancellationToken ct = default)
        {
            var orders = await repository.List(status, ct);
            return orders.Select(OrderDto.From).ToList();
        }

        public async Task<OrderDto?> GetById(Guid id, CancellationToken ct = default)
        {
            var order = await repository.GetById(id, ct);
            return order is null ? null : OrderDto.From(order);
        }

        public async Task<OrderDto> ChangeStatus(Guid id, OrderStatus next, CancellationToken ct = default)
        {
            var order = await repository.GetById(id, ct)
                        ?? throw new NotFoundException($"La orden {id} no existe.");

            order.ChangeStatus(next);
            await repository.SaveChanges(ct);
            return OrderDto.From(order);
        }

        public async Task<OrderStatsDto> GetStats(CancellationToken ct = default)
        {
            var counts = await repository.CountByStatus(ct);
            var byStatus = Enum.GetValues<OrderStatus>()
                .Select(s => new StatusCountDto(s, counts.GetValueOrDefault(s)))
                .ToList();
            return new OrderStatsDto(byStatus.Sum(x => x.Count), byStatus);
        }
    }
}
