// ==================== TRADUCCIONES ====================
const T = {
  es: {
    page_title: "BM | Desarrollador Full Stack",
    nav_home: "Inicio", nav_about: "Sobre mí", nav_skills: "Habilidades", nav_projects: "Proyectos", nav_path: "Trayectoria", nav_contact: "Contacto",
    hero_role: "Desarrollador Full-Stack",
    hero_headline: "Diseño y desarrollo de productos digitales modernos, rápidos y accesibles.",
    hero_pitch: "Creando soluciones de software escalables y accesibles, con un enfoque en arquitecturas limpias y experiencias de usuario memorables.",
    cta_projects: "Ver proyectos", cta_cv: "Descargar CV",
    about_title: "Sobre mí",
    about_desc: "Estudiante de Ingeniería de Software (UV, 7º semestre). Construyo soluciones full-stack con enfoque en arquitectura limpia, rendimiento y accesibilidad. Me gustan FastAPI, Flutter, Java y el diseño de datos en SQL/NoSQL.",
    about_age_label: "Edad", about_bday_label: "Nacimiento", about_city_label: "Ciudad", about_semester_label: "Semestre", about_university_label: "Universidad", about_langs_label: "Idiomas",
    skills_title: "Habilidades",
    skills_subtitle: "Stack principal y herramientas de trabajo.",
    projects_title: "Proyectos destacados",
    path_title: "Trayectoria", tab_awards: "Logros", tab_certs: "Certificaciones", tab_edu: "Educación",
    award_feria_title: "2º lugar — Feria de Emprendedores",
    award_feria_desc: "Categoría Base Tecnológica con “Letras Amigas” (05/2025).",
    edu_title: "Ingeniería de Software — Universidad Veracruzana",
    edu_desc: "Campus Coatzacoalcos (2022 – Actualidad).",
    contact_title: "Contacto",
    contact_desc: "¿Interesado en colaborar o tienes alguna pregunta? No dudes en contactarme. Estoy disponible para nuevas oportunidades y desafíos. ¡Hablemos!",
    footer_rights: "Todos los derechos reservados."
  },
  en: {
    page_title: "BM | Full Stack Developer",
    nav_home: "Home", nav_about: "About", nav_skills: "Skills", nav_projects: "Projects", nav_path: "Path", nav_contact: "Contact",
    hero_role: "Full-Stack Developer",
    hero_headline: "Designing and building modern, fast and accessible digital products.",
    hero_pitch: "Creating scalable and accessible software solutions with clean architectures and memorable user experiences.",
    cta_projects: "See projects", cta_cv: "Download CV",
    about_title: "About me",
    about_desc: "Software Engineering student (UV, 7th semester). I build full-stack solutions focused on clean architecture, performance and accessibility. I enjoy FastAPI, Flutter, Java and data design in SQL/NoSQL.",
    about_age_label: "Age", about_bday_label: "Birthdate", about_city_label: "City", about_semester_label: "Semester", about_university_label: "University", about_langs_label: "Languages",
    skills_title: "Skills",
    skills_subtitle: "Main stack and working tools.",
    projects_title: "Featured projects",
    path_title: "Path", tab_awards: "Awards", tab_certs: "Certifications", tab_edu: "Education",
    award_feria_title: "2nd place — Entrepreneurs Fair",
    award_feria_desc: "Tech-based category with “Letras Amigas” (05/2025).",
    edu_title: "Software Engineering — Universidad Veracruzana",
    edu_desc: "Coatzacoalcos Campus (2022 – Present).",
    contact_title: "Contact",
    contact_desc: "Interested in collaborating or have a question? I'm available for new opportunities and challenges. Let's talk!",
    footer_rights: "All rights reserved."
  }
};

// ==================== IDIOMA ====================
const langToggleMobile    = document.getElementById('langToggle');
const langToggleDesktop = document.getElementById('langToggleDesktop');
let LANG = localStorage.getItem('lang') || 'es';

function setLangButtons() {
  [langToggleMobile, langToggleDesktop].forEach(btn => {
    if (btn) btn.textContent = (LANG === 'es') ? 'EN' : 'ES';
  });
}

function applyI18n() {
  document.title = T[LANG].page_title;
  document.querySelectorAll('[data-key]').forEach(el => {
    const k = el.getAttribute('data-key');
    if (T[LANG][k]) el.textContent = T[LANG][k];
  });
  setLangButtons();
  document.documentElement.lang = LANG;
  loadProjects();
}

function handleLangToggle() {
  LANG = (LANG === 'es') ? 'en' : 'es';
  localStorage.setItem('lang', LANG);
  applyI18n();
}

[langToggleMobile, langToggleDesktop].forEach(btn => {
  if (btn) btn.addEventListener('click', handleLangToggle);
});

// ==================== NAVBAR SCROLLED ====================
const nav = document.getElementById('navMain');
function onScroll() {
  if (!nav) return;
  if (window.scrollY > 8) nav.classList.add('scrolled');
  else nav.classList.remove('scrolled');
}
document.addEventListener('scroll', onScroll);

// ==================== FOOTER YEAR ====================
const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = new Date().getFullYear();

// ==================== PROYECTOS DESDE JSON ====================
async function loadProjects() {
  const grid = document.getElementById('projectsGrid');
  const fallback = document.getElementById('projectsFallback');
  if (!grid || !fallback) return;

  grid.innerHTML = '';
  fallback.classList.add('d-none');

  try {
    const res = await fetch(`data/projects.${LANG}.json`, { cache: 'no-store' });
    if (!res.ok) throw new Error('HTTP ' + res.status);
    const list = await res.json();

    list.forEach(p => {
      const col = document.createElement('div');
      col.className = 'col-md-6';
      col.innerHTML = `
        <article class="card-glass project-card h-100">
          <div class="thumb">
            <img src="${p.imagen}" alt="${p.titulo}">
          </div>
          <div class="p-3">
            <div class="project-date">${p.fecha || ''}</div>
            <h3 class="h5 fw-bold mb-1">${p.titulo}</h3>
            <p class="small text-secondary mb-2">${p.descripcion}</p>
            <div class="meta">
              ${(p.stack || []).map(s => `<span class="tag">${s}</span>`).join('')}
            </div>
            <div class="d-flex gap-2 mt-3">
              ${p.repo ? `<a class="btn btn-outline-light btn-sm" href="${p.repo}" target="_blank" rel="noopener"><i class="bi bi-github"></i> GitHub</a>` : ''}
              ${p.link ? `<a class="btn btn-primary btn-sm" href="${p.link}" target="_blank" rel="noopener"><i class="bi bi-box-arrow-up-right"></i> ${LANG === 'es' ? 'Link' : 'Link'}</a>` : ''}
            </div>
          </div>
        </article>
      `;
      grid.appendChild(col);
    });
  } catch (e) {
    console.error('Error cargando proyectos', e);
    fallback.classList.remove('d-none');
    fallback.textContent = (LANG === 'es')
      ? 'No se pudieron cargar los proyectos.'
      : 'Projects could not be loaded.';
  }
}

// ===========================
// HABILIDADES — Ticker Pro
// ===========================
(function () {
  const track = document.querySelector('#habilidades .skills-track');
  const marquee = track?.querySelector('.skills-marquee');
  const line = marquee?.querySelector('.skills-line');
  if (!track || !marquee || !line) return;

  const clone = line.cloneNode(true);
  clone.setAttribute('aria-hidden', 'true');
  marquee.appendChild(clone);

  let speed = 70;
  let pos = 0;
  let lastTime = performance.now();
  let isDragging = false;
  let dragStartX = 0;
  let posStart = 0;

  const lineWidth = () => line.getBoundingClientRect().width;

  function step(now) {
    const dt = Math.min(0.05, (now - lastTime) / 1000);
    lastTime = now;

    if (!isDragging) pos -= speed * dt;

    const w = lineWidth();
    if (pos <= -w) pos += w;
    if (pos >= 0) pos -= w;

    marquee.style.transform = `translateX(${pos}px)`;
    requestAnimationFrame(step);
  }
  requestAnimationFrame(step);

  const onDown = (clientX) => { isDragging = true; dragStartX = clientX; posStart = pos; };
  const onMove = (clientX) => { if (isDragging) pos = posStart + (clientX - dragStartX); };
  const onUp = () => { isDragging = false; };

  marquee.addEventListener('mousedown', e => onDown(e.clientX));
  window.addEventListener('mousemove', e => onMove(e.clientX));
  window.addEventListener('mouseup', onUp);

  marquee.addEventListener('touchstart', e => onDown(e.touches[0].clientX), { passive: true });
  window.addEventListener('touchmove', e => onMove(e.touches[0].clientX), { passive: true });
  window.addEventListener('touchend', onUp);

  track.addEventListener('wheel', e => { e.preventDefault(); pos -= e.deltaY * 0.5; }, { passive: false });

  track.addEventListener('keydown', e => {
    if (e.code === 'ArrowRight') speed = Math.min(200, speed + 10);
    if (e.code === 'ArrowLeft') speed = Math.max(20, speed - 10);
  });
})();

// ===========================
// INIT
// ===========================
document.addEventListener('DOMContentLoaded', () => {
  const navMain = document.getElementById('navMain');
  const navCollapse = document.getElementById('navCollapse');

  if (navCollapse && navMain) {
    const bsCollapse = new bootstrap.Collapse(navCollapse, { toggle: false });
    const menuItems = navCollapse.querySelectorAll('.nav-link, .btn');

    menuItems.forEach(item => {
      item.addEventListener('click', () => {
        if (navCollapse.classList.contains('show')) {
          bsCollapse.hide();
        }
      });
    });

    document.addEventListener('click', (event) => {
      const isClickInsideNav = navMain.contains(event.target);
      if (navCollapse.classList.contains('show') && !isClickInsideNav) {
        bsCollapse.hide();
      }
    });
  }

  if (!localStorage.getItem('lang')) {
    LANG = 'es';
    localStorage.setItem('lang', 'es');
  } else {
    LANG = localStorage.getItem('lang') || 'es';
  }

  applyI18n();
  onScroll();
});