using ExpenseTracker.Api.Data;
using ExpenseTracker.Api.DTOs.Dashboard;
using ExpenseTracker.Api.DTOs.Transactions;
using ExpenseTracker.Api.Interfaces;
using ExpenseTracker.Api.Models;
using Microsoft.EntityFrameworkCore;

namespace ExpenseTracker.Api.Services;

public class DashboardService : IDashboardService
{
    private readonly AppDbContext _db;

    public DashboardService(AppDbContext db)
    {
        _db = db;
    }

    public async Task<DashboardSummaryDto> GetSummaryAsync(Guid userId)
    {
        var totals = await _db.Transactions
            .Where(t => t.UserId == userId)
            .GroupBy(t => t.Type)
            .Select(g => new { Type = g.Key, Total = g.Sum(t => t.Amount) })
            .ToListAsync();

        var totalIncome = totals
            .Where(t => t.Type == TransactionType.Income)
            .Select(t => t.Total)
            .FirstOrDefault();
        var totalExpense = totals
            .Where(t => t.Type == TransactionType.Expense)
            .Select(t => t.Total)
            .FirstOrDefault();

        var byCategory = await _db.Transactions
            .Where(t => t.UserId == userId)
            .GroupBy(t => new { t.CategoryId, t.Category.Name, t.Type })
            .Select(g => new CategorySummaryDto
            {
                CategoryId = g.Key.CategoryId,
                CategoryName = g.Key.Name,
                Type = g.Key.Type == TransactionType.Income ? "income" : "expense",
                Total = g.Sum(t => t.Amount),
                Count = g.Count()
            })
            .OrderBy(c => c.Type == "income" ? 0 : 1)
            .ThenByDescending(c => c.Total)
            .ToListAsync();

        var now = DateTime.UtcNow;
        var currentMonthUtc = new DateTime(now.Year, now.Month, 1, 0, 0, 0, DateTimeKind.Utc);
        var firstMonthUtc = currentMonthUtc.AddMonths(-11);

        var monthlyRaw = await _db.Transactions
            .Where(t => t.UserId == userId && t.TransactionDate >= firstMonthUtc)
            .GroupBy(t => new { t.TransactionDate.Year, t.TransactionDate.Month, t.Type })
            .Select(g => new
            {
                g.Key.Year,
                g.Key.Month,
                g.Key.Type,
                Total = g.Sum(t => t.Amount)
            })
            .ToListAsync();

        var monthly = Enumerable.Range(0, 12)
            .Select(offset => firstMonthUtc.AddMonths(offset))
            .Select(month => new MonthlySummaryDto
            {
                Year = month.Year,
                Month = month.Month,
                Income = monthlyRaw
                    .Where(m => m.Year == month.Year
                        && m.Month == month.Month
                        && m.Type == TransactionType.Income)
                    .Select(m => m.Total)
                    .FirstOrDefault(),
                Expense = monthlyRaw
                    .Where(m => m.Year == month.Year
                        && m.Month == month.Month
                        && m.Type == TransactionType.Expense)
                    .Select(m => m.Total)
                    .FirstOrDefault()
            })
            .ToList();

        var recent = await _db.Transactions
            .AsNoTracking()
            .Include(t => t.Category)
            .Where(t => t.UserId == userId)
            .OrderByDescending(t => t.TransactionDate)
            .ThenByDescending(t => t.CreatedAt)
            .Take(5)
            .Select(t => new TransactionDto
            {
                Id = t.Id,
                Type = t.Type == TransactionType.Income ? "income" : "expense",
                Amount = t.Amount,
                CategoryId = t.CategoryId,
                CategoryName = t.Category.Name,
                Description = t.Description,
                TransactionDate = t.TransactionDate,
                CreatedAt = t.CreatedAt
            })
            .ToListAsync();

        return new DashboardSummaryDto
        {
            TotalIncome = totalIncome,
            TotalExpense = totalExpense,
            Balance = totalIncome - totalExpense,
            ByCategory = byCategory,
            Monthly = monthly,
            RecentTransactions = recent
        };
    }
}
