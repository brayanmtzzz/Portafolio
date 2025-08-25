// ===========================
// Idiomas ES / EN
// ===========================
const langToggle = document.getElementById('langToggle');
let currentLang = 'es';

function setLang(lang) {
  currentLang = lang;
  document.documentElement.lang = lang;

  // Cargar proyectos desde JSON
  loadProjects(lang);

  // Cambiar textos simples del toggle
  langToggle.textContent = lang === 'en' ? 'EN / ES' : 'ES / EN';
}

// ===========================
// Cargar proyectos dinámicamente
// ===========================
async function loadProjects(lang) {
  const container = document.querySelector("#proyectos .row");
  container.innerHTML = ""; // limpiar
  try {
    const res = await fetch(`data/projects.${lang}.json`);
    const projects = await res.json();

    projects.forEach(p => {
      const card = document.createElement("div");
      card.className = "col-md-6 col-lg-4";
      card.innerHTML = `
        <article class="card-glass h-100">
          <div class="card-thumb">
            <img src="${p.imagen}" alt="${p.titulo}">
          </div>
          <div class="card-body">
            <h3 class="h5 fw-bold mb-2">${p.titulo}</h3>
            <p class="small text-secondary mb-3">${p.descripcion}</p>
            <ul class="mini-bullets">
              ${p.logros.map(l => `<li>${l}</li>`).join("")}
            </ul>
            <div class="stack-mini">
              ${p.stack.map(s => `<span>${s}</span>`).join("")}
            </div>
            ${p.link ? `<div class="btn-row mt-2">
              <a href="${p.link}" target="_blank" class="btn btn-sm btn-primary">
                <i class="bi bi-box-arrow-up-right"></i> Demo
              </a>
            </div>` : ""}
          </div>
        </article>
      `;
      container.appendChild(card);
    });
  } catch (err) {
    console.error("Error cargando proyectos:", err);
  }
}

// ===========================
// Init
// ===========================
langToggle.addEventListener("click", () => {
  setLang(currentLang === 'es' ? 'en' : 'es');
});

// Año dinámico en footer
document.getElementById("year").textContent = new Date().getFullYear();

// Cargar idioma inicial
setLang(currentLang);
