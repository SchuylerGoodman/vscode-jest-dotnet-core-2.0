using Microsoft.AspNetCore;
using Microsoft.AspNetCore.Hosting;

namespace App
{
    public class Program
    {
        public static void Main(string[] args)
        {
            BuildWebHost(args).Run();
        }

        public static IWebHost BuildWebHost(string[] args) {
            var host = WebHost.CreateDefaultBuilder()
                .UseStartup<Startup>()
                .Build();

            return host;
        }
    }
}
