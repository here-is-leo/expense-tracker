using System.Net;
using System.Text.Json;
using ExpenseTracker.Api.Common.Exceptions;
using FluentValidation;

namespace ExpenseTracker.Api.Middleware;

public class ExceptionHandlingMiddleware
{
    private readonly RequestDelegate _next;
    private readonly ILogger<ExceptionHandlingMiddleware> _logger;
    private readonly IHostEnvironment _env;

    public ExceptionHandlingMiddleware(
        RequestDelegate next,
        ILogger<ExceptionHandlingMiddleware> logger,
        IHostEnvironment env)
    {
        _next = next;
        _logger = logger;
        _env = env;
    }

    public async Task InvokeAsync(HttpContext context)
    {
        try
        {
            await _next(context);
        }
        catch (Exception ex)
        {
            await HandleAsync(context, ex);
        }
    }

    private async Task HandleAsync(HttpContext context, Exception ex)
    {
        var traceId = context.TraceIdentifier;
        int status;
        string message;
        object? errors = null;

        switch (ex)
        {
            case NotFoundException nf:
                status = (int)HttpStatusCode.NotFound;
                message = nf.Message;
                break;
            case ConflictException cf:
                status = (int)HttpStatusCode.Conflict;
                message = cf.Message;
                break;
            case AppValidationException ave:
                status = (int)HttpStatusCode.BadRequest;
                message = ave.Message;
                errors = ave.Errors;
                break;
            case FluentValidation.ValidationException fve:
                status = (int)HttpStatusCode.BadRequest;
                message = "Validation failed.";
                errors = fve.Errors
                    .GroupBy(e => e.PropertyName)
                    .ToDictionary(g => g.Key, g => g.Select(e => e.ErrorMessage).ToArray());
                break;
            default:
                status = (int)HttpStatusCode.InternalServerError;
                message = _env.IsDevelopment() ? ex.Message : "An unexpected error occurred.";
                _logger.LogError(ex, "Unhandled exception. TraceId={TraceId}", traceId);
                break;
        }

        context.Response.ContentType = "application/json";
        context.Response.StatusCode = status;

        var payload = new
        {
            status,
            message,
            errors,
            traceId
        };

        await context.Response.WriteAsync(JsonSerializer.Serialize(payload));
    }
}
