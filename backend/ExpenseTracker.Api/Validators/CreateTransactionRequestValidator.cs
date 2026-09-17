using ExpenseTracker.Api.DTOs.Transactions;
using FluentValidation;

namespace ExpenseTracker.Api.Validators;

public class CreateTransactionRequestValidator : AbstractValidator<CreateTransactionRequest>
{
    public CreateTransactionRequestValidator()
    {
        RuleFor(x => x.Type)
            .NotEmpty()
            .Must(type => type.Equals("income", StringComparison.OrdinalIgnoreCase)
                || type.Equals("expense", StringComparison.OrdinalIgnoreCase))
            .WithMessage("Type must be 'income' or 'expense'.");

        RuleFor(x => x.Amount)
            .GreaterThan(0)
            .LessThanOrEqualTo(1_000_000_000);

        RuleFor(x => x.CategoryId).NotEmpty();

        RuleFor(x => x.Description)
            .MaximumLength(500)
            .When(x => x.Description is not null);

        RuleFor(x => x.TransactionDate)
            .NotEmpty()
            .Must(date => date >= new DateTime(1900, 1, 1) && date <= DateTime.UtcNow.AddDays(1))
            .WithMessage("Transaction date must be between 1900-01-01 and one day from now in UTC.");
    }
}
