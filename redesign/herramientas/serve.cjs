// Servidor estático mínimo para previsualizar el repo sin depender del cwd.
const http = require('http'), fs = require('fs'), path = require('path');
const root = process.argv[2], port = +process.env.PORT || +process.argv[3] || 4321;
const types = { '.html':'text/html; charset=utf-8', '.css':'text/css', '.js':'text/javascript', '.jpg':'image/jpeg', '.jpeg':'image/jpeg', '.png':'image/png', '.webp':'image/webp', '.svg':'image/svg+xml', '.json':'application/json' };
http.createServer((req, res) => {
  let p = decodeURIComponent(req.url.split('?')[0]); if (p.endsWith('/')) p += 'index.html';
  const f = path.join(root, p); if (!f.startsWith(root)) { res.writeHead(403); return res.end(); }
  fs.readFile(f, (e, d) => { if (e) { res.writeHead(404); return res.end('404'); } res.writeHead(200, { 'Content-Type': types[path.extname(f).toLowerCase()] || 'application/octet-stream' }); res.end(d); });
}).listen(port, () => console.log('serving', root, port));
