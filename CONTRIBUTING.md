
# 🤝 Contributing to Expense Tracker

Thank you for your interest in contributing to **Expense Tracker**! Contributions of every size are welcome—from reporting a bug or improving documentation to implementing a new feature.

This document explains how to contribute while keeping the project consistent, secure, and maintainable.

> **Please read this guide before opening an issue or pull request.**

---

## 📚 Table of Contents

- [Code of Conduct](#-code-of-conduct)
- [Ways to Contribute](#-ways-to-contribute)
- [Before You Start](#-before-you-start)
- [Development Setup](#-development-setup)
- [Project Architecture](#-project-architecture)
- [Branch Naming](#-branch-naming)
- [Commit Messages](#-commit-messages)
- [Coding Guidelines](#-coding-guidelines)
- [Security Guidelines](#-security-guidelines)
- [Testing](#-testing)
- [Pull Request Process](#-pull-request-process)
- [Reporting Bugs](#-reporting-bugs)
- [Suggesting Features](#-suggesting-features)
- [Documentation Contributions](#-documentation-contributions)
- [Getting Help](#-getting-help)
- [License](#-license)
- [Persian Version](#-راهنمای-مشارکت-در-پروژه)

---

## 📜 Code of Conduct

By participating in this project, you agree to maintain a respectful, inclusive, and professional environment.

Please:

- Be respectful when discussing ideas or reviewing code.
- Provide constructive and actionable feedback.
- Focus criticism on the code, not the contributor.
- Respect different backgrounds, skill levels, and viewpoints.
- Avoid harassment, discrimination, or inappropriate behavior.
- Assume good intent and ask questions before making conclusions.

Unacceptable behavior may result in comments, issues, pull requests, or participation privileges being removed.

---

## 🌱 Ways to Contribute

You can contribute by:

- 🐛 Reporting reproducible bugs
- ✨ Proposing new features
- 🎨 Improving the frontend and user experience
- ♿ Improving accessibility
- ⚙️ Improving backend services and API behavior
- 🔐 Identifying security weaknesses
- 🧪 Adding or improving automated tests
- 📖 Improving documentation
- 🌍 Improving English or Persian translations
- 🐳 Helping with the planned Docker setup
- 🚀 Helping with the planned GitHub Actions workflow
- 🧹 Refactoring code without changing existing behavior

Please avoid combining unrelated changes in a single pull request.

---

## ✅ Before You Start

Before beginning work:

1. Search existing issues and pull requests.
2. Confirm that the same change is not already being discussed or implemented.
3. Open an issue for large features or architectural changes.
4. Wait for agreement before investing significant time in a major change.
5. Keep the proposed solution consistent with the current project scope.

Small fixes, documentation improvements, and straightforward bug fixes usually do not require prior discussion.

> The project intentionally uses a practical layered monolith. Contributions should not introduce microservices, CQRS, or major architectural abstractions without prior agreement.

---

## 🚀 Development Setup

### Prerequisites

Install the following tools:

- [.NET 8 SDK](https://dotnet.microsoft.com/download/dotnet/8.0)
- [Node.js](https://nodejs.org/) and npm
- [SQL Server](https://www.microsoft.com/sql-server)
- [Git](https://git-scm.com/)
- Visual Studio, JetBrains Rider, or Visual Studio Code

### 1. Fork the repository

Use the **Fork** button on GitHub to create a copy of the project in your account.

### 2. Clone your fork

```bash
git clone https://github.com/YOUR_USERNAME/expense-tracker.git
cd expense-tracker
```

### 3. Add the upstream repository

```bash
git remote add upstream https://github.com/here-is-leo/expense-tracker.git
git remote -v
```

### 4. Create a working branch

```bash
git checkout -b feature/short-description
```

### 5. Configure the backend

```bash
cd backend/ExpenseTracker.Api
dotnet restore
dotnet ef database update
dotnet run
```

Configure development settings through `appsettings.Development.json`, environment variables, or .NET User Secrets.

Example development configuration:

```json
{
  "ConnectionStrings": {
    "DefaultConnection": "Server=localhost;Database=ExpenseTrackerDb;Trusted_Connection=True;TrustServerCertificate=True"
  },
  "Jwt": {
    "Key": "replace-with-a-long-random-development-secret",
    "Issuer": "ExpenseTracker.Api",
    "Audience": "ExpenseTracker.Client"
  }
}
```

> Never commit passwords, JWT secrets, connection strings containing credentials, API keys, or other sensitive values.

### 6. Configure the frontend

Open another terminal:

```bash
cd frontend
npm install
npm run dev
```

Example frontend environment variable:

```bash
VITE_API_BASE_URL=https://localhost:5001/api
```

Use the ports and environment-variable names defined in the current repository configuration.

---

## 🏗 Project Architecture

The backend follows a straightforward layered structure:

```text
HTTP Request
     │
     ▼
Controllers
     │
     ▼
Services
     │
     ▼
Entity Framework Core DbContext
     │
     ▼
SQL Server
```

The primary responsibilities are:

| Layer | Responsibility |
|---|---|
| **Controllers** | HTTP requests, response status codes, and API contracts |
| **Services** | Business rules, authorization, and ownership validation |
| **DTOs** | Public request and response models |
| **Validators** | FluentValidation rules |
| **DbContext** | Database access and persistence |
| **Middleware** | Cross-cutting behavior such as centralized error handling |
| **Frontend Services** | Communication with the backend API |
| **Components** | Reusable interface elements |
| **Pages** | Route-level user experiences |

Keep business rules out of controllers whenever possible. Controllers should remain small and delegate application behavior to services.

---

## 🌿 Branch Naming

Use short and descriptive branch names.

| Change | Pattern | Example |
|---|---|---|
| Feature | `feature/description` | `feature/monthly-budget` |
| Bug fix | `fix/description` | `fix/transaction-pagination` |
| Documentation | `docs/description` | `docs/api-examples` |
| Refactoring | `refactor/description` | `refactor/dashboard-service` |
| Tests | `test/description` | `test/auth-service` |
| Maintenance | `chore/description` | `chore/update-dependencies` |

Use lowercase words separated by hyphens.

---

## 💬 Commit Messages

Write clear, focused commit messages. Conventional Commit-style prefixes are recommended:

```text
feat: add transaction date filter
fix: enforce ownership during transaction update
docs: improve local setup instructions
test: add authentication service tests
refactor: simplify dashboard aggregation
style: improve transaction form spacing
chore: update development dependencies
```

A good commit message:

- Uses the imperative mood
- Explains what changed
- Covers one logical change
- Avoids vague wording such as `update`, `changes`, or `fix stuff`

For a larger change, add a descriptive body:

```text
feat: add transaction category filter

Add an optional category identifier to the transaction query.
Apply the filter before pagination and preserve the existing
sorting behavior.
```

---

## 💻 Coding Guidelines

### General

- Keep changes focused and easy to review.
- Follow the style already used in nearby files.
- Prefer readable code over clever code.
- Use meaningful names for classes, methods, variables, and components.
- Avoid unnecessary dependencies.
- Remove unused imports and dead code.
- Do not include unrelated formatting changes.
- Document behavior that is not immediately obvious.
- Preserve backward compatibility unless a breaking change is approved.

### Backend

- Follow standard C# and ASP.NET Core conventions.
- Enable and respect nullable reference types where configured.
- Prefer asynchronous database and I/O operations.
- Pass a `CancellationToken` when appropriate.
- Keep controllers thin.
- Place business logic in services.
- Use DTOs for public API input and output.
- Do not expose EF Core entities directly.
- Validate incoming data with FluentValidation.
- Use dependency injection instead of manually creating services.
- Use `decimal` for monetary values.
- Preserve the configured `numeric(18,2)` database precision.
- Avoid loading unnecessary database records.
- Apply filters and sorting before pagination.
- Keep ownership checks inside user-scoped operations.
- Return consistent error responses through centralized error handling.

Example controller pattern:

```csharp
[Authorize]
[ApiController]
[Route("api/[controller]")]
public sealed class TransactionsController : ControllerBase
{
    private readonly ITransactionService _transactionService;

    public TransactionsController(ITransactionService transactionService)
    {
        _transactionService = transactionService;
    }

    [HttpGet("{id:guid}")]
    public async Task<ActionResult<TransactionResponse>> GetById(
        Guid id,
        CancellationToken cancellationToken)
    {
        var transaction = await _transactionService.GetByIdAsync(
            id,
            cancellationToken);

        return Ok(transaction);
    }
}
```

### Frontend

- Use functional React components.
- Keep components small and focused.
- Extract repeated behavior into hooks or services.
- Keep API communication outside presentational components.
- Use semantic HTML.
- Support keyboard navigation.
- Provide accessible names for interactive elements.
- Include loading, empty, success, and error states.
- Avoid unnecessary global state.
- Reuse existing Tailwind patterns and design tokens.
- Keep mobile and desktop layouts responsive.
- Do not expose secrets through Vite environment variables.

Example component pattern:

```jsx
export function TransactionCard({ transaction, onEdit, onDelete }) {
  return (
    <article className="rounded-xl border border-slate-800 bg-slate-950 p-4">
      <header className="flex items-start justify-between gap-4">
        <div>
          <h3 className="font-semibold text-white">
            {transaction.title}
          </h3>

          <p className="text-sm text-slate-400">
            {transaction.categoryName}
          </p>
        </div>

        <strong className="text-cyan-400">
          {transaction.amount}
        </strong>
      </header>

      <div className="mt-4 flex gap-2">
        <button type="button" onClick={() => onEdit(transaction)}>
          Edit
        </button>

        <button type="button" onClick={() => onDelete(transaction.id)}>
          Delete
        </button>
      </div>
    </article>
  );
}
```

### Database Changes

When changing the database schema:

1. Update the entity configuration.
2. Create an EF Core migration.
3. Review the generated migration.
4. Verify both migration and rollback behavior.
5. Document any required data migration.

```bash
dotnet ef migrations add DescriptiveMigrationName
dotnet ef database update
```

Do not edit an existing migration that may already have been applied by other contributors. Create a new corrective migration instead.

---

## 🔐 Security Guidelines

Security-related behavior must not be weakened for convenience.

Contributors must:

- Preserve authentication requirements on protected endpoints.
- Validate resource ownership for every user-scoped operation.
- Never trust a user identifier supplied by the client.
- Read the authenticated identity from validated JWT claims.
- Never store plaintext passwords.
- Never log passwords, JWTs, secrets, or sensitive financial data.
- Avoid exposing whether another user's private resource exists.
- Return `404 Not Found` for inaccessible private resources where appropriate.
- Validate all client input on the server.
- Use parameterized queries or EF Core query APIs.
- Avoid including internal exception details in production responses.
- Keep dependencies updated when security patches are available.
- Avoid committing `.env`, secrets, certificates, or production configuration.

### Reporting a vulnerability

Do not publish exploitable security vulnerabilities in a public issue.

Contact the maintainers privately and include:

- A description of the vulnerability
- Reproduction steps
- The affected endpoint or component
- The potential impact
- A suggested mitigation, if available

Allow the maintainers time to investigate and prepare a fix before public disclosure.

---

## 🧪 Testing

Automated xUnit coverage is planned and may not yet cover every feature. Contributors should still verify their changes carefully.

At minimum, test:

- The main success scenario
- Invalid input
- Authentication requirements
- Ownership boundaries
- Missing resources
- Pagination and sorting behavior
- Relevant filtering combinations
- Empty states
- API and UI error behavior
- Mobile and desktop layouts for frontend changes

When automated test projects are available, run:

```bash
dotnet test
```

For frontend changes, run the scripts provided by `package.json`, such as:

```bash
npm run lint
npm run build
```

Do not claim that a feature is fully tested when only manual verification has been performed.

### Suggested backend test naming

```csharp
[Fact]
public async Task GetByIdAsync_WhenTransactionBelongsToAnotherUser_ThrowsNotFoundException()
{
    // Arrange

    // Act

    // Assert
}
```

Recommended naming pattern:

```text
Method_WhenCondition_ExpectedResult
```

---

## 🔄 Pull Request Process

### 1. Synchronize your branch

```bash
git fetch upstream
git checkout main
git merge upstream/main
git checkout feature/short-description
git rebase main
```

Resolve conflicts carefully and verify the project again afterward.

### 2. Review your changes

Before committing:

```bash
git status
git diff
```

Confirm that:

- Only relevant files were changed.
- No secrets or personal configuration were added.
- Debugging code was removed.
- Generated files were not committed unnecessarily.
- Documentation reflects the new behavior.
- Planned functionality is not described as completed.

### 3. Run relevant checks

```bash
dotnet build
dotnet test
```

```bash
npm run lint
npm run build
```

Run only the commands currently supported by the repository. If a test or lint script does not exist, explain your manual verification in the pull request.

### 4. Push your branch

```bash
git push origin feature/short-description
```

### 5. Open a pull request

A good pull request should include:

- A clear title
- A concise summary
- The problem being solved
- The chosen implementation
- Testing or verification steps
- Screenshots for visual changes
- Related issue numbers
- Known limitations
- Any migration or configuration changes

### Pull request template


## Summary

Describe the change and why it is needed.

## Changes

- Added ...
- Updated ...
- Fixed ...

## Verification

- [ ] Backend builds successfully
- [ ] Frontend builds successfully
- [ ] Relevant automated tests pass
- [ ] Authentication behavior was verified
- [ ] Ownership boundaries were verified
- [ ] Responsive behavior was checked
- [ ] Documentation was updated

## Screenshots

Add before-and-after screenshots for visual changes.

## Related Issue

Closes #ISSUE_NUMBER

## Notes

List known limitations, migrations, or follow-up tasks.


### Review expectations

Maintainers may request changes related to:

- Security
- Correctness
- Architecture
- Maintainability
- Accessibility
- API compatibility
- Test coverage
- Documentation
- Project scope

Requested changes are part of the collaborative review process. Address each review comment or explain the reasoning behind an alternative approach.

---

## 🐛 Reporting Bugs

Search existing issues before creating a new report.

A useful bug report includes:

- A concise title
- The affected backend or frontend area
- Reproduction steps
- Expected behavior
- Actual behavior
- Relevant logs with secrets removed
- Operating system
- Browser and version, if relevant
- .NET and Node.js versions
- Screenshots or a minimal reproduction
- Whether the issue occurs consistently

### Bug report template


## Description

Provide a clear description of the problem.

## Steps to Reproduce

1. Go to ...
2. Select ...
3. Submit ...
4. Observe ...

## Expected Behavior

Explain what should happen.

## Actual Behavior

Explain what happens instead.

## Environment

- OS:
- Browser:
- .NET version:
- Node.js version:
- Commit or branch:

## Additional Context

Add screenshots, sanitized logs, or other useful information.


Never include passwords, access tokens, private financial information, or production connection strings.

---

## 💡 Suggesting Features

Before proposing a feature, consider whether it matches the purpose of a focused personal finance application.

A useful proposal explains:

- The user problem
- The proposed experience
- Why the feature belongs in this project
- Possible API or database implications
- Security and privacy considerations
- Alternative solutions
- Whether the change is backward-compatible

### Feature request template


## Problem

What user problem should be solved?

## Proposed Solution

Describe the desired behavior.

## User Experience

Explain how users would interact with the feature.

## Technical Considerations

Describe possible API, database, security, or frontend implications.

## Alternatives

List other approaches that were considered.

## Additional Context

Add mockups, diagrams, or examples if useful.


Large features should be discussed and approved before implementation.

---

## 📖 Documentation Contributions

Documentation changes are valuable and welcome.

When updating documentation:

- Keep English and Persian sections consistent.
- Use short, clear paragraphs.
- Add examples where they improve understanding.
- Keep commands copy-paste friendly.
- Distinguish completed features from planned features.
- Avoid promising functionality that is not implemented.
- Update `docs/API.md` when API behavior changes.
- Update setup instructions when configuration changes.
- Update screenshots when the interface changes materially.
- Verify internal links and heading anchors.

---

## ❓ Getting Help

If you need help:

1. Read the project README and API documentation.
2. Search existing issues and pull requests.
3. Open a focused discussion or issue.
4. Explain what you attempted and where you are blocked.
5. Include sanitized errors and relevant environment information.

Maintainers:

- **Ilia Farahani** — Backend & Architecture  
  [@here-is-leo](https://github.com/here-is-leo)

- **Taraneh Ghalandari** — Frontend & Design  
  [@taraneh-ghalandarii](https://github.com/taraneh-ghalandarii)

---

## 📄 License

By contributing to this repository, you agree that your contributions will be distributed under the project's [MIT License](LICENSE).

---

<div dir="rtl">

# 🤝 راهنمای مشارکت در پروژه

از علاقه شما به مشارکت در پروژه **Expense Tracker** متشکریم! تمام مشارکت‌ها، از گزارش یک خطای کوچک و بهبود مستندات گرفته تا پیاده‌سازی قابلیت‌های جدید، ارزشمند هستند.

این راهنما توضیح می‌دهد که چگونه می‌توانید ضمن حفظ یکپارچگی، امنیت و نگهداری‌پذیری پروژه در توسعه آن مشارکت کنید.

> **لطفاً پیش از ایجاد Issue یا Pull Request این راهنما را مطالعه کنید.**

---

## 📚 فهرست مطالب

- [منشور رفتاری](#-منشور-رفتاری)
- [روش‌های مشارکت](#-روش‌های-مشارکت)
- [پیش از شروع](#-پیش-از-شروع)
- [راه‌اندازی محیط توسعه](#-راه‌اندازی-محیط-توسعه)
- [معماری پروژه](#-معماری-پروژه)
- [نام‌گذاری شاخه‌ها](#-نامگذاری-شاخهها)
- [پیام‌های Commit](#-پیامهای-commit)
- [راهنمای کدنویسی](#-راهنمای-کدنویسی)
- [اصول امنیتی](#-اصول-امنیتی)
- [آزمون‌ها](#-آزمونها)
- [فرایند Pull Request](#-فرایند-pull-request)
- [گزارش خطا](#-گزارش-خطا)
- [پیشنهاد قابلیت](#-پیشنهاد-قابلیت)
- [مشارکت در مستندات](#-مشارکت-در-مستندات)
- [دریافت راهنمایی](#-دریافت-راهنمایی)
- [مجوز](#-مجوز)

---

## 📜 منشور رفتاری

با مشارکت در این پروژه، متعهد می‌شوید که محیطی محترمانه، حرفه‌ای و پذیرا برای همه ایجاد کنید.

لطفاً:

- هنگام گفت‌وگو و بررسی کد محترمانه رفتار کنید.
- بازخورد سازنده، دقیق و قابل‌اجرا ارائه دهید.
- نقد خود را متوجه کد کنید، نه شخص مشارکت‌کننده.
- به تفاوت تجربه، پیش‌زمینه و دیدگاه افراد احترام بگذارید.
- از آزار، تبعیض و رفتار نامناسب خودداری کنید.
- حسن نیت دیگران را در نظر بگیرید و پیش از نتیجه‌گیری سؤال کنید.

رفتار نامناسب ممکن است به حذف نظر، Issue، Pull Request یا محدودشدن امکان مشارکت منجر شود.

---

## 🌱 روش‌های مشارکت

روش‌های مختلف مشارکت در پروژه عبارت‌اند از:

- 🐛 گزارش خطاهای قابل‌بازتولید
- ✨ پیشنهاد قابلیت‌های جدید
- 🎨 بهبود رابط و تجربه کاربری
- ♿ بهبود دسترس‌پذیری
- ⚙️ بهبود سرویس‌های بک‌اند و رفتار API
- 🔐 شناسایی ضعف‌های امنیتی
- 🧪 افزودن یا بهبود آزمون‌های خودکار
- 📖 تکمیل مستندات
- 🌍 بهبود ترجمه‌های انگلیسی و فارسی
- 🐳 کمک به راه‌اندازی برنامه‌ریزی‌شده Docker
- 🚀 کمک به گردش‌کار برنامه‌ریزی‌شده GitHub Actions
- 🧹 بازآرایی کد بدون تغییر رفتار موجود

لطفاً تغییرات نامرتبط را در یک Pull Request قرار ندهید.

---

## ✅ پیش از شروع

پیش از آغاز کار:

1. Issueها و Pull Requestهای موجود را جست‌وجو کنید.
2. مطمئن شوید همان تغییر قبلاً مطرح یا در حال پیاده‌سازی نیست.
3. برای قابلیت‌های بزرگ یا تغییرات معماری ابتدا یک Issue ایجاد کنید.
4. پیش از صرف زمان قابل‌توجه برای تغییرات بزرگ، درباره آن به توافق برسید.
5. راهکار پیشنهادی را با محدوده فعلی پروژه هماهنگ نگه دارید.

اصلاحات کوچک، بهبود مستندات و رفع خطاهای ساده معمولاً به هماهنگی قبلی نیاز ندارند.

> این پروژه عمداً از معماری مونولیت لایه‌ای و کاربردی استفاده می‌کند. افزودن میکروسرویس، CQRS یا انتزاع‌های معماری بزرگ بدون توافق قبلی مناسب نیست.

---

## 🚀 راه‌اندازی محیط توسعه

### پیش‌نیازها

ابزارهای زیر را نصب کنید:

- [.NET 8 SDK](https://dotnet.microsoft.com/download/dotnet/8.0)
- [Node.js](https://nodejs.org/) و npm
- [SQL Server](https://www.microsoft.com/sql-server)
- [Git](https://git-scm.com/)
- Visual Studio، JetBrains Rider یا Visual Studio Code

### ۱. Fork کردن مخزن

با دکمه **Fork** در GitHub یک نسخه از پروژه در حساب خود ایجاد کنید.

### ۲. دریافت Fork

```bash
git clone https://github.com/YOUR_USERNAME/expense-tracker.git
cd expense-tracker
```

### ۳. افزودن مخزن اصلی

```bash
git remote add upstream https://github.com/here-is-leo/expense-tracker.git
git remote -v
```

### ۴. ایجاد شاخه کاری

```bash
git checkout -b feature/short-description
```

### ۵. راه‌اندازی بک‌اند

```bash
cd backend/ExpenseTracker.Api
dotnet restore
dotnet ef database update
dotnet run
```

تنظیمات محیط توسعه را از طریق `appsettings.Development.json`، متغیرهای محیطی یا .NET User Secrets تعریف کنید.

> هیچ گذرواژه، کلید JWT، رشته اتصال دارای اطلاعات محرمانه یا کلید API را در مخزن ثبت نکنید.

### ۶. راه‌اندازی فرانت‌اند

در ترمینال دیگری اجرا کنید:

```bash
cd frontend
npm install
npm run dev
```

نمونه متغیر محیطی:

```bash
VITE_API_BASE_URL=https://localhost:5001/api
```

پورت‌ها و نام متغیرهای تعریف‌شده در آخرین نسخه مخزن را ملاک قرار دهید.

---

## 🏗 معماری پروژه

بک‌اند از یک معماری لایه‌ای مستقیم استفاده می‌کند:

```text
درخواست HTTP
     │
     ▼
Controllers
     │
     ▼
Services
     │
     ▼
Entity Framework Core DbContext
     │
     ▼
SQL Server
```

مسئولیت بخش‌ها:

| لایه | مسئولیت |
|---|---|
| **Controllers** | درخواست HTTP، وضعیت پاسخ و قرارداد API |
| **Services** | قوانین کسب‌وکار، مجوزها و کنترل مالکیت |
| **DTOs** | مدل‌های عمومی درخواست و پاسخ |
| **Validators** | قوانین FluentValidation |
| **DbContext** | دسترسی به داده و ذخیره‌سازی |
| **Middleware** | رفتارهای مشترک مانند مدیریت متمرکز خطا |
| **Frontend Services** | ارتباط با API بک‌اند |
| **Components** | عناصر قابل‌استفاده مجدد رابط کاربری |
| **Pages** | تجربه‌های سطح مسیر در فرانت‌اند |

تا حد امکان قوانین کسب‌وکار را از کنترلرها دور نگه دارید. کنترلرها باید کوچک باشند و اجرای رفتار برنامه را به سرویس‌ها واگذار کنند.

---

## 🌿 نام‌گذاری شاخه‌ها

از نام‌های کوتاه و توصیفی استفاده کنید.

| نوع تغییر | الگو | نمونه |
|---|---|---|
| قابلیت | `feature/description` | `feature/monthly-budget` |
| رفع خطا | `fix/description` | `fix/transaction-pagination` |
| مستندات | `docs/description` | `docs/api-examples` |
| بازآرایی | `refactor/description` | `refactor/dashboard-service` |
| آزمون | `test/description` | `test/auth-service` |
| نگهداری | `chore/description` | `chore/update-dependencies` |

نام شاخه را با حروف کوچک و کلمات جداشده با خط تیره بنویسید.

---

## 💬 پیام‌های Commit

پیام Commit باید روشن و متمرکز باشد. استفاده از پیشوندهای Conventional Commits پیشنهاد می‌شود:

```text
feat: add transaction date filter
fix: enforce ownership during transaction update
docs: improve local setup instructions
test: add authentication service tests
refactor: simplify dashboard aggregation
style: improve transaction form spacing
chore: update development dependencies
```

یک Commit مناسب:

- فقط یک تغییر منطقی را پوشش می‌دهد.
- مشخص می‌کند چه چیزی تغییر کرده است.
- از عبارت‌های مبهم مانند `update` یا `fix stuff` استفاده نمی‌کند.
- در صورت نیاز دارای توضیحات تکمیلی است.

---

## 💻 راهنمای کدنویسی

### اصول عمومی

- تغییرات را متمرکز و قابل‌بررسی نگه دارید.
- سبک فایل‌های مجاور را دنبال کنید.
- خوانایی را بر هوشمندی غیرضروری ترجیح دهید.
- برای کلاس، متد، متغیر و کامپوننت نام معنادار انتخاب کنید.
- وابستگی غیرضروری اضافه نکنید.
- importهای بدون استفاده و کد مرده را حذف کنید.
- تغییرات قالب‌بندی نامرتبط ایجاد نکنید.
- رفتارهای غیرشفاف را مستند کنید.
- بدون توافق قبلی سازگاری نسخه‌های قبلی را از بین نبرید.

### بک‌اند

- استانداردهای رایج C# و ASP.NET Core را رعایت کنید.
- عملیات دیتابیس و I/O را به‌صورت asynchronous بنویسید.
- در محل مناسب از `CancellationToken` استفاده کنید.
- کنترلرها را کوچک نگه دارید.
- قوانین کسب‌وکار را در سرویس‌ها قرار دهید.
- برای ورودی و خروجی عمومی API از DTO استفاده کنید.
- موجودیت‌های EF Core را مستقیماً منتشر نکنید.
- ورودی‌ها را با FluentValidation بررسی کنید.
- از Dependency Injection استفاده کنید.
- برای مبالغ از `decimal` استفاده کنید.
- دقت `numeric(18,2)` را حفظ کنید.
- رکوردهای غیرضروری را از دیتابیس بارگذاری نکنید.
- فیلتر و مرتب‌سازی را پیش از صفحه‌بندی اعمال کنید.
- کنترل مالکیت را در عملیات وابسته به کاربر حفظ کنید.
- پاسخ خطا را از طریق مدیریت متمرکز خطا تولید کنید.

### فرانت‌اند

- از کامپوننت‌های تابعی React استفاده کنید.
- کامپوننت‌ها را کوچک و متمرکز نگه دارید.
- رفتار تکراری را به Hook یا Service منتقل کنید.
- ارتباط با API را از کامپوننت‌های نمایشی جدا کنید.
- از HTML معنایی استفاده کنید.
- ناوبری با صفحه‌کلید را پشتیبانی کنید.
- برای عناصر تعاملی نام قابل‌دسترسی تعریف کنید.
- وضعیت‌های بارگذاری، خالی، موفقیت و خطا را نمایش دهید.
- از state سراسری غیرضروری خودداری کنید.
- الگوهای Tailwind موجود را حفظ کنید.
- رابط را در موبایل و دسکتاپ بررسی کنید.
- اسرار را در متغیرهای Vite قرار ندهید.

### تغییرات دیتابیس

هنگام تغییر schema:

1. تنظیمات Entity را به‌روزرسانی کنید.
2. یک migration جدید بسازید.
3. migration تولیدشده را بررسی کنید.
4. اجرای migration و بازگشت آن را آزمایش کنید.
5. انتقال داده احتمالی را مستند کنید.

```bash
dotnet ef migrations add DescriptiveMigrationName
dotnet ef database update
```

Migration قبلی که ممکن است توسط دیگران اجرا شده باشد را ویرایش نکنید؛ یک migration اصلاحی جدید بسازید.

---

## 🔐 اصول امنیتی

رفتارهای امنیتی نباید برای راحتی توسعه ضعیف شوند.

مشارکت‌کنندگان باید:

- احراز هویت endpointهای محافظت‌شده را حفظ کنند.
- مالکیت منابع را در تمام عملیات وابسته به کاربر بررسی کنند.
- به شناسه کاربر ارسال‌شده از سمت کلاینت اعتماد نکنند.
- هویت را از Claimهای JWT معتبر دریافت کنند.
- گذرواژه خام ذخیره نکنند.
- گذرواژه، JWT، اسرار یا داده مالی حساس را log نکنند.
- وجود منابع خصوصی کاربران دیگر را افشا نکنند.
- برای منابع خصوصی غیرقابل‌دسترسی در محل مناسب `404` برگردانند.
- تمام ورودی‌ها را در سمت سرور اعتبارسنجی کنند.
- از queryهای پارامتری یا APIهای EF Core استفاده کنند.
- جزئیات داخلی exception را در محیط عملیاتی نمایش ندهند.
- اسرار، certificateها و تنظیمات production را commit نکنند.

### گزارش آسیب‌پذیری

آسیب‌پذیری قابل‌سوءاستفاده را در یک Issue عمومی منتشر نکنید.

گزارش خصوصی باید شامل موارد زیر باشد:

- شرح آسیب‌پذیری
- مراحل بازتولید
- endpoint یا بخش تحت‌تأثیر
- اثر احتمالی
- راهکار پیشنهادی، در صورت وجود

پیش از انتشار عمومی، به نگهدارندگان فرصت بررسی و آماده‌سازی اصلاح را بدهید.

---

## 🧪 آزمون‌ها

پوشش خودکار xUnit برنامه‌ریزی شده است و ممکن است هنوز تمام قابلیت‌ها را پوشش ندهد. بااین‌حال، تغییرات باید با دقت بررسی شوند.

حداقل موارد زیر را آزمایش کنید:

- سناریوی موفق اصلی
- ورودی نامعتبر
- الزام احراز هویت
- مرزهای مالکیت
- منابع ناموجود
- صفحه‌بندی و مرتب‌سازی
- ترکیب فیلترهای مرتبط
- وضعیت خالی
- مدیریت خطای API و رابط کاربری
- چیدمان موبایل و دسکتاپ

پس از ایجاد پروژه‌های تست اجرا کنید:

```bash
dotnet test
```

برای فرانت‌اند، scriptهای موجود در `package.json` را اجرا کنید:

```bash
npm run lint
npm run build
```

اگر فقط آزمون دستی انجام شده، قابلیت را دارای پوشش کامل تست معرفی نکنید.

---

## 🔄 فرایند Pull Request

### ۱. هماهنگ‌سازی شاخه

```bash
git fetch upstream
git checkout main
git merge upstream/main
git checkout feature/short-description
git rebase main
```

Conflictها را با دقت حل کنید و سپس پروژه را دوباره بررسی کنید.

### ۲. بررسی تغییرات

```bash
git status
git diff
```

مطمئن شوید:

- فقط فایل‌های مرتبط تغییر کرده‌اند.
- هیچ اطلاعات محرمانه‌ای اضافه نشده است.
- کدهای موقت debugging حذف شده‌اند.
- فایل تولیدشده غیرضروری commit نشده است.
- مستندات با رفتار جدید هماهنگ هستند.
- قابلیت برنامه‌ریزی‌شده به‌عنوان تکمیل‌شده معرفی نشده است.

### ۳. اجرای بررسی‌ها

```bash
dotnet build
dotnet test
```

```bash
npm run lint
npm run build
```

فقط فرمان‌هایی را اجرا کنید که در نسخه فعلی مخزن پشتیبانی می‌شوند. اگر script یا آزمونی وجود ندارد، روش بررسی دستی را در Pull Request توضیح دهید.

### ۴. ارسال شاخه

```bash
git push origin feature/short-description
```

### ۵. ایجاد Pull Request

Pull Request مناسب شامل موارد زیر است:

- عنوان واضح
- خلاصه تغییرات
- مشکل موردنظر
- روش پیاده‌سازی
- مراحل آزمون یا بررسی
- تصویر برای تغییرات بصری
- شماره Issue مرتبط
- محدودیت‌های شناخته‌شده
- تغییرات migration یا تنظیمات

### قالب Pull Request


## خلاصه

تغییر و دلیل نیاز به آن را توضیح دهید.

## تغییرات

- اضافه شد ...
- به‌روزرسانی شد ...
- اصلاح شد ...

## بررسی

- [ ] بک‌اند با موفقیت build می‌شود
- [ ] فرانت‌اند با موفقیت build می‌شود
- [ ] تست‌های مرتبط موفق هستند
- [ ] احراز هویت بررسی شده است
- [ ] مرزهای مالکیت بررسی شده‌اند
- [ ] رفتار واکنش‌گرا بررسی شده است
- [ ] مستندات به‌روزرسانی شده‌اند

## تصاویر

برای تغییرات ظاهری تصاویر قبل و بعد را اضافه کنید.

## Issue مرتبط

Closes #ISSUE_NUMBER

## توضیحات تکمیلی

محدودیت‌ها، migrationها یا کارهای بعدی را ذکر کنید.
```

---

## 🐛 گزارش خطا

پیش از ایجاد گزارش جدید، Issueهای موجود را جست‌وجو کنید.

گزارش مفید شامل موارد زیر است:

- عنوان مختصر
- بخش بک‌اند یا فرانت‌اند تحت‌تأثیر
- مراحل بازتولید
- رفتار مورد انتظار
- رفتار واقعی
- logهای مرتبط بدون اطلاعات محرمانه
- سیستم‌عامل
- مرورگر و نسخه آن
- نسخه .NET و Node.js
- تصویر یا نمونه حداقلی
- تکرارپذیربودن مشکل

هرگز گذرواژه، access token، اطلاعات مالی خصوصی یا رشته اتصال production را منتشر نکنید.

---

## 💡 پیشنهاد قابلیت

یک پیشنهاد مناسب توضیح می‌دهد:

- چه مشکل کاربری باید حل شود
- تجربه پیشنهادی چیست
- چرا قابلیت با هدف پروژه هماهنگ است
- چه اثری بر API یا دیتابیس دارد
- ملاحظات امنیت و حریم خصوصی چیست
- چه راهکارهای جایگزینی وجود دارند
- آیا تغییر با نسخه قبلی سازگار است

قابلیت‌های بزرگ باید پیش از پیاده‌سازی مطرح و تأیید شوند.

---

## 📖 مشارکت در مستندات

هنگام به‌روزرسانی مستندات:

- بخش‌های انگلیسی و فارسی را هماهنگ نگه دارید.
- از پاراگراف‌های کوتاه و واضح استفاده کنید.
- در صورت مفیدبودن مثال اضافه کنید.
- فرمان‌ها را قابل کپی و اجرا نگه دارید.
- قابلیت تکمیل‌شده را از قابلیت برنامه‌ریزی‌شده جدا کنید.
- عملکردی را که هنوز پیاده‌سازی نشده وعده ندهید.
- با تغییر API، فایل `docs/API.md` را اصلاح کنید.
- با تغییر تنظیمات، راهنمای راه‌اندازی را به‌روزرسانی کنید.
- لینک‌ها و anchorهای داخلی را بررسی کنید.

---

## ❓ دریافت راهنمایی

در صورت نیاز به کمک:

1. README و مستندات API را مطالعه کنید.
2. Issueها و Pull Requestهای موجود را جست‌وجو کنید.
3. یک Issue یا Discussion متمرکز ایجاد کنید.
4. اقداماتی را که انجام داده‌اید توضیح دهید.
5. خطاهای پاک‌سازی‌شده و اطلاعات محیط را ارائه دهید.

نگهدارندگان پروژه:

- **ایلیا فراهانی** — بک‌اند و معماری  
  [@here-is-leo](https://github.com/here-is-leo)

- **ترانه قلندری** — فرانت‌اند و طراحی  
  [@taraneh-ghalandarii](https://github.com/taraneh-ghalandarii)

---

## 📄 مجوز

با مشارکت در این مخزن می‌پذیرید که مشارکت شما تحت [مجوز MIT](LICENSE) پروژه منتشر شود.

---

<div align="center">

**از مشارکت شما در بهترشدن Expense Tracker سپاسگزاریم 💙**

</div>

</div>
```
