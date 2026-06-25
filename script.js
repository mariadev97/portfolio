document.addEventListener('DOMContentLoaded', () => {

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

  // ── VALIDACIÓN FORMULARIO ──
  const formulario = document.getElementById('formulario-contacto');
  const inputEmail = formulario.querySelector('input[type="email"]');
  const mensajeError = document.createElement('span');

  mensajeError.style.cssText = 'color: #A8546A; font-size: 0.8rem; margin-top: -0.5rem; display: none;';
  inputEmail.insertAdjacentElement('afterend', mensajeError);

  function validarEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
    return regex.test(email.trim());
  }

  inputEmail.addEventListener('blur', () => {
    if (inputEmail.value && !validarEmail(inputEmail.value)) {
      inputEmail.style.borderColor = '#A8546A';
      mensajeError.textContent = 'Por favor, introduce un email válido (ejemplo: nombre@correo.com)';
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
      inputEmail.style.borderColor = '#A8546A';
      mensajeError.textContent = 'Por favor, introduce un email válido antes de enviar.';
      mensajeError.style.display = 'block';
      inputEmail.focus();
      return;
    }

    const datos = new FormData(formulario);

    try {
      const respuesta = await fetch('https://formspree.io/f/xbdvgqen', {
        method: 'POST',
        body: datos,
        headers: { 'Accept': 'application/json' }
      });

      if (respuesta.ok) {
        formulario.reset();
        inputEmail.style.borderColor = '';
        alert('¡Mensaje enviado correctamente! Me pondré en contacto contigo pronto.');
      } else {
        alert('Hubo un error al enviar. Por favor inténtalo de nuevo.');
      }
    } catch (error) {
      alert('Hubo un error al enviar. Por favor inténtalo de nuevo.');
    }
  });

});