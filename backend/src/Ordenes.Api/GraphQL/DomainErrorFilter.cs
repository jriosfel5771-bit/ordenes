using Ordenes.Application.Common;
using Ordenes.Domain.Common;

namespace Ordenes.Api.GraphQL
{
    public class DomainErrorFilter : IErrorFilter
    {
        public IError OnError(IError error) => error.Exception switch
        {
            DomainException ex => error.WithMessage(ex.Message).WithCode("DOMAIN_RULE_VIOLATION").RemoveException(),
            NotFoundException ex => error.WithMessage(ex.Message).WithCode("NOT_FOUND").RemoveException(),
            _ => error
        };
    }
}
