import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from 'tailwindcss';
// import daisyui from 'daisyui';

// https://vitejs.dev/config/
export default defineConfig({
    base: "/",
    plugins: [react(), tailwindcss()],
    preview: {
     port: 8080,
    },
    server: {
     port: 8080,
    },
   });


