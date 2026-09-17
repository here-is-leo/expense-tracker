using ExpenseTracker.Api.DTOs.Transactions;

namespace ExpenseTracker.Api.DTOs.Dashboard;

public class DashboardSummaryDto
{
    public decimal TotalIncome { get; set; }
    public decimal TotalExpense { get; set; }
    public decimal Balance { get; set; }
    public IReadOnlyList<CategorySummaryDto> ByCategory { get; set; } = Array.Empty<CategorySummaryDto>();
    public IReadOnlyList<MonthlySummaryDto> Monthly { get; set; } = Array.Empty<MonthlySummaryDto>();
    public IReadOnlyList<TransactionDto> RecentTransactions { get; set; } = Array.Empty<TransactionDto>();
}

public class CategorySummaryDto
{
    public Guid CategoryId { get; set; }
    public string CategoryName { get; set; } = string.Empty;
    public string Type { get; set; } = string.Empty;
    public decimal Total { get; set; }
    public int Count { get; set; }
}

public class MonthlySummaryDto
{
    public int Year { get; set; }
    public int Month { get; set; }
    public decimal Income { get; set; }
    public decimal Expense { get; set; }
}
