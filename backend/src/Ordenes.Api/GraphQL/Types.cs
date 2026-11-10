using Ordenes.Application.Orders;

namespace Ordenes.Api.GraphQL
{
    public class OrderType : ObjectType<OrderDto>
    {
        protected override void Configure(IObjectTypeDescriptor<OrderDto> descriptor) => descriptor.Name("Order");
    }

    public class OrderStatsType : ObjectType<OrderStatsDto>
    {
        protected override void Configure(IObjectTypeDescriptor<OrderStatsDto> descriptor) => descriptor.Name("OrderStats");
    }

    public class StatusCountType : ObjectType<StatusCountDto>
    {
        protected override void Configure(IObjectTypeDescriptor<StatusCountDto> descriptor) => descriptor.Name("StatusCount");
    }
}
