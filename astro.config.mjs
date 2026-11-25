import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  site: 'https://example.com', // TODO: cambiar por el dominio final
  vite: { plugins: [tailwindcss()] },
});
