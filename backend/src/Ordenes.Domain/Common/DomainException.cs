using System;
using System.Collections.Generic;
using System.Text;

namespace Ordenes.Domain.Common
{
    public class DomainException(string message) : Exception(message);
}
