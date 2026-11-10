using Ordenes.Application.Orders;
using Ordenes.Infrastructure;
using Ordenes.Infrastructure.Context;
using Microsoft.EntityFrameworkCore;
using Ordenes.Api.GraphQL;
var builder = WebApplication.CreateBuilder(args);
builder.Services.AddInfrastructure(builder.Configuration.GetConnectionString("Default")!);
builder.Services.AddScoped<OrderService>();

builder.Services
    .AddGraphQLServer()
    .AddApolloFederation()
    .AddQueryType<OrderQueries>()
    .AddMutationType<OrderMutations>()
    .AddType<OrderType>()
    .AddType<OrderStatsType>()
    .AddType<StatusCountType>()
    .AddErrorFilter<DomainErrorFilter>();

var app = builder.Build();

using (var scope = app.Services.CreateScope())
{
    var db = scope.ServiceProvider.GetRequiredService<AppDbContext>();
    db.Database.Migrate();
    DbInit.Init(db);
}

app.MapGraphQL();
app.Run();