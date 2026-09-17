namespace ExpenseTracker.Api.DTOs.Transactions;

public class TransactionQueryParams
{
    public int Page { get; set; } = 1;
    public int PageSize { get; set; } = 20;
    public string? Type { get; set; }
    public Guid? CategoryId { get; set; }
    public DateTime? From { get; set; }
    public DateTime? To { get; set; }
    public string? Search { get; set; }
    public string SortBy { get; set; } = "date";
    public string SortDir { get; set; } = "desc";
}
