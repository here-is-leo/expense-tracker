using ExpenseTracker.Api.Common;
using ExpenseTracker.Api.Common.Exceptions;
using ExpenseTracker.Api.Data;
using ExpenseTracker.Api.DTOs.Transactions;
using ExpenseTracker.Api.Interfaces;
using ExpenseTracker.Api.Models;
using Microsoft.EntityFrameworkCore;

namespace ExpenseTracker.Api.Services;

public class TransactionService : ITransactionService
{
    private readonly AppDbContext _db;

    public TransactionService(AppDbContext db)
    {
        _db = db;
    }

    public async Task<PagedResult<TransactionDto>> GetPagedAsync(
        Guid userId,
        TransactionQueryParams query)
    {
        var page = Math.Max(query.Page, 1);
        var pageSize = Math.Clamp(query.PageSize, 1, 100);

        var transactions = _db.Transactions
            .AsNoTracking()
            .Include(t => t.Category)
            .Where(t => t.UserId == userId);

        if (!string.IsNullOrWhiteSpace(query.Type))
        {
            var type = ParseType(query.Type);
            transactions = transactions.Where(t => t.Type == type);
        }

        if (query.CategoryId.HasValue)
            transactions = transactions.Where(t => t.CategoryId == query.CategoryId.Value);

        if (query.From.HasValue)
            transactions = transactions.Where(t => t.TransactionDate >= query.From.Value);

        if (query.To.HasValue)
            transactions = transactions.Where(t => t.TransactionDate <= query.To.Value);

        if (!string.IsNullOrWhiteSpace(query.Search))
        {
            var search = query.Search.Trim();
            transactions = transactions.Where(t =>
                t.Description != null && EF.Functions.Like(t.Description, $"%{search}%"));
        }

        var totalCount = await transactions.CountAsync();
        var ascending = query.SortDir.Equals("asc", StringComparison.OrdinalIgnoreCase);
        var sortByAmount = query.SortBy.Equals("amount", StringComparison.OrdinalIgnoreCase);

        transactions = sortByAmount
            ? ascending
                ? transactions.OrderBy(t => t.Amount)
                : transactions.OrderByDescending(t => t.Amount)
            : ascending
                ? transactions.OrderBy(t => t.TransactionDate)
                : transactions.OrderByDescending(t => t.TransactionDate);

        var items = await transactions
            .Skip((page - 1) * pageSize)
            .Take(pageSize)
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

        return new PagedResult<TransactionDto>
        {
            Items = items,
            Page = page,
            PageSize = pageSize,
            TotalCount = totalCount
        };
    }

    public async Task<TransactionDto> GetByIdAsync(Guid userId, Guid id)
    {
        var transaction = await _db.Transactions
            .AsNoTracking()
            .Include(t => t.Category)
            .FirstOrDefaultAsync(t => t.Id == id && t.UserId == userId);

        if (transaction is null)
            throw new NotFoundException("Transaction not found.");

        return MapToDto(transaction);
    }

    public async Task<TransactionDto> CreateAsync(Guid userId, CreateTransactionRequest request)
    {
        var type = ParseType(request.Type);

        if (!await _db.Categories.AnyAsync(c => c.Id == request.CategoryId))
            throw new NotFoundException("Category not found.");

        var now = DateTime.UtcNow;
        var transaction = new Transaction
        {
            UserId = userId,
            CategoryId = request.CategoryId,
            Type = type,
            Amount = request.Amount,
            Description = request.Description,
            TransactionDate = request.TransactionDate,
            CreatedAt = now,
            UpdatedAt = now
        };

        _db.Transactions.Add(transaction);
        await _db.SaveChangesAsync();

        var created = await _db.Transactions
            .AsNoTracking()
            .Include(t => t.Category)
            .FirstAsync(t => t.Id == transaction.Id && t.UserId == userId);

        return MapToDto(created);
    }

    public async Task<TransactionDto> UpdateAsync(
        Guid userId,
        Guid id,
        UpdateTransactionRequest request)
    {
        var transaction = await _db.Transactions
            .FirstOrDefaultAsync(t => t.Id == id && t.UserId == userId);

        if (transaction is null)
            throw new NotFoundException("Transaction not found.");

        var type = ParseType(request.Type);

        if (!await _db.Categories.AnyAsync(c => c.Id == request.CategoryId))
            throw new NotFoundException("Category not found.");

        transaction.Type = type;
        transaction.Amount = request.Amount;
        transaction.CategoryId = request.CategoryId;
        transaction.Description = request.Description;
        transaction.TransactionDate = request.TransactionDate;
        transaction.UpdatedAt = DateTime.UtcNow;

        await _db.SaveChangesAsync();

        var updated = await _db.Transactions
            .AsNoTracking()
            .Include(t => t.Category)
            .FirstAsync(t => t.Id == id && t.UserId == userId);

        return MapToDto(updated);
    }

    public async Task DeleteAsync(Guid userId, Guid id)
    {
        var transaction = await _db.Transactions
            .FirstOrDefaultAsync(t => t.Id == id && t.UserId == userId);

        if (transaction is null)
            throw new NotFoundException("Transaction not found.");

        _db.Transactions.Remove(transaction);
        await _db.SaveChangesAsync();
    }

    private static TransactionType ParseType(string type)
    {
        if (type.Equals("income", StringComparison.OrdinalIgnoreCase))
            return TransactionType.Income;

        if (type.Equals("expense", StringComparison.OrdinalIgnoreCase))
            return TransactionType.Expense;

        throw new AppValidationException(new Dictionary<string, string[]>
        {
            ["type"] = new[] { "Type must be 'income' or 'expense'." }
        });
    }

    private static TransactionDto MapToDto(Transaction transaction)
    {
        return new TransactionDto
        {
            Id = transaction.Id,
            Type = transaction.Type == TransactionType.Income ? "income" : "expense",
            Amount = transaction.Amount,
            CategoryId = transaction.CategoryId,
            CategoryName = transaction.Category.Name,
            Description = transaction.Description,
            TransactionDate = transaction.TransactionDate,
            CreatedAt = transaction.CreatedAt
        };
    }
}
