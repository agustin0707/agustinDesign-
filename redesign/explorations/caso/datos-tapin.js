/* =======================================================
   INICIO JS · DATOS DEL CASO TAP IN
   ======================================================= */
/* Copy en borrador (se escribe en limpio en la Fase 4, ítem 4.4; datos duros en la 4.5). Fuentes:
   redesign/notas-casos.md, notas de reunión de la landing (19 may, 26 may y 2 jun 2026), CHECKLIST.md del
   sitio y el manual de Connect. Un *asterisco* marca la palabra clave de un título */
(function () {
    const M = 'media/';
    window.CASO = {
        id: 'tapin', nombre: 'Tap In', numero: '02',
        titulo: [{ t: 'Tap In' }],
        disciplinas: 'Marca · Producto · Web', anio: '2025–26',
        vivo: { texto: 'tapin.cl', url: 'https://tapin.cl', publicado: true },
        sitio: '../works/sitios/tapin/index.html', introSitio: 2400,
        poster: '../works/media/tapin-poster.jpg',
        escena: { fondo: null },
        ritmo: { portada: 'oscuro', resumen: 'oscuro', decisiones: 'claro', proceso: 'marca', resultados: 'claro', aprendizaje: 'oscuro' },
        ficha: [['Cliente', 'Tap In, startup edtech chilena'], ['Rol', 'Rebranding, UX/UI, diseño y desarrollo web'], ['Período', 'Feb 2025 a sep 2026'], ['Equipo', 'Con los fundadores de Tap In'], ['En vivo', 'tapin.cl']],
        bajada: 'De la cafetería del campus a la plataforma del colegio.',
        intro: 'Acompañé a Tap In durante 18 meses. Primero diseñé su marca y la app para pedir sin filas en la universidad. Cuando la startup pivoteó a colegios, rehice la marca como un sistema de productos y diseñé y programé la web que hoy les habla a los directivos.',
        resumen: [
            ['El encargo', 'Una marca que sobreviviera al pivote: de una app de cafetería a una plataforma para colegios.'],
            ['Lo que hice', 'Rebranding, sistema para cuatro productos y una landing B2B de 9 páginas, diseñada y programada por mí.'],
            ['El resultado', 'tapin.cl en producción desde septiembre de 2026, con la misma marca para todo el ecosistema.']
        ],
        titulos: { decisiones: 'Siete decisiones, *una por problema*', proceso: '18 meses, *un mismo cliente*', resultados: 'Lo que *quedó andando*' },
        decisiones: [
            { id: 'marca', titulo: 'Una marca que pudiera tener hijos',
                texto: 'El isotipo de 2025 era un tenedor: hablaba de comida. La empresa nueva iba a tener varios productos, así que exploré una quincena de símbolos hasta llegar a un sistema: Tap In como paraguas y cada producto con su propio símbolo y apellido.',
                porque: 'Una marca para un pivote no puede nombrar solo lo que existe hoy; tiene que poder nombrar lo que viene.',
                pieza: { tipo: 'isos', lista: Array.from({ length: 15 }, (_, i) => `${M}iso-${String(i + 1).padStart(2, '0')}.jpg`), pie: 'Exploración del símbolo, del tenedor al sistema · <b>el elegido para Connect</b>', nota: 'Branding Rebirth · exploración del símbolo' }, ancla: null },
            { id: 'connect', titulo: 'Connect: un cerebro hecho de piezas',
                texto: 'Connect es el producto central: une comedor, centro de padres, talleres y gestión. Su símbolo es un cerebro armado por módulos, y su paleta nace del morado de la marca madre.',
                porque: 'El símbolo explica el producto antes de cualquier texto: un sistema central que conecta las piezas del colegio.',
                pieza: { tipo: 'img', src: M + 'connect-cerebro.jpg', extra: M + 'connect-paleta.jpg', nota: 'Manual de Connect · símbolo y paleta' }, ancla: null },
            { id: 'menu', titulo: 'Un menú que responde cuatro preguntas',
                texto: 'Cada elemento del menú responde una duda del directivo: qué hace, si funciona en su colegio, quiénes son y cómo contactarlos. Elegimos "Soluciones" en vez de "Productos" y "Comunidad" en vez de "Colegios".',
                porque: '"Soluciones" comunica problemas resueltos, no un catálogo. "Comunidad" comunica pertenencia.',
                pieza: { tipo: 'img', src: M + 'tp-nav-dd.jpg' },
                ancla: { scroll: 0, marco: '#navbar .nav-inner, .nav-li--has-dd .nav-dropdown', abrir: '.nav-li--has-dd', nota: 'Menú · Soluciones', enlace: '' } },
            { id: 'hero', titulo: 'Probar que funciona antes de que aparezca la duda',
                texto: 'El hero muestra cuatro módulos funcionando, con datos chilenos y microanimaciones, en vez de una foto de stock. Justo debajo van los logos de los colegios que ya lo usan.',
                porque: 'Un directivo decide en segundos: primero ve el producto andando y, antes de dudar, ve a sus pares.',
                pieza: { tipo: 'img', src: M + 'tp-hero.jpg' },
                ancla: { scroll: 0, marco: '.hero-mock', nota: 'Hero · cuatro módulos en vivo', enlace: '#inicio' } },
            { id: 'modulos', titulo: 'Módulos, no pasos',
                texto: 'Los cuatro productos se presentaban numerados y se leían como etapas de un proceso. Quitamos los números y los convertimos en pestañas: cada colegio elige por dónde empezar.',
                porque: 'Un colegio puede contratar solo un módulo; la interfaz tenía que decirlo sin explicarlo.',
                pieza: { tipo: 'img', src: M + 'tp-productos.jpg' },
                ancla: { sel: '#productos', marco: '.prodv7-tabs', nota: 'Pestañas de módulos', enlace: '#productos', demo: { sel: '.prodv7-tab', evento: 'click', cada: 1800 } } },
            { id: 'claro', titulo: 'De oscuro a claro, para que respire',
                texto: 'La primera versión era oscura. La pasamos a fondo claro para que la información respire, y dejamos la página de empresa en oscuro para separarla del producto.',
                porque: 'El color también ordena el sitio: claro para conocer el producto, oscuro para conocer a la empresa.',
                pieza: { tipo: 'par', a: M + 'tp-ecosistema.jpg', b: M + 'tp-empresa.jpg', pieA: 'Producto · claro', pieB: 'Empresa · oscuro' },
                ancla: { sel: '.prodv6-closing-wrap', nota: 'Sección clara · Todo conectado', enlace: '' } },
            { id: 'codigo', titulo: 'Diseñado y construido por mí',
                texto: 'Programé las 9 páginas en HTML, CSS y JavaScript, con versión móvil y una auditoría propia antes de publicar: sin errores de consola ni enlaces rotos, sin desbordes en 375, 768 y 1265 px, todas las imágenes con texto alternativo y movimiento reducido respetado.',
                porque: 'Lo que se diseña es lo que se publica: no hay traspaso donde se pierdan los detalles.',
                pieza: { tipo: 'movil', src: M + 'tp-movil.jpg', lista: ['9 páginas · HTML, CSS y JS', '0 errores de consola', '0 enlaces rotos', 'Sin desbordes en 375 · 768 · 1265 px', 'Imágenes con texto alternativo', 'Movimiento reducido respetado'], nota: 'Versión móvil y auditoría antes de publicar' }, ancla: null }
        ],
        proceso: [
            ['Feb 2025', 'Marca y app de pedidos para el campus', 'Identidad y diseño de la web app en Figma; la programó el equipo de Tap In'],
            ['Mar 2025', 'Punto de venta', 'Stickers, pendones y standcards con QR para las cafeterías'],
            ['2025', 'Operación en la UC', 'Marketing digital y piezas para alianzas con marcas'],
            ['Abr 2026', 'Pivote a colegios', 'Branding Rebirth y la marca de Connect'],
            ['May a ago 2026', 'Landing B2B', 'Arquitectura, diseño y código, con varias rondas de revisión junto al cofundador'],
            ['Sep 2026', 'tapin.cl publicado', '9 páginas en producción']
        ],
        contar: false,
        resultados: [
            ['18', 'meses con el mismo cliente, del campus al colegio'],
            ['9', 'páginas diseñadas y programadas, en producción'],
            ['4', 'productos bajo una sola marca'],
            ['15.000+', 'familias usan la plataforma', 'Dato del sitio de Tap In, por confirmar (4.5)']
        ],
        galeria: { imgs: [M + 'tapin_contenido3.webp', M + 'tapin_contenido5.webp', M + 'tapin_contenido8.webp', M + 'tapin_contenido6.webp'], nota: 'Lanzamiento en el campus UC, 2025' },
        aprendizaje: 'Diseñar para un pivote es diseñar un sistema, no un logo. La marca de 2025 hablaba de comida; la de 2026 tenía que poder nombrar productos que todavía no existían.',
        creditos: 'Diseño y desarrollo: Agustín Avendaño. Con los fundadores de Tap In. La app de pedidos de 2025 la programó el equipo de Tap In a partir de mi diseño.',
        siguiente: { nombre: 'Mend', numero: '03', bajada: 'Salud articular para Atención Primaria, de la investigación al producto.', tinte: '#0D2024' }
    };
})();
/* =======================================================
   FIN JS · DATOS DEL CASO TAP IN
   ======================================================= */
