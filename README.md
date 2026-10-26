# TravelIsrael — React Frontend

**TravelIsrael** is a platform for browsing, planning and creating day trips in Israel.
Users can discover existing routes, get personalized recommendations, build their own trips
and manage their activity, and administrators get a full management panel.

> **This repository:** [TravelIsrael-react](https://github.com/saraIndursky/TravelIsrael-react)  
> **Backend (.NET 8):** [TravelIsrael-dotnet](https://github.com/saraIndursky/TravelIsrael-dotnet)

**Course project**, built by a team of two.

> **Deployment:** there is no production environment; the app runs locally only.

---

## Contents

- [Features](#features)
- [Architecture](#architecture)
- [Database](#database)
- [Tech stack](#tech-stack)
- [Prerequisites](#prerequisites)
- [Setup and running](#setup-and-running)
- [API connection](#api-connection)
- [Screenshots](#screenshots)
- [Project structure](#project-structure)
- [Scripts](#scripts)
- [Screens and routes](#screens-and-routes)

---

## Features

### For users
- **Home page** — top trips and quick access to trip planning
- **Trip catalog** — search and filter by region, type, difficulty and more
- **Trip details** — gallery, description, route stops, reviews and ratings
- **Trip planning wizard** — recommendations based on:
  - region
  - difficulty
  - accessibility
  - trip type
  - preferences (rainy day, budget, available hours)
- **Custom trip builder** — create and edit a route with stops and suggestions, then submit it for approval
- **Personal area** — profile, statistics and saved trips
- **Sign-up and login** — JWT with automatic token refresh

### For administrators
- **Dashboard** — overall statistics
- **Trip management** — view, filter and edit
- **Pending trips** — approve or reject trips created by users
- **Place management** — add, edit and delete
- **User management** — view, block and delete

---

## Architecture

A full-stack application with separate client and server:

```
┌─────────────────────┐       HTTPS / REST API       ┌─────────────────────┐
│   React Frontend    │  ◄────────────────────────►  │  .NET 8 Backend     │
│   (this repository) │       localhost:7081/api     │  TravelIsrael-dotnet│
└─────────────────────┘                              └──────────┬──────────┘
                                                                │
                                                                ▼
                                                     ┌─────────────────────┐
                                                     │     SQL Server      │
                                                     │   ProjectTripsDB    │
                                                     └─────────────────────┘
```

| Layer | Technology | Repository |
|------|-----------|------------|
| Frontend | React 19, TypeScript, Vite | `TravelIsrael-react` |
| Backend | C# / ASP.NET Core **.NET 8** | `TravelIsrael-dotnet` |
| Database | Microsoft SQL Server — **`ProjectTripsDB`** | in the backend repository |

---

## Database

### Where is the data?

The **`ProjectTripsDB`** database is **not** part of the frontend repository.
It runs on **SQL Server** (default: `(localdb)\MSSQLLocalDB`) on the developer's machine.

| What | Where |
|----|------|
| **Data** (trips, places, users…) | Backup `Database/projectTripDB.bak` in [TravelIsrael-dotnet](https://github.com/saraIndursky/TravelIsrael-dotnet), restored with SSMS |
| **Schema** | EF Core migrations in `ProjectTripsDB/Migrations/` in [TravelIsrael-dotnet](https://github.com/saraIndursky/TravelIsrael-dotnet) |
| **Initial admin user** | Created by a migration seed |

### Running with data

**Step 1 — restore the database with sample data (recommended):**

1. Clone [TravelIsrael-dotnet](https://github.com/saraIndursky/TravelIsrael-dotnet)
2. In SSMS: **Restore Database** from `Database/projectTripDB.bak`, named `ProjectTripsDB`
3. Details: [Database/README.md](https://github.com/saraIndursky/TravelIsrael-dotnet/blob/main/Database/README.md)

**Step 1 (alternative) — tables and admin user only, without sample data:**

```bash
dotnet ef database update --project ProjectTripsDB --startup-project ProjectTrips
```

| Field | Value |
|-----|-----|
| Email | `Admin@gmail.com` |
| Password | `Admin#613` |

> **Note:** the connection string is set in the backend in `ProjectTripsDB/Models/ProjectTripsDataBase.cs`.  
> If your SQL Server runs elsewhere, update it before restoring or running migrations.

---

## Tech stack

| Category | Libraries |
|---------|--------|
| Framework | React 19, TypeScript |
| Build | Vite 7 |
| Routing | React Router DOM 7 |
| State | Redux Toolkit |
| HTTP | Axios (interceptors + JWT refresh) |
| Styling | Tailwind CSS 3 |
| Icons | Lucide React, React Icons, React Feather |
| Lint | ESLint 9 |

---

## Prerequisites

- [Node.js](https://nodejs.org/) 18 or newer
- npm
- **[.NET 8 SDK](https://dotnet.microsoft.com/download/dotnet/8.0)** for the backend
- **SQL Server** / **LocalDB** for `ProjectTripsDB` (see [Database](#database))

---

## Setup and running

### 1. Clone

```bash
git clone https://github.com/saraIndursky/TravelIsrael-react.git
cd TravelIsrael-react
```

### 2. Install dependencies

```bash
npm install
```

### 3. Run the backend and database

1. Clone [TravelIsrael-dotnet](https://github.com/saraIndursky/TravelIsrael-dotnet)
2. Restore `Database/projectTripDB.bak` (see [Database](#database))
3. Run the API server:

```bash
dotnet run --project ProjectTrips
```

### 4. Run the frontend (development)

```bash
npm run dev
```

The app opens at `http://localhost:5173`.

### 5. Production build (local)

```bash
npm run build
npm run preview
```

---

## API connection

The API address is set in `src/services/axios.ts`:

```typescript
const baseURL = 'https://localhost:7081/api';
```

> **Note:** the default is HTTPS on port `7081`.  
> If your .NET server runs on a different address, update `baseURL`.

### Main endpoints (backend)

| Controller | Description |
|------------|--------|
| `Auth` | Sign-up, login, refresh token, profile |
| `User` | Profile update, password change |
| `DayTrip` | Trips, filtering, recommendations, creation |
| `Lookups` | Reference data (regions, difficulty, accessibility) |
| `Suggestions` | Stop suggestions for the trip builder |
| `Place` / `Route` | Place and route management |
| `Admin` | Statistics and system management |
| `Type` | Trip types |

---

## Screenshots

### Home and browsing

**Home page** (`/home`)

![Home page](docs/screenshots/01-home.png)

**Trip catalog with filters** (`/trips`)

![Trip catalog](docs/screenshots/02-trips-catalog.png)

---

### Trip details

**Trip card** (`/trips/:id`)

![Trip details - card](docs/screenshots/03-trip-details-hero.png)

![Trip details - info](docs/screenshots/19-trip-details-cards.png)

**Route stops**

![Route stops](docs/screenshots/04-trip-stops.png)

![Route stop](docs/screenshots/05-trip-stop-knesset.png)

**Gallery, map and reviews**

![Photo gallery](docs/screenshots/07-trip-gallery.png)

![Trip map](docs/screenshots/06-trip-map.png)

![Reviews](docs/screenshots/08-trip-reviews.png)

![Review list](docs/screenshots/09-trip-reviews-list.png)

---

### Trip planning wizard

**Region** (`/tripPlan`)

![Wizard - region](docs/screenshots/10-wizard-region.png)

**Difficulty**

![Wizard - difficulty](docs/screenshots/11-wizard-difficulty.png)

**Preferences**

![Wizard - preferences](docs/screenshots/12-wizard-preferences.png)

**Summary and results**

![Wizard - summary](docs/screenshots/13-wizard-summary.png)

![Recommendations](docs/screenshots/20-planning-results.png)

---

### Custom trip builder

**Trip details form** (`/BuildTrip`)

![Trip builder - form](docs/screenshots/14-build-trip-form.png)

**Route stops**

![Trip builder - stops](docs/screenshots/15-build-trip-stations.png)

---

### Personal area

**Profile and statistics** (`/me`)

![Personal area](docs/screenshots/16-personal-area.png)

---

### Admin panel

**Dashboard** (`/admin/dashboard`)

![Admin dashboard](docs/screenshots/17-admin-dashboard.png)

**Place management** (`/admin/places`)

![Admin - places](docs/screenshots/18-admin-places.png)

**Trips pending approval** (`/admin/trips/pending`)

![Admin - pending trips](docs/screenshots/21-admin-pending-trips.png)

---

## Project structure

```
├── docs/
│   └── screenshots/    # Screenshots for the documentation
├── public/
└── src/
    ├── auth/           # Auth context, guards, JWT utilities
    ├── component/      # Shared components
    ├── hooks/          # Custom React hooks
    ├── layouts/        # Layout, NavBar, Footer, AdminLayout
    ├── pages/          # App pages
    ├── redux/          # Store, slices, thunks
    ├── routes/         # Router and paths
    ├── sections/       # Feature sections (wizard, trip, filters)
    ├── services/       # API calls (Axios)
    ├── types/          # TypeScript interfaces
    └── utils/          # Helper functions
```

---

## Scripts

| Command | Description |
|-------|--------|
| `npm run dev` | Development server with HMR |
| `npm run build` | Production build |
| `npm run preview` | Preview the build |
| `npm run lint` | Run ESLint |

---

## Screens and routes

| Route | Screen | Access |
|------|-----|--------|
| `/home` | Home page | Everyone |
| `/trips` | Trip catalog | Everyone |
| `/trips/:id` | Trip details | Everyone |
| `/tripPlan` | Trip planning wizard | Everyone |
| `/planningResultPage` | Recommendations | Everyone |
| `/BuildTrip` | New trip | Everyone |
| `/BuildTrip/:tripId` | Edit trip | Everyone |
| `/me` | Personal area | Signed-in users |
| `/login` | Login | Everyone |
| `/register` | Sign-up | Everyone |
| `/about` | About | Everyone |
| `/contact` | Contact | Everyone |
| `/admin/dashboard` | Dashboard | Admin |
| `/admin/trips` | Trip management | Admin |
| `/admin/trips/pending` | Pending trips | Admin |
| `/admin/places` | Place management | Admin |
| `/admin/users` | User management | Admin |

---

## Feedback

For questions, bugs or suggestions, open an **issue** on GitHub.
