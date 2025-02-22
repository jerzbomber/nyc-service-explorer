# NYC Service Explorer

This is a simple **Next.js** application that allows users to explore various services available in NYC using an interactive map and list.

## Prerequisites

- **Node.js** (v18 or later recommended)
- **npm** (or `yarn`/`pnpm`)

## Getting Started

1. Clone the repository:

   ```bash
   git clone https://github.com/jerzbomber/nyc-service-explorer.git
   cd nyc-service-explorer
   ```

2. Install dependencies:

   ```bash
   npm install
   # or
   yarn install
   ```

3. Set Up Environment Variables

   Create a `.env.local` file in the root directory and add the following:

   ```env
   NEXT_PUBLIC_API_URL=https://data.cityofnewyork.us/resource/8nqg-ia7v.json
   ```

4. Start the development server:

   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Deployment

For production, build and start the app:

```bash
npm run build
npm start
```

## Notes

- This app uses **Leaflet** for mapping functionality.
- Ensure your environment supports **Next.js** server-side rendering.
