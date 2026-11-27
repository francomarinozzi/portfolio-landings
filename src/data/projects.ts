import type { ImageMetadata } from 'astro';
import krisis1 from '../assets/projects/krisis_1.png';
import krisis2 from '../assets/projects/krisis_2.png';

export interface Project {
  name: string;
  category: string;
  summary: string;
  features: string[];
  images?: ImageMetadata[]; // capturas que rotan (si no hay video)
  video?: { mp4: string; webm?: string; poster: string }; // rutas dentro de /public
  url?: string; // link al sitio en vivo (opcional)
}

// Para sumar un proyecto, agregá un objeto a esta lista con:
// - capturas: copialas a src/assets/projects/ e importalas arriba (campo `images`), o
// - video: dejalo en public/projects/ (campo `video`). Conviene comprimirlo antes (ver README).
export const projects: Project[] = [
  {
    name: 'Krisis',
    category: 'E-commerce · Indumentaria femenina',
    summary:
      'Tienda online para emprendimiento de indumentaria femenina. La dueña carga prendas, talles y stock desde su propio panel, y las clientas compran y pagan sin salir del sitio.',
    features: [
      'Catálogo con filtros por prenda, talle y precio',
      'Carrito con stock por talle',
      'Pagos con Mercado Pago o transferencia',
      'Panel de administración propio',
      'Mails automáticos de confirmación',
    ],
    images: [krisis1, krisis2],
  },
  {
    name: 'Quintela Car Detail',
    category: 'Landing · Estética vehicular',
    summary:
      'Landing para un detailing de autos. Muestra los servicios, deja comparar el antes y el después de cada trabajo y lleva directo a pedir turno por WhatsApp.',
    features: [
      'Carrusel de servicios',
      'Comparador antes / después deslizable',
      'Videos y galería de trabajos',
      'Reseñas de Google',
      'Turnos por WhatsApp y ubicación en el mapa',
    ],
    video: {
      mp4: '/projects/quintela.mp4',
      webm: '/projects/quintela.webm',
      poster: '/projects/quintela-poster.jpg',
    },
  },
];
