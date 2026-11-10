using Microsoft.Extensions.DependencyInjection;
using Ordenes.Application.Orders;
using Ordenes.Infrastructure.Context;
using Microsoft.EntityFrameworkCore;

namespace Ordenes.Infrastructure
{
    public static class DependencyInjection
    {
        public static IServiceCollection AddInfrastructure(this IServiceCollection services, string connectionString)
        {
            services.AddDbContext<AppDbContext>(o => o.UseSqlServer(connectionString));
            services.AddScoped<IOrderRepository, OrderRepository>();
            return services;
        }
    }

}
