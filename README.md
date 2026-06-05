```markdown
# RideFlow – Car Rental Web App

RideFlow is a modern car rental platform that combines luxury vehicle rentals with crypto payments, blockchain receipts, and fleet management. The app features:

- **Public catalog** with advanced filtering (vehicle type, premium, seats, bags, powertrain)
- **Crypto checkout** (USDC, BTC, ETH, SOL) and Web3 wallet connection
- **User dashboard** – manage bookings, account details, and crypto wallet
- **Admin panel** – fleet overview, vehicle management, blog publisher, crypto clearing, reservations
- **NextAuth.js authentication** with role‑based redirection (admin vs user)

---

## 🚀 Tech Stack

- **Framework**: Next.js 15 (App Router, Turbopack)
- **Language**: TypeScript
- **Styling**: Tailwind CSS (with custom design tokens)
- **Authentication**: NextAuth.js (credentials provider)
- **Icons**: Lucide React
- **State Management**: React hooks (`useState`, `useEffect`, custom hooks)
- **Data Layer**: Mock services (ready to be replaced with real API calls)

---

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/rideflow.git
   cd rideflow
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Set up environment variables**  
   Create a `.env.local` file in the root directory:

   ```env
   NEXTAUTH_URL=http://localhost:3000
   NEXTAUTH_SECRET=your-secret-key-here
   ```

   > You can generate a secret with `openssl rand -base64 32`

4. **Run the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) to see the app.

---

## 🔐 Test Credentials

Use the following accounts to explore different roles:

| Role      | Email                      | Password  | Redirect after login |
|-----------|----------------------------|-----------|----------------------|
| **Admin** | `admin@carrental.com`      | `admin123`| `/admin`             |
| **User**  | `user@carrental.com`       | `user123` | `/dashboard`         |

> These credentials are hardcoded in the mock authentication layer (inside `auth.ts` or `[...nextauth]/route.ts`). Replace with a real database in production.

---

## 🧭 Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── admin/              # Admin routes (fleet, blog, crypto, reservations, settings)
│   ├── dashboard/          # User dashboard routes (bookings, account, crypto, help)
│   ├── blog/               # Public blog listing and detail pages
│   ├── fleetcatalog/       # Vehicle catalog & checkout
│   ├── login/              # Login page
│   ├── signup/             # Signup page
│   └── faq/                # FAQ page
├── components/             # Shared UI components (navbar, footer, buttons, etc.)
├── features/               # Feature modules (admin, dashboard, fleet-catalog, home, blog)
│   ├── admin/              # Admin components, hooks, services, types
│   ├── dashboard/          # User dashboard logic
│   ├── fleet-catalog/      # Catalog filtering, checkout, pricing
│   └── home/               # Homepage sections (Hero, HowItWorks, Testimonials, etc.)
├── lib/                    # Utilities, Wagmi config, auth helpers
├── middleware.ts           # Route protection & role‑based redirection
└── types/                  # Global type definitions
```

---

## 🛠️ Key Features

### For end users
- Browse vehicles with real‑time filters (category, premium, seats, bags, transmission)
- Book a vehicle with “Best price” or “Flexible” rate
- Pay with crypto (USDC, BTC, ETH, SOL) or copy invoice address
- View bookings, edit account details, connect Web3 wallet

### For administrators
- **Fleet Overview** – financial metrics, fleet disposition, live operation table
- **Fleet Management** – add/edit/delete vehicles (inline editing, dedicated routes)
- **Blog Publisher** – create/edit/delete blog posts
- **Crypto Clearing** – view pending on‑chain transactions
- **Reservations** – monitor all bookings
- **System Settings** – placeholder for sensitive configuration

---

## 📝 Development Notes

- **Data fetching** – currently uses mock services (`adminService`, `dashboardService`, etc.). Replace the async functions inside `services/` with real `fetch` calls to your backend.
- **Authentication** – the credentials provider uses hardcoded user objects. Update `auth.ts` to query your database.
- **Styling** – global CSS variables (`brand-primary`, `admin-border`, etc.) are defined in `globals.css`. Use Tailwind utility classes like `text-brand-ink`, `border-admin-border`, `bg-admin-surface` to stay consistent.

---

## 🚢 Deployment

1. Build the project:
   ```bash
   npm run build
   ```

2. Start the production server:
   ```bash
   npm start
   ```

3. Deploy to **Vercel**, **Netlify**, or any Node.js hosting platform.

> Ensure environment variables (`NEXTAUTH_URL`, `NEXTAUTH_SECRET`) are set in your hosting provider.

---

## 📄 License

This project is proprietary. All rights reserved.

---


