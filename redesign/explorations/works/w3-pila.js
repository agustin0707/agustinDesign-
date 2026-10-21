/* =======================================================
   INICIO JS · WORKS 3 PILA
   ======================================================= */
(function () {
    const pila = document.getElementById('pila');
    const paneles = [...pila.querySelectorAll('.panel')];
    const quieto = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const conMouse = window.matchMedia('(hover: hover)').matches;

    /* --- 1. CUÁNTO CUBRE EL SIGUIENTE --- */
    /* Para cada panel, el progreso del siguiente subiendo sobre él define --q */
    let pendiente = false;
    const pintar = () => {
        pendiente = false;
        const h = window.innerHeight;
        paneles.forEach((p, i) => {
            const sig = paneles[i + 1] || document.querySelector('.archivo');
            const q = Math.min(Math.max(1 - sig.getBoundingClientRect().top / h, 0), 1);
            p.style.setProperty('--q', quieto ? 0 : q.toFixed(3));
        });
    };
    window.addEventListener('scroll', () => { if (!pendiente) { pendiente = true; requestAnimationFrame(pintar); } }, { passive: true });
    window.addEventListener('resize', pintar);
    pintar();

    /* --- 2. SALTOS A CADA PROYECTO --- */
    /* Los paneles son sticky: su lugar real es el inicio de la pila más n pantallas */
    document.querySelectorAll('[data-salto]').forEach(a => a.addEventListener('click', e => {
        e.preventDefault();
        const i = paneles.findIndex(p => '#' + p.id === a.getAttribute('href'));
        const inicio = pila.getBoundingClientRect().top + window.scrollY;
        window.scrollTo({ top: inicio + i * window.innerHeight, behavior: quieto ? 'auto' : 'smooth' });
    }));

    /* --- 3. TÍTULOS QUE ENTRAN LETRA A LETRA --- */
    /* Mismo gesto del nombre del hero, disparado cuando el título entra en pantalla (sin la ola del cursor) */
    document.querySelectorAll('[data-letras]').forEach(el => {
        const texto = el.textContent.trim();
        el.setAttribute('aria-label', texto);
        let i = 0;
        el.innerHTML = texto.split(/(\s+)/).map(p => /^\s+$/.test(p) ? ' ' : '<span class="palabra" aria-hidden="true">' + [...p].map(c => `<span class="l" style="animation-delay:${(i++) * 32}ms">${c}</span>`).join('') + '</span>').join('');
    });
    const ioLetras = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add('entra'); ioLetras.unobserve(e.target); } }), { threshold: 0.4 });
    document.querySelectorAll('[data-letras]').forEach(el => ioLetras.observe(el));

    /* --- 4. SITIOS EN VIVO DENTRO DEL NAVEGADOR (SOLO CON MOUSE) --- */
    /* El sitio real se precarga cerca de la pantalla; al pasar el mouse se recarga para ver sus animaciones
       de carga, y después baja solo. Al salir vuelve a la portada */
    const laminasSitio = [...pila.querySelectorAll('.lamina[data-sitio]')];
    const escalar = l => {
        const pantalla = l.querySelector('.navegador .pantalla'), iframe = pantalla.querySelector('iframe');
        if (!iframe) return;
        const escala = pantalla.clientWidth / 1440;
        iframe.style.setProperty('--escala', escala.toFixed(4));
        iframe.style.height = Math.ceil(pantalla.clientHeight / escala) + 'px';
    };
    const crearIframe = l => {
        let iframe = l.querySelector('iframe');
        if (iframe) return iframe;
        iframe = document.createElement('iframe');
        iframe.src = l.dataset.sitio;
        iframe.title = 'Vista previa del sitio';
        iframe.setAttribute('tabindex', '-1');
        iframe.setAttribute('aria-hidden', 'true');
        l.querySelector('.navegador .pantalla').appendChild(iframe);
        escalar(l);
        return iframe;
    };
    const recorrer = l => {
        const iframe = l.querySelector('iframe');
        const win = iframe.contentWindow, doc = iframe.contentDocument;
        if (!win || !doc) return;
        const destino = Math.max(doc.documentElement.scrollHeight - win.innerHeight, 0) * 0.82;
        const inicio = performance.now(), duracion = 12000;
        const ease = t => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);
        const paso = ahora => {
            const t = Math.min((ahora - inicio) / duracion, 1);
            /* "instant" evita que el scroll suave propio del sitio reinicie el movimiento en cada cuadro */
            win.scrollTo({ top: destino * ease(t), behavior: 'instant' });
            if (t < 1 && l.classList.contains('vivo')) l._raf = requestAnimationFrame(paso);
        };
        l._raf = requestAnimationFrame(paso);
    };
    if (conMouse && !quieto) {
        const ioCerca = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { crearIframe(e.target); ioCerca.unobserve(e.target); } }), { rootMargin: '60% 0px' });
        laminasSitio.forEach(l => {
            ioCerca.observe(l);
            l.addEventListener('mouseenter', () => {
                const iframe = crearIframe(l);
                clearTimeout(l._espera); cancelAnimationFrame(l._raf);
                l.classList.remove('listo');
                l.classList.add('cargando', 'vivo');
                iframe.onload = () => {
                    l.classList.remove('cargando'); l.classList.add('listo');
                    l._espera = setTimeout(() => { if (l.classList.contains('vivo')) recorrer(l); }, 1700);
                };
                /* Recarga para que el sitio muestre otra vez su animación de entrada */
                try { iframe.contentWindow.location.reload(); } catch (err) { iframe.src = l.dataset.sitio; }
            });
            l.addEventListener('mouseleave', () => {
                clearTimeout(l._espera); cancelAnimationFrame(l._raf);
                l.classList.remove('vivo', 'cargando', 'listo');
            });
        });
        window.addEventListener('resize', () => laminasSitio.forEach(escalar));
    }

    /* --- 5. ARRANQUE DE LA APP (MEND) --- */
    const laminaApp = pila.querySelector('.lamina[data-app]');
    if (laminaApp && conMouse && !quieto) {
        laminaApp.addEventListener('mouseenter', () => laminaApp.classList.add('arranca'));
        laminaApp.addEventListener('mouseleave', () => laminaApp.classList.remove('arranca'));
    }

    /* --- 6. VISTA PREVIA EN MÓVIL --- */
    /* Sin mouse: la captura larga baja sola y la app de Mend arranca cuando la lámina está casi completa */
    if (!conMouse && !quieto) {
        const io = new IntersectionObserver(es => es.forEach(e => {
            const ver = e.intersectionRatio > 0.75;
            e.target.classList.toggle('viendo', ver);
            if (e.target.hasAttribute('data-app')) e.target.classList.toggle('arranca', ver);
        }), { threshold: [0, 0.75, 1] });
        pila.querySelectorAll('.lamina').forEach(l => io.observe(l));
    }

    /* --- 7. ENTRAR AL CASO --- */
    /* La escena completa viaja y se abre a sangre como portada del caso */
    paneles.forEach(p => {
        const lamina = p.querySelector('.lamina');
        const abrir = () => {
            cancelAnimationFrame(lamina._raf);
            window.abrirCaso(p.dataset.id, lamina, p.querySelector('.nombre'), { clonar: true });
        };
        lamina.addEventListener('click', abrir);
        lamina.addEventListener('keydown', e => { if (e.key === 'Enter') abrir(); });
    });
})();
/* =======================================================
   FIN JS · WORKS 3 PILA
   ======================================================= */
