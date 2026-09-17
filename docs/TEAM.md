# راهنمای همکاری تیمی

راهنمای کوتاهی برای هر دو توسعه‌دهنده‌ای که روی پروژه Expense Tracker کار می‌کنند. پیش از شروع هر کاری این سند را بخوانید.

## پروژه

- **مخزن (Repository):** https://github.com/here-is-leo/expense-tracker
- **مسیر محلی (توسعه‌دهنده بک‌اند):** `C:\Users\lenovo\expense-tracker`
- **نوع:** مونوریپو (بک‌اند و فرانت‌اند در یک مخزن)

## ساختار مخزن

```
expense-tracker/
├── backend/       ASP.NET Core Web API (متعلق به توسعه‌دهنده بک‌اند)
├── frontend/      React SPA (متعلق به توسعه‌دهنده فرانت‌اند)
├── docs/          مستندات مشترک
├── README.md
├── .gitignore
└── .gitattributes
```

## مالکیت بخش‌ها

| بخش | مالک | چه کسی می‌تواند تغییر دهد |
|------|-------|-----------|
| `backend/` | @here-is-leo | فقط توسعه‌دهنده بک‌اند |
| `frontend/` | (همکار فرانت‌اند) | فقط توسعه‌دهنده فرانت‌اند |
| `docs/` | مشترک | هر دو نفر |
| فایل‌های ریشه | مشترک | هر دو، با هماهنگی |

**قانون:** هرگز فایل‌های خارج از حوزه خودتان را بدون اطلاع دادن به نفر دیگر ویرایش نکنید.

## استراتژی برنچ (Branch)

- `main` — پایدار، محافظت‌شده، فقط از طریق Pull Request
- `develop` — برنچ یکپارچه‌سازی، فقط از طریق Pull Request
- `feature/<name>` — قابلیت‌های جدید
- `fix/<name>` — رفع باگ‌ها

## روند کاری (Workflow)

1. شروع از `develop`:
   ```
   git checkout develop
   git pull origin develop
   git checkout -b feature/your-feature
   ```

2. کار خود را انجام دهید و با پیام‌های واضح کامیت کنید.

3. Push کنید:
   ```
   git push -u origin feature/your-feature
   ```

4. یک Pull Request به سمت `develop` در گیت‌هاب باز کنید.

5. منتظر یک تأیید (approval) بمانید.

6. به‌صورت Squash and Merge ادغام کنید. برنچ را حذف کنید.

## قرارداد پیام کامیت (Commit Message)

قالب: `<type>: <توضیح کوتاه>`

- `feat:` قابلیت جدید
- `fix:` رفع باگ
- `refactor:` تغییر کد بدون تغییر در رفتار
- `docs:` مستندسازی
- `test:` تست‌ها
- `chore:` ابزار، وابستگی‌ها، پیکربندی

مثال‌ها:
- `feat: add user registration endpoint`
- `fix: prevent cross-user transaction access`
- `test: add IDOR authorization test`

## قرارداد API

فرانت‌اند و بک‌اند باید پیش از پیاده‌سازی روی قرارداد API توافق کنند.

- قرارداد در این مسیر قرار دارد: `docs/API.md`
- هر دو توسعه‌دهنده باید هر تغییری در `docs/API.md` را بررسی و تأیید کنند.
- Swagger/OpenAPI در مسیر `/swagger` پس از اجرای بک‌اند، منبع اصلی حقیقت است.

## وضعیت فعلی

### بک‌اند (تا امروز)
- [انجام شد] اسکلت پروژه ساخته شد (ASP.NET Core 8 Web API)
- [انجام شد] EF Core، JWT، FluentValidation، BCrypt نصب شدند
- [انجام شد] ساختار Solution ایجاد شد
- [در حال انجام] مدل‌های پایگاه داده، AppDbContext، اولین Migration
- [بعدی] احراز هویت (ثبت‌نام، ورود، JWT)
- [بعدتر] عملیات CRUD تراکنش‌ها، دسته‌بندی‌ها، داشبورد

### فرانت‌اند
- وضعیت: (توسط توسعه‌دهنده فرانت‌اند تکمیل شود)
- کارهای بعدی: (توسط توسعه‌دهنده فرانت‌اند تکمیل شود)

## آنچه توسعه‌دهنده فرانت‌اند باید بداند

### آدرس پایه (محیط توسعه)
- بک‌اند روی این آدرس اجرا می‌شود: `http://localhost:5175` (HTTP) یا `https://localhost:7042` (HTTPS)
- مسیر پایه API: `/api`
- رابط Swagger: `http://localhost:5175/swagger`

### فرآیند احراز هویت
1. `POST /api/auth/register` ← ساخت کاربر
2. `POST /api/auth/login` ← بازگرداندن `{ accessToken, expiresAt, user }`
3. ذخیره `accessToken` (در حافظه یا localStorage)
4. ارسال هدر `Authorization: Bearer <token>` در هر درخواست محافظت‌شده
5. پس از انقضای توکن (۲۴ ساعت)، کاربر باید دوباره وارد شود

### نقاط پایانی (Endpoints) موجود — برنامه‌ریزی‌شده
قرارداد کامل را در `docs/API.md` ببینید. خلاصه:

| متد | مسیر | نیاز به احراز هویت | هدف |
|--------|----------|------|---------|
| POST | /api/auth/register | خیر | ساخت حساب کاربری |
| POST | /api/auth/login | خیر | دریافت توکن JWT |
| GET | /api/transactions | بله | لیست تراکنش‌های کاربر |
| GET | /api/transactions/{id} | بله | دریافت یک تراکنش |
| POST | /api/transactions | بله | ساخت تراکنش |
| PUT | /api/transactions/{id} | بله | بروزرسانی تراکنش |
| DELETE | /api/transactions/{id} | بله | حذف تراکنش |
| GET | /api/categories | بله | لیست دسته‌بندی‌ها |
| GET | /api/dashboard/summary | بله | خلاصه اطلاعات داشبورد |

### قالب خطاها
همه خطاها به این شکل هستند:

```json
{
  "status": 400,
  "message": "Validation failed",
  "errors": {
    "email": ["Invalid email address"]
  },
  "traceId": "..."
}
```

### CORS
بک‌اند طوری تنظیم می‌شود که درخواست‌ها از سرور توسعه فرانت‌اند (معمولاً `http://localhost:5173` برای Vite) پذیرفته شوند. اگر از پورت دیگری استفاده می‌کنید، به توسعه‌دهنده بک‌اند اطلاع دهید.

## قوانین

- هرگز مستقیماً به `main` یا `develop` پوش نکنید.
- پول‌ریکوئست‌ها را کوچک نگه دارید (کمتر از ۴۰۰ خط).
- اطلاعات محرمانه (secrets) را کامیت نکنید. از `.env` یا `user-secrets` استفاده کنید.
- در صورت شک، از نفر دیگر بپرسید. حدس نزنید.
- اگر قرارداد API را تغییر دادید، ابتدا `docs/API.md` را بروزرسانی کنید، سپس پیاده‌سازی کنید.

## ارتباطات

- GitHub Issues برای وظایف و باگ‌ها
- کامنت‌های Pull Request برای بازبینی کد
- پیام مستقیم برای موارد فوری