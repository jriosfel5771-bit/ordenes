using Ordenes.Domain.Common;
using System;
using System.Collections.Generic;
using System.Text;

namespace Ordenes.Domain.Order
{
    public class Order
    {
        private static readonly Dictionary<OrderStatus, OrderStatus[]> AllowedTransitions = new()
        {
            [OrderStatus.Created] = [OrderStatus.InTransit, OrderStatus.Cancelled],
            [OrderStatus.InTransit] = [OrderStatus.Delivered],
        };

        public Guid Id { get; private set; }
        public string CustomerStore { get; private set; } = default!;
        public string OriginCountry { get; private set; } = default!;
        public string DestinationCity { get; private set; } = default!;
        public int BouquetQuantity { get; private set; }
        public OrderStatus Status { get; private set; }
        public DateTime CreatedAt { get; private set; }

        private Order() { }

        public static Order Create(string customerStore, string originCountry, string destinationCity, int bouquetQuantity)
        {
            if (string.IsNullOrWhiteSpace(customerStore)) throw new DomainException("El cliente es obligatorio.");
            if (string.IsNullOrWhiteSpace(originCountry)) throw new DomainException("El país de origen es obligatorio.");
            if (string.IsNullOrWhiteSpace(destinationCity)) throw new DomainException("La ciudad destino es obligatoria.");
            if (bouquetQuantity <= 0) throw new DomainException("La cantidad de ramos debe ser mayor a 0.");

            return new Order
            {
                Id = Guid.NewGuid(),
                CustomerStore = customerStore.Trim(),
                OriginCountry = originCountry.Trim(),
                DestinationCity = destinationCity.Trim(),
                BouquetQuantity = bouquetQuantity,
                Status = OrderStatus.Created,
                CreatedAt = DateTime.UtcNow
            };
        }

        public bool CanChangeTo(OrderStatus next) =>
            AllowedTransitions.TryGetValue(Status, out var targets) && targets.Contains(next);

        public void ChangeStatus(OrderStatus next)
        {
            if (!CanChangeTo(next))
                throw new DomainException($"Cambio de estado no permitido: {Status} → {next}.");

            Status = next;
        }
    }
}
