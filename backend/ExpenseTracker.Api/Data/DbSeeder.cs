using ExpenseTracker.Api.Models;
using Microsoft.EntityFrameworkCore;

namespace ExpenseTracker.Api.Data;

public static class DbSeeder
{
    public static async Task SeedCategoriesAsync(AppDbContext db)
    {
        if (await db.Categories.AnyAsync())
            return;

        var categories = new List<Category>
        {
            new() { Name = "Food",          Type = TransactionType.Expense },
            new() { Name = "Transport",     Type = TransactionType.Expense },
            new() { Name = "Shopping",      Type = TransactionType.Expense },
            new() { Name = "Bills",         Type = TransactionType.Expense },
            new() { Name = "Entertainment", Type = TransactionType.Expense },
            new() { Name = "Health",        Type = TransactionType.Expense },
            new() { Name = "Salary",        Type = TransactionType.Income  },
            new() { Name = "Other",         Type = TransactionType.Expense },
        };

        db.Categories.AddRange(categories);
        await db.SaveChangesAsync();
    }
}
