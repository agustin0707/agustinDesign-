/* =======================================================
   INICIO JS · BASE COMÚN DEL ÍNDICE DE TRABAJOS
   ======================================================= */
(function () {
    /* --- 1. DATOS DE LOS PROYECTOS --- */
    /* Textos de prueba basados en las notas de los casos; el copy final se escribe en la Fase 4 */
    const proyectos = {
        llego: { nombre: 'Llegó Farma', anio: '2026', disciplinas: 'Marca · One page', cliente: 'Submarca de logística de salud', rol: 'Identidad, manual y sitio web', vivo: 'Lanzamiento esta semana', img: 'media/llego-web.jpg', img2: 'media/llego-foto2.jpg', intro: 'Gané el pitch contra el diseñador que ya tenía la marca madre, y diseñé y construí la identidad y el sitio de la nueva submarca de logística farmacéutica.' },
        tapin: { nombre: 'Tap In', anio: '2025–26', disciplinas: 'Marca · Producto · Web', cliente: 'Startup edtech', rol: 'Rebranding, UX/UI y desarrollo web', vivo: 'tapin.cl', img: 'media/tapin-web.jpg', img2: 'media/tapin-app.jpg', intro: 'De la cafetería del campus a la plataforma del colegio. Una marca, una app y un sitio que acompañaron el pivote completo de una startup.' },
        mend: { nombre: 'Mend', anio: '2026', disciplinas: 'Investigación · Marca · Web app', cliente: 'Proyecto de título · salud articular', rol: 'Investigación, identidad, UX/UI y desarrollo', vivo: 'Prototipo con acceso', img: 'media/mend-web.jpg', img2: 'media/mend-app.jpg', intro: 'Una app de salud articular para Atención Primaria, diseñada y construida de punta a punta. En Mend, la accesibilidad manda sobre el manual de marca.' }
    };
    const archivo = [['La Columna', '2022–24'], ['HAI Group', '2024'], ['Mido', '2024–25'], ['Entrena Po', '2023–24'], ['Posters y afiches', '2022–25']];
    window.WORKS = { proyectos };

    const quieto = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const dur = ms => (quieto ? 1 : ms);

    /* --- 2. ARCHIVO --- */
    const listaArchivo = document.querySelector('[data-archivo]');
    if (listaArchivo) listaArchivo.innerHTML = archivo.map(([n, a]) => `<li><a href="#"><span>${n}</span><span class="mono">${a}</span></a></li>`).join('');

    /* --- 3. PÁGINA DE CASO DE PRUEBA --- */
    document.body.insertAdjacentHTML('beforeend', `
        <div class="caso" role="dialog" aria-modal="true" aria-label="Caso">
            <button class="caso-volver mono" type="button">← Volver al índice</button>
            <div class="caso-media"><img alt=""><h2 class="caso-titulo"></h2></div>
            <div class="caso-cuerpo">
                <div class="caso-ficha mono aparece"></div>
                <p class="caso-intro aparece"></p>
                <p class="caso-nota aparece">Página de caso de prueba para ver la transición. El diseño real del caso es la sección 3.</p>
                <div class="caso-segunda aparece"><img alt=""></div>
            </div>
        </div>`);
    const caso = document.querySelector('.caso');
    const media = caso.querySelector('.caso-media');
    const titulo = caso.querySelector('.caso-titulo');
    const volver = caso.querySelector('.caso-volver');
    let origen = null, tituloOrigen = null, scrollGuardado = 0;

    /* --- 4. BLOQUEO DE SCROLL SEGURO PARA IOS --- */
    const bloquear = () => { scrollGuardado = window.scrollY; document.body.style.top = `-${scrollGuardado}px`; document.body.classList.add('bloqueado'); };
    const desbloquear = () => { document.body.classList.remove('bloqueado'); document.body.style.top = ''; window.scrollTo(0, scrollGuardado); };

    const rectDe = el => { const r = el.getBoundingClientRect(); return { top: r.top, left: r.left, width: r.width, height: r.height }; };
    const viajero = (src, r, radio) => {
        const v = document.createElement('div');
        v.className = 'viajero';
        Object.assign(v.style, { top: r.top + 'px', left: r.left + 'px', width: r.width + 'px', height: r.height + 'px', borderRadius: radio || '0px' });
        v.innerHTML = `<img src="${src}" alt="">`;
        document.body.appendChild(v);
        return v;
    };

    /* --- 5. ABRIR CASO --- */
    /* La imagen presionada viaja hasta la portada; el título viaja desde su lugar en el índice */
    window.abrirCaso = (id, desde, desdeTitulo) => {
        const p = proyectos[id];
        origen = desde; tituloOrigen = desdeTitulo || null;
        media.querySelector('img').src = p.img;
        titulo.textContent = p.nombre;
        caso.querySelector('.caso-ficha').innerHTML = `<div><span class="gris">Cliente</span><span>${p.cliente}</span></div><div><span class="gris">Rol</span><span>${p.rol}</span></div><div><span class="gris">Año</span><span>${p.anio}</span></div><div><span class="gris">En vivo</span><span>${p.vivo}</span></div>`;
        caso.querySelector('.caso-intro').textContent = p.intro;
        caso.querySelector('.caso-segunda img').src = p.img2;

        const rInicio = rectDe(desde);
        const radio = getComputedStyle(desde).borderRadius;
        bloquear();
        caso.scrollTop = 0;
        caso.classList.add('abierto');
        /* El clon viaja dentro de la portada, debajo del título, mientras la imagen final espera oculta */
        const imgCaso = media.querySelector('img');
        imgCaso.style.opacity = 0; titulo.style.opacity = 0;
        caso.animate([{ backgroundColor: 'rgba(11,11,11,0)' }, { backgroundColor: 'rgba(11,11,11,1)' }], { duration: dur(700), easing: 'ease', fill: 'both' });
        const rFin = rectDe(media);
        const v = viajero(p.img, rInicio, radio);
        media.insertBefore(v, titulo);
        const viaje = v.animate([
            { top: rInicio.top + 'px', left: rInicio.left + 'px', width: rInicio.width + 'px', height: rInicio.height + 'px', borderRadius: radio },
            { top: rFin.top + 'px', left: rFin.left + 'px', width: rFin.width + 'px', height: rFin.height + 'px', borderRadius: '0px' }
        ], { duration: dur(1050), easing: 'cubic-bezier(0.76, 0, 0.24, 1)', fill: 'forwards' });

        /* Título: FLIP desde el nombre del índice, o subida simple si no hay origen */
        const rTit = titulo.getBoundingClientRect();
        if (tituloOrigen) {
            const rO = tituloOrigen.getBoundingClientRect();
            const s = parseFloat(getComputedStyle(tituloOrigen).fontSize) / parseFloat(getComputedStyle(titulo).fontSize);
            const dx = rO.left - rTit.left, dy = rO.bottom - rTit.bottom;
            tituloOrigen.style.opacity = 0;
            titulo.style.opacity = 1;
            titulo.animate([{ transform: `translate(${dx}px, ${dy}px) scale(${s})` }, { transform: 'none' }], { duration: dur(1050), easing: 'cubic-bezier(0.76, 0, 0.24, 1)', fill: 'both' });
        } else {
            titulo.animate([{ opacity: 0, transform: 'translateY(40px)' }, { opacity: 1, transform: 'none' }], { duration: dur(900), delay: dur(650), easing: 'cubic-bezier(0.16, 1, 0.3, 1)', fill: 'both' });
            titulo.style.opacity = 1;
        }

        viaje.onfinish = () => {
            imgCaso.style.opacity = 1; v.remove();
            caso.querySelectorAll('.aparece').forEach((el, i) => el.animate([{ opacity: 0, transform: 'translateY(24px)' }, { opacity: 1, transform: 'none' }], { duration: dur(900), delay: dur(i * 90), easing: 'cubic-bezier(0.16, 1, 0.3, 1)', fill: 'forwards' }));
            volver.animate([{ opacity: 0 }, { opacity: 1 }], { duration: dur(500), fill: 'forwards' });
            volver.focus({ preventScroll: true });
        };
    };

    /* --- 6. CERRAR CASO --- */
    /* El camino inverso: la portada vuelve a su lugar en el índice */
    const cerrar = () => {
        if (!caso.classList.contains('abierto')) return;
        caso.scrollTo({ top: 0 });
        const rInicio = rectDe(media);
        desbloquear();
        const rFin = origen ? rectDe(origen) : rInicio;
        const radio = origen ? getComputedStyle(origen).borderRadius : '0px';
        const v = viajero(media.querySelector('img').src, rInicio, '0px');
        caso.querySelectorAll('.aparece').forEach(el => { el.getAnimations().forEach(a => a.cancel()); });
        volver.getAnimations().forEach(a => a.cancel());
        media.querySelector('img').style.opacity = 0; titulo.style.opacity = 0;
        caso.animate([{ backgroundColor: 'rgba(11,11,11,1)' }, { backgroundColor: 'rgba(11,11,11,0)' }], { duration: dur(700), easing: 'ease', fill: 'both' });
        const vuelta = v.animate([
            { top: rInicio.top + 'px', left: rInicio.left + 'px', width: rInicio.width + 'px', height: rInicio.height + 'px', borderRadius: '0px' },
            { top: rFin.top + 'px', left: rFin.left + 'px', width: rFin.width + 'px', height: rFin.height + 'px', borderRadius: radio }
        ], { duration: dur(900), easing: 'cubic-bezier(0.76, 0, 0.24, 1)', fill: 'forwards' });
        vuelta.onfinish = () => {
            v.remove(); caso.classList.remove('abierto'); caso.getAnimations().forEach(a => a.cancel());
            if (tituloOrigen) tituloOrigen.style.opacity = '';
            /* El foco vuelve al proyecto desde el que se entró */
            const foco = (tituloOrigen && tituloOrigen.closest('[tabindex]')) || origen;
            if (foco) foco.focus?.({ preventScroll: true });
            document.dispatchEvent(new CustomEvent('caso:cerrado'));
        };
    };
    volver.addEventListener('click', cerrar);
    document.addEventListener('keydown', e => { if (e.key === 'Escape') cerrar(); });
})();
/* =======================================================
   FIN JS · BASE COMÚN DEL ÍNDICE DE TRABAJOS
   ======================================================= */
