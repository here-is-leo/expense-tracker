using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using ExpenseTracker.Api.Common.Exceptions;
using ExpenseTracker.Api.Configuration;
using ExpenseTracker.Api.Data;
using ExpenseTracker.Api.DTOs.Auth;
using ExpenseTracker.Api.Interfaces;
using ExpenseTracker.Api.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;

namespace ExpenseTracker.Api.Services;

public class AuthService : IAuthService
{
    private readonly AppDbContext _db;
    private readonly JwtOptions _jwt;

    public AuthService(AppDbContext db, IOptions<JwtOptions> jwt)
    {
        _db = db;
        _jwt = jwt.Value;
    }

    public async Task<AuthResponse> RegisterAsync(RegisterRequest request)
    {
        var normalizedEmail = request.Email.Trim().ToLowerInvariant();

        var exists = await _db.Users.AnyAsync(u => u.Email == normalizedEmail);
        if (exists)
            throw new ConflictException("An account with this email already exists.");

        var user = new User
        {
            Email = normalizedEmail,
            DisplayName = request.DisplayName.Trim(),
            PasswordHash = BCrypt.Net.BCrypt.HashPassword(request.Password, workFactor: 12),
            CreatedAt = DateTime.UtcNow,
            UpdatedAt = DateTime.UtcNow
        };

        _db.Users.Add(user);
        await _db.SaveChangesAsync();

        return BuildAuthResponse(user);
    }

    public async Task<AuthResponse> LoginAsync(LoginRequest request)
    {
        var normalizedEmail = request.Email.Trim().ToLowerInvariant();

        var user = await _db.Users.FirstOrDefaultAsync(u => u.Email == normalizedEmail);
        if (user is null)
            throw new AppValidationException(new Dictionary<string, string[]>
            {
                ["credentials"] = new[] { "Invalid email or password." }
            });

        var valid = BCrypt.Net.BCrypt.Verify(request.Password, user.PasswordHash);
        if (!valid)
            throw new AppValidationException(new Dictionary<string, string[]>
            {
                ["credentials"] = new[] { "Invalid email or password." }
            });

        return BuildAuthResponse(user);
    }

    private AuthResponse BuildAuthResponse(User user)
    {
        var expiresAt = DateTime.UtcNow.AddHours(_jwt.ExpiryHours);

        var claims = new[]
        {
            new Claim(JwtRegisteredClaimNames.Sub, user.Id.ToString()),
            new Claim(JwtRegisteredClaimNames.Email, user.Email),
            new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
            new Claim(ClaimTypes.NameIdentifier, user.Id.ToString())
        };

        var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_jwt.Secret));
        var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

        var token = new JwtSecurityToken(
            issuer: _jwt.Issuer,
            audience: _jwt.Audience,
            claims: claims,
            expires: expiresAt,
            signingCredentials: creds);

        return new AuthResponse
        {
            AccessToken = new JwtSecurityTokenHandler().WriteToken(token),
            ExpiresAt = expiresAt,
            User = new UserDto
            {
                Id = user.Id,
                Email = user.Email,
                DisplayName = user.DisplayName
            }
        };
    }
}
