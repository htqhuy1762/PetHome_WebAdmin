import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],
    resolve: {
        alias: {
            // Định nghĩa alias cho ~
            '~': '/src',
        },
    },
    server: {
        port: 5175,
    },
});
