using Microsoft.EntityFrameworkCore;
using Ordenes.Domain.Orders;
using System;
using System.Collections.Generic;
using System.Text;

namespace Ordenes.Infrastructure.Context
{
    public class AppDbContext(DbContextOptions<AppDbContext> options) : DbContext(options)
    {
        public DbSet<Order> Orders => Set<Order>();

        protected override void OnModelCreating(ModelBuilder modelBuilder) =>
            modelBuilder.ApplyConfigurationsFromAssembly(typeof(AppDbContext).Assembly);
    }
}
