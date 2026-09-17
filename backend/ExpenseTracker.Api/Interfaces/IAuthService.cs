using ExpenseTracker.Api.DTOs.Auth;

namespace ExpenseTracker.Api.Interfaces;

public interface IAuthService
{
    Task<AuthResponse> RegisterAsync(RegisterRequest request);
    Task<AuthResponse> LoginAsync(LoginRequest request);
}
