document.addEventListener('DOMContentLoaded', () => {

  // ── PARTÍCULAS ──
  const canvas = document.getElementById('particles');
  const ctx = canvas.getContext('2d');

  let particulas = [];
  const NUM_PARTICULAS = 80;

  function ajustarCanvas() {
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
  }

  function crearParticulas() {
    particulas = [];
    for (let i = 0; i < NUM_PARTICULAS; i++) {
      particulas.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        radio: Math.random() * 2 + 1
      });
    }
  }

  function dibujar() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (let i = 0; i < particulas.length; i++) {
      for (let j = i + 1; j < particulas.length; j++) {
        const dx = particulas[i].x - particulas[j].x;
        const dy = particulas[i].y - particulas[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < 120) {
          ctx.beginPath();
          ctx.strokeStyle = `rgba(196, 104, 122, ${1 - dist / 120})`;
          ctx.lineWidth = 0.5;
          ctx.moveTo(particulas[i].x, particulas[i].y);
          ctx.lineTo(particulas[j].x, particulas[j].y);
          ctx.stroke();
        }
      }

      const p = particulas[i];
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.radio, 0, Math.PI * 2);
      ctx.fillStyle = '#C4687A';
      ctx.fill();

      p.x += p.vx;
      p.y += p.vy;

      if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
      if (p.y < 0 || p.y > canvas.height) p.vy *= -1;
    }

    requestAnimationFrame(dibujar);
  }

  ajustarCanvas();
  crearParticulas();
  dibujar();

  window.addEventListener('resize', () => {
    ajustarCanvas();
    crearParticulas();
  });

  // ── MENÚ HAMBURGUESA ──
  const hamburger = document.querySelector('.nav-hamburger');
  const navLinks = document.querySelector('.nav-links');

  hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('abierto');
  });

  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('abierto');
    });
  });

  // ── ACORDEÓN ──
  const items = document.querySelectorAll('.item');

  items.forEach(item => {
    const header = item.querySelector('.item-header');
    header.addEventListener('click', () => {
      const estaAbierto = item.classList.contains('abierto');
      items.forEach(i => i.classList.remove('abierto'));
      if (!estaAbierto) {
        item.classList.add('abierto');
      }
    });
  });

  // ── CARRUSEL PROJECTS ──
  const carrusel = document.querySelector('.carrusel');
  const btnPrev = document.querySelector('.carrusel-prev');
  const btnNext = document.querySelector('.carrusel-next');

  btnNext.addEventListener('click', () => {
    const card = carrusel.querySelector('.proyecto-card');
    const ancho = card.offsetWidth + 16;
    carrusel.scrollBy({ left: ancho, behavior: 'smooth' });
  });

  btnPrev.addEventListener('click', () => {
    const card = carrusel.querySelector('.proyecto-card');
    const ancho = card.offsetWidth + 16;
    carrusel.scrollBy({ left: -ancho, behavior: 'smooth' });
  });

  // Touch en móvil
  let startX = 0;

  carrusel.addEventListener('touchstart', (e) => {
    startX = e.touches[0].clientX;
  });

  carrusel.addEventListener('touchend', (e) => {
    const diff = startX - e.changedTouches[0].clientX;
    const card = carrusel.querySelector('.proyecto-card');
    const ancho = card.offsetWidth + 16;

    if (diff > 50) {
      carrusel.scrollBy({ left: ancho, behavior: 'smooth' });
    } else if (diff < -50) {
      carrusel.scrollBy({ left: -ancho, behavior: 'smooth' });
    }
  });

  // ── MODAL PROYECTOS ──
  const proyectos = {
    devfirst: {
      categoria: 'Web App · 2026',
      titulo: 'DevFirst — Job Platform for Junior IT Profiles',
      descripcion: 'A job-matching platform connecting tech companies with recently graduated developers looking for their first opportunity. Built as my final degree project (CFGS DAW), it tackles a real problem in the Spanish IT job market: junior profiles being filtered out of generalist platforms due to lack of experience. I designed the full business plan and built the frontend with React, Vite and Tailwind, defining the data model and component architecture from scratch. Backend (Node.js, Express, MongoDB) currently in development.',
      stack: ['React', 'Vite', 'Tailwind CSS', 'React Router', 'Node.js (in progress)', 'MongoDB (in progress)'],
      imagen: null,
      botones: [
        { texto: 'GitHub ↗', url: 'https://github.com/mariadev97/devfirst-frontend', clase: 'btn-proyecto-gh' }
      ]
    },

    healthcare: {
      categoria: 'Healthcare · 2026',
      titulo: 'Healthcare Data Management System',
      descripcion: 'Internal system for managing patient data in a healthcare environment. I was responsible for designing and structuring the MongoDB database, creating the initial scripts, and developing a complete frontend feature with React integrated into a hexagonal architecture backend. I also supported backend logic and REST API integration across the stack.',
      stack: ['React', 'TypeScript', 'MongoDB', 'Java', 'REST API', 'JIRA', 'Postman', 'Maven'],
      imagen: null,
      botones: []
    },
    portfolio: {
      categoria: 'Portfolio · 2026',
      titulo: 'Personal Portfolio Website',
      descripcion: 'This very website — designed and built from scratch with vanilla HTML, CSS and JavaScript, without any framework. Features include a particle animation hero, accordion sections, a carousel, form validation and Formspree integration for contact. Deployed via GitHub Pages.',
      stack: ['HTML', 'CSS', 'JavaScript', 'GitHub Pages', 'Formspree'],
      imagen: null,
      botones: [
        { texto: 'GitHub ↗', url: 'https://github.com/mariadev97/portfolio', clase: 'btn-proyecto-gh' },
        { texto: 'Live demo ↗', url: 'https://mariadev97.github.io/portfolio', clase: 'btn-proyecto-demo' }
      ]
    }
  };

  const overlay = document.getElementById('modal-overlay');
  const modalCerrar = document.getElementById('modal-cerrar');

  document.querySelectorAll('.proyecto-card').forEach(card => {
    card.addEventListener('click', () => {
      const key = card.dataset.proyecto;
      const p = proyectos[key];
      if (!p) return;

      document.getElementById('modal-categoria').textContent = p.categoria;
      document.getElementById('modal-titulo').textContent = p.titulo;
      document.getElementById('modal-descripcion').textContent = p.descripcion;

      const pills = document.getElementById('modal-pills');
      pills.innerHTML = p.stack.map(s => `<span>${s}</span>`).join('');

      const botones = document.getElementById('modal-botones');
      botones.innerHTML = p.botones.map(b =>
        `<a href="${b.url}" target="_blank" class="btn-proyecto ${b.clase}">${b.texto}</a>`
      ).join('');

      const img = document.getElementById('modal-imagen');
      const placeholder = document.getElementById('modal-imagen-placeholder');
      if (p.imagen) {
        img.src = p.imagen;
        img.style.display = 'block';
        placeholder.style.display = 'none';
      } else {
        img.style.display = 'none';
        placeholder.style.display = 'flex';
      }

      overlay.classList.add('visible');
    });
  });

  modalCerrar.addEventListener('click', () => overlay.classList.remove('visible'));
  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) overlay.classList.remove('visible');
  });

  // ── VALIDACIÓN Y ENVÍO FORMULARIO ──
  const formulario = document.getElementById('formulario-contacto');
  const inputEmail = formulario.querySelector('input[type="email"]');
  const mensajeError = document.createElement('span');

  mensajeError.style.cssText = 'color: #C4687A; font-size: 0.8rem; margin-top: -0.5rem; display: none;';
  inputEmail.insertAdjacentElement('afterend', mensajeError);

  function validarEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
    return regex.test(email.trim());
  }

  inputEmail.addEventListener('blur', () => {
    if (inputEmail.value && !validarEmail(inputEmail.value)) {
      inputEmail.style.borderColor = '#C4687A';
      mensajeError.textContent = 'Please enter a valid email address.';
      mensajeError.style.display = 'block';
    } else {
      inputEmail.style.borderColor = '';
      mensajeError.style.display = 'none';
    }
  });

  inputEmail.addEventListener('input', () => {
    if (validarEmail(inputEmail.value)) {
      inputEmail.style.borderColor = '#7BAE7F';
      mensajeError.style.display = 'none';
    }
  });

  formulario.addEventListener('submit', async (e) => {
    e.preventDefault();

    if (!validarEmail(inputEmail.value)) {
      inputEmail.style.borderColor = '#C4687A';
      mensajeError.textContent = 'Please enter a valid email address before sending.';
      mensajeError.style.display = 'block';
      inputEmail.focus();
      return;
    }

    const datos = {
      nombre: formulario.querySelector('input[name="nombre"]').value,
      email: inputEmail.value,
      mensaje: formulario.querySelector('textarea[name="mensaje"]').value
    };

    try {
      const respuesta = await fetch('https://formspree.io/f/xbdvgqen', {
        method: 'POST',
        body: JSON.stringify(datos),
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      });

      if (respuesta.ok) {
        const mensajeExito = document.getElementById('mensaje-exito');
        const cerrarExito = document.getElementById('cerrar-exito');
        formulario.reset();
        inputEmail.style.borderColor = '';
        mensajeExito.classList.add('visible');
        cerrarExito.addEventListener('click', () => {
          mensajeExito.classList.remove('visible');
        });
      } else {
        alert('Something went wrong. Please try again.');
      }
    } catch (error) {
      alert('Something went wrong. Please try again.');
    }
  });

});