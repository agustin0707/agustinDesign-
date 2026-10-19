# Fase 0 · Auditoría

19 oct 2026 · rama `redesign`

## Resumen en 6 líneas

1. **El sitio hoy cuenta otra historia.** El about dice "Diseñador Gráfico y UX/UI" y "curso quinto año", las skills son barras de Illustrator y Photoshop, y la home ordena los casos como piezas, no como problemas resueltos. La hipótesis 1 se confirma.
2. **Hay errores de contenido que dañan credibilidad hoy mismo.** Tres casos tienen descripciones en la home que no calzan con su página (Mido aparece como "marca de ropa urbana", Anco como "empaques para alimentos orgánicos", Tap In como "app para estadios").
3. **La home tiene mucho oficio de motion** (transición hero → about, smooth scroll propio, carrusel infinito, reloj en vivo). Ese oficio se rescata como criterio, no como código.
4. **El CSS no tiene sistema:** 11.400 líneas en un archivo, cero `:root`, 704 `!important`, 64 colores hex sueltos, 12 breakpoints distintos y capas de parches ("SOLUCIÓN FINAL", "ARREGLO DEFINITIVO"). La hipótesis 4 se confirma: shell desde cero.
5. **Los casos `.tp-`, `.lc-` y `.mi-` están bien aislados** (prefijo + IIFE propia) y son migrables. Los otros cuatro usan un template genérico que no vale la pena rescatar.
6. **Producción y esta carpeta no son lo mismo.** El sitio vive en GitHub Pages y esta carpeta no era un repo. Hay que resolverlo antes de la Fase 7.

---

## 1. Entorno y repo (crítico)

- **Esta carpeta no era un repositorio git.** No existe ningún `.git` del portafolio en el disco. Inicialicé git aquí: `main` es un snapshot del estado local de hoy y `redesign` sale de ahí.
- **Producción se sirve desde GitHub Pages** (lo confirma la página 404 de agustindesign.cl). O sea, existe un repo en GitHub que no está clonado en este Mac.
- **Local y producción ya divergen:**

| Archivo | Local | Producción |
|---|---|---|
| `proyecto-mido.html` | 900 líneas, página `.mi-` completa | 215 líneas, template genérico |
| `proyecto-lacolumna.html` | 387 líneas | 380 líneas |
| `style.css`, `script.js`, `index.html` | iguales en largo | iguales en largo |

  Conclusión: la versión rica de Mido nunca se publicó, pero sus estilos y JS sí. El `main` que creé **no es** el `main` de producción.
- **Recomendación:** antes de la Fase 7, clonar el repo de GitHub, traer esta rama `redesign` encima y publicar desde ahí. Mientras tanto (fases 1 a 5) trabajamos solo en `/redesign/`, así que no hay riesgo.
- `.gitignore` deja fuera los archivos fuente pesados que el sitio no usa: `*.ai`, `*.psd`, `Mockups/` (234 MB), `Tap In Referencias/` (167 MB) y `.claude/`.

---

## 2. Inventario del sitio

### Páginas del portafolio
| Página | Líneas | Sistema | Estado |
|---|---|---|---|
| `index.html` | 619 | Shell + home + easter eggs | En producción |
| `proyecto-tapin.html` | 536 | `.tp-` propio, oscuro con orbes y grain | En producción |
| `proyecto-lacolumna.html` | 387 | `.lc-` propio, portada de diario | En producción |
| `proyecto-mido.html` | 900 | `.mi-` propio, 19 secciones | Solo local |
| `proyecto-entrenapo.html` | 187 | Template genérico | Pendiente |
| `proyecto-hai.html` | 201 | Template genérico | Pendiente |
| `proyecto-posters.html` | 173 | Template genérico | Pendiente |
| `proyecto-anco.html` | 213 | Template genérico | Pendiente |

### Páginas personales en el mismo dominio
`photo-ranking.html`, `planning-session.html`, `jotita/`, `fotos-tier/` y, dentro de la home, el kit de cupones, Cafelito Time y el gate "Selección privada". Juntas suman unas **1.500 líneas de CSS y 900 de JS** que cargan en cada página del portafolio.

### Peso
| Recurso | Tamaño | Nota |
|---|---|---|
| `style.css` | 312 KB | Un solo archivo para todo el sitio, incluidas las páginas personales |
| `script.js` | 111 KB | Ídem |
| `img/` | 71 MB, 202 archivos | 60 sin referencia directa en el código (algunas pueden cargarse por nombre dinámico, verificar antes de borrar) |
| Imágenes pesadas | `fotodeperfilgus4.png` 2,8 MB, `ticket_cafelitotime_1.png` 2,3 MB, `lacolumna_poster5.webp` 1,2 MB, `hai_contenido1.webp` 913 KB | Las de portafolio deberían quedar bajo 300 KB |

---

## 3. Interacciones: qué es sello y qué se va

### Se conserva como criterio (se reconstruye en el shell nuevo)
| Interacción | Dónde | Por qué es sello |
|---|---|---|
| Transición hero → about (fade + zoom out de la foto, fondo que pasa a oscuro) | home | Es el momento más "de autor" del sitio. Un solo listener con rAF, bien hecho. |
| Smooth scroll propio con `easeInOutCubic` y delay de 120 ms en touch | home | Define la sensación del sitio. Pasa a ser un token de motion. |
| Feedback táctil global con `:active` | todo el sitio | Detalle de producto que pocos portafolios cuidan. |
| Reloj en vivo + "Santiago, CL" + punto de estado | contacto | Humano y local. Encaja con una marca personal. |
| Galería kinética drag to explore | Tap In, Mido | Buen patrón para mostrar pantallas. Candidato a componente del template de caso. |
| Reveal escalonado por bloque | casos | La idea se queda; la implementación se unifica (hoy hay 15 IntersectionObservers distintos). |

### Se va
| Elemento | Por qué |
|---|---|
| Barras de skill con porcentaje (Illustrator 90%, Photoshop 70%) | Anti patrón clásico. Además posiciona como operador de software, no como diseñador UX. |
| Marquee doble de disciplinas | Recurso de plantilla. Lista 10 disciplinas y diluye el foco. |
| Carrusel como único índice de proyectos | Esconde 7 casos detrás de flechas. Si cada proyecto pesa lo mismo, tienen que verse todos. |
| Template genérico de caso (stats + texto + carrusel + grilla) | No muestra proceso ni decisiones; es lo que hace ver "a plantilla" a 4 de los 8 casos. |
| Easter eggs en la home del portafolio | Son lindos, pero son de otra audiencia. Recomiendo moverlos a un subdominio o ruta aparte (ver §6). |

---

## 4. Contenido

### Errores que hay que corregir sí o sí
| Dónde | Dice | Realidad |
|---|---|---|
| Card de Mido (home) | "Identidad visual completa para una marca de ropa urbana emergente" | Domótica |
| Card de Anco (home) | "Packaging · Diseño de empaques sostenibles para productos alimenticios orgánicos" | App de salud para adultos mayores con artrosis |
| Card de Tap In (home) | "Aplicación móvil para estadios deportivos" | La página dice "espacios de alta afluencia" y "plataforma de descuentos universitarios"; tu brief dice "app de pedidos universitaria". Tres versiones distintas. |
| About | "Curso el quinto año", "Diseñador Gráfico y UX/UI" | Te titulas en diciembre; el foco ahora es UX/UI |
| Experiencia | Termina en 2025, no aparece Llegó Farma | Desactualizado |
| Email | `agustin@uc.cl` | Riesgo: correo institucional que puede expirar al titularte |
| Footer | © 2025 | Estamos en 2026 |
| Typos | "Grafic Design" (Entrena Po, Posters), "hobbie", caption "Proceso de Diseño & Wireframes" copiado en HAI | |
| Tap In | "65% de reducción de tiempos de espera" | Verificar fuente. Un número así es muy valioso si es real y muy riesgoso si no se puede defender en entrevista. |

### Diagnóstico de narrativa
- Los textos de los casos ya traen buen material de proceso (Anco y Tap In sobre todo), pero está contado como bloques genéricos "Contexto / Propuesta / Resultado". Falta lo que busca un reclutador UX: **tu rol exacto, las decisiones que tomaste y por qué, y qué descartaste.**
- Mezcla de idiomas sin criterio: nav y secciones en inglés ("Selected Works", "Let's talk"), contenido en español. Hay que decidir uno en la Fase 3 (tono verbal).

---

## 5. Deuda técnica

### CSS (`style.css`)
| Indicador | Valor | Comentario |
|---|---|---|
| Líneas | 11.395 | Shell + home: ~5.500. Tap In: ~1.800. La Columna: ~1.600. Mido: ~2.400. |
| `:root` | 0 | No hay tokens globales. Solo variables locales en `.tp-page`, `.lc-page`, `.mi-page`. |
| `!important` | 704 | Síntoma de capas de parches peleando entre sí. |
| Colores hex sueltos | 291 usos, 64 valores únicos | |
| Breakpoints | 12 distintos (480, 599, 600, 700, 768, 769, 800, 900, 968, 1000, 1024, 1100) | Sin escala definida. |
| `@keyframes` | 57 | Muchos duplican lo mismo con otro nombre. |
| `prefers-reduced-motion` | 1 (solo Mido) | |
| Fuentes | Inter, Space Mono, Poppins (11 estilos cargados en Tap In), Montserrat (usada en CSS pero nunca cargada) | |

**Aprendizajes del repo que hoy se violan:**
- `body, html { overflow-x: hidden !important; }` en la vista móvil (línea ~2796). Rompe la regla de `overflow-x` solo en `body`.
- 16 selectores `:hover` fuera de `@media (hover: hover)` (menú, carrusel, lightbox, cupones).
- Mobile y desktop se pisan por cascada y `!important`; solo 7 bloques usan `@media (min-width: 769px)`.
- Montserrat se usa sin su `<link>`.

### JS (`script.js`)
- 2.790 líneas, un solo archivo para todo el sitio. El código de la home vive en el scope global (27 funciones globales); solo Tap In, La Columna y Mido están en IIFE.
- 132 manipulaciones de estilo desde JS (`.style.`), incluido `setProperty(..., 'important')` en el scroll del hero.
- Un bloque marcado **"PARCHE TEMPORAL DEV MODE (BORRAR ANTES DE PUBLICAR)"** está en producción.
- JS inline en el HTML: `onclick` en la home (cupones, kit) y `onerror` en Tap In.
- `photo-ranking.config.js` tiene la clave del gate en texto plano (`password: '...'`). La clave es visible para cualquiera que abra el archivo, y las fotos de `fotos-tier/` son accesibles por URL directa. El gate es cosmético, no protege nada.

### HTML, accesibilidad y SEO
- Nav y footer copiados a mano en 8 páginas (cada cambio de menú se hace 8 veces).
- El toggle de "Works" es un `<span>`: no se puede abrir con teclado.
- Botones de carrusel sin `aria-label` (solo "←" y "→"). Lightbox sin `alt`.
- Anco tiene `<p>` sin cerrar en "La Propuesta".
- Solo la home tiene meta description y OG. Los casos no tienen ninguna, así que al compartir un caso por WhatsApp o LinkedIn sale sin preview.
- Títulos inconsistentes ("Tap In - Agustín", "Mido — Agustín").
- No hay `robots.txt` ni `sitemap.xml`. Las páginas personales no tienen `noindex`.

### Performance
- Cada página descarga los 312 KB de CSS y 111 KB de JS de todo el sitio.
- La home precarga las 7 portadas; Tap In precarga 10 imágenes y fuerza `eager` en 8 de la galería.
- **Bug observado:** en mi prueba en producción (viewport de 1024 px), las cards de Selected Works quedaron con opacidad 0 hasta tocar una flecha del carrusel. El reveal de las cards solo corre al cargar y al hacer click, y si el ancho de card aún no está medido, el carrusel arranca mal posicionado. Vale la pena que lo revises en tu iPhone y desktop; si se reproduce, hoy hay visitas que ven la sección de trabajos vacía.

### Qué se rescata en la migración
| De | Qué |
|---|---|
| Tap In | Fondo de orbes + grain canvas, galería kinética, carrusel infinito CSS de pantallas, sistema visual en cards |
| La Columna | Hero tipo portada de diario con jugadores, carruseles con transform, colofón editorial |
| Mido | Diagrama de ecosistema, bento, divisor de patrón, showcase de campañas, bloque de reduced motion |
| Todos | Los fixes de iOS ya resueltos (paneles con `left`, wrappers para sombras, scroll lock) |

Lo que se reescribe en cada caso: el marco (nav, header del caso, estructura narrativa, footer, siguiente proyecto) para que sea Agustín Design.

---

## 6. Recomendación sobre las páginas personales

Moverlas fuera del portafolio, a un subdominio (ej. `jo.agustindesign.cl`) o a un repo aparte. Razones: hoy suman ~2.400 líneas de código que se descargan en cada visita profesional, mezclan audiencias, y el gate con clave da una falsa sensación de privacidad. No lo toco hasta que lo decidas; queda en el plan como ítem 6.5.

---

## 7. Inventario de proyectos

Clasificación preliminar por disciplina y material de proceso disponible. El material lo saqué de las páginas actuales y de las carpetas que vi en tu disco; confírmalo o complétalo.

| Proyecto | Año | Disciplina principal | Rol | Material de proceso | Potencial como caso UX |
|---|---|---|---|---|---|
| **Anco** | 2025 a 2026 | UX research + UI (health tech) | Investigación, UX/UI, prototipo | Alto. Es tu proyecto de título: carpetas de Branding, Figma, Prototipo, Documentos de avances. La página ya menciona pruebas con usuarios. | **Muy alto.** El caso más completo para contar proceso. |
| **Tap In** | 2025 | Producto (app + panel) + branding | Branding, UX research, UI | Medio. Pantallas, sistema visual, dos tipos de usuario. Además una landing que programaste y publicaste. Falta evidencia de research (mapas, flujos, tests). | **Alto**, si se aclara qué es el producto y se respalda el 65%. |
| **Mido** | 2024 a 2025 | Branding + UI (domótica) | Branding, UI, prototipado | Medio. Identidad, iconografía, dashboard, ecosistema, campañas. | **Alto** como caso híbrido marca + producto. |
| **Llegó Farma** | 2026 | Branding (submarca) + one page | Identidad, manual de marca, one page | Alto. Levantamiento, presentación de propuesta, entregables, editables, one page con código. Pitch ganado al incumbente. | **Alto** como caso de marca con historia de negocio. |
| **La Columna** | 2022 a 2024 | Dirección de arte editorial / RRSS | Diseño y manejo de redes | Bajo a medio. Piezas y sistema editorial. | Medio. Muestra criterio de sistema gráfico. |
| **HAI Group** | 2024 | Branding corporativo | Identidad y presentación comercial | Bajo. Piezas finales. | Bajo. Candidato a archivo. |
| **Entrena Po** | 2023 a 2024 | Branding + contenido RRSS | Identidad y manejo de redes | Bajo. Piezas finales. | Bajo. Candidato a archivo. |
| **Posters y Afiches** | 2022 a 2025 | Gráfica personal | Diseño e ilustración | No aplica | Archivo o sección "juego". |

**Lectura rápida:** hay material para 4 casos fuertes con foco UX/producto y marca (Anco, Tap In, Mido, Llegó Farma) y un quinto de dirección de arte (La Columna). El resto calza mejor en un archivo visual. Esto lo cerramos en la Fase 1.

---

## 8. Hipótesis: diagnóstico inicial

| Hipótesis | Veredicto | Evidencia |
|---|---|---|
| 1. El salto es de posicionamiento | **Se confirma** | About, skills y categorías de las cards posicionan como diseñador gráfico. Los casos más fuertes en UX (Anco, Tap In) están contados como piezas. |
| 2. Mi marca es el marco, el proyecto es el contenido | **Se confirma, con un ajuste** | Hoy pasa lo contrario: Tap In, La Columna y Mido cambian también nav, footer y ritmo, así que el sitio se siente como 4 sitios distintos. Ajuste: definir qué zona del caso es "libre" (hero y galerías) y cuál es fija (header del caso, ficha, narrativa, siguiente proyecto). |
| 3. Núcleo de marca primero, brandbook al final | **Se confirma** | No existe ningún token hoy; partir por el brandbook sería documentar en el vacío. |
| 4. Shell desde cero, migrar los casos | **Se confirma** | El shell no tiene sistema y está lleno de parches. Los casos con prefijo están bien aislados y se pueden trasplantar. |

---

## 9. Abierto para la Fase 1
- Objetivo principal del portafolio (lo debatimos juntos).
- Si el proyecto de título y Anco son el mismo caso.
- Qué hacer con las páginas personales.

---

## 10. Respuestas al cierre de la Fase 0

| Pregunta | Respuesta |
|---|---|
| Proyectos nuevos | Llegó Farma, landing de Tap In y proyecto de título. La Familia (práctica) se evalúa juntos más adelante. |
| Objetivo principal | Se debate y define en conjunto al abrir la Fase 1. |
| Fecha de lanzamiento | Sin fecha fija; calidad por sobre plazo. |
| Repo | Hoy está en la cuenta de GitHub de la universidad (`agustin@uc.cl`). Debe quedar en la cuenta personal. |

### Repo: traspaso hecho (19 oct 2026)
- `agustin070702/agustinDesign-` (cuenta UC) pasó a **`agustin0707/agustinDesign-`** (cuenta personal). Historial completo (284 commits); la URL vieja redirige.
- Pages se mantuvo igual: rama `main`, raíz, dominio `agustindesign.cl`, certificado aprobado y HTTPS forzado. El sitio y la redirección de `www` responden bien.
- Antes del traspaso se hizo un respaldo `--mirror` del repo.
- `agustin070702` quedó como colaborador del repo nuevo.

### DNS y dominio (hecho el 19 oct 2026)
- El dominio se registra en NIC Chile, pero el DNS se administra en **Cloudflare** (cuenta de agus.avendano@gmail.com). Todos los registros en "DNS only", sin proxy.
- `www` pasó de `agustin070702.github.io` a `agustin0707.github.io`.
- Se agregó el TXT `_github-pages-challenge-agustin0707` y el dominio quedó **verificado** en `agustin0707`. Eso impide que otra cuenta de GitHub publique en agustindesign.cl.
- Comprobado en vivo: apex 200 con HTTPS, `www` redirige al apex por http y https.
- **El dominio vence el 20 nov 2026.** La renovación se paga en NIC Chile (ítem S.7).

### Repo local (hecho el 19 oct 2026)
- Esta carpeta ahora tiene `origin` = `agustin0707/agustinDesign-`.
- `main` es idéntico a producción. `redesign` sale de ahí con dos commits: los cambios locales que nunca se publicaron (Mido completo, ajustes en La Columna y otros casos, imágenes nuevas) y los docs del rediseño.
- Ningún archivo de producción se perdió (incluido `CNAME`). `core.fileMode` queda en `false` porque los archivos locales tenían permisos de ejecución.
