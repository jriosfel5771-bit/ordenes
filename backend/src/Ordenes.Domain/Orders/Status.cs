using System;
using System.Collections.Generic;
using System.Text;

namespace Ordenes.Domain.Orders
{
    public enum OrderStatus
    {
        Created,
        InTransit,
        Delivered,
        Cancelled
    }
}
