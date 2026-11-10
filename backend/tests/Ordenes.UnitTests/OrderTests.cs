using Ordenes.Domain.Common;
using Ordenes.Domain.Order;
using System;
using System.Collections.Generic;
using System.Text;

namespace Ordenes.UnitTests
{
    public class OrderTests
    {
        private static Order NewOrder() => Order.Create("Market Miami", "Colombia", "Miami", 120);

        [Fact]
        public void Create_ConDatosValidos_QuedaEnEstadoCreated()
        {
            var order = NewOrder();

            Assert.Equal(OrderStatus.Created, order.Status);
            Assert.NotEqual(Guid.Empty, order.Id);
        }

        [Theory]
        [InlineData(0)]
        [InlineData(-5)]
        public void Create_ConCantidadInvalida_LanzaDomainException(int quantity)
        {
            Assert.Throws<DomainException>(() => Order.Create("Tienda", "Colombia", "Miami", quantity));
        }

        [Theory]
        [InlineData(OrderStatus.InTransit)]
        [InlineData(OrderStatus.Cancelled)]
        public void ChangeStatus_DesdeCreated_EsPermitido(OrderStatus next)
        {
            var order = NewOrder();

            order.ChangeStatus(next);

            Assert.Equal(next, order.Status);
        }

        [Fact]
        public void ChangeStatus_DeInTransitADelivered_EsPermitido()
        {
            var order = NewOrder();
            order.ChangeStatus(OrderStatus.InTransit);

            order.ChangeStatus(OrderStatus.Delivered);

            Assert.Equal(OrderStatus.Delivered, order.Status);
        }

        [Theory]
        [InlineData(OrderStatus.Created, OrderStatus.Delivered)]
        [InlineData(OrderStatus.InTransit, OrderStatus.Cancelled)]
        [InlineData(OrderStatus.Delivered, OrderStatus.Created)]
        [InlineData(OrderStatus.Cancelled, OrderStatus.InTransit)]
        public void ChangeStatus_TransicionInvalida_LanzaDomainException(OrderStatus from, OrderStatus to)
        {
            var order = NewOrder();
            if (from == OrderStatus.InTransit) order.ChangeStatus(OrderStatus.InTransit);
            if (from == OrderStatus.Delivered) { order.ChangeStatus(OrderStatus.InTransit); order.ChangeStatus(OrderStatus.Delivered); }
            if (from == OrderStatus.Cancelled) order.ChangeStatus(OrderStatus.Cancelled);

            Assert.Throws<DomainException>(() => order.ChangeStatus(to));
        }
    }
}
