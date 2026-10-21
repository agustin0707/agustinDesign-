/* =======================================================
   INICIO JS · WORKS 3 PILA
   ======================================================= */
(function () {
    const pila = document.getElementById('pila');
    const paneles = [...pila.querySelectorAll('.panel')];
    const quieto = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const conMouse = window.matchMedia('(hover: hover)').matches;

    /* --- 1. CUÁNTO CUBRE EL SIGUIENTE --- */
    /* Para cada panel, el progreso del siguiente subiendo sobre él define --q. Solo se escribe si cambió */
    let pendiente = false;
    const ultimo = new Map();
    const pintar = () => {
        pendiente = false;
        const h = window.innerHeight;
        paneles.forEach((p, i) => {
            const sig = paneles[i + 1] || document.querySelector('.archivo');
            const q = quieto ? 0 : Math.min(Math.max(1 - sig.getBoundingClientRect().top / h, 0), 1);
            const v = q.toFixed(3);
            if (ultimo.get(p) !== v) { p.style.setProperty('--q', v); ultimo.set(p, v); }
        });
    };
    window.addEventListener('scroll', () => { if (!pendiente) { pendiente = true; requestAnimationFrame(pintar); } }, { passive: true });
    window.addEventListener('resize', pintar);
    pintar();

    /* --- 2. SALTOS A CADA PROYECTO Y AL ARCHIVO --- */
    /* Los paneles son sticky: su lugar real es el inicio de la pila más n pantallas */
    const irA = y => window.scrollTo({ top: y, behavior: quieto ? 'auto' : 'smooth' });
    document.querySelectorAll('[data-salto]').forEach(a => a.addEventListener('click', e => {
        e.preventDefault();
        const i = paneles.findIndex(p => '#' + p.id === a.getAttribute('href'));
        irA(pila.getBoundingClientRect().top + window.scrollY + i * window.innerHeight);
    }));
    document.querySelectorAll('a[href="#archivo"]').forEach(a => a.addEventListener('click', e => { e.preventDefault(); irA(document.getElementById('archivo').getBoundingClientRect().top + window.scrollY); }));

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

    /* --- 4. SITIOS EN VIVO DENTRO DEL NAVEGADOR --- */
    /* Solo con mouse o teclado. El HTML se precarga cerca de la pantalla; el sitio se monta al pasar el mouse
       (con una pequeña espera para no cargarlo al cruzar la lámina de pasada), muestra su animación de entrada,
       baja solo y se desmonta al salir para no consumir recursos en segundo plano */
    const laminasSitio = [...pila.querySelectorAll('.lamina[data-sitio]')];
    const escalar = l => {
        const pantalla = l.querySelector('.navegador .pantalla'), iframe = pantalla.querySelector('iframe');
        if (!iframe) return;
        const escala = pantalla.clientWidth / 1440;
        iframe.style.setProperty('--escala', escala.toFixed(4));
        iframe.style.height = Math.ceil(pantalla.clientHeight / escala) + 'px';
    };
    const iframeDe = l => {
        let iframe = l.querySelector('iframe');
        if (!iframe) {
            iframe = document.createElement('iframe');
            iframe.title = 'Vista previa del sitio';
            iframe.setAttribute('tabindex', '-1');
            iframe.setAttribute('aria-hidden', 'true');
            l.querySelector('.navegador .pantalla').appendChild(iframe);
        }
        escalar(l);
        return iframe;
    };
    const recorrer = l => {
        const iframe = l.querySelector('iframe');
        let win, doc;
        try { win = iframe.contentWindow; doc = iframe.contentDocument; } catch (err) { return; }
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
    const encender = l => {
        clearTimeout(l._intento); clearTimeout(l._apagar);
        l._intento = setTimeout(() => {
            const iframe = iframeDe(l);
            const larga = l.querySelector('.larga');
            if (larga) larga.loading = 'eager';
            cancelAnimationFrame(l._raf); clearTimeout(l._espera);
            l.classList.remove('listo');
            l.classList.add('cargando', 'vivo');
            iframe.onload = () => {
                if (iframe.src.endsWith('about:blank')) return;
                l.classList.remove('cargando'); l.classList.add('listo');
                l._espera = setTimeout(() => { if (l.classList.contains('vivo')) recorrer(l); }, 1700);
            };
            /* Siempre carga de cero: así se ve la animación de entrada del sitio */
            iframe.src = l.dataset.sitio;
        }, 180);
    };
    const apagar = l => {
        clearTimeout(l._intento); clearTimeout(l._espera); cancelAnimationFrame(l._raf);
        l.classList.remove('vivo', 'cargando', 'listo');
        l._apagar = setTimeout(() => { const f = l.querySelector('iframe'); if (f && !l.classList.contains('vivo')) f.src = 'about:blank'; }, 450);
    };
    if (!quieto) {
        const ioCerca = new IntersectionObserver(es => es.forEach(e => {
            if (!e.isIntersecting) return;
            const link = document.createElement('link');
            link.rel = 'prefetch'; link.href = e.target.dataset.sitio;
            document.head.appendChild(link);
            ioCerca.unobserve(e.target);
        }), { rootMargin: '100% 0px' });
        laminasSitio.forEach(l => {
            ioCerca.observe(l);
            if (conMouse) { l.addEventListener('mouseenter', () => encender(l)); l.addEventListener('mouseleave', () => apagar(l)); }
            l.addEventListener('focus', () => encender(l));
            l.addEventListener('blur', () => apagar(l));
        });
        window.addEventListener('resize', () => laminasSitio.forEach(escalar));
    }

    /* --- 5. ARRANQUE DE LA APP (MEND) --- */
    const laminaApp = pila.querySelector('.lamina[data-app]');
    if (laminaApp && !quieto) {
        const on = () => laminaApp.classList.add('arranca'), off = () => laminaApp.classList.remove('arranca');
        if (conMouse) { laminaApp.addEventListener('mouseenter', on); laminaApp.addEventListener('mouseleave', off); }
        laminaApp.addEventListener('focus', on); laminaApp.addEventListener('blur', off);
    }

    /* --- 6. "VER CASO" QUE SIGUE AL CURSOR --- */
    /* Se mueve con inercia dentro de la lámina: la invitación a presionar está donde está la mano */
    if (conMouse && !quieto) {
        pila.querySelectorAll('.lamina').forEach(l => {
            const ver = l.querySelector('.ver');
            let tx = 0, ty = 0, x = 0, y = 0, corre = false;
            const paso = () => {
                x += (tx - x) * 0.16; y += (ty - y) * 0.16;
                ver.style.setProperty('--vx', x.toFixed(1) + 'px'); ver.style.setProperty('--vy', y.toFixed(1) + 'px');
                if (Math.abs(tx - x) + Math.abs(ty - y) > 0.4) requestAnimationFrame(paso); else corre = false;
            };
            l.addEventListener('mouseenter', e => { const r = l.getBoundingClientRect(); x = tx = e.clientX - r.left; y = ty = e.clientY - r.top; paso(); });
            l.addEventListener('mousemove', e => { const r = l.getBoundingClientRect(); tx = e.clientX - r.left; ty = e.clientY - r.top; if (!corre) { corre = true; requestAnimationFrame(paso); } });
        });
    }

    /* --- 7. VISTA PREVIA EN MÓVIL --- */
    /* Sin mouse: la captura larga baja sola y la app de Mend arranca cuando la lámina está casi completa */
    if (!conMouse && !quieto) {
        const io = new IntersectionObserver(es => es.forEach(e => {
            const ver = e.intersectionRatio > 0.75;
            e.target.classList.toggle('viendo', ver);
            if (e.target.hasAttribute('data-app')) e.target.classList.toggle('arranca', ver);
        }), { threshold: [0, 0.75, 1] });
        pila.querySelectorAll('.lamina').forEach(l => io.observe(l));
    }

    /* --- 8. ENTRAR AL CASO --- */
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
