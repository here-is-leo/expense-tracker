
<!-- English -->

<a id="top"></a>

<div align="center">

# 💸 Expense Tracker — Frontend

### Your money. Your clarity. Your control.

A modern personal finance interface built with **React 19**, **TypeScript**, and **Vite**.

<br />

![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![TypeScript](https://img.shields.io/badge/TypeScript-Strict-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-Build_Tool-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v3-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)
[![License: MIT](https://img.shields.io/badge/License-MIT-22C55E?style=for-the-badge)](../LICENSE)

<br />

**[English](#english) | [فارسی](#persian)**

<br />

**JWT Authentication** &nbsp;·&nbsp; **Interactive Dashboard** &nbsp;·&nbsp; **Responsive Design**

</div>

---

<a id="english"></a>

## 💎 Overview

Expense Tracker is a React single-page application for understanding personal income and expenses. It connects to an ASP.NET Core 8 REST API and brings financial summaries, category breakdowns, and recent activity into a polished dashboard.

The interface combines a dark fintech theme, translucent cards, interactive charts, and thoughtful loading, empty, and error states.

> **Current scope:** Authentication and dashboard features are implemented. Transaction management screens and category management are planned.

---

## 🧭 Table of Contents

- [✨ Features](#features)
- [🛠️ Tech Stack](#tech-stack)
- [🎨 Design System](#design-system)
- [📁 Project Structure](#project-structure)
- [🚀 Getting Started](#getting-started)
- [📜 Available Scripts](#available-scripts)
- [🔐 Authentication Flow](#authentication-flow)
- [🔌 API Integration](#api-integration)
- [🖥️ Backend](#backend)
- [📸 Screenshots](#screenshots)
- [🗺️ Roadmap](#roadmap)
- [🤝 Contributing](#contributing)
- [📄 License](#license)
- [👨‍💻 Project Leadership](#team)
- [🇮🇷 نسخهٔ فارسی](#persian)

---

<a id="features"></a>

## ✨ Features

### 🔐 Authentication

- ✅ User registration and login with JWT authentication
- ✅ Protected routes that redirect unauthenticated users to `/login`
- ✅ Token persistence in `localStorage` with a remember-me option
- ✅ Automatic logout when the token expires
- ✅ Centralized `401` handling that clears authentication and redirects to login

### 📊 Financial dashboard

- ✅ Summary cards for income, expenses, balance, and transaction count
- ✅ Animated counters
- ✅ Pie chart showing expenses by category
- ✅ Bar chart comparing monthly income and expenses
- ✅ Recent transactions list

### 🎨 User experience

- ✅ Dark fintech theme with glassmorphism and gradients
- ✅ Loading skeletons
- ✅ Error states with retry actions
- ✅ Empty states with calls to action
- ✅ Toast notifications
- ✅ Responsive layouts supporting mobile widths of **375px and above**
- ✅ Dark appearance by default

### 🗂️ Planned functionality

- ⏳ Transactions page with filters, search, and pagination
- ⏳ Create and edit transaction forms
- ⏳ Delete transaction confirmation dialog
- ⏳ Category management

---

<a id="tech-stack"></a>

## 🛠️ Tech Stack

| Library / Tool | Purpose |
|---|---|
| **React 19** | Component-based user interface |
| **TypeScript — strict mode** | Static typing and development checks |
| **Vite** | Development server and production build tooling |
| **Tailwind CSS v3** | Utility-based styling |
| **React Router v6** | Client-side routing and protected navigation |
| **TanStack Query v5** | Fetching, caching, and synchronizing server state |
| **Axios** | HTTP requests and interceptors |
| **React Hook Form** | Form state and submission handling |
| **Zod** | Form validation schemas |
| **Recharts** | Pie and bar charts |
| **Framer Motion** | Interface animations |
| **Lucide React** | Icons |
| **Sonner** | Toast notifications |
| **Oxlint** | Linting |

---

<a id="design-system"></a>

## 🎨 Design System

### Visual direction

A **navy-to-purple-black** background forms the foundation of the interface. Translucent cards, restrained glows, and bright accents create separation between navigation, summaries, charts, and actions.

The visual direction draws inspiration from **Linear**, **Stripe**, **Vercel**, and **Revolut**.

### Color palette

| Accent | Hex |
|---|---|
| 🩵 Cyan | `#00d4ff` |
| 🔵 Blue | `#3b82f6` |
| 🟣 Purple | `#8b5cf6` |
| 🩷 Pink | `#ec4899` |

### Typography and surfaces

| Element | Treatment |
|---|---|
| English typography | **Inter** |
| Persian typography | **Vazirmatn** |
| Cards | Glassmorphism with translucent surfaces |
| Corners | Rounded, typically **12–20px** |
| Depth | Subtle borders, gradients, and glows |
| Motion | Animated counters and interface transitions |
| Default appearance | Dark |

---

<a id="project-structure"></a>

## 📁 Project Structure

```text
frontend/
├── src/
│   ├── api/               # Axios client and API modules
│   │                      # auth, transactions, categories, dashboard
│   ├── components/
│   │   ├── auth/          # ProtectedRoute, LoginForm, RegisterForm
│   │   ├── dashboard/     # SummaryCards, CategoryChart,
│   │   │                  # MonthlyChart, RecentTransactions
│   │   ├── layout/        # AppLayout, Header, Sidebar
│   │   └── transactions/  # Planned transaction UI
│   ├── context/           # AuthContext
│   ├── hooks/             # useAuth, useDashboard
│   ├── lib/               # Formatters, utilities, API errors
│   ├── pages/             # Login, Register, Dashboard
│   ├── types/             # TypeScript API types
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css
├── public/
├── .env.example
├── index.html
├── package.json
├── tailwind.config.ts
├── tsconfig.json
└── vite.config.ts
```

> Transaction API modules and types do not imply that their management screens are implemented.

---

<a id="getting-started"></a>

## 🚀 Getting Started

### Prerequisites

- **Node.js 20.19+ or 22.12+**
- **npm**, or the package manager used by the repository
- Backend API running at **`http://localhost:5175`**
- Git

### 1. Clone the repository

```bash
git clone https://github.com/here-is-leo/expense-tracker.git
cd expense-tracker/frontend
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure the environment

Copy `.env.example` to `.env`:

```bash
# macOS / Linux
cp .env.example .env
```

```powershell
# Windows PowerShell
Copy-Item .env.example .env
```

Configure the API base URL:

```dotenv
VITE_API_BASE_URL=http://localhost:5175
```

| Variable | Purpose | Local example |
|---|---|---|
| `VITE_API_BASE_URL` | Base address used by the Axios client | `http://localhost:5175` |

Follow `.env.example` and the API client's route convention for any `/api` prefix. Avoid adding that prefix twice.

Restart Vite after changing environment variables. Variables prefixed with `VITE_` are available to browser code; do not put private credentials in them.

### 4. Start the development server

```bash
npm run dev
```

Open the address printed by Vite. Keep the backend running while using authentication and dashboard features.

### 5. Build and preview

```bash
npm run build
npm run preview
```

---

<a id="available-scripts"></a>

## 📜 Available Scripts

Run these commands from `frontend/`.

| Command | Purpose |
|---|---|
| `npm run dev` | Start the Vite development server |
| `npm run build` | Create the production build |
| `npm run preview` | Preview the production build locally |
| `npm run lint` | Run the project's lint script using Oxlint |

`package.json` is the source of truth for the exact script definitions.

---

<a id="authentication-flow"></a>

## 🔐 Authentication Flow

```text
Register / log in
       │
       ▼
Receive JWT from the API
       │
       ▼
Update authentication state
and apply persistence preferences
       │
       ▼
Access protected routes
       │
       ├── Token expires ──► Clear authentication ──► /login
       │
       └── API returns 401 ► Clear authentication ──► /login
```

`AuthContext` holds authentication state, and `useAuth` exposes it to components. Token persistence uses `localStorage` with the remember-me behavior.

Protected routes redirect unauthenticated users to `/login`. Expiry handling and the Axios `401` interceptor clear invalid authentication state.

Client-side route protection supports the user experience; the backend remains responsible for authorization and ownership checks.

---

<a id="api-integration"></a>

## 🔌 API Integration

The frontend communicates with the REST API through a shared Axios client in `src/api/`.

| Part | Responsibility |
|---|---|
| Axios client | Base URL, shared request configuration, and interceptors |
| Request interceptor | Attach the authentication token to requests |
| Response interceptor | Handle unauthorized responses consistently |
| API modules | Group calls for auth, transactions, categories, and dashboard |
| Error utilities | Normalize failures for consistent UI messages |
| TanStack Query | Manage server data, loading states, errors, and caching |
| TypeScript types | Describe API request and response shapes |

Pages and components consume hooks such as `useDashboard`, while shared utilities keep API error presentation consistent.

---

<a id="backend"></a>

## 🖥️ Backend

The frontend belongs to the [Expense Tracker monorepo](https://github.com/here-is-leo/expense-tracker) and consumes its **ASP.NET Core 8** API.

| Setting | Value |
|---|---|
| Frontend directory | `frontend/` |
| Backend framework | ASP.NET Core 8 |
| Local API address | `http://localhost:5175` |
| Backend setup | [Backend README](../backend/README.md) |

Follow the backend documentation to configure and run the API before testing the frontend.

---

<a id="screenshots"></a>

## 📸 Screenshots

### Dashboard

<!-- Add dashboard screenshot here -->

### Login and registration

<!-- Add authentication screenshots here -->

### Mobile experience

<!-- Add mobile dashboard screenshot here -->

Screenshots should show the actual application and use sample data.

---

<a id="roadmap"></a>

## 🗺️ Roadmap

| Area | Status | Scope |
|---|:---:|---|
| Authentication | ✅ Implemented | Registration, login, persistence, expiry, protected routes |
| Dashboard | ✅ Implemented | Summary cards, counters, charts, recent transactions |
| Interface states | ✅ Implemented | Loading, empty, error, retry, notifications |
| Responsive design | ✅ Implemented | Dark interface supporting widths from 375px |
| Transactions page | ⏳ Planned | List, search, filters, pagination |
| Transaction forms | ⏳ Planned | Create and edit |
| Delete confirmation | ⏳ Planned | Transaction deletion dialog |
| Category management | ⏳ Planned | Category management interface |

---

<a id="contributing"></a>

## 🤝 Contributing

Read the [contribution guide](../docs/CONTRIBUTING.md) before submitting changes.

Keep changes focused, follow the existing component and API structure, and check relevant loading, error, and empty states.

Before submitting:

```bash
npm run lint
npm run build
```

Review the affected screens at mobile and desktop widths. Document new environment variables and user-facing behavior.

---

<a id="license"></a>

## 📄 License

This project is distributed under the **MIT License**. See [LICENSE](../LICENSE) for details.

---

<a id="team"></a>

## 👨‍💻 Project Leadership

<div align="center">

<a href="https://github.com/here-is-leo">
  <img src="https://github.com/here-is-leo.png?size=160" width="120" height="120" alt="Ilia Farahani — Leo" />
</a>

### Ilia Farahani — Leo

**Senior Developer · برنامه‌نویس ارشد پروژه**

**ایلیا فاراهانی (لئو)**

[![GitHub](https://img.shields.io/badge/GitHub-@here--is--leo-181717?style=for-the-badge&logo=github)](https://github.com/here-is-leo)

</div>

---

<!-- Persian -->

<a id="persian"></a>

<h1 align="center" dir="rtl">💸 ردیاب هزینه — فرانت‌اند</h1>

<p align="center" dir="rtl">
<strong>پول شما. دید روشن شما. کنترل در دست شما.</strong>
<br /><br />
رابط مدیریت مالی شخصی با React 19، TypeScript و Vite
<br /><br />
<a href="#english">English</a> | <a href="#persian">فارسی</a>
</p>

---

<h2 dir="rtl">💎 معرفی</h2>

<p dir="rtl">
ردیاب هزینه یک برنامهٔ تک‌صفحه‌ای React برای مشاهده و تحلیل درآمدها و هزینه‌های شخصی است. این برنامه به REST API ساخته‌شده با ASP.NET Core 8 متصل می‌شود و خلاصهٔ مالی، دسته‌بندی هزینه‌ها و فعالیت‌های اخیر را در داشبورد نمایش می‌دهد.
</p>

<p dir="rtl">
رابط کاربری از تم تیرهٔ مالی، کارت‌های نیمه‌شفاف، نمودارهای تعاملی و حالت‌های بارگذاری، خطا و دادهٔ خالی استفاده می‌کند.
</p>

<p dir="rtl">
<strong>وضعیت فعلی:</strong> احراز هویت و داشبورد پیاده‌سازی شده‌اند. صفحات مدیریت تراکنش و دسته‌بندی‌ها در برنامهٔ توسعه هستند.
</p>

---

<h2 dir="rtl">🧭 فهرست مطالب</h2>

<div dir="rtl">

<ul>
<li><a href="#fa-features">✨ قابلیت‌ها</a></li>
<li><a href="#fa-stack">🛠️ فناوری‌ها</a></li>
<li><a href="#fa-design">🎨 سیستم طراحی</a></li>
<li><a href="#fa-structure">📁 ساختار پروژه</a></li>
<li><a href="#fa-start">🚀 راه‌اندازی</a></li>
<li><a href="#fa-scripts">📜 فرمان‌ها</a></li>
<li><a href="#fa-auth">🔐 جریان احراز هویت</a></li>
<li><a href="#fa-api">🔌 اتصال به API</a></li>
<li><a href="#fa-backend">🖥️ بک‌اند</a></li>
<li><a href="#fa-screenshots">📸 تصاویر</a></li>
<li><a href="#fa-roadmap">🗺️ نقشهٔ راه</a></li>
<li><a href="#fa-contributing">🤝 مشارکت</a></li>
<li><a href="#fa-license">📄 مجوز</a></li>
<li><a href="#fa-team">👨‍💻 مدیریت فنی پروژه</a></li>
</ul>

</div>

---

<a id="fa-features"></a>

<h2 dir="rtl">✨ قابلیت‌ها</h2>

<div dir="rtl">

<h3>🔐 احراز هویت</h3>

<ul>
<li>✅ ثبت‌نام و ورود با JWT</li>
<li>✅ مسیرهای محافظت‌شده و هدایت کاربران واردنشده به <code>/login</code></li>
<li>✅ نگهداری توکن در <code>localStorage</code> همراه با گزینهٔ «مرا به خاطر بسپار»</li>
<li>✅ خروج خودکار هنگام انقضای توکن</li>
<li>✅ مدیریت متمرکز پاسخ <code>401</code>، پاک‌کردن وضعیت احراز هویت و هدایت به ورود</li>
</ul>

<h3>📊 داشبورد مالی</h3>

<ul>
<li>✅ کارت‌های درآمد، هزینه، موجودی و تعداد تراکنش‌ها</li>
<li>✅ شمارنده‌های متحرک</li>
<li>✅ نمودار دایره‌ای هزینه‌ها بر اساس دسته‌بندی</li>
<li>✅ نمودار میله‌ای مقایسهٔ درآمد و هزینهٔ ماهانه</li>
<li>✅ فهرست تراکنش‌های اخیر</li>
</ul>

<h3>🎨 تجربهٔ کاربری</h3>

<ul>
<li>✅ تم تیرهٔ مالی با شیشه‌نمایی و گرادیان</li>
<li>✅ اسکلت‌های بارگذاری</li>
<li>✅ نمایش خطا همراه با امکان تلاش دوباره</li>
<li>✅ حالت‌های دادهٔ خالی همراه با دعوت به اقدام</li>
<li>✅ اعلان‌های کوتاه</li>
<li>✅ طراحی واکنش‌گرا برای عرض ۳۷۵ پیکسل و بیشتر</li>
<li>✅ ظاهر تیره به‌صورت پیش‌فرض</li>
</ul>

<h3>🗂️ قابلیت‌های برنامه‌ریزی‌شده</h3>

<ul>
<li>⏳ صفحهٔ تراکنش‌ها با فیلتر، جست‌وجو و صفحه‌بندی</li>
<li>⏳ فرم ایجاد و ویرایش تراکنش</li>
<li>⏳ پنجرهٔ تأیید حذف تراکنش</li>
<li>⏳ مدیریت دسته‌بندی‌ها</li>
</ul>

</div>

---

<a id="fa-stack"></a>

<h2 dir="rtl">🛠️ فناوری‌ها</h2>

<table dir="rtl">
<tr><th>کتابخانه یا ابزار</th><th>کاربرد</th></tr>
<tr><td>React 19</td><td>ساخت رابط کاربری مبتنی بر کامپوننت</td></tr>
<tr><td>TypeScript با حالت strict</td><td>نوع‌دهی ایستا و بررسی‌های زمان توسعه</td></tr>
<tr><td>Vite</td><td>سرور توسعه و ساخت خروجی نهایی</td></tr>
<tr><td>Tailwind CSS v3</td><td>طراحی با کلاس‌های کاربردی</td></tr>
<tr><td>React Router v6</td><td>مسیریابی سمت کاربر و محافظت از مسیرها</td></tr>
<tr><td>TanStack Query v5</td><td>دریافت، کش و همگام‌سازی داده‌های سرور</td></tr>
<tr><td>Axios</td><td>درخواست‌های HTTP و رهگیرها</td></tr>
<tr><td>React Hook Form</td><td>مدیریت وضعیت و ارسال فرم</td></tr>
<tr><td>Zod</td><td>تعریف قواعد اعتبارسنجی فرم</td></tr>
<tr><td>Recharts</td><td>نمودارهای دایره‌ای و میله‌ای</td></tr>
<tr><td>Framer Motion</td><td>انیمیشن‌های رابط کاربری</td></tr>
<tr><td>Lucide React</td><td>آیکون‌ها</td></tr>
<tr><td>Sonner</td><td>اعلان‌های کوتاه</td></tr>
<tr><td>Oxlint</td><td>بررسی قواعد کدنویسی</td></tr>
</table>

---

<a id="fa-design"></a>

<h2 dir="rtl">🎨 سیستم طراحی</h2>

<p dir="rtl">
پس‌زمینهٔ سرمه‌ای تا بنفشِ نزدیک به مشکی، پایهٔ ظاهر برنامه است. کارت‌های نیمه‌شفاف، درخشش ملایم و رنگ‌های تأکیدی، بخش‌های ناوبری، خلاصه‌های مالی، نمودارها و عملیات را از هم متمایز می‌کنند.
</p>

<p dir="rtl">
جهت بصری طراحی از Linear، Stripe، Vercel و Revolut الهام گرفته است.
</p>

<table dir="rtl">
<tr><th>رنگ تأکیدی</th><th>کد</th></tr>
<tr><td>🩵 فیروزه‌ای</td><td><code>#00d4ff</code></td></tr>
<tr><td>🔵 آبی</td><td><code>#3b82f6</code></td></tr>
<tr><td>🟣 بنفش</td><td><code>#8b5cf6</code></td></tr>
<tr><td>🩷 صورتی</td><td><code>#ec4899</code></td></tr>
</table>

<table dir="rtl">
<tr><th>عنصر</th><th>ویژگی</th></tr>
<tr><td>قلم انگلیسی</td><td>Inter</td></tr>
<tr><td>قلم فارسی</td><td>Vazirmatn</td></tr>
<tr><td>کارت‌ها</td><td>سطوح نیمه‌شفاف با شیشه‌نمایی</td></tr>
<tr><td>گوشه‌ها</td><td>گرد، معمولاً بین ۱۲ تا ۲۰ پیکسل</td></tr>
<tr><td>عمق بصری</td><td>حاشیه، گرادیان و درخشش ملایم</td></tr>
<tr><td>حرکت</td><td>شمارنده‌های متحرک و گذارهای رابط کاربری</td></tr>
<tr><td>ظاهر پیش‌فرض</td><td>تیره</td></tr>
</table>

---

<a id="fa-structure"></a>

<h2 dir="rtl">📁 ساختار پروژه</h2>

```text
frontend/
├── src/
│   ├── api/
│   ├── components/
│   │   ├── auth/
│   │   ├── dashboard/
│   │   ├── layout/
│   │   └── transactions/
│   ├── context/
│   ├── hooks/
│   ├── lib/
│   ├── pages/
│   ├── types/
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css
├── public/
├── .env.example
├── index.html
├── package.json
├── tailwind.config.ts
├── tsconfig.json
└── vite.config.ts
```

<table dir="rtl">
<tr><th>مسیر</th><th>مسئولیت</th></tr>
<tr><td><code>api/</code></td><td>کلاینت Axios و ماژول‌های احراز هویت، تراکنش، دسته‌بندی و داشبورد</td></tr>
<tr><td><code>components/auth/</code></td><td>مسیر محافظت‌شده و فرم‌های ورود و ثبت‌نام</td></tr>
<tr><td><code>components/dashboard/</code></td><td>کارت‌های خلاصه، نمودارها و تراکنش‌های اخیر</td></tr>
<tr><td><code>components/layout/</code></td><td>چیدمان برنامه، سربرگ و نوار کناری</td></tr>
<tr><td><code>components/transactions/</code></td><td>رابط تراکنش‌ها؛ برنامه‌ریزی‌شده</td></tr>
<tr><td><code>context/</code></td><td>AuthContext</td></tr>
<tr><td><code>hooks/</code></td><td>هوک‌های useAuth و useDashboard</td></tr>
<tr><td><code>lib/</code></td><td>قالب‌بندی، ابزارهای مشترک و خطاهای API</td></tr>
<tr><td><code>pages/</code></td><td>صفحات ورود، ثبت‌نام و داشبورد</td></tr>
<tr><td><code>types/</code></td><td>نوع‌های TypeScript مربوط به API</td></tr>
</table>

<p dir="rtl">
وجود ماژول‌ها و نوع‌های API تراکنش‌ها به‌معنای تکمیل صفحات مدیریت آن‌ها نیست.
</p>

---

<a id="fa-start"></a>

<h2 dir="rtl">🚀 راه‌اندازی</h2>

<div dir="rtl">

<h3>پیش‌نیازها</h3>

<ul>
<li>Node.js نسخهٔ 20.19+ یا 22.12+</li>
<li>npm یا مدیر بستهٔ مورد استفاده در مخزن</li>
<li>بک‌اند فعال در <code>http://localhost:5175</code></li>
<li>Git</li>
</ul>

<h3>۱. دریافت مخزن</h3>

</div>

```bash
git clone https://github.com/here-is-leo/expense-tracker.git
cd expense-tracker/frontend
```

<h3 dir="rtl">۲. نصب وابستگی‌ها</h3>

```bash
npm install
```

<h3 dir="rtl">۳. تنظیم محیط</h3>

<p dir="rtl">فایل <code>.env.example</code> را با نام <code>.env</code> کپی کنید:</p>

```bash
# macOS / Linux
cp .env.example .env
```

```powershell
# Windows PowerShell
Copy-Item .env.example .env
```

<p dir="rtl">نشانی پایهٔ API را تنظیم کنید:</p>

```dotenv
VITE_API_BASE_URL=http://localhost:5175
```

<table dir="rtl">
<tr><th>متغیر</th><th>کاربرد</th><th>نمونهٔ محلی</th></tr>
<tr><td><code>VITE_API_BASE_URL</code></td><td>نشانی پایهٔ کلاینت Axios</td><td><code>http://localhost:5175</code></td></tr>
</table>

<p dir="rtl">
برای پیشوند احتمالی <code>/api</code> از قرارداد مسیرهای کلاینت و فایل نمونه پیروی کنید تا پیشوند دوبار اضافه نشود. پس از تغییر متغیرها، Vite را دوباره اجرا کنید.
</p>

<p dir="rtl">
متغیرهای دارای پیشوند <code>VITE_</code> در دسترس کد مرورگر هستند؛ اطلاعات محرمانه را در آن‌ها قرار ندهید.
</p>

<h3 dir="rtl">۴. اجرای سرور توسعه</h3>

```bash
npm run dev
```

<p dir="rtl">
آدرسی را که Vite نمایش می‌دهد باز کنید. برای استفاده از احراز هویت و داشبورد، بک‌اند باید فعال باشد.
</p>

<h3 dir="rtl">۵. ساخت و پیش‌نمایش</h3>

```bash
npm run build
npm run preview
```

---

<a id="fa-scripts"></a>

<h2 dir="rtl">📜 فرمان‌های موجود</h2>

<p dir="rtl">فرمان‌ها را در پوشهٔ <code>frontend/</code> اجرا کنید.</p>

<table dir="rtl">
<tr><th>فرمان</th><th>کاربرد</th></tr>
<tr><td><code>npm run dev</code></td><td>اجرای سرور توسعهٔ Vite</td></tr>
<tr><td><code>npm run build</code></td><td>ساخت خروجی نهایی برنامه</td></tr>
<tr><td><code>npm run preview</code></td><td>پیش‌نمایش محلی خروجی ساخته‌شده</td></tr>
<tr><td><code>npm run lint</code></td><td>اجرای بررسی قواعد کدنویسی با Oxlint</td></tr>
</table>

<p dir="rtl">
تعریف دقیق فرمان‌ها در <code>package.json</code> قرار دارد.
</p>

---

<a id="fa-auth"></a>

<h2 dir="rtl">🔐 جریان احراز هویت</h2>

<div dir="rtl">

<ol>
<li>کاربر ثبت‌نام می‌کند یا وارد حساب می‌شود.</li>
<li>API توکن JWT را برمی‌گرداند.</li>
<li>وضعیت احراز هویت و تنظیمات نگهداری توکن اعمال می‌شوند.</li>
<li>کاربر به مسیرهای محافظت‌شده دسترسی پیدا می‌کند.</li>
<li>با انقضای توکن یا دریافت پاسخ <code>401</code>، وضعیت احراز هویت پاک و کاربر به <code>/login</code> هدایت می‌شود.</li>
</ol>

<p>
<code>AuthContext</code> وضعیت احراز هویت را نگه می‌دارد و <code>useAuth</code> آن را در اختیار کامپوننت‌ها قرار می‌دهد. ماندگاری توکن از <code>localStorage</code> و رفتار گزینهٔ «مرا به خاطر بسپار» استفاده می‌کند.
</p>

<p>
مسیرهای محافظت‌شده، کاربران واردنشده را به صفحهٔ ورود هدایت می‌کنند. بررسی انقضا و رهگیر <code>401</code> در Axios وضعیت نامعتبر را پاک می‌کنند.
</p>

<p>
محافظت سمت کاربر بخشی از تجربهٔ کاربری است؛ مسئولیت مجوز دسترسی و کنترل مالکیت داده همچنان بر عهدهٔ بک‌اند است.
</p>

</div>

---

<a id="fa-api"></a>

<h2 dir="rtl">🔌 اتصال به API</h2>

<p dir="rtl">
ارتباط با REST API از طریق کلاینت مشترک Axios در <code>src/api/</code> انجام می‌شود.
</p>

<table dir="rtl">
<tr><th>بخش</th><th>مسئولیت</th></tr>
<tr><td>کلاینت Axios</td><td>نشانی پایه، تنظیمات مشترک درخواست و رهگیرها</td></tr>
<tr><td>رهگیر درخواست</td><td>افزودن توکن احراز هویت به درخواست‌ها</td></tr>
<tr><td>رهگیر پاسخ</td><td>مدیریت یکپارچهٔ پاسخ‌های غیرمجاز</td></tr>
<tr><td>ماژول‌های API</td><td>گروه‌بندی درخواست‌های احراز هویت، تراکنش، دسته‌بندی و داشبورد</td></tr>
<tr><td>ابزارهای خطا</td><td>یکسان‌سازی خطاها برای نمایش پیام‌های هماهنگ</td></tr>
<tr><td>TanStack Query</td><td>مدیریت دادهٔ سرور، بارگذاری، خطا و کش</td></tr>
<tr><td>نوع‌های TypeScript</td><td>تعریف ساختار درخواست‌ها و پاسخ‌ها</td></tr>
</table>

<p dir="rtl">
صفحات و کامپوننت‌ها از هوک‌هایی مانند <code>useDashboard</code> استفاده می‌کنند و ابزارهای مشترک، نمایش خطاهای API را هماهنگ نگه می‌دارند.
</p>

---

<a id="fa-backend"></a>

<h2 dir="rtl">🖥️ بک‌اند</h2>

<p dir="rtl">
این فرانت‌اند بخشی از <a href="https://github.com/here-is-leo/expense-tracker">مخزن یکپارچهٔ Expense Tracker</a> است و به API ساخته‌شده با ASP.NET Core 8 متصل می‌شود.
</p>

<table dir="rtl">
<tr><th>تنظیم</th><th>مقدار</th></tr>
<tr><td>پوشهٔ فرانت‌اند</td><td><code>frontend/</code></td></tr>
<tr><td>فریم‌ورک بک‌اند</td><td>ASP.NET Core 8</td></tr>
<tr><td>نشانی محلی API</td><td><code>http://localhost:5175</code></td></tr>
<tr><td>راهنمای راه‌اندازی</td><td><a href="../backend/README.md">README بک‌اند</a></td></tr>
</table>

<p dir="rtl">
پیش از بررسی فرانت‌اند، بک‌اند را مطابق مستندات آن تنظیم و اجرا کنید.
</p>

---

<a id="fa-screenshots"></a>

<h2 dir="rtl">📸 تصاویر</h2>

<h3 dir="rtl">داشبورد</h3>

<!-- تصویر داشبورد را اینجا اضافه کنید -->

<h3 dir="rtl">ورود و ثبت‌نام</h3>

<!-- تصاویر ورود و ثبت‌نام را اینجا اضافه کنید -->

<h3 dir="rtl">نمای موبایل</h3>

<!-- تصویر داشبورد موبایل را اینجا اضافه کنید -->

<p dir="rtl">
تصاویر باید نمای واقعی برنامه را با داده‌های نمونه نشان دهند.
</p>

---

<a id="fa-roadmap"></a>

<h2 dir="rtl">🗺️ نقشهٔ راه</h2>

<table dir="rtl">
<tr><th>بخش</th><th>وضعیت</th><th>محدوده</th></tr>
<tr><td>احراز هویت</td><td>✅ پیاده‌سازی‌شده</td><td>ثبت‌نام، ورود، ماندگاری، انقضا و مسیرهای محافظت‌شده</td></tr>
<tr><td>داشبورد</td><td>✅ پیاده‌سازی‌شده</td><td>کارت‌ها، شمارنده‌ها، نمودارها و تراکنش‌های اخیر</td></tr>
<tr><td>حالت‌های رابط</td><td>✅ پیاده‌سازی‌شده</td><td>بارگذاری، دادهٔ خالی، خطا، تلاش دوباره و اعلان‌ها</td></tr>
<tr><td>طراحی واکنش‌گرا</td><td>✅ پیاده‌سازی‌شده</td><td>رابط تیره برای عرض ۳۷۵ پیکسل و بیشتر</td></tr>
<tr><td>صفحهٔ تراکنش‌ها</td><td>⏳ برنامه‌ریزی‌شده</td><td>فهرست، جست‌وجو، فیلتر و صفحه‌بندی</td></tr>
<tr><td>فرم تراکنش</td><td>⏳ برنامه‌ریزی‌شده</td><td>ایجاد و ویرایش</td></tr>
<tr><td>تأیید حذف</td><td>⏳ برنامه‌ریزی‌شده</td><td>پنجرهٔ حذف تراکنش</td></tr>
<tr><td>مدیریت دسته‌بندی‌ها</td><td>⏳ برنامه‌ریزی‌شده</td><td>رابط مدیریت دسته‌ها</td></tr>
</table>

---

<a id="fa-contributing"></a>

<h2 dir="rtl">🤝 مشارکت</h2>

<p dir="rtl">
پیش از ارسال تغییرات، <a href="../docs/CONTRIBUTING.md">راهنمای مشارکت</a> را بخوانید. تغییرات را متمرکز نگه دارید، از ساختار فعلی کامپوننت‌ها و API پیروی کنید و حالت‌های بارگذاری، خطا و دادهٔ خالی را بررسی کنید.
</p>

<p dir="rtl">پیش از ارسال تغییرات اجرا کنید:</p>

```bash
npm run lint
npm run build
```

<p dir="rtl">
صفحات مرتبط را در اندازه‌های موبایل و دسکتاپ بررسی کنید. متغیرهای محیطی جدید و تغییرات قابل مشاهده برای کاربر را مستند کنید.
</p>

---

<a id="fa-license"></a>

<h2 dir="rtl">📄 مجوز</h2>

<p dir="rtl">
این پروژه تحت <strong>مجوز MIT</strong> منتشر می‌شود. جزئیات در فایل <a href="../LICENSE">LICENSE</a> آمده است.
</p>

---

<a id="fa-team"></a>

<h2 dir="rtl">👨‍💻 مدیریت فنی پروژه</h2>

<div align="center">

<a href="https://github.com/here-is-leo">
  <img src="https://github.com/here-is-leo.png?size=160" width="120" height="120" alt="ایلیا فاراهانی — لئو" />
</a>

<h3>ایلیا فاراهانی — لئو</h3>

<p><strong>برنامه‌نویس ارشد پروژه</strong></p>

<p>Ilia Farahani · Senior Developer</p>

<a href="https://github.com/here-is-leo">@here-is-leo</a>

</div>

---

<p align="center">
<strong>Expense Tracker</strong>
<br />
<sub>Your money. Your clarity. Your control.</sub>
<br /><br />
<a href="#top">↑ Back to top · بازگشت به بالا</a>
</p>
````
