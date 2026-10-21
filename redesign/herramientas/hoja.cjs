// =======================================================
// HOJA DE CONTACTO: captura un HTML local de revisión en JPG
// Uso: PW=<ruta a playwright> F=<archivo.html> [W=1880] [H=1300] node hoja.cjs
// =======================================================
const pw = require(process.env.PW);
(async () => {
    const b = await pw.chromium.launch();
    const p = await b.newPage({ viewport: { width: +process.env.W || 1880, height: +process.env.H || 1300 } });
    await p.goto('file://' + process.env.F);
    await p.waitForTimeout(600);
    await p.screenshot({ path: process.env.F.replace('.html', '.jpg'), type: 'jpeg', quality: 72, fullPage: true });
    await b.close();
})();
