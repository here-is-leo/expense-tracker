using ExpenseTracker.Api.Common;
using ExpenseTracker.Api.DTOs.Transactions;

namespace ExpenseTracker.Api.Interfaces;

public interface ITransactionService
{
    Task<PagedResult<TransactionDto>> GetPagedAsync(Guid userId, TransactionQueryParams query);
    Task<TransactionDto> GetByIdAsync(Guid userId, Guid id);
    Task<TransactionDto> CreateAsync(Guid userId, CreateTransactionRequest request);
    Task<TransactionDto> UpdateAsync(Guid userId, Guid id, UpdateTransactionRequest request);
    Task DeleteAsync(Guid userId, Guid id);
}
