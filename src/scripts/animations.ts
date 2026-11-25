import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';
import Lenis from 'lenis';

gsap.registerPlugin(ScrollTrigger, SplitText);

const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const finePointer = window.matchMedia('(pointer: fine)').matches;
const $$ = <T extends Element = HTMLElement>(sel: string, root: ParentNode = document) =>
  Array.from(root.querySelectorAll<T>(sel));

/* =========================================================
   Comportamiento (siempre activo, con o sin animaciones)
   ========================================================= */

function setupMenu(lenis?: Lenis) {
  const btn = document.querySelector<HTMLButtonElement>('[data-menu-btn]');
  const menu = document.querySelector<HTMLElement>('[data-menu]');
  const label = btn?.querySelector<HTMLElement>('[data-menu-label]');
  if (!btn || !menu) return;
  const setOpen = (open: boolean) => {
    btn.setAttribute('aria-expanded', String(open));
    btn.setAttribute('aria-label', open ? 'Cerrar menú' : 'Abrir menú');
    if (label) label.textContent = open ? 'Cerrar' : 'Menú';
    menu.classList.toggle('invisible', !open);
    menu.classList.toggle('opacity-0', !open);
    if (open) {
      lenis?.stop();
      if (!reduceMotion) {
        gsap.fromTo(
          $$('[data-menu-link]', menu),
          { yPercent: 60, opacity: 0 },
          { yPercent: 0, opacity: 1, duration: 0.7, ease: 'expo.out', stagger: 0.05 },
        );
      }
    } else lenis?.start();
  };
  btn.addEventListener('click', () => setOpen(btn.getAttribute('aria-expanded') !== 'true'));
  $$('[data-menu-link]').forEach((a) => a.addEventListener('click', () => setOpen(false)));
  window.addEventListener('keydown', (e) => e.key === 'Escape' && setOpen(false));
}

function setupNav() {
  const nav = document.querySelector<HTMLElement>('[data-nav]');
  const onScroll = () => {
    const scrolled = window.scrollY > 30;
    nav?.classList.toggle('bg-night/80', scrolled);
    nav?.classList.toggle('backdrop-blur-md', scrolled);
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  $$<HTMLAnchorElement>('[data-nav-link]').forEach((link) => {
    const section = document.querySelector(link.getAttribute('href')!);
    if (!section) return;
    ScrollTrigger.create({
      trigger: section,
      start: 'top 50%',
      end: 'bottom 50%',
      onToggle: ({ isActive }) => link.classList.toggle('!text-bone', isActive),
    });
  });
}

function setupSlides() {
  $$('[data-slides]').forEach((wrap) => {
    const slides = $$('[data-slide]', wrap);
    if (slides.length < 2) return;
    let i = 0;
    let timer: number | undefined;
    const next = () => {
      slides[i].classList.add('opacity-0');
      i = (i + 1) % slides.length;
      slides[i].classList.remove('opacity-0');
    };
    new IntersectionObserver(([entry]) => {
      clearInterval(timer);
      if (entry.isIntersecting) timer = window.setInterval(next, 4000);
    }).observe(wrap);
  });
}

/* =========================================================
   Arranque
   ========================================================= */

setupSlides();

if (reduceMotion) {
  setupMenu();
  setupNav();
} else {
  const lenis = new Lenis({ lerp: 0.1, anchors: { offset: -64 } });
  lenis.on('scroll', ScrollTrigger.update);
  gsap.ticker.add((t) => lenis.raf(t * 1000));
  gsap.ticker.lagSmoothing(0);

  setupMenu(lenis);
  setupNav();

  /* Títulos: líneas que suben desde una máscara */
  document.fonts.ready.then(() => {
    $$('[data-split]').forEach((el) => {
      const isHero = !!el.closest('#inicio');
      SplitText.create(el, {
        type: 'lines',
        mask: 'lines',
        linesClass: 'split-line',
        autoSplit: true,
        onSplit(self) {
          gsap.set(el, { visibility: 'visible' });
          return gsap.from(self.lines, {
            yPercent: 110,
            duration: 1.2,
            ease: 'expo.out',
            stagger: 0.09,
            delay: isHero ? 0.1 : 0,
            scrollTrigger: isHero ? undefined : { trigger: el, start: 'top 85%', once: true },
          });
        },
      });
    });

    /* Párrafo que se "ilumina" palabra por palabra con el scroll */
    $$('[data-scrub-text]').forEach((el) => {
      const split = SplitText.create(el, { type: 'words' });
      gsap.fromTo(
        split.words,
        { opacity: 0.15 },
        {
          opacity: 1,
          ease: 'none',
          stagger: 0.1,
          scrollTrigger: { trigger: el, start: 'top 80%', end: 'bottom 45%', scrub: true },
        },
      );
    });
  });

  /* Bloques que aparecen al hacer scroll */
  ScrollTrigger.batch('[data-reveal]', {
    start: 'top 90%',
    once: true,
    onEnter: (els) =>
      gsap.to(els, { opacity: 1, y: 0, duration: 1.1, ease: 'expo.out', stagger: 0.08, overwrite: true }),
  });

  $$('[data-stagger]').forEach((group) => {
    gsap.from($$('[data-stagger-item]', group), {
      opacity: 0,
      y: 40,
      duration: 1.1,
      ease: 'expo.out',
      stagger: 0.12,
      scrollTrigger: { trigger: group, start: 'top 85%', once: true },
    });
  });

  /* Capturas de proyectos: se destapan y se acercan con el scroll */
  $$('[data-clip-reveal]').forEach((wrap) => {
    gsap.fromTo(
      wrap,
      { clipPath: 'inset(12% 10% 12% 10% round 12px)' },
      {
        clipPath: 'inset(0% 0% 0% 0% round 12px)',
        ease: 'none',
        scrollTrigger: { trigger: wrap, start: 'top 95%', end: 'top 35%', scrub: 0.6 },
      },
    );
    const img = wrap.querySelector('[data-parallax-img]');
    if (img) {
      gsap.fromTo(
        img,
        { scale: 1.18 },
        { scale: 1, ease: 'none', scrollTrigger: { trigger: wrap, start: 'top bottom', end: 'bottom top', scrub: true } },
      );
    }
  });

  /* Proceso: cada línea se llena en orden */
  const steps = document.querySelector('[data-steps]');
  if (steps) {
    gsap.to($$('[data-step-line]', steps), {
      scaleX: 1,
      duration: 0.9,
      ease: 'power3.inOut',
      stagger: 0.3,
      scrollTrigger: { trigger: steps, start: 'top 80%', once: true },
    });
  }

  /* Botones magnéticos */
  if (finePointer) {
    $$('[data-magnetic]').forEach((btn) => {
      const x = gsap.quickTo(btn, 'x', { duration: 0.6, ease: 'elastic.out(1, 0.5)' });
      const y = gsap.quickTo(btn, 'y', { duration: 0.6, ease: 'elastic.out(1, 0.5)' });
      btn.addEventListener('pointermove', (e) => {
        const r = btn.getBoundingClientRect();
        x((e.clientX - r.left - r.width / 2) * 0.25);
        y((e.clientY - r.top - r.height / 2) * 0.35);
      });
      btn.addEventListener('pointerleave', () => {
        x(0);
        y(0);
      });
    });
  }
}
