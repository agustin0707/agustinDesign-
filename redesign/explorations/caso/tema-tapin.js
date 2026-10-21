/* =======================================================
   INICIO JS · TEMA TAP IN (.tp-)
   ======================================================= */
/* Lo propio del caso Tap In: el hero (el wordmark y las tiras de la paleta con los isotipos de cada producto),
   el escaparate (los cuatro módulos de Connect funcionando en vivo) y las piezas de marca construidas en
   código: la arquitectura, la paleta y el cerebro que se separa en sus cuatro piezas */
(function () {
    const M = 'media/';
    const TONOS = [
        { nombre: 'Empresa', hex: '2D2560', iso: null, nota: 'Marca madre' },
        { nombre: 'Campus', hex: '4A3CAE', iso: 'tp-forky.svg', nota: '2025' },
        { nombre: 'Connect', hex: '6B5CE7', iso: 'tp-cerebro.svg', nota: '2026' },
        { nombre: 'Health', hex: '9B8EF0', iso: null, nota: 'En camino' }
    ];
    /* Una marca coloreable: el SVG se usa como máscara y toma el color del texto */
    const marca = (svg, clase = '') => `<span class="tp-marca ${clase}" style="--svg:url('${M}${svg}')" aria-hidden="true"></span>`;

    /* --- 1. HERO --- */
    window.CASO_HERO = (C, { franja, vivo }) => `
        <section class="seccion portada oscuro tp-hero" data-tp-hero>
            <div class="tp-escena" aria-hidden="true">
                <div class="tp-tiras">${TONOS.map((t, i) => `
                    <div class="tp-tira" style="--tono:#${t.hex};--i:${i}">
                        <span class="tp-tira-iso">${t.iso ? marca(t.iso) : i === 0 ? marca('tp-wordmark.svg', 'tp-wm-chico') : '<i class="tp-pendiente"></i>'}</span>
                        <span class="tp-tira-txt"><b>${t.nombre}</b> · #${t.hex} · ${t.nota}</span>
                    </div>`).join('')}
                </div>
            </div>
            <div class="grilla tp-hero-arriba">${franja(`${C.numero} · ${C.nombre}`, C.disciplinas, `${C.anio} · ${vivo}`)}</div>
            <div class="grilla tp-hero-cuerpo">
                <h1 class="tp-titulo" aria-label="${C.nombre}">${marca('tp-wordmark.svg', 'tp-wm')}</h1>
                <p class="tp-hero-bajada">${C.bajada}</p>
                <dl class="tp-hero-meta">${C.heroMeta.map(([k, v]) => `<div><dt class="etiqueta">${k}</dt><dd>${v}</dd></div>`).join('')}</dl>
            </div>
            <a class="tp-bajar etiqueta" href="#escaparate">Ver el proyecto ↓</a>
        </section>
        ${window.CASO_ESCAPARATE(C)}`;

    /* --- 2. ESCAPARATE: LOS CUATRO MÓDULOS EN VIVO --- */
    /* La imagen inicial del caso ya no repite el mockup del índice: muestra el producto funcionando */
    window.CASO_ESCAPARATE = C => `
        <section class="seccion grilla marca tp-escaparate" id="escaparate">
            <div class="franja etiqueta"><span class="f-num">${C.escaparate.num}</span><span class="f-nom"><i class="nodo" aria-hidden="true"></i>${C.escaparate.nombre}</span><span class="f-der">${C.escaparate.der}</span></div>
            <h2 class="titulo-bloque" data-letras>${C.escaparate.titulo}</h2>
            <div class="tp-modulos">${C.escaparate.modulos.map(([nombre, que, src], i) => `
                <figure class="tp-modulo" style="--i:${i}" data-aparece>
                    <figcaption><span class="tp-pill">${nombre}</span><span class="etiqueta">${que}</span></figcaption>
                    <div class="mk-marco" data-mockup="${src}"></div>
                </figure>`).join('')}
            </div>
            <p class="tp-escaparate-nota etiqueta">${C.escaparate.nota}</p>
            <div class="ficha">${C.ficha.map(([k, v]) => `<div><span class="etiqueta">${k}</span><span>${v}</span></div>`).join('')}</div>
        </section>`;

    /* --- 3. PIEZAS PROPIAS --- */
    window.CASO_PIEZAS = window.CASO_PIEZAS || {};
    /* Arquitectura: la madre lidera y cada producto cuelga de ella con su tono; un lugar vacío espera al cuarto */
    window.CASO_PIEZAS['tp-arquitectura'] = p => `
        <figure class="pz tp-arq">
            <div class="tp-arq-madre">${marca('tp-wordmark.svg', 'tp-wm-arq')}<span class="etiqueta">Marca madre · lidera siempre</span></div>
            <ul class="tp-arq-hijos">${TONOS.slice(1).map((t, i) => `
                <li style="--tono:#${t.hex};--i:${i}"><span class="tp-arq-iso">${t.iso ? marca(t.iso) : '<i class="tp-pendiente"></i>'}</span><span class="tp-lockup">${marca('tp-wordmark.svg', 'tp-wm-mini')}<b>${t.nombre}</b></span><span class="etiqueta">#${t.hex}</span></li>`).join('')}
                <li class="tp-arq-nuevo" style="--i:3"><span class="tp-arq-iso"><i class="tp-pendiente"></i></span><span class="tp-lockup">${marca('tp-wordmark.svg', 'tp-wm-mini')}<b>…</b></span><span class="etiqueta">${p.nuevo}</span></li>
            </ul>
            <figcaption class="etiqueta">${p.pie}</figcaption>
        </figure>`;
    /* Paleta: una sola familia; cada producto es un tono. Connect no lleva el más oscuro */
    window.CASO_PIEZAS['tp-paleta'] = p => `
        <figure class="pz tp-paleta">
            <div class="tp-sws">${TONOS.map((t, i) => `
                <div class="tp-sw${t.nombre === 'Connect' ? ' destacado' : ''}" style="--tono:#${t.hex};--i:${i}"><span class="tp-sw-n">${t.nombre}</span><span class="etiqueta">#${t.hex}</span></div>`).join('')}
            </div>
            <div class="tp-sws-sup">${[['Soft', 'C8C0F8'], ['Tint', 'EEEDFE'], ['Superficie', 'F2F1F8'], ['Texto', '2C2B3A']].map(([n, h]) => `<span style="--tono:#${h}"><i></i>${n} · #${h}</span>`).join('')}</div>
            <figcaption class="etiqueta">${p.pie}</figcaption>
        </figure>`;
    /* Cerebro: "a la rápida, un cerebro; si te fijas, cuatro piezas". El SVG se carga inline para mover sus piezas */
    window.CASO_PIEZAS['tp-cerebro'] = p => `
        <figure class="pz tp-cerebro" data-cerebro>
            <div class="tp-cer-svg" aria-label="Isotipo de Tap In Connect" role="img"></div>
            <div class="tp-cer-modos"><button type="button" tabindex="-1" data-modo="rapido" class="on">A la rápida: un cerebro</button><button type="button" tabindex="-1" data-modo="fijo">Si te fijas: cuatro piezas</button></div>
            <div class="tp-descartes">${p.descartes.map(src => `<img src="${src}" alt="" loading="lazy" decoding="async">`).join('')}<span class="etiqueta">${p.pieDescartes}</span></div>
        </figure>`;
    /* Código: la escala del trabajo y la versión móvil */
    window.CASO_PIEZAS['tp-codigo'] = p => `
        <figure class="pz tp-codigo">
            <div class="telefono-caso"><img src="${p.movil}" alt="" loading="lazy" decoding="async"></div>
            <dl class="tp-cod-datos">${p.datos.map(([n, t]) => `<div><dt>${n}</dt><dd>${t}</dd></div>`).join('')}</dl>
            <figcaption class="etiqueta">${p.pie}</figcaption>
        </figure>`;

    /* --- 4. COMPORTAMIENTO --- */
    (window.CASO_INICIOS = window.CASO_INICIOS || []).push((C, { quieto }) => {
        /* Hero: entra al cargar y las capas siguen levemente al cursor (con inercia) */
        const hero = document.querySelector('[data-tp-hero]');
        requestAnimationFrame(() => hero.classList.add('entra'));
        if (!quieto && window.matchMedia('(hover: hover)').matches) {
            let tx = 0, ty = 0, x = 0, y = 0, corre = false;
            const paso = () => {
                x += (tx - x) * 0.06; y += (ty - y) * 0.06;
                hero.style.setProperty('--mx', x.toFixed(3)); hero.style.setProperty('--my', y.toFixed(3));
                if (Math.abs(tx - x) + Math.abs(ty - y) > 0.002) requestAnimationFrame(paso); else corre = false;
            };
            hero.addEventListener('pointermove', e => {
                const r = hero.getBoundingClientRect();
                tx = (e.clientX - r.left) / r.width - 0.5; ty = (e.clientY - r.top) / r.height - 0.5;
                if (!corre) { corre = true; requestAnimationFrame(paso); }
            });
            hero.addEventListener('pointerleave', () => { tx = 0; ty = 0; if (!corre) { corre = true; requestAnimationFrame(paso); } });
        }

        /* Cerebro: se inserta el SVG oficial y cada pieza sabe hacia dónde separarse (desde el centro) */
        fetch(M + 'tp-cerebro.svg').then(r => r.text()).then(svg => {
            document.querySelectorAll('[data-cerebro]').forEach(fig => {
                const caja = fig.querySelector('.tp-cer-svg');
                caja.innerHTML = svg.replace(/<\?xml[^>]*>/, '').replace(/<style>[\s\S]*?<\/style>/, '');
                const el = caja.querySelector('svg'), vb = el.viewBox.baseVal, cx = vb.width / 2, cy = vb.height / 2;
                el.removeAttribute('width'); el.removeAttribute('height');
                el.querySelectorAll('path').forEach((pth, k) => {
                    pth.classList.add('tp-pieza', 'p' + (k + 1));
                    const b = pth.getBBox(), dx = b.x + b.width / 2 - cx, dy = b.y + b.height / 2 - cy, l = Math.hypot(dx, dy) || 1;
                    pth.style.setProperty('--dx', (dx / l * 46).toFixed(1) + 'px'); pth.style.setProperty('--dy', (dy / l * 46).toFixed(1) + 'px');
                });
                const botones = [...fig.querySelectorAll('[data-modo]')];
                const modo = m => { fig.classList.toggle('fijo', m === 'fijo'); botones.forEach(b => b.classList.toggle('on', b.dataset.modo === m)); };
                let t = null, manual = false;
                const andar = () => { if (manual || quieto || t) return; modo('rapido'); t = setInterval(() => modo(fig.classList.contains('fijo') ? 'rapido' : 'fijo'), 2400); };
                const parar = () => { clearInterval(t); t = null; };
                botones.forEach(b => b.addEventListener('click', () => { manual = true; parar(); modo(b.dataset.modo); }));
                const capa = fig.closest('[data-capa]');
                if (capa) { capa.addEventListener('capa-on', andar); capa.addEventListener('capa-off', () => { parar(); manual = false; modo('rapido'); }); }
                else new IntersectionObserver(es => es.forEach(e => (e.isIntersecting ? andar() : (parar(), (manual = false)))), { threshold: 0.4 }).observe(fig);
            });
        });
    });
})();
/* =======================================================
   FIN JS · TEMA TAP IN (.tp-)
   ======================================================= */
