using System;
using System.Collections.Generic;
using System.Text;

namespace Ordenes.Application.Common
{
    public class NotFoundException(string message) : Exception(message);
}
