using Microsoft.EntityFrameworkCore;
using Ordenes.Application.Orders;
using Ordenes.Domain.Orders;

namespace Ordenes.Infrastructure.Context
{
    public class OrderRepository(AppDbContext db) : IOrderRepository
    {
        public Task<Order?> GetById(Guid id, CancellationToken ct = default) =>
            db.Orders.FirstOrDefaultAsync(o => o.Id == id, ct);

        public async Task<IReadOnlyList<Order>> List(OrderStatus? status, CancellationToken ct = default)
        {
            IQueryable<Order> query = db.Orders.AsNoTracking();
            if (status is not null) query = query.Where(o => o.Status == status);
            return await query.OrderByDescending(o => o.CreatedAt).ToListAsync(ct);
        }

        public Task<Dictionary<OrderStatus, int>> CountByStatus(CancellationToken ct = default) =>
        db.Orders.GroupBy(o => o.Status)
                 .Select(g => new { g.Key, Count = g.Count() })
                 .ToDictionaryAsync(x => x.Key, x => x.Count, ct);

        public async Task Add(Order order, CancellationToken ct = default) =>
            await db.Orders.AddAsync(order, ct);

        public Task SaveChanges(CancellationToken ct = default) => db.SaveChangesAsync(ct);
    }
}
