using JsAPI.Models;
using Microsoft.EntityFrameworkCore;

namespace JsAPI.Data
{
    public class JsAPIContext : DbContext
    {
        public JsAPIContext (DbContextOptions<JsAPIContext> options)
            : base(options)
        {
        }

        public DbSet<Person> Person { get; set; }
    }
}
