// =======================================================
// MEDICIÓN DE FLUIDEZ: cuadros lentos durante el scroll y el hover
// Uso: PW=<playwright> U=<url> node medir-fluidez.cjs
// =======================================================
const pw = require(process.env.PW);
(async () => {
    const b = await pw.chromium.launch();
    const p = await b.newPage({ viewport: { width: 1440, height: 900 } });
    await p.goto(process.env.U, { waitUntil: 'networkidle' });
    await p.waitForTimeout(1500);

    /* --- 1. CONTADOR DE CUADROS EN LA PÁGINA --- */
    const empezar = () => p.evaluate(() => { window.__cuadros = []; let ant = performance.now(); const f = t => { window.__cuadros.push(t - ant); ant = t; if (window.__midiendo) requestAnimationFrame(f); }; window.__midiendo = true; requestAnimationFrame(f); });
    const terminar = async etiqueta => {
        const r = await p.evaluate(() => { window.__midiendo = false; const c = window.__cuadros.slice(2); const lentos = c.filter(x => x > 20).length; const muyLentos = c.filter(x => x > 50).length; const prom = c.reduce((a, x) => a + x, 0) / c.length; return { cuadros: c.length, fps: Math.round(1000 / prom), lentos, muyLentos, peor: Math.round(Math.max(...c)) }; });
        console.log(etiqueta.padEnd(34), `fps ${r.fps} · cuadros >20 ms: ${r.lentos} · >50 ms: ${r.muyLentos} · peor ${r.peor} ms`);
    };

    /* --- 2. SCROLL POR TODA LA PILA --- */
    await empezar();
    for (let i = 0; i < 60; i++) { await p.mouse.wheel(0, 70); await p.waitForTimeout(16); }
    await p.waitForTimeout(400);
    await terminar('Scroll por la pila');

    /* --- 3. HOVER CON SITIO EN VIVO + SCROLL DE LA PÁGINA --- */
    const top = await p.evaluate(() => document.getElementById('pila').getBoundingClientRect().top + scrollY);
    await p.evaluate(v => scrollTo(0, v + innerHeight), top); await p.waitForTimeout(800);
    const lm = await (await p.$('#p-tapin .lamina')).boundingBox();
    await empezar();
    await p.mouse.move(lm.x + lm.width / 2, lm.y + lm.height / 2);
    await p.waitForTimeout(5000);
    await terminar('Hover 5 s con sitio en vivo');
    await p.mouse.move(5, 5); await p.waitForTimeout(1200);
    await empezar();
    for (let i = 0; i < 30; i++) { await p.mouse.wheel(0, 60); await p.waitForTimeout(16); }
    await p.waitForTimeout(400);
    await terminar('Scroll después del hover');
    await b.close();
})();
