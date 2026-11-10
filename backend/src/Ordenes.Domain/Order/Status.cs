using System;
using System.Collections.Generic;
using System.Text;

namespace Ordenes.Domain.Order
{
    public enum OrderStatus
    {
        Created,
        InTransit,
        Delivered,
        Cancelled
    }
}
