💰 Expense Tracker

<div align="center">

<img src="https://readme-typing-svg.demolab.com?font=Fira+Code&weight=700&size=28&duration=3000&pause=800&color=6C63FF&center=true&vCenter=true&width=800&lines=Track+it.+Understand+it.+Control+it.;A+Modern+Collaborative+Finance+Platform;Built+with+.NET+8+%C3%97+React;Where+Your+Money+Makes+Sense" alt="Typing SVG" />

<br/>

https://img.shields.io/badge/.NET-8.0-512BD4?style=for-the-badge&logo=dotnet&logoColor=white
https://img.shields.io/badge/React-18-61DAFB?style=for-the-badge&logo=react&logoColor=black
https://img.shields.io/badge/SQL_Server-CC2927?style=for-the-badge&logo=microsoftsqlserver&logoColor=white
https://img.shields.io/badge/JWT-000000?style=for-the-badge&logo=jsonwebtokens&logoColor=white
https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white

<br/>

<img src="https://capsule-render.vercel.app/api?type=waving&color=gradient&customColorList=12,20,24,30&height=120&section=header&text=Expense%20Tracker&fontSize=50&fontColor=ffffff&animation=fadeIn&fontAlignY=65" width="100%"/>

</div>

---

<div align="center">

⚡ What Makes It Different?

</div>

```
                    ┌───────────────────────┐
                    │    YOUR FINANCES      │
                    └───────────┬───────────┘
                                │
                                ▼
                    ┌───────────────────────┐
                    │   EXPENSE TRACKER     │
                    └───────────┬───────────┘
                                │
        ┌───────────────────────┼───────────────────────┐
        │                       │                       │
        ▼                       ▼                       ▼
    💸 TRACK               📊 ANALYZE              👥 COLLABORATE
        │                       │                       │
        └───────────────────────┼───────────────────────┘
                                │
                                ▼
                     🎯 BETTER DECISIONS
```

<div align="center">

🎯 Three Fundamental Goals

💸 Track 📊 Analyze 👥 Collaborate
Financial activity, accurately Spending patterns, clearly With others, seamlessly

</div>

---

<div align="center">

✨ Features

</div>

<table>
<tr>
<td width="25%" align="center">

🔐 Security

JWT Authentication

Protected APIs

Authorization

FluentValidation

Password Protection

</td>
<td width="25%" align="center">

💸 Expenses

Full CRUD

Categories

Transactions

History Tracking

Structured Records

</td>
<td width="25%" align="center">

📊 Analytics

Spending Analysis

Statistics

Dashboards

Trends & Breakdowns

Data Visualization

</td>
<td width="25%" align="center">

👥 Collaboration

Multi-user

Shared Data

Permissions

Shared Expenses

Team Workflows

</td>
</tr>
</table>

---

<div align="center">

🧠 System Architecture

</div>

```
┌─────────────────────────────────────────────────────────────┐
│                    ⚛️  REACT FRONTEND                       │
│  ┌──────────────────────────────────────────────────────┐   │
│  │  Components • Pages • Hooks • Services               │   │
│  │  React Router  •  Tailwind CSS                       │   │
│  └──────────────────────────────────────────────────────┘   │
└──────────────────────────┬──────────────────────────────────┘
                           │
                           │  🌐 HTTP / REST API
                           ▼
┌─────────────────────────────────────────────────────────────┐
│                  🔷  ASP.NET CORE API (.NET 8)              │
│  ┌──────────────────────────────────────────────────────┐   │
│  │  Controllers → Services → Business Logic → Validation│   │
│  │                                                      │   │
│  │     🔑 JWT    •    🛡️ Authorization    •    ✅ Fluent│   │
│  └──────────────────────────────────────────────────────┘   │
└──────────────────────────┬──────────────────────────────────┘
                           │
                           │  🗄️ Entity Framework Core
                           ▼
┌─────────────────────────────────────────────────────────────┐
│                    🛢️  SQL SERVER                           │
│       Users • Expenses • Categories • Transactions          │
└─────────────────────────────────────────────────────────────┘
```

---

<div align="center">

🛠️ Technology Stack

<table>
<tr>
<td valign="top" width="50%">

🔷 Backend

https://img.shields.io/badge/ASP.NET_Core-512BD4?style=flat-square&logo=dotnet&logoColor=white
https://img.shields.io/badge/.NET_8-512BD4?style=flat-square&logo=dotnet&logoColor=white
https://img.shields.io/badge/EF_Core-512BD4?style=flat-square&logo=dotnet&logoColor=white
https://img.shields.io/badge/SQL_Server-CC2927?style=flat-square&logo=microsoftsqlserver&logoColor=white
https://img.shields.io/badge/JWT-000000?style=flat-square&logo=jsonwebtokens&logoColor=white

Tech Purpose
⚡ ASP.NET Core REST API
🔷 .NET 8 Backend framework
🗄️ EF Core ORM / Data Access
🛢️ SQL Server Database
🔑 JWT Authentication
✅ FluentValidation Input validation

</td>
<td valign="top" width="50%">

⚛️ Frontend

https://img.shields.io/badge/React-61DAFB?style=flat-square&logo=react&logoColor=black
https://img.shields.io/badge/Tailwind-38B2AC?style=flat-square&logo=tailwind-css&logoColor=white
https://img.shields.io/badge/React_Router-CA4245?style=flat-square&logo=reactrouter&logoColor=white

Tech Purpose
⚛️ React Frontend framework
🎨 Tailwind CSS UI styling
🧭 React Router Routing
🪝 Hooks State & logic
📡 Services API integration

</td>
</tr>
</table>

</div>

---

<div align="center">

📂 Project Structure

</div>

```
📦 expense-tracker/
│
├── 🔷 backend/
│   ├── 🎮 Controllers/
│   ├── 📋 Models/
│   ├── 📦 DTOs/
│   ├── ⚙️ Services/
│   ├── ✅ Validators/
│   ├── 🗄️ Data/
│   └── ...
│
├── ⚛️ frontend/
│   └── 📁 src/
│       ├── 🧩 components/
│       ├── 📄 pages/
│       ├── 📡 services/
│       ├── 🪝 hooks/
│       └── ...
│
├── 📚 docs/
│   ├── 📘 API.md
│   └── 🤝 CONTRIBUTING.md
│
└── 📖 README.md
```

---

<div align="center">

🔌 API Request Flow

</div>

```
    ⚛️ FRONTEND
         │
         ▼
   ┌─────────────┐
   │React Router │
   └──────┬──────┘
          │
          ▼
   ┌─────────────┐
   │API Services │
   └──────┬──────┘
          │
          │ 🌐 HTTP
          ▼
   ┌─────────────┐
   │ Controllers │
   └──────┬──────┘
          │
          ▼
   ┌─────────────┐
   │  Services   │
   └──────┬──────┘
          │
          ▼
   ┌─────────────┐
   │   EF Core   │
   └──────┬──────┘
          │
          ▼
   ┌─────────────┐
   │ SQL Server  │
   └─────────────┘
```

---

<div align="center">

🗺️ Development Journey

</div>

```
  ┌──────────────┐
  │  FOUNDATION  │
  └──────┬───────┘
         ▼
  ┌──────────────┐
  │ BACKEND + API│
  └──────┬───────┘
         ▼
  ┌──────────────┐
  │AUTHENTICATION│
  └──────┬───────┘
         ▼
  ┌──────────────────┐
  │EXPENSE MANAGEMENT│
  └──────┬───────────┘
         ▼
  ┌──────────────┐
  │  ANALYTICS   │
  └──────┬───────┘
         ▼
  ┌──────────────┐
  │COLLABORATION │
  └──────┬───────┘
         ▼
  ┌──────────────┐
  │  COMPLETED ✓ │
  └──────────────┘
```

---

<div align="center">

📈 Project Completion

Module Status
🏗️ Architecture https://geps.dev/progress/100?dangerColor=00C853&warningColor=00C853&successColor=00C853
🔷 Backend https://geps.dev/progress/100?dangerColor=00C853&warningColor=00C853&successColor=00C853
⚛️ Frontend https://geps.dev/progress/100?dangerColor=00C853&warningColor=00C853&successColor=00C853
🔐 Authentication https://geps.dev/progress/100?dangerColor=00C853&warningColor=00C853&successColor=00C853
📊 Analytics https://geps.dev/progress/100?dangerColor=00C853&warningColor=00C853&successColor=00C853
👥 Collaboration https://geps.dev/progress/100?dangerColor=00C853&warningColor=00C853&successColor=00C853

✅ PROJECT COMPLETED

</div>

---

<div align="center">

🏆 Completion Checklist

</div>

<table align="center">
<tr>
<td>

☑ 🏗️ Project Architecture
☑ 🔷 Backend API
☑ ⚛️ Frontend Application
☑ 🗄️ Database Integration
☑ 🔐 Authentication
☑ 🛡️ Authorization
☑ 💸 Expense Management
☑ 📂 Categories

</td>
<td>

☑ 🔄 Transaction Management
☑ 📊 Analytics
☑ 📈 Dashboard
☑ 👥 Collaboration
☑ 📘 API Documentation
☑ ✅ Validation
☑ 🔒 Security Structure
☑ 🔗 Frontend / Backend Integration

</td>
</tr>
</table>

---

<div align="center">

👨‍💻 Development Team

🤝 Two Developers · One Product

<table>
<tr>

<td align="center" width="50%">

<img src="https://capsule-render.vercel.app/api?type=rect&color=gradient&customColorList=12,20,24&height=100&text=Backend%20%26%20Architect&fontSize=22&fontColor=ffffff&animation=fadeIn" width="90%"/>

<br/>

🔥 ایلیا فراهانی

Backend Developer & Architect

<a href="https://github.com/here-is-leo">
<img src="https://img.shields.io/badge/GitHub-here--is--leo-181717?style=for-the-badge&logo=github&logoColor=white"/>
</a>





https://img.shields.io/badge/.NET_8-512BD4?style=flat-square&logo=dotnet&logoColor=white
https://img.shields.io/badge/ASP.NET_Core-512BD4?style=flat-square&logo=dotnet&logoColor=white
https://img.shields.io/badge/EF_Core-512BD4?style=flat-square&logo=dotnet&logoColor=white
https://img.shields.io/badge/SQL_Server-CC2927?style=flat-square&logo=microsoftsqlserver&logoColor=white
https://img.shields.io/badge/JWT-000000?style=flat-square&logo=jsonwebtokens&logoColor=white
https://img.shields.io/badge/FluentValidation-00A98F?style=flat-square

<sub>Backend Engineering · System Architecture · API Design</sub>

</td>

<td align="center" width="50%">

<img src="https://capsule-render.vercel.app/api?type=rect&color=gradient&customColorList=24,20,12&height=100&text=Frontend%20%26%20Design&fontSize=22&fontColor=ffffff&animation=fadeIn" width="90%"/>

<br/>

⚛️ ترانه قلندری

Frontend Developer · UI/UX Designer

<a href="https://github.com/taraneh-ghalandarii">
<img src="https://img.shields.io/badge/GitHub-taraneh--ghalandarii-181717?style=for-the-badge&logo=github&logoColor=white"/>
</a>





https://img.shields.io/badge/React-61DAFB?style=flat-square&logo=react&logoColor=black
https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=flat-square&logo=tailwind-css&logoColor=white
https://img.shields.io/badge/React_Router-CA4245?style=flat-square&logo=reactrouter&logoColor=white
https://img.shields.io/badge/UI%2FUX-FF61F6?style=flat-square&logo=figma&logoColor=white

<sub>Frontend Engineering · UI Architecture · Design System</sub>

</td>

</tr>
</table>

</div>

---

<div align="center">

📚 Documentation

<table>
<tr>
<td align="center" width="50%">

📘 API Contract

Detailed API endpoints, request structures, responses, and contracts.

📂 docs/API.md

</td>
<td align="center" width="50%">

🤝 Contributing Guide

Development workflow, contribution rules, and project conventions.

📂 docs/CONTRIBUTING.md

</td>
</tr>
</table>

</div>

---

<div align="center">

🔒 Security Architecture

</div>

```
        🔐 Authentication
              │
              ▼
        🔑 JWT Tokens
              │
              ▼
        🛡️ Protected Endpoints
              │
              ▼
        ✅ Request Validation
              │
              ▼
        ⚙️ Business Logic
              │
              ▼
        🗄️ EF Core
              │
              ▼
        🛢️ SQL Server
```

<div align="center">

The architecture separates authentication, authorization, validation, business logic, and persistence responsibilities.

</div>

---

<div align="center">

💎 Engineering Principles

```
  ✨ CLEAN CODE
        │
        ▼
  🧩 SEPARATION OF CONCERNS
        │
        ▼
  🔒 SECURE BY DESIGN
        │
        ▼
  ✅ VALIDATED INPUT
        │
        ▼
  🛠️ MAINTAINABLE SYSTEM
        │
        ▼
  🚀 SCALABLE PRODUCT
```

The objective was not simply to make the application work.
The objective was to create a codebase that can be understood, maintained, extended, and evolved.

</div>

---

<div align="center">

🌟 Project Vision

</div>

```
  📝 RECORD
      ↓
  🗂️ ORGANIZE
      ↓
  📊 ANALYZE
      ↓
  💡 UNDERSTAND
      ↓
  📈 IMPROVE
```

<div align="center">

Better financial decisions start with better financial visibility.

</div>

---

<div align="center">

💜 Built with .NET 8 × React

<img src="https://capsule-render.vercel.app/api?type=waving&color=gradient&customColorList=12,20,24,30&height=150&section=footer&text=Expense%20Tracker&fontSize=42&fontColor=ffffff&animation=fadeIn&fontAlignY=75" width="100%"/>

Track it. Understand it. Control it.

</div>

---

<div align="center" dir="rtl">

💰 Expense Tracker

هزینه‌ها را ثبت کن. بفهم. کنترل کن.

<img src="https://readme-typing-svg.demolab.com?font=Vazirmatn&weight=700&size=22&duration=3000&pause=800&color=6C63FF&center=true&vCenter=true&width=700&lines=%D9%87%D8%B2%DB%8C%D9%86%D9%87%E2%80%8C%D9%87%D8%A7+%D8%B1%D8%A7+%D8%AB%D8%A8%D8%AA+%DA%A9%D9%86.;%D8%A8%D9%81%D9%87%D9%85.;%D8%AA%D8%AD%D9%84%DB%8C%D9%84+%DA%A9%D9%86.;%DA%A9%D9%86%D8%AA%D8%B1%D9%84+%DA%A9%D9%86." alt="Typing SVG"/>

</div>

<div dir="rtl">

Expense Tracker یک پلتفرم کامل Full-Stack برای مدیریت هزینه‌ها و امور مالی شخصی است که با ASP.NET Core .NET 8 و React ساخته شده است.

این سیستم محیطی ساختاریافته برای مدیریت هزینه‌ها، سازمان‌دهی تراکنش‌ها، احراز هویت کاربران، تحلیل اطلاعات مالی و همکاری بین کاربران فراهم می‌کند.

⚡ ویژگی اصلی پروژه

```
              💰 امور مالی شما
                     │
                     ▼
             💎 Expense Tracker
                     │
        ┌────────────┼────────────┐
        ▼            ▼            ▼
   💸 مدیریت     📊 تحلیل     👥 همکاری
     هزینه‌ها       اطلاعات      کاربران
        │            │            │
        └────────────┼────────────┘
                     ▼
              🎯 تصمیم‌گیری بهتر
```

✨ قابلیت‌ها

🔐 امنیت 💸 هزینه‌ها 📊 تحلیل 👥 همکاری
JWT CRUD کامل تحلیل مخارج چندکاربره
API محافظت‌شده دسته‌بندی آمار داده مشترک
Authorization تراکنش‌ها داشبورد Permission
Validation تاریخچه روندها همکاری

🔐 احراز هویت و امنیت

· احراز هویت مبتنی بر JWT
· Endpointهای محافظت‌شده
· مدیریت امن احراز هویت
· اعتبارسنجی با FluentValidation
· جداسازی منطق احراز هویت از Business Logic

🧠 معماری سیستم

```
┌─────────────────────────────────────────┐
│       ⚛️  React Frontend                │
│  Components • Pages • Hooks • Services  │
└────────────────┬────────────────────────┘
                 │ 🌐 REST API
                 ▼
┌─────────────────────────────────────────┐
│       🔷  ASP.NET Core API (.NET 8)     │
│  Controllers → Services → Logic         │
└────────────────┬────────────────────────┘
                 │ 🗄️ EF Core
                 ▼
┌─────────────────────────────────────────┐
│          🛢️  SQL Server                 │
│  Users • Expenses • Categories          │
└─────────────────────────────────────────┘
```

👨‍💻 تیم توسعه

<div align="center">

<table>
<tr>
<td align="center" width="50%">

🔥 ایلیا فراهانی

توسعه‌دهنده Backend و معمار

<a href="https://github.com/here-is-leo">
<img src="https://img.shields.io/badge/GitHub-here--is--leo-181717?style=for-the-badge&logo=github&logoColor=white"/>
</a>

</td>
<td align="center" width="50%">

⚛️ ترانه قلندری

توسعه‌دهنده Frontend و طراح UI/UX

<a href="https://github.com/taraneh-ghalandarii">
<img src="https://img.shields.io/badge/GitHub-taraneh--ghalandarii-181717?style=for-the-badge&logo=github&logoColor=white"/>
</a>

</td>
</tr>
</table>

🤝 دو توسعه‌دهنده · یک محصول

</div>

🌟 چشم‌انداز پروژه

```
  📝 ثبت  →  🗂️ سازمان‌دهی  →  📊 تحلیل  →  💡 درک  →  📈 بهبود
```

دید بهتر نسبت به وضعیت مالی، از داده‌های بهتر شروع می‌شود.

<div align="center">

💜 ساخته‌شده با .NET 8 × React

</div>

</div>

---

<div align="center">

<img src="https://capsule-render.vercel.app/api?type=waving&color=gradient&customColorList=12,20,24,30&height=100&section=footer" width="100%"/>

⭐ اگر این پروژه را دوست داشتید، به آن ستاره بدهید! ⭐

</div>