using Ordenes.Domain.Orders;
using System;
using System.Collections.Generic;
using System.Text;

namespace Ordenes.Application.Orders
{
    public record CreateOrderInput(string CustomerStore, string OriginCountry, string DestinationCity, int BouquetQuantity);
    public record OrderDto(
        Guid Id,
        string CustomerStore,
        string OriginCountry,
        string DestinationCity,
        int BouquetQuantity,
        OrderStatus Status,
        DateTime CreatedAt)
    {
        public static OrderDto From(Order o) =>
            new(o.Id, o.CustomerStore, o.OriginCountry, o.DestinationCity, o.BouquetQuantity, o.Status, o.CreatedAt);
    }

    public record StatusCountDto(OrderStatus Status, int Count);

    public record OrderStatsDto(int Total, IReadOnlyList<StatusCountDto> ByStatus);
}
