using ExpenseTracker.Api.DTOs.Dashboard;

namespace ExpenseTracker.Api.Interfaces;

public interface IDashboardService
{
    Task<DashboardSummaryDto> GetSummaryAsync(Guid userId);
}
