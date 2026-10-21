/* =======================================================
   INICIO JS · PLANTILLA DE CASO
   ======================================================= */
/* Arma la página completa desde window.CASO: portada, resumen, decisiones con su escenario, proceso,
   resultado, aprendizaje y siguiente proyecto. Cada sección recibe su fondo del "ritmo" del caso y el tema
   del proyecto la viste. Después deja listas las letras que suben, las apariciones y el conteo de cifras */
(function () {
    const C = window.CASO;
    const main = document.querySelector('[data-caso]');
    const quieto = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const n2 = i => String(i + 1).padStart(2, '0');
    const ritmo = k => (C.ritmo && C.ritmo[k]) || 'oscuro';
    const vivo = C.vivo.publicado ? `<a href="${C.vivo.url}" target="_blank" rel="noopener">${C.vivo.texto} ↗</a>` : `${C.vivo.texto} · ${C.vivo.estado}`;
    const franja = (num, nombre, der = '') => `<div class="franja etiqueta"><span class="f-num">${num}</span><span class="f-nom"><i class="nodo" aria-hidden="true"></i>${nombre}</span><span class="f-der">${der}</span></div>`;
    /* Un título puede marcar su palabra clave con *asteriscos* (el tema decide cómo se destaca) */
    const clave = t => t.replace(/\*([^*]+)\*/g, '<span class="clave">$1</span>');

    /* --- 1. SECCIONES --- */
    main.innerHTML = `
        <section class="seccion grilla portada ${ritmo('portada')}">
            ${franja(`${C.numero} · ${C.nombre}`, C.disciplinas, `${C.anio} · ${vivo}`)}
            <h1 class="portada-titulo" aria-label="${C.nombre}">${C.titulo.map(l => `<span class="linea${l.clave ? ' clave' : ''}" data-letras>${l.t}</span>`).join('')}</h1>
            <p class="portada-bajada">${C.bajada}</p>
            <div class="portada-escena" aria-hidden="true">${C.escena.fondo ? `<img class="fondo" src="${C.escena.fondo}" alt="">` : ''}<div class="navegador"><div class="barra-nav"><i></i><i></i><i></i><span class="url">${C.vivo.texto}</span></div><img src="${C.poster}" alt=""></div></div>
            <div class="ficha">${C.ficha.map(([k, v]) => `<div><span class="etiqueta">${k}</span><span>${v}</span></div>`).join('')}</div>
        </section>

        <section class="seccion grilla resumen ${ritmo('resumen')}">
            ${franja('01', 'Resumen', C.anio)}
            <p class="resumen-intro" data-aparece>${C.intro}</p>
            <div class="resumen-cols">${C.resumen.map(([k, v], i) => `<div data-aparece style="--retraso:${i * 90}ms"><span class="etiqueta">${k}</span><p>${v}</p></div>`).join('')}</div>
        </section>

        <section class="seccion grilla evidencia ${ritmo('decisiones')}" id="decisiones">
            ${franja('02', 'Decisiones', `${n2(C.decisiones.length - 1)} decisiones`)}
            <h2 class="titulo-bloque" data-letras>${C.titulos.decisiones}</h2>
            <div class="relato" data-relato>${C.decisiones.map((d, i) => `
                <article class="bloque" id="d-${d.id}">
                    <span class="num etiqueta">Decisión ${n2(i)}</span>
                    <h3>${d.titulo}</h3>
                    <p>${d.texto}</p>
                    <p class="porque"><span class="etiqueta">Por qué</span>${d.porque}</p>
                    ${C.vivo.publicado && d.ancla && d.ancla.enlace ? `<a class="ver-vivo" href="${C.vivo.url}${d.ancla.enlace}" target="_blank" rel="noopener">Verlo en ${C.vivo.texto} ↗</a>` : ''}
                    <div class="pz-solo">${window.CASO_PIEZA(d)}</div>
                </article>`).join('')}
            </div>
            <div class="escenario" data-escenario aria-hidden="true">
                <div class="riel-ev"><ol>${C.decisiones.map((d, i) => `<li><button type="button" tabindex="-1" data-ir="${i}">${n2(i)}</button></li>`).join('')}</ol><span class="atajos etiqueta"><kbd data-k="j">J</kbd><kbd data-k="k">K</kbd></span></div>
                <div class="tablero" data-tablero>
                    <div class="vitrina" data-vitrina><div class="marco-nav"><div class="barra-nav"><i></i><i></i><i></i><span class="url">${C.vivo.texto}</span></div><div class="pantalla"><img src="${C.poster}" alt=""><div class="resalte" data-resalte><span class="r-txt"></span><i class="esq e1"></i><i class="esq e2"></i><i class="esq e3"></i><i class="esq e4"></i></div></div></div></div>
                    ${C.decisiones.map((d, i) => (d.ancla ? '' : `<div class="capa" data-capa="${i}">${window.CASO_PIEZA(d)}</div>`)).join('')}
                </div>
                <div class="pie-ev etiqueta"><span class="nota" data-nota></span><span data-estado></span></div>
            </div>
        </section>

        <section class="seccion grilla proceso ${ritmo('proceso')}">
            ${franja('03', 'Proceso', C.proceso[0][0] + ' a ' + C.proceso[C.proceso.length - 1][0])}
            <h2 class="titulo-bloque" data-letras>${C.titulos.proceso}</h2>
            <ol class="linea-tiempo" data-linea>${C.proceso.map(([f, t, d], i) => `<li data-aparece style="--retraso:${200 + i * 110}ms"><span class="etiqueta">${f}</span><strong>${t}</strong><p>${d}</p></li>`).join('')}</ol>
        </section>

        <section class="seccion grilla resultado ${ritmo('resultados')}">
            ${franja('04', 'Resultado', vivo)}
            <h2 class="titulo-bloque" data-letras>${C.titulos.resultados}</h2>
            <div class="cifras">${C.resultados.map(([c, t, v], i) => `<div data-aparece style="--retraso:${i * 90}ms"><b${C.contar ? ` data-contar="${c}"` : ''}>${c}</b><p>${t}</p>${v ? `<span class="verificar">${v}</span>` : ''}</div>`).join('')}</div>
            <div class="galeria">${C.galeria.imgs.map((src, i) => `<figure data-aparece style="--retraso:${i * 90}ms"><img src="${src}" alt="" loading="lazy" decoding="async"></figure>`).join('')}<span class="etiqueta">${C.galeria.nota}</span></div>
        </section>

        <section class="seccion grilla aprendizaje ${ritmo('aprendizaje')}">
            ${franja('05', 'Aprendizaje')}
            <blockquote data-aparece>${C.aprendizaje}</blockquote>
            <p class="creditos" data-aparece>${C.creditos}</p>
        </section>

        <a class="siguiente" href="#" style="--sig:${C.siguiente.tinte}">
            <div class="fila"><span>Siguiente proyecto</span><span>${C.siguiente.numero} / 03</span></div>
            <div class="nombre-sig"><b data-letras>${C.siguiente.nombre}</b><span>${C.siguiente.bajada} <span class="flecha">↗</span></span></div>
        </a>`;
    main.querySelectorAll('.titulo-bloque').forEach(t => { t.innerHTML = clave(t.innerHTML); });

    /* --- 2. LETRAS QUE SUBEN --- */
    /* Los títulos con palabra clave se parten respetando el destacado */
    const partir = el => {
        let i = 0;
        const letras = txt => txt.split(/(\s+)/).map(p => /^\s+$/.test(p) ? ' ' : '<span class="palabra" aria-hidden="true">' + [...p].map(c => `<span class="l" style="animation-delay:${(i++) * 26}ms">${c}</span>`).join('') + '</span>').join('');
        if (!el.hasAttribute('aria-label') && !el.closest('[aria-label]')) el.setAttribute('aria-label', el.textContent.trim());
        el.innerHTML = [...el.childNodes].map(n => (n.nodeType === 3 ? letras(n.textContent) : `<span class="${n.className}">${letras(n.textContent)}</span>`)).join('');
    };

    /* --- 3. APARICIONES, LÍNEA DE TIEMPO Y CONTEO --- */
    const contar = el => {
        const meta = el.dataset.contar, num = parseFloat(meta.replace(/\./g, '')), sufijo = meta.replace(/[\d.]/g, '');
        if (isNaN(num) || quieto) return;
        const t0 = performance.now(), dur = 1400;
        const paso = ahora => {
            const t = Math.min((ahora - t0) / dur, 1), v = Math.round(num * (1 - Math.pow(1 - t, 3)));
            el.textContent = v.toLocaleString('es-CL') + sufijo;
            if (t < 1) requestAnimationFrame(paso);
        };
        requestAnimationFrame(paso);
    };
    const io = new IntersectionObserver(es => es.forEach(e => {
        if (!e.isIntersecting) return;
        const el = e.target;
        el.classList.add(el.hasAttribute('data-letras') ? 'entra' : 'visto');
        el.querySelectorAll('[data-contar]').forEach(contar);
        io.unobserve(el);
    }), { threshold: 0.2, rootMargin: '0px 0px -8% 0px' });
    main.querySelectorAll('[data-letras]').forEach(el => { partir(el); io.observe(el); });
    main.querySelectorAll('[data-aparece], [data-linea]').forEach(el => (quieto ? el.classList.add('visto') : io.observe(el)));
})();
/* =======================================================
   FIN JS · PLANTILLA DE CASO
   ======================================================= */
