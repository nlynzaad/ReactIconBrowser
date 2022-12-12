import dynamicImport from 'vite-plugin-dynamic-import';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [react(), dynamicImport()],
});
