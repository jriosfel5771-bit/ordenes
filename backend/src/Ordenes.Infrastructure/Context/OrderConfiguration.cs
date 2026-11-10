using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Ordenes.Domain.Orders;
using System;
using System.Collections.Generic;
using System.Text;

namespace Ordenes.Infrastructure.Context
{
    public class OrderConfiguration : IEntityTypeConfiguration<Order>
    {
        public void Configure(EntityTypeBuilder<Order> builder)
        {
            builder.ToTable("Orders");
            builder.HasKey(o => o.Id);
            builder.Property(o => o.CustomerStore).HasMaxLength(150).IsRequired();
            builder.Property(o => o.OriginCountry).HasMaxLength(80).IsRequired();
            builder.Property(o => o.DestinationCity).HasMaxLength(100).IsRequired();
            builder.Property(o => o.BouquetQuantity).IsRequired();
            builder.Property(o => o.Status).HasConversion<string>().HasMaxLength(20);
            builder.Property(o => o.CreatedAt).IsRequired();
            builder.HasIndex(o => o.Status);
        }
    }
}
