using Core.App.CurrentUser;
using Core.Database;
using Microsoft.EntityFrameworkCore;

namespace AppTemplate.Users.Database
{
    public class UsersDataContext : CoreDataContext
    {
        public DbSet<UserPreference> UserPreferenses { get; set; }

        public UsersDataContext(DbContextOptions<UsersDataContext> options, ICurrentUserLocator currentUserLocator)
         : base(options, currentUserLocator)
        {
        }
    }
}
