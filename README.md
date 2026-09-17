





A modern collaborative personal finance platform for tracking, organizing, and understanding expenses.

💰 Expense Tracker 

Track it. Understand it. Control it.

Expense Tracker is a complete full-stack personal finance and expense management platform built with ASP.NET Core .NET 8 and React.

The system provides a structured environment for managing expenses, organizing transactions, authenticating users, analyzing financial data, and supporting collaborative financial workflows.

The project combines a scalable backend architecture with a modern responsive frontend to create a complete finance-management experience.

⚡ What Makes It Different? ┌───────────────────────┐ │ YOUR FINANCES │ └───────────┬───────────┘ │ ▼ ┌───────────────────────┐ │ EXPENSE TRACKER │ └───────────┬───────────┘ │ ┌───────────────────────┼───────────────────────┐ │ │ │ ▼ ▼ ▼ 💸 TRACK 📊 ANALYZE 👥 COLLABORATE │ │ │ └───────────────────────┼───────────────────────┘ │ ▼ 🎯 BETTER DECISIONS 

The application was designed around three fundamental goals:

Track financial activity accurately Analyze spending patterns clearly Collaborate with other users when needed ✨ Features 

🔐 Security 💸 Expenses 📊 Analytics 👥 Collaboration JWT Authentication Expense CRUD Spending Analysis Multi-user Protected APIs Categories Statistics Shared Data Authorization Transactions Dashboards Permissions Validation History Trends Collaboration 

🔐 Authentication & Security JWT-based authentication Protected API endpoints Authorization Secure authentication flow Password protection Request validation FluentValidation integration Separation of authentication and business logic 💸 Expense Management Create expenses Update expenses Delete expenses View expense history Categorize expenses Track transactions Structured financial records Organized data management 📊 Financial Analytics Spending summaries Category-based analysis Monthly statistics Spending trends Financial dashboards Data visualization Expense breakdowns 👥 Collaboration Multi-user architecture Shared financial workflows Shared expenses Permission management Collaborative financial tracking 🧠 Architecture 

┌─────────────────────────────────────────────────────────┐ │ REACT FRONTEND │ │ │ │ Components • Pages • Hooks • Services │ │ React Router │ │ Tailwind CSS │ └───────────────────────────┬─────────────────────────────┘ │ │ HTTP / REST API ▼ ┌─────────────────────────────────────────────────────────┐ │ ASP.NET CORE API │ │ .NET 8 │ │ │ │ Controllers → Services → Business Logic → Validation │ │ │ │ │ ├── JWT │ │ ├── Authorization │ │ └── FluentValidation │ └───────────────────────────┬─────────────────────────────┘ │ │ Entity Framework Core ▼ ┌─────────────────────────────────────────────────────────┐ │ SQL SERVER │ │ │ │ Users • Expenses • Categories • Transactions │ └─────────────────────────────────────────────────────────┘ 

🛠️ Technology Stack 🔷 Backend ASP.NET Core │ ├── .NET 8 ├── Entity Framework Core ├── SQL Server ├── JWT Authentication └── FluentValidation Technology Purpose ⚡ ASP.NET Core REST API 🔷 .NET 8 Backend framework 🗄️ Entity Framework Core ORM / Data access 🛢️ SQL Server Database 🔑 JWT Authentication ✅ FluentValidation Input validation ⚛️ Frontend React │ ├── Components ├── Pages ├── Hooks ├── Services └── React Router │ ▼ Tailwind CSS Technology Purpose ⚛️ React Frontend framework 🎨 Tailwind CSS UI styling 🧭 React Router Routing 📂 Project Structure expense-tracker/ │ ├── backend/ │ │ │ ├── Controllers/ │ ├── Models/ │ ├── DTOs/ │ ├── Services/ │ ├── Validators/ │ ├── Data/ │ └── ... │ ├── frontend/ │ │ │ ├── src/ │ │ ├── components/ │ │ ├── pages/ │ │ ├── services/ │ │ ├── hooks/ │ │ └── ... │ │ │ └── ... │ ├── docs/ │ ├── API.md │ └── CONTRIBUTING.md │ └── README.md 🔌 API Flow FRONTEND │ ▼ ┌─────────────┐ │ React Router│ └──────┬──────┘ │ ▼ ┌─────────────┐ │ API Service │ └──────┬──────┘ │ │ HTTP ▼ ┌─────────────┐ │ Controllers │ └──────┬──────┘ │ ▼ ┌─────────────┐ │ Services │ └──────┬──────┘ │ ▼ ┌─────────────┐ │ EF Core │ └──────┬──────┘ │ ▼ ┌─────────────┐ │ SQL Server │ └─────────────┘ 📈 Project Completion 



Architecture █████████████████████████ 100% Backend █████████████████████████ 100% Frontend █████████████████████████ 100% Authentication █████████████████████████ 100% Analytics █████████████████████████ 100% Collaboration █████████████████████████ 100% ✅ PROJECT COMPLETED 

All core components have been implemented and integrated.

🏆 Completion Checklist [x] Project Architecture [x] Backend API [x] Frontend Application [x] Database Integration [x] Authentication [x] Authorization [x] Expense Management [x] Categories [x] Transaction Management [x] Analytics [x] Dashboard [x] Collaboration [x] API Documentation [x] Validation [x] Security Structure [x] Frontend / Backend Integration 🗺️ Development Journey ┌──────────────┐ │ FOUNDATION │ └──────┬───────┘ │ ▼ ┌──────────────────┐ │ BACKEND + API │ └────────┬─────────┘ │ ▼ ┌────────────────────┐ │ AUTHENTICATION │ └──────────┬─────────┘ │ ▼ ┌──────────────────────┐ │ EXPENSE MANAGEMENT │ └───────────┬──────────┘ │ ▼ ┌────────────────┐ │ ANALYTICS │ └───────┬────────┘ │ ▼ ┌────────────────────┐ │ COLLABORATION │ └──────────┬─────────┘ │ ▼ ┌────────────────┐ │ COMPLETED ✓ │ └────────────────┘ 👨‍💻 Development Team 



🔥 Backend Developer @here-is-leo 

Backend Engineering

.NET 8
ASP.NET Core
Entity Framework Core
SQL Server
JWT
FluentValidation



⚛️ Frontend Developer @taraneh-ghalandarii 

Frontend Engineering

React
Tailwind CSS
React Router
UI Architecture
Frontend Development


🤝 TWO DEVELOPERS · ONE PRODUCT 

📚 Documentation 📘 API Contract 

Detailed API endpoints, request structures, responses, and contracts:

docs/API.md

🤝 Contributing Guide 

Development workflow, contribution rules, and project conventions:

docs/CONTRIBUTING.md

🔒 Security 

Security was considered as part of the application's architecture.

Authentication │ ▼ JWT Tokens │ ▼ Protected Endpoints │ ▼ Request Validation │ ▼ Business Logic │ ▼ EF Core │ ▼ SQL Server 

The architecture separates authentication, authorization, validation, business logic, and persistence responsibilities.

💎 Engineering Principles CLEAN CODE │ ▼ SEPARATION OF CONCERNS │ ▼ SECURE BY DESIGN │ ▼ VALIDATED INPUT │ ▼ MAINTAINABLE SYSTEM │ ▼ SCALABLE PRODUCT 

The objective was not simply to make the application work.

The objective was to create a codebase that can be understood, maintained, extended, and evolved.

🌟 Project Vision 

Expense Tracker was built to go beyond a basic CRUD application.

RECORD ↓ ORGANIZE ↓ ANALYZE ↓ UNDERSTAND ↓ IMPROVE 

Better financial decisions start with better financial visibility.



💜 Built with .NET 8 × React 

Expense Tracker

🇮🇷 نسخه فارسی 

💰 Expense Tracker 

هزینه‌ها را ثبت کن. بفهم. کنترل کن.

Expense Tracker یک پلتفرم کامل Full-Stack برای مدیریت هزینه‌ها و امور مالی شخصی است که با ASP.NET Core .NET 8 و React ساخته شده است.

این سیستم محیطی ساختاریافته برای مدیریت هزینه‌ها، سازمان‌دهی تراکنش‌ها، احراز هویت کاربران، تحلیل اطلاعات مالی و همکاری بین کاربران فراهم می‌کند.

⚡ ویژگی اصلی پروژه امور مالی شما │ ▼ Expense Tracker │ ┌───────────────┼───────────────┐ ▼ ▼ ▼ 💸 مدیریت 📊 تحلیل 👥 همکاری هزینه‌ها اطلاعات کاربران │ │ │ └───────────────┼───────────────┘ ▼ تصمیم‌گیری بهتر ✨ قابلیت‌ها 🔐 امنیت 💸 هزینه‌ها 📊 تحلیل 👥 همکاری JWT CRUD تحلیل مخارج چندکاربره API محافظت‌شده دسته‌بندی آمار داده مشترک Authorization تراکنش‌ها داشبورد Permission Validation تاریخچه روندها همکاری 🔐 احراز هویت و امنیت احراز هویت مبتنی بر JWT Endpointهای محافظت‌شده Authorization مدیریت امن احراز هویت محافظت از رمز عبور اعتبارسنجی درخواست‌ها استفاده از FluentValidation جداسازی منطق احراز هویت از Business Logic 💸 مدیریت هزینه‌ها ایجاد هزینه ویرایش هزینه حذف هزینه مشاهده تاریخچه دسته‌بندی هزینه‌ها مدیریت تراکنش‌ها ذخیره اطلاعات مالی ساختاریافته 📊 تحلیل مالی خلاصه مخارج تحلیل دسته‌بندی‌ها آمار ماهانه بررسی روند هزینه‌ها داشبورد مالی نمایش بصری داده‌ها تفکیک هزینه‌ها 👥 همکاری معماری چندکاربره مدیریت اطلاعات مشترک هزینه‌های مشترک مدیریت Permission مدیریت مالی مشارکتی 🧠 معماری سیستم ┌───────────────────────────────────────┐ │ React Frontend │ │ │ │ Components • Pages • Hooks • Services │ │ React Router │ │ Tailwind CSS │ └──────────────────┬────────────────────┘ │ │ REST API ▼ ┌───────────────────────────────────────┐ │ ASP.NET Core API │ │ .NET 8 │ │ │ │ Controllers → Services → Logic │ │ │ │ JWT • Authorization • Validation │ └──────────────────┬────────────────────┘ │ │ EF Core ▼ ┌───────────────────────────────────────┐ │ SQL Server │ │ │ │ Users • Expenses • Categories │ │ Transactions │ └───────────────────────────────────────┘ 🛠️ تکنولوژی‌ها 🔷 Backend تکنولوژی کاربرد ⚡ ASP.NET Core REST API 🔷 .NET 8 Framework اصلی 🗄️ Entity Framework Core ORM و Data Access 🛢️ SQL Server پایگاه داده 🔑 JWT احراز هویت ✅ FluentValidation اعتبارسنجی ⚛️ Frontend تکنولوژی کاربرد ⚛️ React ساخت رابط کاربری 🎨 Tailwind CSS طراحی رابط 🧭 React Router مسیریابی 📂 ساختار پروژه expense-tracker/ │ ├── backend/ │ ├── Controllers/ │ ├── Models/ │ ├── DTOs/ │ ├── Services/ │ ├── Validators/ │ ├── Data/ │ └── ... │ ├── frontend/ │ ├── src/ │ │ ├── components/ │ │ ├── pages/ │ │ ├── services/ │ │ ├── hooks/ │ │ └── ... │ └── ... │ ├── docs/ │ ├── API.md │ └── CONTRIBUTING.md │ └── README.md 🔌 جریان ارتباط Frontend و Backend FRONTEND │ ▼ React Router │ ▼ API Services │ │ HTTP ▼ ASP.NET Core │ ▼ Services │ ▼ EF Core │ ▼ SQL Server 📈 وضعیت نهایی پروژه 



Architecture █████████████████████████ 100% Backend █████████████████████████ 100% Frontend █████████████████████████ 100% Authentication █████████████████████████ 100% Analytics █████████████████████████ 100% Collaboration █████████████████████████ 100% ✅ پروژه تکمیل شده است 

تمام بخش‌های اصلی پروژه پیاده‌سازی و یکپارچه شده‌اند.

🏆 چک‌لیست تکمیل پروژه [x] معماری پروژه [x] Backend API [x] Frontend [x] اتصال Database [x] Authentication [x] Authorization [x] مدیریت هزینه‌ها [x] دسته‌بندی‌ها [x] مدیریت تراکنش‌ها [x] Analytics [x] Dashboard [x] Collaboration [x] API Documentation [x] Validation [x] Security Structure [x] اتصال کامل Frontend و Backend 🗺️ مسیر توسعه FOUNDATION │ ▼ BACKEND + API │ ▼ AUTHENTICATION │ ▼ EXPENSE MANAGEMENT │ ▼ ANALYTICS │ ▼ COLLABORATION │ ▼ ✅ COMPLETED 👨‍💻 تیم توسعه 



🔥 توسعه‌دهنده Backend @here-is-leo 

Backend Engineering

.NET 8
ASP.NET Core
Entity Framework Core
SQL Server
JWT
FluentValidation



⚛️ توسعه‌دهنده Frontend @taraneh-ghalandarii 

Frontend Engineering

React
Tailwind CSS
React Router
UI Architecture
Frontend Development


🤝 دو توسعه‌دهنده · یک محصول 

📚 مستندات 📘 API Contract 

مستندات Endpointها، ساختار Request و Response و قرارداد API:

docs/API.md

🤝 Contributing Guide 

راهنمای توسعه، قوانین مشارکت و استانداردهای پروژه:

docs/CONTRIBUTING.md

🔒 معماری امنیت 

امنیت بخشی از معماری پروژه در نظر گرفته شده است.

Authentication ↓ JWT Tokens ↓ Protected Endpoints ↓ Request Validation ↓ Business Logic ↓ EF Core ↓ SQL Server 💎 اصول مهندسی CLEAN CODE ↓ SEPARATION OF CONCERNS ↓ SECURE BY DESIGN ↓ VALIDATED INPUT ↓ MAINTAINABLE SYSTEM ↓ SCALABLE PRODUCT 

هدف فقط ساختن برنامه‌ای که «کار کند» نبوده است.

هدف ایجاد یک Codebase قابل فهم، قابل نگهداری، قابل توسعه و قابل گسترش بوده است.

🌟 چشم‌انداز پروژه 

Expense Tracker قرار نیست صرفاً یک CRUD ساده باشد.

ثبت اطلاعات ↓ سازمان‌دهی ↓ تحلیل ↓ درک ↓ بهبود 

دید بهتر نسبت به وضعیت مالی، از داده‌های بهتر شروع می‌شود.



💜 ساخته‌شده با .NET 8 × React 

Expense Tracker

