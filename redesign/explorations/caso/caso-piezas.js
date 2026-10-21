/* =======================================================
   INICIO JS · PIEZAS DE CADA DECISIÓN
   ======================================================= */
/* Devuelve el HTML de la pieza que acompaña a una decisión, según su tipo. Común a todos los casos */
(function () {
    const img = (src, extra = '') => `<img src="${src}" alt="" loading="lazy" decoding="async"${extra}>`;
    window.CASO_PIEZA = d => {
        const p = d.pieza;
        if (p.tipo === 'isos') return `
            <figure class="pz pz-isos">
                <div class="isos">${p.lista.map((src, i) => img(src, ` style="--i:${i}"${i === p.lista.length - 1 ? ' class="final"' : ''}`)).join('')}</div>
                <figcaption class="etiqueta">${p.pie}</figcaption>
            </figure>`;
        if (p.tipo === 'img') return `
            <figure class="pz pz-img${p.extra ? ' con-extra' : ''}">${img(p.src)}${p.extra ? img(p.extra, ' class="extra"') : ''}${p.pie ? `<figcaption class="etiqueta">${p.pie}</figcaption>` : ''}</figure>`;
        if (p.tipo === 'par') return `
            <figure class="pz pz-par">
                <div>${img(p.a)}<span class="etiqueta">${p.pieA}</span></div>
                <div>${img(p.b)}<span class="etiqueta">${p.pieB}</span></div>
            </figure>`;
        if (p.tipo === 'movil') return `
            <figure class="pz pz-movil">
                <div class="telefono-caso">${img(p.src)}</div>
                <ul class="chequeo etiqueta">${p.lista.map(x => `<li>${x}</li>`).join('')}</ul>
            </figure>`;
        if (p.tipo === 'caminos') return `
            <figure class="pz pz-caminos">
                <div class="caminos">${p.lista.map(([nombre, src, rasgo], i) => `
                    <div class="camino${i === p.elegido ? ' elegido' : ''}" style="--i:${i}"><div class="cuadro">${img(src)}</div><span class="etiqueta"><b>${nombre}</b> · ${rasgo}</span></div>`).join('')}
                </div>
                ${p.tabla ? `<div class="tabla">${img(p.tabla)}</div>` : ''}
                ${p.pie ? `<figcaption class="etiqueta">${p.pie}</figcaption>` : ''}
            </figure>`;
        return '';
    };
})();
/* =======================================================
   FIN JS · PIEZAS DE CADA DECISIÓN
   ======================================================= */
