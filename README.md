# Franco Marinozzi · Páginas web para comercios

Sitio estático hecho con **Astro + Tailwind 4 + GSAP (ScrollTrigger, SplitText) + Lenis**.

```bash
npm install
npm run dev      # http://localhost:4321
npm run build    # genera dist/ listo para subir
```

## Dónde se edita qué

| Qué | Archivo |
| --- | --- |
| Nombre, WhatsApp, mail, precio | `src/data/site.ts` |
| Proyectos (capturas en `src/assets/projects/`) | `src/data/projects.ts` |
| Colores, vidrio, burbujas, botones | `src/styles/global.css` |
| Animaciones | `src/scripts/animations.ts` |
| Secciones | `src/components/*.astro` |

## Formulario de contacto

Sacá una clave gratis en https://web3forms.com, copiá `.env.example` a `.env` y completá `PUBLIC_WEB3FORMS_KEY`.
Sin clave, el formulario abre el cliente de mail del visitante con el mensaje armado.

## Videos de proyectos

Las grabaciones de pantalla pesan mucho. Antes de ponerlas en `public/projects/`, recortalas y comprimilas
(ajustá `crop=ancho:alto:x:y` para sacar las barras del sistema y del navegador):

```bash
ffmpeg -i original.mp4 -vf "crop=1876:924:14:140,scale=1440:-2,fps=30" -an -c:v libx264 -crf 26 -preset slow -pix_fmt yuv420p -movflags +faststart public/projects/nombre.mp4
ffmpeg -i original.mp4 -vf "crop=1876:924:14:140,scale=1440:-2,fps=30" -an -c:v libvpx-vp9 -crf 38 -b:v 0 public/projects/nombre.webm
ffmpeg -ss 1 -i public/projects/nombre.mp4 -frames:v 1 -q:v 4 public/projects/nombre-poster.jpg
```

## Deploy

Cualquier hosting estático gratis: Cloudflare Pages, Netlify o Vercel (build: `npm run build`, salida: `dist`).
Acordate de cambiar `site` en `astro.config.mjs` por el dominio final.
# portfolio-landings
# portfolio-landings
# portfolio-landings
# portfolio-landings
