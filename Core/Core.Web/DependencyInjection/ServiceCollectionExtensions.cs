using Core.App;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace Core.Web.DependencyInjection
{
    public static class ServiceCollectionExtensions
    {
        public static void RegisterModule<T>(this IServiceCollection services)
            where T : IModule, new()
        {
            var module = new T();
            module.Register(services);
        }

        public static void RegisterTopLevelModule<T>(this IServiceCollection services,
            IMvcBuilder mvcBuider, IConfiguration configuration)
            where T : ITopLevelModule, new()
        {
            var module = new T();
            mvcBuider.AddApplicationPart(module.GetType().Assembly);

            module.Register(services, configuration);
        }
    }
}
