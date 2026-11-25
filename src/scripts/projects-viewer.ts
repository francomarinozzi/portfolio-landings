import gsap from 'gsap';
import { lenis } from './animations';

const dialog = document.querySelector<HTMLDialogElement>('[data-project-dialog]');
const track = dialog?.querySelector<HTMLElement>('[data-project-track]');

if (dialog && track) {
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const slides = Array.from(track.querySelectorAll<HTMLElement>('[data-project-slide]'));
  const dots = Array.from(dialog.querySelectorAll<HTMLElement>('[data-project-dot]'));
  const current = dialog.querySelector<HTMLElement>('[data-project-current]');
  const prev = dialog.querySelector<HTMLButtonElement>('[data-project-prev]');
  const next = dialog.querySelector<HTMLButtonElement>('[data-project-next]');
  let index = 0;

  const update = (i: number) => {
    index = i;
    if (current) current.textContent = String(i + 1);
    dots.forEach((d, j) => {
      d.classList.toggle('bg-neon', j === i);
      d.classList.toggle('bg-rule', j !== i);
    });
    if (prev) prev.disabled = i === 0;
    if (next) next.disabled = i === slides.length - 1;
    slides.forEach((s, j) => s.toggleAttribute('inert', j !== i));
  };

  const goTo = (i: number, smooth = true) => {
    const target = Math.max(0, Math.min(slides.length - 1, i));
    track.scrollTo({ left: target * track.clientWidth, behavior: smooth && !reduceMotion ? 'smooth' : 'instant' });
    update(target);
  };

  // Detecta el slide visible cuando se desliza con el dedo o el trackpad
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) update(Number((e.target as HTMLElement).dataset.projectSlide));
      });
    },
    { root: track, threshold: 0.6 },
  );
  slides.forEach((s) => io.observe(s));

  const open = (i: number) => {
    dialog.showModal();
    lenis?.stop();
    goTo(i, false);
    slides[i]?.scrollTo({ top: 0 });
    if (!reduceMotion) {
      gsap.fromTo(dialog, { opacity: 0, y: 40, scale: 0.98 }, { opacity: 1, y: 0, scale: 1, duration: 0.7, ease: 'expo.out' });
    }
  };

  const close = () => {
    if (!dialog.open) return;
    const done = () => {
      dialog.close();
      lenis?.start();
    };
    if (reduceMotion) return done();
    gsap.to(dialog, { opacity: 0, y: 24, duration: 0.35, ease: 'power2.in', onComplete: done });
  };

  document.querySelectorAll<HTMLElement>('[data-open-project]').forEach((btn) =>
    btn.addEventListener('click', () => open(Number(btn.dataset.openProject))),
  );
  dialog.querySelector('[data-close-project]')?.addEventListener('click', close);
  prev?.addEventListener('click', () => goTo(index - 1));
  next?.addEventListener('click', () => goTo(index + 1));

  // Esc: usamos nuestra animación de cierre en vez del cierre instantáneo del navegador
  dialog.addEventListener('cancel', (e) => {
    e.preventDefault();
    close();
  });
  // Click en el fondo (fuera del contenido) cierra
  dialog.addEventListener('click', (e) => {
    if (e.target === dialog) close();
  });
  document.addEventListener('keydown', (e) => {
    if (!dialog.open) return;
    if (e.key === 'ArrowRight') goTo(index + 1);
    if (e.key === 'ArrowLeft') goTo(index - 1);
  });
  // Mantiene el slide alineado si cambia el tamaño de la ventana
  window.addEventListener('resize', () => dialog.open && goTo(index, false));

  update(0);
}

/* Vista previa: el video de la tarjeta se reproduce al pasar el mouse */
if (window.matchMedia('(pointer: fine)').matches) {
  document.querySelectorAll<HTMLElement>('[data-open-project]').forEach((card) => {
    const video = card.querySelector<HTMLVideoElement>('[data-hover-video]');
    if (!video) return;
    card.addEventListener('pointerenter', () => {
      video.play().then(() => video.classList.remove('opacity-0')).catch(() => {});
    });
    card.addEventListener('pointerleave', () => {
      video.classList.add('opacity-0');
      video.pause();
    });
  });
}
