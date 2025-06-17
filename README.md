# CargoCalc: Smart Shipping Cost Estimator

## 📦 Overview

CargoCalc is a modern, responsive web application built with *Next.js* that simplifies the process of estimating shipping costs. It provides users with an intuitive interface to input their shipping details — such as origin, destination, and cargo weight — and then calculates an estimated shipping cost based on various factors and options. The application also allows users to review their previous estimates, making it a valuable tool for individuals and businesses managing shipping logistics.

---

## ✨ Features

- *Distance Calculation:* Calculates the distance between two locations using a geocoding service (OpenRouteService).
- *Weight-Based Costing:* Integrates cargo weight into the cost calculation, providing realistic estimates.
- *Multiple Shipping Options:* Allows selection of different delivery types (e.g., standard, express).
- *Previous Estimates Tracking:* View a history of past shipping estimates via local storage.
- *Responsive UI:* Built with shadcn/ui and Tailwind CSS for a smooth experience across devices.
- *API Integration:* Uses a backend API route (/api/calcDistance) to fetch distance data.

---

## 🛠 Technologies Used

- *Next.js 15* – App Router based full-stack framework.
- *React 19* – For building user interfaces.
- *Tailwind CSS 4* – Utility-first CSS framework.
- *shadcn/ui* – Headless, accessible UI components built on Radix.
- *Lucide React* – Open-source icon pack.
- *Axios* – For HTTP requests.
- *Framer Motion* – Animations and transitions.
- *Radix UI* – Low-level UI primitives.

---

## ⚙ Getting Started

### ✅ Prerequisites

- Node.js (v18+)
- npm / yarn / pnpm / bun

### 📥 Installation

```bash
git clone https://github.com/subho174/cargocalc.git
cd cargocalc

Install dependencies:

npm install
# or
yarn install
# or
pnpm install
# or
bun install

🔐 Environment Variables

Create a .env.local file and add your OpenRouteService API key:

ORS_API_KEY=your_api_key_here


---

🚀 Running the Dev Server

npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev

Open http://localhost:3000 in your browser.


---

## Project Structure & My Approach

The project follows a standard Next.js application structure, emphasizing modularity and maintainability.

- src/app/: Contains the core Next.js application routes, including API endpoints (api/calcDistance) and specific pages like estimate and previous-estimates.

- src/components/: Houses custom React components (ShippingEstimator, LocationInput, Navbar, etc.) that are integral to the application's functionality.

- components/ui/: This directory is dedicated to the shadcn/ui components, providing a consistent and accessible UI foundation. I chose shadcn/ui for its unstyled, composable primitives which allowed for significant customization while maintaining high accessibility standards.

- lib/ and src/utils/: These directories contain utility functions for common tasks like cn (for tailwind-merge and clsx), calculateCost.js, and geoCode.js. This separation ensures a clean codebase where logic is decoupled from UI components.

- context/: Manages theme providers, such as ThemeProvider.tsx for only light mode functionality.

### My approach focused on:

- *Component-Driven Development*: Breaking down the UI into smaller, reusable components for better organization and reusability.

- *API-First Design*: Implementing a dedicated API route for distance calculation (/api/calcDistance) to encapsulate backend logic and promote clear separation of concerns. This allows for easy integration with different geocoding services and keeps the client-side code clean.

- **Modern UI/UX with shadcn/ui and Tailwind CSS**: Leveraging these tools to quickly build a visually appealing and responsive interface, prioritizing user experience. The components.json configuration highlights the use of shadcn/ui with custom aliases for streamlined imports.

- *Scalability and Maintainability*: Designing the application with future enhancements in mind, such as integrating more complex cost algorithms or additional shipping options. The clear directory structure and modular code contribute to this goal.

- *Performance Optimization*: Utilizing Next.js features like next/font for optimized font loading and turbopack for faster development builds, as indicated in package.json.

---

🔗 Live Site

👉 https://cargocalc.vercel.app


---

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
