/* =======================================================
   INICIO JS · EVIDENCIA (SITIO REAL AL LADO DEL RELATO)
   ======================================================= */
/* Mecánica común a todos los casos. Cada decisión puede tener un "ancla" en el sitio en vivo:
   scroll (fijo) o sel (sección a la que bajar), marco (qué señalar), nota (qué dice el escenario),
   abrir (elemento al que agregar .is-open) y demo (elementos que se activan en secuencia para mostrar
   la interacción). Sin ancla, el escenario muestra la pieza de marca de esa decisión */
(function () {
    const C = window.CASO;
    const n2 = i => String(i + 1).padStart(2, '0');
    const quieto = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const escritorio = () => window.matchMedia('(min-width: 901px)').matches;
    const $ = s => document.querySelector(s);
    const bloques = [...document.querySelectorAll('.bloque')];
    const capas = [...document.querySelectorAll('[data-capa]')];
    const vitrina = $('[data-vitrina]'), pantalla = vitrina.querySelector('.pantalla');
    const resalte = $('[data-resalte]'), resalteTxt = resalte.querySelector('.r-txt');
    const nota = $('[data-nota]'), estado = $('[data-estado]');
    const botones = [...document.querySelectorAll('.riel-ev [data-ir]')];
    let iframe = null, win = null, doc = null, listo = false, actual = -1, abierto = null, demo = null, raf = null, remedir = null;

    /* --- 1. SITIO EN VIVO --- */
    /* Se carga en reposo apenas abre la página (nunca mientras se hace scroll, que comparte el hilo
       principal) y espera a que termine la entrada del sitio antes de mostrarse */
    const escalar = () => {
        if (!iframe) return 1;
        const e = pantalla.clientWidth / 1440;
        iframe.style.setProperty('--escala', e.toFixed(4));
        iframe.style.height = Math.ceil(pantalla.clientHeight / e) + 'px';
        return e;
    };
    estado.textContent = 'Cargando el sitio…';
    const montar = () => {
        if (iframe || !escritorio()) return;
        iframe = document.createElement('iframe');
        iframe.title = `Sitio de ${C.nombre}`; iframe.setAttribute('tabindex', '-1');
        pantalla.insertBefore(iframe, resalte);
        escalar();
        iframe.onload = () => {
            try { win = iframe.contentWindow; doc = iframe.contentDocument; } catch (err) { return; }
            const estilo = doc.createElement('style');
            estilo.textContent = 'html{scrollbar-width:none;scroll-behavior:auto!important}html::-webkit-scrollbar{display:none}';
            doc.head.appendChild(estilo);
            setTimeout(() => {
                listo = true; vitrina.classList.add('cargado');
                estado.textContent = 'Sitio en vivo';
                const a = actual; actual = -1; activar(Math.max(a, 0));
            }, +C.introSitio || 2400);
        };
        iframe.src = C.sitio;
    };
    let quietud;
    const enReposo = () => { clearTimeout(quietud); quietud = setTimeout(montar, 400); };
    window.addEventListener('scroll', enReposo, { passive: true });
    if (document.readyState === 'complete') enReposo(); else window.addEventListener('load', enReposo);

    /* --- 2. LLEVAR EL SITIO A LA PARTE DE CADA DECISIÓN --- */
    const avance = t => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);
    const desplazar = (hasta, alTerminar) => {
        cancelAnimationFrame(raf);
        const desde = win.scrollY, dur = quieto ? 1 : Math.min(500 + Math.abs(hasta - desde) * 0.18, 1200), t0 = performance.now();
        const paso = ahora => {
            const t = Math.min((ahora - t0) / dur, 1);
            win.scrollTo({ top: desde + (hasta - desde) * avance(t), behavior: 'instant' });
            if (t < 1) raf = requestAnimationFrame(paso); else alTerminar();
        };
        raf = requestAnimationFrame(paso);
    };
    /* El resalte envuelve la unión de las cajas indicadas, en coordenadas de la vitrina */
    const marcar = (d, i) => {
        if (actual !== i) return;
        const e = escalar(), sel = d.ancla.marco || d.ancla.sel;
        const cajas = [...doc.querySelectorAll(sel)].map(el => el.getBoundingClientRect()).filter(r => r.width && r.height && r.bottom > 0 && r.top < win.innerHeight);
        if (!cajas.length) { resalte.classList.remove('on'); return; }
        const pad = 10 / e;
        const x0 = Math.max(Math.min(...cajas.map(r => r.left)) - pad, 0), y0 = Math.max(Math.min(...cajas.map(r => r.top)) - pad, 0);
        const x1 = Math.min(Math.max(...cajas.map(r => r.right)) + pad, 1440), y1 = Math.min(Math.max(...cajas.map(r => r.bottom)) + pad, win.innerHeight);
        [['--x', x0], ['--y', y0], ['--w', x1 - x0], ['--h', y1 - y0]].forEach(([k, v]) => resalte.style.setProperty(k, (v * e).toFixed(1) + 'px'));
        resalteTxt.textContent = d.ancla.nota || `Decisión ${n2(i)}`;
        resalte.classList.add('on');
    };
    /* Modo demostración: activa los elementos indicados uno tras otro, como lo haría una persona */
    const demostrar = (d, i) => {
        clearInterval(demo);
        if (!d.ancla.demo || quieto) return;
        const els = [...doc.querySelectorAll(d.ancla.demo.sel)];
        if (!els.length) return;
        let k = 0;
        demo = setInterval(() => {
            if (actual !== i) { clearInterval(demo); return; }
            k = (k + 1) % els.length;
            els[k].dispatchEvent(new MouseEvent(d.ancla.demo.evento || 'mouseenter', { bubbles: true }));
            setTimeout(() => marcar(d, i), 450);
        }, d.ancla.demo.cada || 1400);
    };
    const activar = i => {
        if (i === actual || i < 0) return;
        actual = i;
        const d = C.decisiones[i];
        bloques.forEach((b, k) => b.classList.toggle('actual', k === i));
        botones.forEach((b, k) => { b.classList.toggle('actual', k === i); b.classList.toggle('ya', k < i); });
        capas.forEach(c => c.classList.toggle('on', +c.dataset.capa === i));
        vitrina.classList.toggle('on', !!d.ancla);
        nota.textContent = d.ancla ? (d.ancla.nota ? `Marcado: ${d.ancla.nota}` : '') : (d.pieza.nota || '');
        clearInterval(demo); clearTimeout(remedir);
        if (abierto) { abierto.classList.remove('is-open'); abierto = null; }
        resalte.classList.remove('on');
        if (!d.ancla || !listo) return;
        const el = d.ancla.sel && doc.querySelector(d.ancla.sel);
        const max = doc.documentElement.scrollHeight - win.innerHeight;
        const hasta = d.ancla.scroll !== undefined ? d.ancla.scroll : el ? Math.min(el.getBoundingClientRect().top + win.scrollY, max) : 0;
        desplazar(hasta, () => {
            if (actual !== i) return;
            if (d.ancla.abrir) { abierto = doc.querySelector(d.ancla.abrir); if (abierto) abierto.classList.add('is-open'); }
            setTimeout(() => marcar(d, i), d.ancla.abrir ? 380 : 140);
            /* Segunda medida: el sitio anima lo que entra en pantalla y las cajas pueden moverse */
            remedir = setTimeout(() => marcar(d, i), 1100);
            demostrar(d, i);
        });
    };

    /* --- 3. DECISIÓN ACTUAL SEGÚN EL SCROLL --- */
    let pendiente = false;
    const pintar = () => {
        pendiente = false;
        if (!escritorio()) return;
        const mitad = window.innerHeight * 0.5;
        let i = 0;
        bloques.forEach((b, k) => { if (b.getBoundingClientRect().top < mitad) i = k; });
        activar(i);
    };
    window.addEventListener('scroll', () => { if (!pendiente) { pendiente = true; requestAnimationFrame(pintar); } }, { passive: true });
    window.addEventListener('resize', () => { escalar(); const a = actual; actual = -1; activar(a); });
    pintar();

    /* --- 4. RIEL Y ATAJOS J / K --- */
    /* Ir a una decisión deja su bloque a la altura en que se activa */
    const ir = i => {
        const b = bloques[Math.min(Math.max(i, 0), bloques.length - 1)];
        const y = b.getBoundingClientRect().top + window.scrollY - window.innerHeight * 0.3;
        window.scrollTo({ top: y, behavior: quieto ? 'auto' : 'smooth' });
    };
    botones.forEach(b => b.addEventListener('click', () => ir(+b.dataset.ir)));
    const seccion = document.getElementById('decisiones');
    document.addEventListener('keydown', e => {
        const paso = { j: 1, k: -1 }[e.key.toLowerCase()];
        if (!paso || e.metaKey || e.ctrlKey || e.altKey || /input|textarea/i.test(e.target.tagName)) return;
        const r = seccion.getBoundingClientRect();
        if (r.top > window.innerHeight * 0.6 || r.bottom < window.innerHeight * 0.4) return;
        ir(actual + paso);
        const kbd = document.querySelector(`.riel-ev kbd[data-k="${e.key.toLowerCase()}"]`);
        if (kbd) { kbd.classList.add('on'); setTimeout(() => kbd.classList.remove('on'), 160); }
    });
})();
/* =======================================================
   FIN JS · EVIDENCIA (SITIO REAL AL LADO DEL RELATO)
   ======================================================= */
