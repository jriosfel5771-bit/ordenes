using Ordenes.Domain.Orders;
using System;
using System.Collections.Generic;
using System.Text;

namespace Ordenes.Infrastructure.Context
{
    public static class DbInit
    {
        public static void Init(AppDbContext db)
        {
            if (db.Orders.Any()) return;

            var orders = new[]
            {
            Order.Create("Market Miami", "Colombia", "Miami", 320),
            Order.Create("Market Florida", "Ecuador", "Florida", 210),
            Order.Create("Market Chicago", "Colombia", "Chicago", 550),
            Order.Create("Market New York", "Peru", "New York", 120),
        };
            orders[1].ChangeStatus(OrderStatus.InTransit);
            orders[2].ChangeStatus(OrderStatus.InTransit);
            orders[2].ChangeStatus(OrderStatus.Delivered);
            orders[3].ChangeStatus(OrderStatus.Cancelled);

            db.Orders.AddRange(orders);
            db.SaveChanges();
        }
    }
}
