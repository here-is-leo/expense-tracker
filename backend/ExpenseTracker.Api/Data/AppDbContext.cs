using ExpenseTracker.Api.Models;
using Microsoft.EntityFrameworkCore;

namespace ExpenseTracker.Api.Data;

public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

    public DbSet<User> Users => Set<User>();
    public DbSet<Category> Categories => Set<Category>();
    public DbSet<Transaction> Transactions => Set<Transaction>();

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        // User
        modelBuilder.Entity<User>(entity =>
        {
            entity.HasKey(u => u.Id);
            entity.Property(u => u.Id).HasDefaultValueSql("NEWSEQUENTIALID()");
            entity.Property(u => u.Email).IsRequired().HasMaxLength(255);
            entity.Property(u => u.DisplayName).IsRequired().HasMaxLength(100);
            entity.Property(u => u.PasswordHash).IsRequired().HasMaxLength(255);
            entity.Property(u => u.CreatedAt).IsRequired();
            entity.Property(u => u.UpdatedAt).IsRequired();

            entity.HasIndex(u => u.Email).IsUnique();
        });

        // Category
        modelBuilder.Entity<Category>(entity =>
        {
            entity.HasKey(c => c.Id);
            entity.Property(c => c.Id).HasDefaultValueSql("NEWSEQUENTIALID()");
            entity.Property(c => c.Name).IsRequired().HasMaxLength(50);
            entity.Property(c => c.Type).IsRequired();

            entity.HasIndex(c => c.Name).IsUnique();
        });

        // Transaction
        modelBuilder.Entity<Transaction>(entity =>
        {
            entity.HasKey(t => t.Id);
            entity.Property(t => t.Id).HasDefaultValueSql("NEWSEQUENTIALID()");
            entity.Property(t => t.UserId).IsRequired();
            entity.Property(t => t.CategoryId).IsRequired();
            entity.Property(t => t.Type).IsRequired();
            entity.Property(t => t.Amount).IsRequired().HasColumnType("decimal(18,2)");
            entity.Property(t => t.Description).HasMaxLength(500);
            entity.Property(t => t.TransactionDate).IsRequired();
            entity.Property(t => t.CreatedAt).IsRequired();
            entity.Property(t => t.UpdatedAt).IsRequired();

            entity.HasOne(t => t.User)
                .WithMany(u => u.Transactions)
                .HasForeignKey(t => t.UserId)
                .OnDelete(DeleteBehavior.Cascade);

            entity.HasOne(t => t.Category)
                .WithMany(c => c.Transactions)
                .HasForeignKey(t => t.CategoryId)
                .OnDelete(DeleteBehavior.Restrict);

            entity.HasIndex(t => new { t.UserId, t.TransactionDate });
            entity.HasIndex(t => new { t.UserId, t.CategoryId });
            entity.HasIndex(t => new { t.UserId, t.Type });

            entity.ToTable(tb => tb.HasCheckConstraint("CK_Transaction_Amount", "[Amount] > 0"));
        });
    }
}
