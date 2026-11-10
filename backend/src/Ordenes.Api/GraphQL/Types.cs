using HotChocolate.ApolloFederation.Types;
using Ordenes.Application.Orders;

namespace Ordenes.Api.GraphQL
{
    public class OrderType : ObjectType<OrderDto>
    {
        protected override void Configure(IObjectTypeDescriptor<OrderDto> descriptor)
        {
            descriptor.Name("Order");
            descriptor.Key("id")
                .ResolveReferenceWith(_ => ResolveById(default!, default!, default));
        }
        private static Task<OrderDto?> ResolveById(
            Guid id, [Service] OrderService service, CancellationToken ct) =>
            service.GetById(id, ct);
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
