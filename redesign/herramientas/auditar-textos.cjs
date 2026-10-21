// =======================================================
// AUDITORÍA DE TEXTOS: cortes, desbordes y choques en varios anchos
// Uso: PW=<playwright> U=<url> OUT=<carpeta> node auditar-textos.cjs
// =======================================================
const pw = require(process.env.PW);
const U = process.env.U, out = process.env.OUT;

/* --- 1. DETECTOR QUE CORRE DENTRO DE LA PÁGINA --- */
/* Busca: texto más ancho que su caja recortada, elementos que salen del viewport y textos hermanos que se pisan */
const detectar = () => {
    const vw = innerWidth, problemas = [];
    const visible = el => { const r = el.getBoundingClientRect(); const cs = getComputedStyle(el); return r.width > 0 && r.height > 0 && cs.visibility !== 'hidden' && cs.display !== 'none' && r.bottom > 0 && r.top < innerHeight; };
    const nombre = el => (el.className && typeof el.className === 'string' ? '.' + el.className.split(' ')[0] : el.tagName.toLowerCase()) + ' «' + el.textContent.trim().replace(/\s+/g, ' ').slice(0, 30) + '»';
    document.querySelectorAll('body *').forEach(el => {
        if (!visible(el) || el.closest('.caso, iframe, .viajero')) return;
        const cs = getComputedStyle(el), r = el.getBoundingClientRect();
        const tieneTexto = [...el.childNodes].some(n => n.nodeType === 3 && n.textContent.trim());
        if (tieneTexto && (cs.overflow !== 'visible' || cs.textOverflow === 'ellipsis') && el.scrollWidth > el.clientWidth + 1) problemas.push('CORTE horizontal ' + nombre(el));
        if (tieneTexto && r.right > vw + 1 && !el.closest('.riel')) problemas.push('SALE del viewport ' + nombre(el) + ' (' + Math.round(r.right - vw) + ' px)');
    });
    document.querySelectorAll('.tope, .fila-top, .pie, .apertura').forEach(fila => {
        const hijos = [...fila.children].filter(visible);
        for (let i = 0; i < hijos.length; i++) for (let j = i + 1; j < hijos.length; j++) {
            const a = hijos[i].getBoundingClientRect(), b = hijos[j].getBoundingClientRect();
            const choca = a.left < b.right - 2 && b.left < a.right - 2 && a.top < b.bottom - 2 && b.top < a.bottom - 2;
            if (choca && !(hijos[i].matches('.nombre') || hijos[j].matches('.nombre'))) problemas.push('CHOQUE ' + nombre(hijos[i]) + ' con ' + nombre(hijos[j]));
        }
    });
    return [...new Set(problemas)];
};

(async () => {
    const b = await pw.chromium.launch();
    for (const [w, h] of [[1920, 1080], [1440, 900], [1280, 720], [1024, 768], [768, 1024], [390, 844]]) {
        const p = await b.newPage({ viewport: { width: w, height: h }, isMobile: w < 769, hasTouch: w < 769 });
        await p.goto(U, { waitUntil: 'networkidle' }); await p.waitForTimeout(1500);
        const top = await p.evaluate(() => document.getElementById('pila').getBoundingClientRect().top + scrollY);
        const paradas = [['apertura', 0], ['p1', top], ['p2', top + h], ['p3', top + 2 * h], ['archivo', top + 3 * h]];
        const todos = [];
        for (const [n, y] of paradas) {
            await p.evaluate(v => scrollTo(0, v), y); await p.waitForTimeout(1300);
            (await p.evaluate(detectar)).forEach(x => todos.push(n + ': ' + x));
            await p.screenshot({ path: `${out}/${w}-${n}.jpg`, type: 'jpeg', quality: 55 });
        }
        console.log(`\n== ${w}x${h}`); console.log(todos.length ? todos.join('\n') : 'sin problemas detectados');
        await p.close();
    }
    await b.close();
})();
