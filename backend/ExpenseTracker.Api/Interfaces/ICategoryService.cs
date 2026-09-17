using ExpenseTracker.Api.DTOs.Categories;

namespace ExpenseTracker.Api.Interfaces;

public interface ICategoryService
{
    Task<IReadOnlyList<CategoryDto>> GetAllAsync();
}
