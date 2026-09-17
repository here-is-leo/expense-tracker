namespace ExpenseTracker.Api.DTOs.Transactions;

public class UpdateTransactionRequest
{
    public string Type { get; set; } = string.Empty;
    public decimal Amount { get; set; }
    public Guid CategoryId { get; set; }
    public string? Description { get; set; }
    public DateTime TransactionDate { get; set; }
}
