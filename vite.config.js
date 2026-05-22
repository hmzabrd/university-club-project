/* ============================================================
   📄 FILE: vite.config.js (BUILD TOOL SETTINGS)
   ============================================================
   Vite is the tool that:
   1. Runs the development server (npm run dev)
   2. Builds the production files (npm run build)
   
   This configuration file tells Vite:
   - Use the React plugin (so JSX code works)
   - Serve the site at the root path "/"
   
   WHAT IS "BASE"?
   base: "/" means the site is served from the root URL.
   If the site were at https://example.com/my-site/,
   base would need to be "/my-site/".
   ============================================================ */

// 👇 Import Vite's configuration helper.
import { defineConfig } from "vite";

// 👇 Import the React plugin so Vite knows how to handle JSX files.
import react from "@vitejs/plugin-react";

// 👇 Export the configuration.
export default defineConfig({
  // The React plugin compiles JSX syntax into regular JavaScript.
  plugins: [react()],
  
  // base: "/" means the app is served at the root of the domain.
  // If deploying to a subfolder, change this to "/folder-name/".
  base: "/",
});
