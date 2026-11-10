using Ordenes.Application.Common;
using Ordenes.Application.Orders;
using Ordenes.Domain.Orders;
using System;
using System.Collections.Generic;
using System.Text;

namespace Ordenes.UnitTests
{
    public class OrderServiceTests
    {
        private sealed class InMemoryOrderRepository : IOrderRepository
        {
            public readonly List<Order> Items = [];
            public Task<Order?> GetById(Guid id, CancellationToken ct = default) => Task.FromResult(Items.FirstOrDefault(o => o.Id == id));
            public Task<IReadOnlyList<Order>> List(OrderStatus? status, CancellationToken ct = default) =>
                Task.FromResult<IReadOnlyList<Order>>(Items.Where(o => status is null || o.Status == status).ToList());
            public Task<Dictionary<OrderStatus, int>> CountByStatus(CancellationToken ct = default) =>
                Task.FromResult(Items.GroupBy(o => o.Status).ToDictionary(g => g.Key, g => g.Count()));
            public Task Add(Order order, CancellationToken ct = default) { Items.Add(order); return Task.CompletedTask; }
            public Task SaveChanges(CancellationToken ct = default) => Task.CompletedTask;
        }

        [Fact]
        public async Task Create_GuardaNuevaOrden()
        {
            var repo = new InMemoryOrderRepository();
            var service = new OrderService(repo);

            var dto = await service.Create(new CreateOrderInput("Market Miami", "Colombia", "MIami", 50));

            Assert.Single(repo.Items);
            Assert.Equal(OrderStatus.Created, dto.Status);
        }

        [Fact]
        public async Task ChangeStatus_OrdenInexistente_LanzaNotFound()
        {
            var service = new OrderService(new InMemoryOrderRepository());

            await Assert.ThrowsAsync<NotFoundException>(() => service.ChangeStatus(Guid.NewGuid(), OrderStatus.InTransit));
        }

        [Fact]
        public async Task GetStats_DevuelveTotalYConteoPorEstado()
        {
            var repo = new InMemoryOrderRepository();
            var service = new OrderService(repo);
            await service.Create(new CreateOrderInput("Market Miami", "Colombia", "Miami", 10));
            var second = await service.Create(new CreateOrderInput("Market Miami", "Colombia", "New York", 20));
            await service.ChangeStatus(second.Id, OrderStatus.InTransit);

            var stats = await service.GetStats();

            Assert.Equal(2, stats.Total);
            Assert.Equal(1, stats.ByStatus.Single(s => s.Status == OrderStatus.InTransit).Count);
        }
    }
}
