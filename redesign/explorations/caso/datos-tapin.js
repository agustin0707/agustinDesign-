/* =======================================================
   INICIO JS · DATOS DEL CASO TAP IN
   ======================================================= */
/* Copy en borrador para la Fase 4 (4.4). Fuente principal: ~/Documents/Illustrator/Tap In/Portafolio/
   tapin-caso-de-estudio.md (21 oct 2026). No se publica nada marcado [SENSIBLE] (montos, equity, finanzas,
   frases privadas, fotos generadas con IA) ni se presentan como resultados las cifras [ILUSTRATIVO] de los
   mockups. Las cifras de la empresa van marcadas por confirmar (4.5). Un *asterisco* marca la palabra clave */
(function () {
    const M = 'media/', MK = '../works/sitios/tapin/mockups/';
    window.CASO = {
        id: 'tapin', nombre: 'Tap In', numero: '02',
        disciplinas: 'Marca · Producto · Web', anio: '2025–26',
        vivo: { texto: 'tapin.cl', url: 'https://tapin.cl', publicado: true },
        sitio: '../works/sitios/tapin/index.html', introSitio: 2400,
        poster: '../works/media/tapin-poster.jpg',
        ritmo: { resumen: 'oscuro', decisiones: 'claro', proceso: 'marca', resultados: 'claro', aprendizaje: 'oscuro' },
        bajada: 'De la cafetería del campus a la plataforma del colegio.',
        heroMeta: [['Rol', 'Diseñador fundador'], ['Período', 'Ene 2025 a hoy'], ['Hice', 'Marca, UX/UI y código']],
        ficha: [['Cliente', 'Tap In, startup chilena (Chile y Perú)'], ['Rol', 'Diseñador fundador: marca, UX/UI y desarrollo web'], ['Período', 'Ene 2025 a hoy · Rebirth: feb a sep 2026'], ['Equipo', 'Con los cofundadores y su equipo de desarrollo'], ['En vivo', 'tapin.cl']],

        escaparate: {
            num: '00', nombre: 'Connect, en vivo', der: '4 módulos · animados en código',
            titulo: 'El producto se entiende *en una sola imagen*',
            modulos: [
                ['Comedor Escolar', 'Pago, conciliación y aviso al apoderado', MK + 'mockup-comedor-modulo.html'],
                ['Centro de Padres', 'La cartola bancaria se clasifica sola', MK + 'mockup-cpa-cartola.html'],
                ['Gestión Interna', 'Una tarea que llega por WhatsApp', MK + 'mockup-gestion-tarea.html'],
                ['Talleres y Ligas', 'Los cupos se llenan y se cierran solos', MK + 'mockup-talleres-modulo.html']
            ],
            nota: 'Mockups del sitio tapin.cl, diseñados y animados en código por mí. Los datos son de maqueta: verosímiles, no reales.'
        },

        intro: 'Soy el diseñador de Tap In desde el día uno. Diseñé su marca y la app para pedir comida sin filas en la Universidad Católica. En 2026 la empresa se reinventó como un sistema de gestión para colegios: rehice la marca como un ecosistema de productos y diseñé y programé tapin.cl, el sitio que hoy le habla a los directivos.',
        resumen: [
            ['El encargo', 'Que la marca sobreviviera al Rebirth y que un director entendiera el producto en segundos, aunque no lea.'],
            ['Lo que hice', 'Arquitectura de marca, paleta, isotipos y manual; arquitectura de información, UX, mockups animados y el front end completo de 9 páginas.'],
            ['El resultado', 'tapin.cl en producción, la app del producto pasó de verde a morado y el sitio se usa para vender a colegios y empresas de food service.']
        ],
        titulos: { decisiones: 'Once decisiones, *tres etapas*', proceso: 'Ocho meses de Rebirth, *sobre un año de marca*', resultados: 'Lo que *quedó andando*' },

        capitulos: [
            { nombre: 'Campus: una app para no hacer fila', periodo: '2025', bajada: 'El producto original: pedir y retirar comida dentro de la universidad, sin filas.' },
            { nombre: 'El Rebirth: una marca para varios productos', periodo: 'Feb a abr 2026', bajada: 'De app de comida a sistema para colegios. Antes de diseñar la web, había que rehacer la marca.' },
            { nombre: 'tapin.cl: diseñado y programado', periodo: 'Abr a sep 2026', bajada: 'Una landing para que un director entienda, se identifique y agende una demo. El sitio real, al lado.' }
        ],
        decisiones: [
            { cap: 0, id: 'forky', titulo: 'Forky: unos cubiertos que corren',
                texto: 'El isotipo nació de un tenedor y un cuchillo. Le agregué patas y después un brazo hasta que se volvió una figura corriendo: cubiertos y personaje a la vez. Llegué a unas treinta formas antes de encontrarlo.',
                porque: 'La doble lectura hace que un símbolo simple se recuerde. Forky terminó siendo el ADN gráfico de todo el ecosistema.',
                pieza: { tipo: 'evolucion', nota: 'Branding 2025 · del primer wordmark a Forky', lista: [[M + 'tp-evo-1.jpg', 'La primera idea'], [M + 'tp-evo-2.jpg', 'Exploraciones de wordmark'], [M + 'tp-evo-3.jpg', 'El wordmark apilado'], [M + 'tp-evo-4.jpg', 'Buscando a Forky'], [M + 'tp-evo-5.jpg', 'Forky: cubiertos que corren']] }, ancla: null },
            { cap: 0, id: 'campus', titulo: 'La marca salió al campus',
                texto: 'Una web app y no una app nativa: nadie quiere descargar algo para pedir un almuerzo. La entrada era un QR, así que diseñé 60 QR para los locales de la UC, con pendones, standcards, stickers y carteles que dicen lo que hace la app en una frase.',
                porque: '"Sáltate la fila" se entiende en un segundo, de pie, con hambre y frente al mesón.',
                pieza: { tipo: 'grilla', nota: 'Implementación física en la UC, 2025', pie: 'Cartel, standcard, pendón, stickers con QR y la implementación en un local', lista: [[M + 'tp-cartel.jpg', 'Cartel de caja'], [M + 'tp-stand.jpg', 'Standcard de mesa'], [M + 'tp-pendon.jpg', 'Pendón'], [M + 'tp-stickers.jpg', 'Stickers con QR'], [M + 'tp-mesa.jpg', 'En el local']] }, ancla: null },

            { cap: 1, id: 'madre', titulo: 'Una madre que lidera',
                texto: 'Tap In pasó a tener tres productos: Campus, Connect y Health. Propuse que tap in liderara siempre y que cada producto colgara de ella con su nombre y su tono. La empresa no tiene isotipo propio: vive en su wordmark, para no tener cuatro símbolos compitiendo.',
                porque: 'Así el sistema escala sin fragmentarse: si mañana hay un cuarto producto, entra solo.',
                pieza: { tipo: 'tp-arquitectura', nota: 'Arquitectura de marca del ecosistema', nuevo: 'El cuarto, cuando llegue', pie: 'Lockups del sistema: el wordmark arriba, el producto abajo' }, ancla: null },
            { cap: 1, id: 'paleta', titulo: 'Una familia morada, un tono por producto',
                texto: 'Descarté darle un color distinto a cada producto. El morado ya era de la marca: lo profundicé en una sola rampa y cada producto es un tono. Connect, el producto principal, no lleva el más oscuro: su app es para apoderados y un ambiente escolar.',
                porque: 'Un ecosistema que se ve unido y maduro, no fragmentado, con tonos de sobra para lo que venga.',
                pieza: { tipo: 'tp-paleta', nota: 'Paleta del sistema, cerrada el 19 de marzo', pie: 'De lo más establecido a lo más nuevo, de oscuro a claro' }, ancla: null },
            { cap: 1, id: 'cerebro', titulo: 'A la rápida, un cerebro. Si te fijas, cuatro piezas',
                texto: 'Para Connect descarté más de diez propuestas porque eran dos objetos pegados, y eso no es doble lectura. Elegí un cerebro con su silueta intacta y los surcos redibujados como cortes de puzzle: cuatro piezas, camufladas a propósito.',
                porque: 'Connect une los servicios del colegio en un solo lugar desde el que se controla todo: el cerebro del colegio. La silueta habla de inteligencia; el interior, de conexión.',
                pieza: { tipo: 'tp-cerebro', nota: 'Isotipo de Connect · aprobado el 24 de marzo', descartes: [M + 'iso-03.jpg', M + 'iso-07.jpg', M + 'iso-09.jpg', M + 'iso-11.jpg', M + 'iso-13.jpg'], pieDescartes: 'Algunos caminos descartados' }, ancla: null },

            { cap: 2, id: 'menu', titulo: 'Un menú que responde cuatro preguntas',
                texto: 'Cada elemento del menú responde una duda del directivo: qué hace, si funciona en su colegio, quiénes son y cómo contactarlos. "Soluciones" en vez de "Productos" y "Comunidad" en vez de "Clientes". Precios y blog quedaron fuera.',
                porque: 'El que decide no quiere comprar un producto, quiere resolver un problema. Cada ítem que se agrega diluye el foco.',
                pieza: { tipo: 'img', src: M + 'tp-nav-dd.jpg' },
                ancla: { scroll: 0, marco: '#navbar .nav-inner, .nav-li--has-dd .nav-dropdown', abrir: '.nav-li--has-dd', nota: 'Menú · Soluciones', enlace: '' } },
            { cap: 2, id: 'hero', titulo: 'Primero confianza, después explicación',
                texto: 'El hero muestra cuatro módulos funcionando con datos chilenos verosímiles, en vez de una foto de stock, y justo debajo los colegios que ya lo usan. Fue la cuarta propuesta de hero: la más limpia.',
                porque: 'Un director decide en segundos: primero ve el producto andando y, antes de dudar, ve a sus pares.',
                pieza: { tipo: 'img', src: M + 'tp-hero.jpg' },
                ancla: { scroll: 0, marco: '.hero-mock', nota: 'Hero · cuatro módulos en vivo', enlace: '' } },
            { cap: 2, id: 'claro', titulo: 'De oscuro a claro, para que respire',
                texto: 'La primera versión era oscura y explicativa. Cuando llegó la información real del producto la reestructuramos y la pasamos a fondo claro. La página de Empresa quedó oscura, aparte, para que Campus y Health no desorientaran al director.',
                porque: 'Claridad antes que espectáculo: institucional sobre tecnológico.',
                pieza: { tipo: 'par', a: M + 'tp-ecosistema.jpg', b: M + 'tp-empresa.jpg', pieA: 'Producto · claro', pieB: 'Empresa · oscuro' },
                ancla: { sel: '.prodv6-closing-wrap', nota: 'Sección clara · Todo conectado', enlace: '' } },
            { cap: 2, id: 'modulos', titulo: 'Módulos en paralelo, no pasos',
                texto: 'Los cuatro productos se leían numerados, como etapas obligatorias. Les quité los números y los convertí en pestañas: cada colegio elige qué resolver primero, y cada módulo muestra su mockup animado.',
                porque: 'Cada módulo se contrata por separado; la interfaz tenía que decirlo sin explicarlo.',
                pieza: { tipo: 'img', src: M + 'tp-productos.jpg' },
                ancla: { sel: '#productos', marco: '.prodv7-tabs', nota: 'Pestañas de módulos', enlace: '#productos', demo: { sel: '.prodv7-tab', evento: 'click', cada: 2200 } } },
            { cap: 2, id: 'empatia', titulo: 'Un mockup con empatía',
                texto: 'Propuse animar un "acceso denegado" en el comedor. Los cofundadores lo rechazaron: para una familia, que un niño no pueda almorzar es muy duro. Lo cambié por pago, validación y aviso de saldo bajo, con un máximo de 12 segundos por animación.',
                porque: 'Los mockups cuentan situaciones reconocibles, no interfaces genéricas; también tienen que cuidar a quien las mira.',
                pieza: { tipo: 'mockup', nota: 'Mockup del comedor, en vivo', src: MK + 'mockup-comedor-modulo.html', pasos: ['Pago', 'Validación', 'Aviso de saldo'] }, ancla: null },
            { cap: 2, id: 'codigo', titulo: 'Diseñado directo en código',
                texto: 'No hubo Figma para la landing: diseñé programando, en HTML, CSS y JavaScript sin frameworks ni librerías de animación. Más de cien animaciones se pausan fuera de pantalla y cada mockup solo anima cuando se ve.',
                porque: 'Programarlo yo me dio control total sobre las animaciones y las microinteracciones: lo que se diseña es lo que se publica.',
                pieza: { tipo: 'tp-codigo', nota: 'El sitio por dentro', movil: M + 'tp-movil.jpg', datos: [['≈40.000', 'líneas de código propio'], ['275', 'animaciones (keyframes)'], ['33', 'observadores: solo anima lo visible'], ['9', 'páginas, con versión móvil']], pie: 'HTML, CSS y JS vanilla · Poppins · Formspree' }, ancla: null }
        ],

        proceso: [
            ['Ene 2025', 'Nace Tap In', 'Identidad, Forky y la web app de Campus'],
            ['Jun 2025', 'La marca sale al campus', '60 QR, pendones, standcards y stickers en la UC'],
            ['Feb 2026', 'Diagnóstico del Rebirth', 'Un cuestionario a los socios antes de diseñar nada'],
            ['Mar 2026', 'Sistema de marca aprobado', 'Paleta, Poppins y el cerebro de Connect, el 24 de marzo'],
            ['Abr 2026', 'Brief y prototipo', 'Más de 50 landings auditadas; la navbar de vidrio, primer bloque cerrado'],
            ['May 2026', 'Choque con el producto real', 'Nueva arquitectura, fondo claro y la web morada en tapin.cl'],
            ['Jun 2026', 'Mockups y páginas de producto', '8 flujos animados y lanzamiento por fases'],
            ['Sep 2026', 'Cierre', 'H1 final y el sitio completo en producción']
        ],
        contar: true,
        resultados: [
            ['9', 'páginas en producción, diseñadas y programadas por mí'],
            ['≈40.000', 'líneas de código propio, sin frameworks'],
            ['8', 'mockups animados con datos verosímiles'],
            ['3', 'productos en una sola familia de marca']
        ],
        contexto: { texto: 'Según la empresa, Campus llegó a dos campus de la UC con más de 27.000 estudiantes y 1.500 usuarios activos, y Connect a más de 15.000 familias en colegios de Chile y Perú.', verificar: 'Cifras de la empresa, por confirmar (4.5)' },
        citas: [
            ['En una sola imagen se entiende cómo funciona. Eso es lo que teníamos que lograr.', 'Cofundador de Tap In · reunión de cierre, sep 2026'],
            ['Está súper profesional, parece una empresa real. Es lo más clave para generar confianza.', 'Cofundador de Tap In · revisión de mayo 2026']
        ],
        citasNota: 'Citas suavizadas de reuniones internas: publicar solo con tu aprobación y la de ellos',
        galeria: { imgs: [M + 'tapin_contenido3.webp', M + 'tapin_contenido5.webp', M + 'tapin_contenido8.webp', M + 'tapin_contenido6.webp'], nota: 'Lanzamiento de Campus en la UC, 2025' },
        aprendizaje: 'Diseñar con información que cambia. A mitad del proyecto llegó la realidad del producto: un servicio que no existía, una huella digital que sí. Cambiaron la estructura y el contenido; el lenguaje visual se sostuvo.',
        creditos: 'Marca, UX/UI, diseño y desarrollo front end: Agustín Avendaño. Con los cofundadores de Tap In y su equipo de desarrollo, a cargo del producto y del deploy. La app de Campus la programó el equipo a partir de mi diseño.',
        siguiente: { id: 'mend', nombre: 'Mend', numero: '03', bajada: 'Salud articular para Atención Primaria, de la investigación al producto.', tinte: '#0D2024', url: '../works/w3-pila.html' }
    };
})();
/* =======================================================
   FIN JS · DATOS DEL CASO TAP IN
   ======================================================= */
