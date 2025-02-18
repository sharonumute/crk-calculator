import path from 'path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import sitemap from 'vite-plugin-sitemap';

// https://vite.dev/config/
export default defineConfig({
    plugins: [
        react(),
        tailwindcss(),
        sitemap({
            hostname: 'https://pristinepowder.com',
            dynamicRoutes: ['/star-jelly-calculator', '/skill-powder-calculator'],
            lastmod: new Date(),
            changefreq: 'yearly',
            priority: 1,
            exclude: ['/404', '/'],
        }),
    ],
    resolve: {
        alias: {
            '@': path.resolve(__dirname, './src'),
        },
    },
    assetsInclude: ['**/*.csv'],
    server: {
        host: '0.0.0.0',
        port: 5173,
    },
    base: '/',
    build: {
        chunkSizeWarningLimit: 1000,
    },
});
