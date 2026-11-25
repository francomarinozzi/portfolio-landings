import type { ImageMetadata } from 'astro';
import krisis1 from '../assets/projects/krisis_1.png';
import krisis2 from '../assets/projects/krisis_2.png';

export interface Project {
  name: string;
  category: string;
  summary: string;
  features: string[];
  stack: string[];
  images: ImageMetadata[]; // capturas que rotan dentro del marco del navegador
  url?: string; // link al sitio en vivo (opcional)
  domain: string; // lo que se ve en la barra del navegador falso
  accent: string; // color de acento del proyecto
}

// Para sumar un proyecto: copiá las capturas a src/assets/projects/, importalas arriba
// y agregá un objeto a esta lista.
export const projects: Project[] = [
  {
    name: 'Krisis',
    category: 'E-commerce · Indumentaria femenina',
    summary:
      'Tienda online para una marca de ropa de diseño propio hecha a mano. La dueña carga prendas, talles y stock desde su propio panel, y las clientas compran y pagan sin salir del sitio.',
    features: [
      'Catálogo con filtros por prenda, talle y precio',
      'Carrito con stock por talle',
      'Pagos con Mercado Pago o transferencia',
      'Panel de administración propio',
      'Mails automáticos de confirmación',
    ],
    stack: ['Next.js', 'Tailwind', 'Postgres', 'Mercado Pago', 'Cloudflare'],
    images: [krisis1, krisis2],
    domain: 'krisis.com.ar',
    accent: '#d0102c',
  },
];
