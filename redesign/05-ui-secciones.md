# Fase 5 · UI por secciones

Rama `redesign`. A pedido de Agustín, la UI se trabaja sección por sección. Exploraciones en `explorations/`.

---

## S1 · Hero

**Cerrado: Hero 1 · Capas (v4 final)**, `explorations/hero/h1-capas.html` + `h1-capas.js` (21 oct 2026). Las versiones anteriores quedan en el historial de git.

| Elemento | Decisión |
|---|---|
| Nombre | "agustín design" en Geist 500, tracking -0.065em, a todo el ancho. Encima del retrato con `mix-blend-mode: difference`: negro sobre el fondo, claro sobre la foto |
| Retrato | El recorte actual (`img/fotodeperfilgus5.webp`), anclado abajo, a todo el ancho |
| Logo | "agustín.design" arriba a la izquierda con cursor que parpadea. A Agustín le gusta mucho este detalle |
| Links | **About · Works · Contact**, en la tipografía del sitio actual (Inter en cursiva, 1.1rem), con el peso subido levemente de 200 a 270. **Hover: letras que ruedan** en cascada (cada letra sube y la reemplaza una copia de sí misma). Centrados en desktop; en columna arriba a la derecha en móvil |
| Llamado | **Botón "ver proyectos" como el actual** (píldora con borde, se llena de izquierda a derecha y flota). Reemplaza la frase "Diseño marcas y construyo sus sitios", que Agustín sentía mejorable |
| Arriba a la derecha | Punto que late + hora de Santiago en vivo, en Geist Mono, con los dos puntos que parpadean. La palabra "Disponible" se eliminó; el punto se queda |
| Abajo a la izquierda | Redes en mono, con inversión de color sobre la foto |
| Motion | Letras del nombre que suben en cascada, links y botón que aparecen con desenfoque, parallax entre nombre y retrato con el mouse y el scroll. Respeta reducir movimiento |
| Fondo | Gris claro `#D9D9D6`, cercano al `#dddddd` actual |

### Audit del hero (v2 → v3)
| Hallazgo en la v2 | Mejora en la v3 |
|---|---|
| El nombre solo rozaba el pelo: la inversión, que es el efecto firma, casi no se notaba | El nombre baja (58% del alto) y cruza pelo y frente. La inversión se ve en media palabra |
| Sin la frase grande, el hero no decía qué haces | Descriptor chico bajo el nombre, con inversión: "Diseño de marca y desarrollo web · Independiente · Santiago, CL" |
| Fondo gris plano frente a una foto con textura: se sentían dos materiales | Grano de película muy sutil sobre todo el hero, usando `img/grano-textura.png` (existía y no se usaba) |
| Entrada sin orden: todo aparecía casi a la vez | Coreografía: retrato se descubre de abajo (0 s), nombre letra a letra (0,5 s), navegación (1 s), descriptor y botón (1,25 s), pie (1,4 s) |
| Nada invitaba a seguir bajando | Indicador de scroll: línea con un tramo que baja en bucle, sin texto |
| Esquina inferior derecha vacía, composición coja | "© 2026" en mono equilibra las redes de la izquierda |
| Sin foco visible para teclado | Contorno de 1 px en el color del texto, con separación |
| La foto podía aparecer tarde | `preload` con prioridad alta y dimensiones declaradas para evitar saltos de layout |

### Segundo audit (v3 → v4)
Revisado en 1024, 1280, 1440, 1920 y 390 px, durante la carga y al hacer scroll.

| Hallazgo en la v3 | Mejora en la v4 |
|---|---|
| Durante la carga asomaban puntos y acentos de las letras antes de subir | Las letras parten más abajo (130%) y la máscara tiene margen arriba y abajo |
| En pantallas menos anchas (1024, iPad) el retrato quedaba chico y la mitad superior vacía | El retrato vive en una caja de 90% del alto con `object-fit: cover`: el tamaño de la cabeza depende del alto de la pantalla, no del ancho |
| El descriptor se leía a parches entre la mano y el fondo | Pasa arriba a la izquierda, bajo el logo, donde siempre hay fondo liso. En móvil sigue bajo el nombre |
| Al hacer scroll el hero simplemente se iba | **Entrega tipo cortina:** el hero queda fijo, se oscurece, la foto crece levemente y el nombre se apaga mientras la sección negra de Works sube encima |
| El nombre, lo más grande de la página, no reaccionaba a nada | **Nombre vivo:** las letras cercanas al cursor suben como una ola. Usa la propiedad `translate`, que no choca con la animación de entrada. Solo con mouse y respetando reducir movimiento |
| Espacio entre "agustín" y "design" algo abierto | `word-spacing: -0.06em` |
| Hora estática | Los dos puntos de la hora parpadean cada segundo |
| El `h1` solo decía "agustín design" | Texto oculto para buscadores y lectores de pantalla: "Agustín Avendaño, diseño de marca y desarrollo web en Santiago de Chile" |

### Ajustes de Agustín sobre la v4 (21 oct 2026)
- Hover nuevo y peso levemente mayor en About, Works y Contact.
- El parallax dejaba un borde vacío a la izquierda al llevar el mouse a la derecha: la caja del retrato ahora sobresale 32 px por lado y 16 px abajo.
- Se eliminó el descriptor ("Diseño de marca y desarrollo web · Independiente · Santiago, CL") y la palabra "Disponible": sobraban.

- Hovers más lentos en About, Works, Contact y en las redes: 900 ms con una curva que acelera y frena suave (`cubic-bezier(0.7, 0, 0.2, 1)`). Con la curva anterior casi todo el movimiento ocurría al inicio y se sentía rápido aunque durara más.
- Vuelve el punto que latía, solo, a la izquierda de la hora.

### Audit final (21 oct 2026)
Casos borde: 2560 px, laptop 1366×650, iPhone SE, celular horizontal, movimiento reducido, teclado y fin de página. Sin errores de consola. Peso total del hero: 235 KB en 6 recursos.

| Hallazgo | Corrección |
|---|---|
| **Bug:** con "reducir movimiento" activado, el nombre bajaba y tapaba el botón (la regla que apagaba el parallax anulaba también el centrado) | Se anula solo `translate` (el parallax), no `transform` |
| En 2560 px el nombre tenía tope y se veía chico | El tamaño escala con el ancho y con el alto: `min(15.6vw, 34svh)`, hasta 480 px. Navegación, botón y hora también crecen en pantallas grandes |
| En pantallas bajas el nombre se salía o el botón chocaba con el pie | El nombre se limita por el alto; en pantallas de menos de 520 px de alto el botón baja a la fila del pie |
| El hero quedaba fijo toda la página | Va dentro de una `.escena` con la sección siguiente: queda fijo solo mientras lo cubre |
| Se cargaban Geist 600 y Geist Mono 500 sin usarse | Fuera del `<link>` |
| La hora reiniciaba el parpadeo cada 15 s | Se actualiza justo al cambiar el minuto |

**Pendientes del hero:**
- Los links quedan en inglés ("About, Works, Contact") por decisión de Agustín, como excepción a la regla de voz.
- La propuesta de valor y el estado de disponibilidad salen del hero: se ubican en la siguiente sección o en contacto.
- Técnico para la Fase 6: los links y el botón animan el wrapper (`li`, `.cta-hero`) para no pisar el hover, según los aprendizajes del repo.

---

## S2 · Índice de trabajos y entrada al proyecto

**En curso: 3 exploraciones** en `explorations/works/` (comparador en `index.html`, 21 oct 2026). Se rehace desde cero: presionar un proyecto tiene que ser atractivo y llevar a una página muy única.

**Elegida: 3 · Pila de cortinas** (21 oct 2026), hoy en su v3: `explorations/works/w3-pila.html` + `w3-pila.js`.

### Audit de la Pila (v1 → v2)
| Hallazgo en la v1 | Mejora en la v2 |
|---|---|
| La captura traía su propio titular gigante, que competía con el nombre del proyecto | **Escena del proyecto:** el sitio va dentro de una ventana de navegador (o teléfono en Mend) sobre el fondo de su marca. Se lee como "una web que construí", no como una imagen más |
| Las láminas no demostraban que el sitio es real | **La web hace scroll adentro:** al pasar el mouse, la captura completa del sitio baja despacio (11 s) y vuelve al salir. En móvil baja sola cuando la lámina está en pantalla |
| Los tres paneles eran el mismo marco negro | **Panel teñido** con el color más oscuro de cada marca (Llegó `#0A1415`, Tap In `#110E22`, Mend `#0D2024`). El caso hereda ese color de fondo |
| El nombre estaba desconectado de la imagen | El nombre sube sobre el borde de la lámina y se **invierte al cruzarla**, como el nombre del hero |
| No se sabía cuántos proyectos había ni dónde estabas | **Mini índice** en la fila superior de cada panel (01 Llegó Farma · 02 Tap In · 03 Mend), con el actual marcado y saltos con scroll suave |
| El panel nuevo entraba plano | **Hoja que sube:** esquinas redondeadas y sombra arriba. El panel cubierto se achica levemente y un velo lo oscurece sin perder sus colores |
| Cabecera genérica | Suma conteo ("03 proyectos · 2025–2026") y acceso directo al archivo |
| Archivo como lista plana | Filas con nombre, disciplina y año, y **miniatura que sigue al cursor** con inercia |
| Sin enlace a lo que está publicado | "tapin.cl ↗" en la fila superior; estados honestos para Llegó ("Pronto en línea") y Mend ("Prototipo con acceso") |
| La transición clonaba solo una imagen | **Viaja la escena completa** (fondo + dispositivo), conservando hasta dónde había bajado la web, y se abre a sangre como portada |
| Móvil: mucho negro sobre las láminas | Láminas más altas en formato vertical, nombres no actuales del mini índice reducidos a su número |
| — | Movimiento reducido: se apilan sin escala, velo ni scroll automático |

Las escenas usan unidades de contenedor (`cqw`, `cqh`): el navegador y el teléfono se ven proporcionados en la lámina, durante el viaje y en la portada del caso.

### Ajustes de Agustín sobre la v2 → v3 (21 oct 2026)
| Pedido | Cómo se resolvió |
|---|---|
| Sin foto al pasar el mouse por el archivo | Eliminada: el archivo queda tipográfico |
| Mejor resolución y que las webs aparezcan con sus animaciones de carga | **Sitios reales dentro del navegador.** En reposo se ve una portada nítida (captura a 1,4x). Al pasar el mouse, el sitio real se recarga dentro del navegador, con una barra de carga como la de un navegador de verdad, muestra su propia animación de entrada y después baja solo durante 12 s. En Mend, el teléfono parte en la pantalla de carga de la app y luego baja la pantalla Explorar (captura a 2x) |
| Títulos con el efecto del nombre del hero, sin la ola | Títulos más grandes, en Geist cerrada, cruzando el borde de la lámina con `mix-blend-mode: difference`, y entrada letra a letra cuando aparecen en pantalla. Sin reacción al cursor |
| Mejorar la parte de arriba de Works | **Apertura tipo afiche:** "works" gigante con "(03)" en mono, como el ".design" del hero, y entrada letra a letra. Debajo, el manifiesto ("Marcas y sitios web, diseñados y construidos por mí. Cada proyecto, contado desde sus decisiones.") y un índice de los tres proyectos más el archivo, con saltos directos |

### Audit exhaustivo de la v3 (21 oct 2026)
Herramientas nuevas en `redesign/herramientas/`: `auditar-textos.cjs` (cortes, desbordes y choques en 6 anchos) y `medir-fluidez.cjs` (cuadros lentos durante el scroll y el hover).

**Fluidez** (navegador de prueba sin GPU; sirve para comparar, en un Mac real los números son más altos):

| Momento | Antes | Después |
|---|---|---|
| Scroll por la pila | 44 fps · 48 cuadros lentos | **60 fps · 0 cuadros lentos** |
| Hover con sitio en vivo | 31 fps | **44 fps** |
| Scroll después del hover | 35 fps (el sitio seguía corriendo) | **60 fps · 0 cuadros lentos** |

| Hallazgo | Corrección |
|---|---|
| **Texto partido:** entre 1024 y 1279 px "Investigación · Marca · Web app · 2026" bajaba a dos líneas y dejaba "· 2026" huérfano | La disciplina va en una línea (`nowrap`) y el año pasa a la columna derecha ("2026 · Prototipo con acceso") |
| **Bug:** al terminar la página, el último panel ("Mend") asomaba sobre el archivo | El archivo ocupa al menos una pantalla |
| **Bug:** el teléfono de Mend en reposo mostraba solo la pantalla de carga | En reposo se ve la app; la pantalla de carga aparece y se va solo al pasar el mouse |
| **Bug:** en el primer hover se recargaba un iframe recién creado (podía quedar en blanco) | El sitio siempre se carga de cero asignando su dirección, sin recargas |
| **Bug de continuidad:** al abrir el caso después de dejar bajar el sitio, la portada saltaba al inicio | El clon muestra la captura larga en el mismo punto donde iba la web |
| **Fluidez:** los sitios se precargaban completos cerca de la pantalla y seguían ejecutándose en segundo plano | Solo se precarga el HTML; el sitio se monta al pasar el mouse y se desmonta al salir |
| **Fluidez:** cruzar una lámina de pasada al hacer scroll cargaba el sitio | Espera de 180 ms antes de montar el sitio (intención de hover) |
| **Fluidez:** el contenido del panel cubierto se volvía a rasterizar en cada cuadro | `will-change: transform`: se escala como capa |
| **Fluidez:** el desenfoque de fondo de la etiqueta se recalculaba en cada cuadro | Fondo semitransparente sólido |
| **Fluidez:** `--q` se escribía en todos los paneles en cada cuadro | Solo se escribe si cambió |
| **Interacción:** "Ver caso" fijo en una esquina, lejos de la mano | La pastilla sigue al cursor con inercia dentro de la lámina |
| **Interacción:** con teclado no había vista previa | Al enfocar una lámina se monta el sitio (o arranca la app), igual que con el mouse |
| **Interacción:** el enlace "Archivo" saltaba sin transición | Scroll suave, como los saltos a los proyectos |
| **Móvil:** sobraba negro sobre las láminas | La lámina llena el alto disponible del panel |

### Ajustes v4 (tus observaciones, 21 oct 2026)
| Observación | Qué se hizo |
|---|---|
| **Letras cortadas** ("s" de works, "g" de Llegó, "p" de Tap In) | La máscara de las letras que suben era un `overflow: hidden` del tamaño exacto de la palabra; con tracking negativo y line-height cerrado, los costados, acentos y descendentes quedaban fuera. Ahora es un `clip-path` que se extiende más allá de la caja. Además, la sombra del panel que espera abajo oscurecía el pie del título: hay un hueco de 72 px bajo el borde de la pantalla |
| Fila superior de cada panel en dos alturas | La disciplina chocaba con el mini índice en la columna 6 y bajaba de línea |
| **Mockup de Tap In con bugs** | Se veía la barra de scroll del sitio dentro del mockup (se oculta al cargar), la portada se apagaba antes de que el sitio cargara (destello en blanco) y el recorrido terminaba en un corte del formulario de contacto (ahora baja hasta las preguntas frecuentes, con `data-hasta`) |
| **Fondo de Mend** | Degradado de marca construido en CSS con capas de gradientes y el grano oficial de Mend en soft-light: nítido a cualquier tamaño y sin los textos de la lámina de presentación |
| **Logo de Mend animado** | Lockup horizontal "mend salud" con las piezas del SVG oficial y las animaciones del manual V08 (Trazo del wordmark y Encaje del isotipo). Se dibuja al entrar la lámina en pantalla y se rearma al salir |
| **Archivo poco atractivo** | Hoja de contactos: cada fila mantiene el índice tipográfico y suma una tira con 5 a 8 piezas reales, siempre visibles (sin foto flotante). Al pasar el mouse la tira se desliza para mostrar el resto y las demás filas se atenúan; al entrar en pantalla las tiras se revelan en cascada. En móvil la tira se recorre con el dedo |
| Bug al abrir Mend | Si se presionaba apenas al pasar el mouse, la portada del caso quedaba congelada en la pantalla de carga de la app |

### Ajustes v5 (tus observaciones, 21 oct 2026)
| Observación | Qué se hizo |
|---|---|
| **El sitio de Tap In parpadeaba** | Al pasar el mouse, la portada (con las tarjetas) se cambiaba por el sitio recargando desde cero: las tarjetas desaparecían y volvían a entrar. Ahora el sitio se carga en segundo plano cuando el panel queda quieto en pantalla (nunca durante el scroll, que comparte el hilo principal), espera a que termine su entrada y recién ahí está listo: el paso de portada a sitio es invisible y el recorrido parte de inmediato. Se desmonta cuando el panel sale o queda cubierto |
| **Recorrido completo, Llegó más lento** | Baja hasta el final del sitio a velocidad casi constante (acelera y frena solo en los extremos, sin el centro apurado de la curva anterior): Llegó a 300 px/s (unos 26 s) y Tap In a 380 px/s (unos 12 s), así las animaciones de cada sección alcanzan a aparecer. En móvil, la captura larga de Llegó también baja más lento |
| **Pastilla "Ver caso" en el cursor** | Eliminada. La etiqueta fija de la esquina ("Sitio · diseño y código") se releva subiendo por "Ver caso ↗" al pasar el mouse o enfocar con teclado. En móvil se mantiene la pastilla fija |
| **Archivo, un paso más** | Cada fila suma una línea de contexto en lenguaje de cliente y el número de piezas. La tira se recorre siguiendo la posición horizontal del mouse sobre la fila, con inercia (borde izquierdo, primera pieza; borde derecho, la última), y una flecha entra junto al nombre |
| Mend en desarrollo | La app aún no está terminada: el mockup del índice se actualiza cuando esté lista (PLAN 1.5d) |

| Fluidez (navegador de prueba) | v4 | v5 |
|---|---|---|
| Hover con sitio en vivo | 43 fps | **50 fps** |

**Nota técnica para la Fase 6:** para controlar el scroll dentro de los sitios, el navegador necesita que estén en el mismo dominio que el portafolio. En la exploración se usan copias locales (`explorations/works/sitios/`, fuera del repo). En producción hay dos caminos: publicar copias de las landings bajo `agustindesign.cl` (con permiso de cada cliente) o grabar un video del recorrido de cada sitio. El video pesa menos y funciona igual en móvil; la copia es más fiel. Se decide en la Fase 6.


**Común a las tres:**
- Sección negra que recibe la entrega tipo cortina del hero. Barra superior con la misma navegación, en inversión de color.
- Imágenes: capturas de las **webs en vivo** de cada proyecto (Llegó Farma, tapin.cl, propuesta de identidad de Mend), más fotos y pantallas de app. Viven en `explorations/works/media/`, fuera del repo, porque la one page de Llegó Farma aún no se lanza.
- **Entrada al caso:** la imagen presionada se clona y viaja (posición y tamaño reales, sin deformarse) hasta la portada del caso; el nombre viaja con ella desde su lugar en el índice. Al cerrar ("Volver" o Esc) hace el camino inverso y el foco vuelve al proyecto. Scroll bloqueado de forma segura para iOS.
- Página de caso de prueba (portada, ficha, intro, segunda imagen). El diseño real del caso es la S3.
- Archivo compacto debajo: La Columna, HAI, Mido, Entrena Po, Posters.
- Para el build (Fase 6): la transición entre páginas reales se puede hacer con **View Transitions entre documentos**, nativo del navegador y sin librerías, con este mismo efecto como respaldo.

| Dirección | Índice | Entrada al caso | Móvil |
|---|---|---|---|
| **1 · Índice tipográfico** | Nombres gigantes en lista. Al pasar el mouse, la fila activa avanza, las demás bajan a gris y una tarjeta con la web del proyecto sigue al cursor con inercia. Los nombres se invierten al cruzar la tarjeta, como en el hero | La tarjeta se expande a pantalla completa | Cada fila muestra su imagen bajo el nombre |
| **2 · Galería cinemática** | La sección queda fija y el scroll vertical mueve tarjetas grandes en horizontal, con barra de progreso. Hover: la imagen se acerca y aparece "Ver caso" | La tarjeta crece a pantalla completa | Deslizar con el dedo, con snap |
| **3 · Pila de cortinas** | Un proyecto por pantalla: el siguiente sube y cubre al anterior, que se achica y se oscurece. Continúa el lenguaje del hero | La lámina enmarcada se abre a sangre | Igual, con la lámina en formato horizontal |


---

## S3 · Página de caso

En curso · plantilla elegida: 3 · Evidencia, con identidad propia por caso (21 oct 2026) · `explorations/caso/` (comparador en `index.html`; la exploración anterior quedó en `caso/exploracion-1/`)

### Estructura común (adelanta el ítem 4.2 del template de caso)
Caso de prueba: **Tap In**, con decisiones reales sacadas de las notas de reunión de la landing (19 may, 26 may y 2 jun 2026), del `CHECKLIST.md` del sitio y del manual de Connect. El copy es borrador de la Fase 4.

1. **Portada:** fila de contexto, nombre gigante con las letras que suben, bajada en lenguaje de cliente, la misma escena del índice (continúa el viaje desde la Pila) y ficha (cliente, rol, período, equipo, en vivo). Todo el caso vive sobre el tinte del proyecto.
2. **Resumen:** una intro en primera persona y tres columnas: el encargo, lo que hice, el resultado.
3. **Decisiones (7):** cada una con título, qué se hizo, por qué y la pieza. Marca que pudiera tener hijos (exploración de isotipos), Connect como cerebro de piezas, menú que responde cuatro preguntas, hero que prueba el producto antes de la duda, módulos y no pasos, de oscuro a claro, diseñado y construido por mí (auditoría real del sitio).
4. **Proceso:** línea de tiempo de 18 meses que se dibuja al entrar.
5. **Resultado:** cifras verificables y la galería del lanzamiento en el campus. El dato de familias queda marcado "por confirmar" hasta la 4.5.
6. **Aprendizaje, créditos y siguiente proyecto** (Mend, con su tinte).

### Tres direcciones (cambia cómo se cuentan las decisiones)
| Dirección | Cómo se lee | A favor | En contra |
|---|---|---|---|
| **1 · Expediente** | Riel fijo con el índice de decisiones y una barra de avance; cada decisión es una entrada con su porqué y la pieza. Atajos J y K | La más clara para leer y volver a una decisión; escala a casos largos (Mend) | La más sobria: el impacto visual depende de las piezas |
| **2 · Láminas** | Una decisión por pantalla con la pieza en grande; se apilan como cortinas, el mismo gesto del índice, con contador abajo | La más visual; continuidad total con la Pila | Texto corto obligado; repite el gesto del índice |
| **3 · Evidencia** | El sitio real queda fijo al lado: al leer cada decisión, tapin.cl se desplaza a esa parte (el menú se abre solo) y un marco la señala. Las decisiones de marca cambian el escenario a sus piezas | La prueba más fuerte de "diseño y construyo": la decisión y su resultado en vivo, uno al lado del otro | Depende de tener el sitio en el mismo dominio (Fase 6); en móvil cae a piezas estáticas |

Material nuevo en `explorations/caso/media/` (fuera del repo, es material de cliente): secciones del sitio capturadas, láminas del manual de Connect, 15 isotipos explorados del Branding Rebirth y fotos del lanzamiento.

### Elegida: 3 · Evidencia, como plantilla para todos los casos, con identidad propia (21 oct 2026)
Tu pedido: la mecánica de la 3 es la base de todos los casos, pero cada caso se viste con la identidad de su proyecto.

**Reparto entre marco y proyecto** (ajusta la hipótesis 2: la identidad del proyecto ya no vive solo en el hero y las piezas, sino en toda la piel del caso):
| Es de Agustín Design (constante) | Es del proyecto (cambia en cada caso) |
|---|---|
| Barra superior, grilla de 12 columnas, orden del caso (portada, resumen, decisiones, proceso, resultado, aprendizaje, siguiente), mecánica de evidencia (sitio real fijo, resalte que viaja, riel con J y K), tiempos de lectura y el bloque "siguiente proyecto" | Tipografías, color y ritmo de fondos, formas (radios, sombras), texturas, estilo de etiquetas y del resalte, gesto de movimiento y la escena de portada |

**Sistema:** `caso-base.css` define un contrato de variables `--c-*` con valores neutros; cada tema (`tema-tapin.css` con `.tema-tp`, `tema-llego.css` con `.tema-lf`, siguiendo los prefijos del repo) solo redefine variables y agrega sus detalles. El contenido vive en `datos-*.js` y la plantilla (`caso-plantilla.js`) arma la página; `caso-evidencia.js` es la mecánica común. Sumar un caso es escribir sus datos y su tema.

| Caso | Identidad aplicada (sacada de su propio sitio y manual) |
|---|---|
| **Llegó Farma** | Retícula de precisión visible con cortes de 8 px en los cruces, nodos (franjas, riel y esquinas del resalte), Manrope 200 a 500 con escalón, LF Mono con el cero sin punto, radios en cero y sin sombras, ritmo oscuro, papel y degradado turquesa con grano, cifras en mono con conteo |
| **Tap In** | Poppins, morado y lavanda, decisiones sobre fondo claro como el sitio (su propia decisión "de oscuro a claro"), píldoras con punto, vitrina de vidrio, resalte con brillo, piezas que flotan como los mockups del hero, cifras en tarjetas |

### Audit de la opción 3 y mejoras aplicadas
| Hallazgo | Mejora |
|---|---|
| El navegador ocupaba todo el alto: un formato casi cuadrado y un sitio con un viewport irreal de 1.333 px | Vitrina con proporción real de pantalla (16:10), centrada |
| El sitio se cargaba recién al acercarse a las decisiones: las primeras mostraban solo la portada | Se carga en reposo apenas abre la página (nunca durante el scroll) |
| Sin noción de avance dentro de las decisiones | Riel con una marca por decisión (pasadas, actual), presionable, y atajos J y K |
| La etiqueta del resalte repetía "Decisión 03" | Dice qué se marca ("Menú · Soluciones") y el pie del escenario lo repite |
| El resalte quedaba corrido cuando el sitio animaba lo que entraba en pantalla | Segunda medición a 1,1 s |
| El sitio mostraba una parte, pero no su interacción | Modo demostración: las pestañas de módulos de Tap In se eligen solas y la ruta de Llegó avanza etapa por etapa |
| Las capas de marca aparecían de golpe, flotando en el vacío | La exploración se recorre en orden y termina en lo elegido (isotipos de Tap In, cruces de Llegó) |
| Texto inactivo al 28%: difícil de leer si alguien se adelanta | 38% |
| Sin salida al sitio real | "Verlo en tapin.cl ↗" por decisión (no en Llegó: aún no está publicado) |
| Bug: el escalón de Llegó (`text-indent`) se heredaba a cada palabra animada | Anulado en las palabras |
| Bug: un selector del tema le quitaba el sticky al escenario | `:where()` sin especificidad |
| Fluidez | 59 a 60 fps en el scroll por las decisiones con el sitio cargado, en los dos casos |

**Decisiones de Llegó tomadas de tus documentos:** convivencia con la marca madre, paleta ampliada con 104E56, wordmark dibujado, tres caminos para la cruz con cuatro criterios y adjetivos, retícula visible en la web, tres atajos en el hero y la ruta en SVG. El caso dice que la cruz la eligió el cliente (Nodos) y no cuenta que tú recomendabas Líneas: se decide en la Fase 4 si eso se publica.

### Tap In, a fondo (21 oct 2026)
Fuente: `~/Documents/Illustrator/Tap In/Portafolio/tapin-caso-de-estudio.md` y la carpeta completa del proyecto (branding 2025 y Rebirth, manual de Connect, piezas físicas, mockups del sitio). No se publica nada marcado `[SENSIBLE]` (montos, equity, finanzas, frases privadas, fotos generadas con IA, el panel con el "65%") y las cifras `[ILUSTRATIVO]` de los mockups no se presentan como resultados.

**Tus cuatro pedidos**
| Pedido | Qué se hizo |
|---|---|
| La imagen inicial no puede repetir el mockup del índice | **Escaparate:** los cuatro mockups animados de Connect (comedor, centro de padres, gestión, talleres) corriendo en vivo sobre el morado de la marca, escalonados como el bento del manual. Solo animan cuando se ven |
| Un hero más atractivo y único por proyecto | **Hero propio de Tap In:** el wordmark real gigante y las tiras diagonales de la paleta (del manual), una por producto con su tono e isotipo: marca madre, Forky (Campus), el cerebro (Connect) y Health en camino. Entran escalonadas y siguen al cursor con inercia. Cada caso ahora puede traer su hero (`window.CASO_HERO`) |
| Usar toda la historia de Tap In | **Tres capítulos y 11 decisiones:** Campus (Forky, la marca en el campus), el Rebirth (madre que lidera, familia morada, el cerebro de cuatro piezas) y tapin.cl (menú, confianza primero, oscuro a claro, módulos en paralelo, el mockup con empatía, diseñado en código) |
| Una invitación al siguiente proyecto más única | **Se presenta con la identidad del próximo:** una pista de scroll con el panel fijo; la escena de Mend se abre como lámina, su logo se dibuja con la animación oficial, la app sube y una barra se llena hasta abrir el caso (con movimiento reducido no navega solo). Escenas para Mend, Tap In y Llegó |

**Piezas construidas en código (no láminas):** la evolución de la marca 2025 que avanza sola hasta Forky; la arquitectura con lockups reales y un lugar vacío para "el cuarto producto"; la paleta con Connect marcado como producto principal; el isotipo de Connect que alterna entre "a la rápida, un cerebro" y "si te fijas, cuatro piezas" separando sus cuatro trazados y tiñéndolos con la familia; el mockup del comedor en vivo; la escala del código.

**Audit y correcciones**
| Hallazgo | Corrección |
|---|---|
| La barra usaba difference: sobre el morado el logo se veía verde amarillento | La barra toma el color de la sección que tiene debajo, como la navbar de tapin.cl (también arregla Llegó) |
| El sitio en vivo se cargaba al abrir la página y competía con el hero y los mockups | Se monta en reposo cuando las decisiones están a menos de dos pantallas |
| Las tiras del hero tapaban el wordmark y cortaban Health | Más angostas y a la derecha |
| La grilla de piezas físicas desbordaba el escenario | Bento de proporción fija con etiquetas encima |
| El teléfono de Mend tapaba el texto de avance | Más arriba y más chico; la barra de avance va en una píldora |
| El conteo de cifras no soportaba prefijos ("≈40.000") | Prefijo y sufijo |
| "Ver el proyecto" saltaba de golpe | Scroll suave |
| Fluidez | 60 fps en el scroll por las decisiones con el sitio cargado |

**Por decidir contigo:** las dos citas de los cofundadores (suavizadas, marcadas "por aprobar"); el contexto de tracción de la empresa (marcado "por confirmar"); si se cuenta que tú propusiste el "acceso denegado" y te lo rechazaron (hoy se cuenta, porque muestra criterio y empatía).

### Tap In, segunda pasada (21 oct 2026)
**Relato en cuatro tiempos, con mucho menos texto:** hero → resumen en una frase → **mapa del proyecto** (las tres etapas a escala de tiempo, con hitos que se abren) → **El origen** (Campus) → **El Rebirth** (la marca) → **La web** (tapin.cl) → **resultado** con el producto en vivo → aprendizaje → siguiente. Cada capítulo abre con una portada a todo el ancho y tiene su propio escenario. Cada decisión: título, una frase y un porqué de una línea.

| Tu observación | Qué se hizo |
|---|---|
| La portada no convence: 3 a 5 propuestas | **4 portadas** en `caso/portadas-tapin.html` (y `tapin.html?portada=a\|b\|c\|d`): A tiras de la paleta, B antes y después que se arrastra (Campus 2025 contra Connect 2026), C ecosistema claro con los módulos flotando, D de Forky al cerebro al bajar |
| El "tap in" del hero muy grande | De 54 a 38 % del ancho |
| La sección 00 no deben ser los módulos | Los módulos en vivo pasaron al **resultado**: lista de los cuatro a la izquierda (avanza sola con barra de tiempo, se pausa con el mouse) y el elegido funcionando a la derecha |
| Tamaños y pesos | Escala de cinco niveles (portada de capítulo, título de sección, título de decisión, bajada, texto); el porqué con línea de acento y en primer plano |
| Capítulo 01: no toda la exploración | Exploración breve y coherente: cubiertos, en movimiento, el cuerpo, casi, y Forky corriendo |
| Decisión 02: resultados, no imprimibles | Bento con estudiantes usando la app, las promociones de Red Bull y Banco de Chile y el stand en la UC, más los datos (60 QR, 2 alianzas) |
| Capítulo 02 más atractivo | Lockups sobre tarjetas con el degradado de cada tono, líneas que cuelgan de la madre y se dibujan, hover que levanta la tarjeta y muestra su uso, el lugar del cuarto producto latiendo |
| Hover en la decisión 04 | El tono se ensancha y muestra HEX, RGB y su uso |
| Decisión 05 mucho mejor | Lámina del manual: cerebro blanco sobre el morado de Connect con grilla de construcción; alterna entre el cerebro y sus cuatro piezas numeradas; prueba de escala a 60, 32 y 24 px |
| Mejor forma de destacar la web | **Foco:** fuera de la parte marcada el sitio se desenfoca y se apaga (cuatro paneles con backdrop-filter), esquinas que se dibujan y una etiqueta pegada por fuera. Aplica a todos los casos (en Llegó, con nodos) |
| La gráfica de la decisión 11 | Se quitó: la escala del código vive en las cifras del resultado |
| Proceso, resultado y aprendizaje | Mapa interactivo al inicio; resultado con el producto en vivo, cifras en vidrio y citas; aprendizaje que se enciende palabra por palabra al bajar |
| Auditar el paso al siguiente proyecto | Anillo de avance en vez de la barra, disciplinas de Mend en píldoras, el nombre en la tipografía de Mend, una luz que crece con el avance y, al completar, la app muestra su pantalla de inicio antes de abrir |

**Bugs del audit:** la portada D perdía el sticky por `overflow: hidden` (ahora `clip`); las etiquetas de etapas chocaban con los hitos del mapa (ahora leyenda); la mecánica de evidencia pasó a funcionar por tramo (cada capítulo con su escenario; J y K saltan entre todos). Fluidez: 60 fps sin cuadros lentos.

### Tap In, tercera pasada (21 oct 2026)
| Tu observación | Qué se hizo |
|---|---|
| Ninguna portada convence: degradado y el mockup del capítulo 03, animado | **Hero del resultado:** degradado de la marca con dos luces y grano; a la derecha, tapin.cl en un navegador que baja solo de arriba abajo (captura nueva en alta) y el mockup del comedor funcionando encima, sin marco. Parallax suave. Se quitaron las cuatro portadas anteriores |
| Wordmark más chico | De 38 a 26 % del ancho |
| La barra de arriba | **Se esconde al bajar y reaparece al subir**, con fondo de vidrio cuando vuelve a mitad de página (claro u oscuro según la sección). Arriba del todo, sin fondo. El escenario fijo crece cuando la barra no está y el sitio embebido se reescala |
| Cortes drásticos de fondo: tres variantes | `caso/fondos-tapin.html` (y `tapin.html?fondo=1\|2\|3`): **1 fundido** (cada sección nace del color de la anterior), **2 láminas** (cada sección se apoya redondeada sobre la anterior, como el índice), **3 fondo que fluye** (un solo fondo que interpola color y texto según la sección que se lee, con @property) |
| Resumen | La ficha del proyecto ocupa la columna derecha que quedaba vacía |
| Mapa | Leyenda de etapas, marcas de año y tarjetas que se abren |
| Capítulo 01 | El teléfono con la app de Campus entre las dos fotos y el sello de Forky |
| Decisión 02 | Las promos de Red Bull y Banco de Chile dentro de teléfonos con la barra de la app, junto a las fotos del campus |
| Capítulo 02 | Las tiras suben en escalera al aparecer y responden al mouse |
| Resultado | Cifras en una franja limpia; una cita grande a la vez que se alterna sola |
| Aprendizaje | Se enciende palabra por palabra; al lado, el giro en dos isotipos (Forky 2025 → cerebro 2026) y los créditos ordenados |

### Fondo elegido: láminas con flujo dentro de cada capítulo (21 oct 2026)
Elegiste la opción 2, con algo de la 3. La regla quedó así: **las láminas separan bloques** (portada, resumen y mapa, cada capítulo, resultado, aprendizaje) y **dentro de cada capítulo el fondo fluye** (la portada del capítulo se funde con sus decisiones mientras se lee, porque son una misma cosa).

- **Entrada de cada lámina:** sube redondeada y 4 % más angosta por lado, y se abre a todo el ancho al llegar arriba (clip-path ligado al scroll); al llegar queda con un radio de 20 px.
- **La lámina de atrás** se oscurece a medida que la nueva la cubre, como la pila del índice.
- **Flujo del capítulo:** el bloque interpola su color (y el del texto) entre la portada oscura o morada y el lavanda de las decisiones, con los colores registrados como @property.
- **Rendimiento:** el radio final no recorta a los hijos (recortarlos obligaba a enmascarar el iframe y bajaba a 50 fps); el velo es su propia capa. Medido: 60 fps en las decisiones, 57 a 60 fps mientras una lámina entra.
- Las variantes 1 y 3 siguen disponibles con `?fondo=1` y `?fondo=3` para comparar.

### Giro editorial: Tap In como proyecto de Behance con escenas (21 oct 2026)
La versión con láminas no te gustó. Nueva dirección, con tus respuestas: **público y con todo** (repo de revisión), **editorial + decisiones**, **texto que varía según convenga** (pie mínimo, decisión breve o "Más contexto" desplegable) y **scroll que narra**. La plantilla anterior queda como historial en `caso/tapin-v3.html`; Llegó sigue en ella hasta rehacerlo.

- **Módulos a todo el ancho que se tocan**, como Behance, alternando lavanda, noche, morado de marca y el azul de Connect. El marco es Agustín Design (Geist y Geist Mono, barra que se esconde); la voz y las piezas son de Tap In (Poppins y su familia morada).
- **Hero:** el resultado en la primera pantalla (tapin.cl bajando solo y el comedor funcionando, sin tarjeta). Al bajar, el navegador crece hasta llenar la pantalla: se entra al caso por el sitio.
- **Escenas fijas con el scroll:** Forky se arma en cinco pasos con su regla; las cuatro tiras de la paleta suben una a una y abren el capítulo 02; la madre dibuja sus líneas y los productos cuelgan de ella; el cerebro de Connect se separa en sus cuatro piezas numeradas, vuelve y se prueba a 60, 32 y 24 px; el manual pasa en horizontal; la dirección tapin.cl se escribe para abrir el capítulo 03.
- **El sitio con el scroll:** tapin.cl baja en un navegador y se detiene en cinco decisiones (menú con el desplegable abierto, confianza, módulos, oscuro a claro, objeciones sin acordeón); el foco apaga el resto del sitio y el índice de la derecha lleva a cada una con un clic.
- **El resto:** Forky cruza corriendo la apertura del capítulo 01; fotos del campus a todo el ancho con parallax; las promos dentro de teléfonos; los cuatro mockups en vivo (solo animan mientras se ven); la web en tres teléfonos; cifras que cuentan; citas y cifras de la empresa marcadas "por confirmar"; aprendizaje palabra por palabra e invitación a Mend.
- **Archivos:** `caso/tapin.html`, `tapin.css` y `tapin.js` (motor de escenas propio: `--p`, `data-rango`, `data-pasos`, parallax). La invitación al siguiente proyecto pasó a `caso-siguiente.css` para compartirla con la plantilla anterior. Fotos del campus recomprimidas (`media/ed-*.webp`, de 1 a 4 MB a unos 150 KB).
- **Medido:** de 108 a 120 fps en una pantalla de 120 Hz en todas las escenas, sin desborde horizontal en 390 ni en 1440.

### Tap In editorial, audit gráfico (21 oct 2026)
Te gustó mucho más; pediste un audit exhaustivo y mejorar a nivel gráfico. Revisado a resolución completa en 1440 y 390.

| Hallazgo | Mejora |
|---|---|
| La barra con mezcla por diferencia se veía verde amarilla sobre los morados | Color según el módulo de abajo: tinta sobre lo claro, blanco sobre lo demás (y tinta cuando el hero ya entró al sitio) |
| Decisiones como columnas de texto chico flotando en vacío | Número grande de la decisión (01 a 11) en el tono suave, títulos más grandes y equilibrados, cuerpo a 19 px |
| Grises sin contraste suficiente (≈2,4:1) | Grises de apoyo más oscuros en claro y más altos en oscuro; etiquetas mono en gris de lectura |
| Resumen solo con texto y la columna izquierda vacía | La ficha pasa a la columna izquierda como lista; abajo, **índice de capítulos**: tres tarjetas con su pieza (Forky, las tiras, el sitio) que llevan a cada capítulo |
| Capítulo 01: Forky morado sobre casi negro, apagado, y una línea punteada que parecía error | Fondo morado de Campus con grano, Forky blanco con ráfagas de velocidad y el "01" enorme calado detrás; lo mismo con el "03" en La web |
| Forky: escenario chico y regla de solo texto | Escenario más grande con guías de construcción que giran con el avance; la regla lleva la miniatura de cada paso; el final es el lockup de Campus |
| Arquitectura: la madre aplastaba a los hijos y las líneas no se veían | Madre más angosta, productos más grandes y ramas de organigrama que se dibujan con el scroll (la del +1, punteada) |
| Paleta: isotipos diminutos en la esquina de tiras enormes | Isotipos grandes al centro de cada tira, que aparecen con su tono |
| Morados planos | Grano fino en hero, capítulo 01, decisión 02 y teléfonos |
| Hero | Píldora "En producción" dentro del navegador y una pista con flecha que no choca con el sitio |
| Cierre | Cita más grande y balanceada, prefijo "≈" de la cifra más chico, botón a tapin.cl más grande; el giro Forky → cerebro más grande y con un punto que viaja entre ambos |
| Manual y sitio | Barra de avance en el manual; contador "08 / 10" en el índice del sitio |

Medido: 115 a 120 fps en todas las escenas.

### Hero de Tap In: elegida la B "Desde la mesa" (21 oct 2026)
Comparador publicado como artifact (y en `caso/heros-tapin/`): A perspectiva lateral, B desde la mesa, C isométrico. Elegiste la **B**. Aplicado al caso, con tus observaciones:
- El zoom al bajar se mantiene y ahora también **endereza** el sitio: parte recostado (38° en escritorio, 32° en móvil) subiendo desde abajo y se levanta hasta llenar la pantalla, con una curva suave.
- Título centrado arriba: datos del caso en una línea sobre el wordmark (se eliminó la fila de arriba que competía con la barra), lema en Poppins Light **sin punto final** con **campus** y **colegio** en negrita, y un enlace discreto "tapin.cl en producción".
- Fuera la cápsula "En producción" y el mockup chico del comedor. La pista para bajar queda como un círculo con flecha que no choca con el sitio.
- En móvil el texto se alinea a la izquierda arriba y el sitio sube recostado debajo.
- **Ajustes (21 oct 2026):** el enlace queda solo "tapin.cl ↗"; las dos líneas del lema más juntas (interlineado 1,14). **Mouse, en clave Tap In** (como el home, pero propio): el sitio recostado se inclina hacia el cursor con inercia, una luz suave lo sigue sobre el degradado, el reflejo del vidrio se desliza y las letras del wordmark cercanas al cursor suben como la ola del home. **Hover del wordmark:** el punto de la i hace "tap", se hunde y suelta una onda (el wordmark ahora es SVG en línea, letra por letra).

### Resumen de Tap In: el tiempo narra, con la credencial colgante (21 oct 2026)
Comparadores publicados como artifacts (`caso/resumen-tapin/`): primero A ficha editorial, B credencial y tiempo, C antes y después; elegiste la B y pediste afinarla. Sobre su audit (alineación, tamaños, centro vacío de la credencial, línea de tiempo que parecía gráfico de barras, márgenes e interacción) hubo tres mejoras: tarjeta que gira, credencial colgante y el tiempo narra. Elegiste **la 3, con la gráfica en la credencial colgante y el movimiento de la tarjeta, más leve**. Aplicado al caso:
- La sección se fija y el scroll recorre el proyecto mes a mes: un cursor avanza por una **línea de tiempo a escala real** (22 meses, con meses, seis hitos con su fecha al pasar el mouse, el cruce de abril entre el Rebirth y la web y la marca de "Hoy").
- La **credencial cuelga de una cinta con la marca** y cambia al capítulo en curso: tono, signo (Forky, cerebro, navegador), nombre, período y qué pasó. Se inclina levemente con el mouse desde el gancho (7° y 5°), con el brillo del plástico.
- Reemplaza la ficha lateral y las tarjetas del índice: los capítulos se abren desde la línea de tiempo. El resumen vive sobre casi blanco, saliendo del sitio sin corte.
- En móvil: enunciado arriba, credencial al centro sin cinta y la línea de tiempo abajo.

### Ajustes al hero y al resumen (21 oct 2026)
- **Hero:** el navegador ya no muestra una captura que baja; carga **tapin.cl de verdad, sin scroll**, con su animación de entrada y las animaciones del hero que siguen. El sitio pausa lo que cree fuera de pantalla y dentro del navegador inclinado se equivocaba con su hero, así que el hero queda siempre activo; deja de pintarse cuando el hero sale. En un navegador sin GPU el zoom baja a unos 37 fps en escritorio (60 en móvil): **revisar en un Mac real**; si se traba, la salida es una imagen fija solo durante el zoom.
- **Título del resumen:** sin punto final, Poppins Light, con "desde el día uno" y "rehice la marca y programé su web" en negrita.
- **Credencial:** las tres descripciones con el mismo largo (unos 73 caracteres) y máximo dos líneas.
- **El encargo y el resultado:** texto más grande en Poppins, unidos por una flecha (de lo pedido a lo logrado).
- **Línea de tiempo, audit y mejoras:** la píldora negra del mes tapaba hitos y textos; ahora la fecha y el último hito se leen arriba a la derecha y el cursor es solo una línea con un punto. Los capítulos son barras con su número y nombre encima, que **se llenan a medida que pasa el cursor**; los hitos van en su propio eje (el último recorrido lleva un halo y, al pasar el mouse o con el teclado, su texto aparece en la lectura, sin globos encima de nada). "Hoy" pasa a la fila de los años. En móvil quedan solo los números de capítulo.
- **Transición al capítulo 01:** cinco propuestas en un artifact (`caso/resumen-tapin/transicion-tapin.html`): fundido continuo, la credencial se expande, onda de tap, tiras de la paleta y Forky pinta. Pendiente de tu elección.
- **Transición elegida: 3 · Onda de tap.** El recorrido del tiempo ocupa el 70 % de la pista del resumen; al final, la credencial recibe un "tap" (se hunde y vuelve), dos anillos se adelantan y el morado de Campus se abre en círculo desde su centro hasta cubrir la pantalla. El capítulo 01 empieza con ese mismo morado plano en los bordes (la luz va dentro de su panel fijo), así que no hay corte. La barra pasa a blanco cuando el morado cubre.

### Ajustes al hero, al resumen y a la portada del capítulo 01 (21 oct 2026)
- **Hero, entradas:** el fondo se enciende, los datos y el wordmark suben letra por letra, luego el lema y el enlace, y al final tapin.cl **se desliza desde abajo** hasta quedar recostado (se anima el envoltorio para no chocar con el zoom).
- **Hero, corte con el resumen:** al llenar la pantalla, el pie del sitio se funde con el fondo del resumen; ya no queda una línea horizontal.
- **Barra:** enlaces reales (home, índice de trabajos), hover como en el home (letras que ruedan, punto del logo, flecha del índice) y la barra solo vuelve con una subida clara de 90 px; cuando vuelve a mitad de página trae un vidrio del tono de lo de abajo para no pisar el contenido.
- **Resumen:** el encargo y el resultado un poco más chicos. Barras de la línea de tiempo **finas y con el degradado de la paleta**, continuo de punta a punta y cortado en los tres capítulos; lo no recorrido queda velado. El texto del hito ahora va **debajo de su punto, anclado a él**, y se funde al cambiar (antes saltaba arriba a la derecha).
- **Portada del capítulo 01:** Forky más chico, con trote (rebota, se aplasta al pisar, sombra) solo mientras se scrollea y se inclina según la velocidad; líneas de velocidad que se afinan hacia atrás. Descripciones de las tres aperturas sin punto final. **El scroll se acortó:** el capítulo 01 espera fijo detrás del resumen y, al terminar la onda de tap, el resumen sube como un telón: el título aparece primero, sin tramo de morado vacío.
- **Artifact** `caso/resumen-tapin/correas-tapin.html`: tres correas (cinta en V, carrete retráctil, cordón con ojal) y tres fondos para la portada (pista de atletismo, campus en duotono, mosaico de QR) junto al actual. Pendiente de tu elección.
- **Elegidas:** correa **cinta en V** (aplicada: dos tramos tejidos de Campus y Connect con "tap in" estampado y costuras, unidos por un mosquetón en la ranura) y, para la portada del capítulo 01, **el fondo actual**. Sobre ese fondo, tres mejoras para que no se sienta plano en `caso/resumen-tapin/origen-fondo.html`: luz que acompaña a Forky (foco, viñeta y piso con horizonte), profundidad (tres luces de la paleta que derivan y siguen al mouse) y ecos del tap (anillos suaves que continúan la onda). Pendiente de tu elección.
- **Fondo del capítulo 01:** ninguna de las tres mejoras convenció; se queda el fondo actual (morado de Campus con su luz y grano).

### Decisión 01 de Tap In: Las formas (21 oct 2026)
Comparador en `caso/forky-tapin/` con material real del archivo `Branding Tap In.ai` (68 láminas: del rayo verde a Forky): A del rayo a Forky, B las formas, C doble lectura. Elegiste **la B**, con imágenes más distintas y la cuchara más adelante. Aplicado:
- Seis formas reales, en el orden del proceso: utensilios en las letras, un pin con cubiertos, tenedor y cuchillo, las patas y un brazo, una cuchara que corre y casi. Se encienden una a una con el scroll (contador 01 a 07 y rótulo que cambia) y al final se apartan para que aparezca Forky con el wordmark de Campus.
- Se descartaron las cuatro afinaciones casi iguales (se cortaban) y se limpió la astilla del paso "casi". Las máscaras nuevas viven en `media/tp-fk-*.png`.
- Texto: "Antes de Forky hubo utensilios en las letras y un pin. El isotipo partió de un tenedor y un cuchillo; después vinieron las patas y un brazo: cerca de treinta formas" (del md del caso).
- **Audit gráfico de la decisión 01:** las formas se veían pixeladas (el pin medía 144 px y la cuchara 247 px). Ahora se recortan **directo del archivo vectorial** a alta resolución (de 850 a 1230 px por forma), con limpieza de restos de las formas vecinas y bordes suavizados en la cuchara. Cada forma lleva su escala óptica para pesar lo mismo, las tarjetas pendientes quedan menos lavadas, el rótulo crece, el número de cada tarjeta respira más y en el final la grilla desaparece del todo para dejar a Forky solo con su lockup.
- **Ajustes (22 oct 2026):** "Forky" es un nombre interno: en el sitio se dice "el isotipo de Campus" o "unos cubiertos que corren". Tarjetas más chicas (la grilla mide hasta 640 px) con una sombra leve. Descripciones y viñetas de todas las decisiones en la misma línea que el resumen (Poppins 15 a 17 px; "Por qué" con su punto). El título de cada paso pasa **arriba de la grilla** y sus palabras suben en cascada desde una máscara; a la derecha, el contador y siete segmentos. El final usa el **logotipo oficial de Tap In Campus** (`logo_tapin_campus.svg` del sitio: isotipo, wordmark y "Campus" debajo).
- **Paso al capítulo 01 sin telón:** el capítulo ya está fijo detrás cuando la onda termina, y el resumen se desvanece encima en el último tramo; no hay telón que suba ni franja oscura.
- **Ajustes (22 oct 2026):** el paso final dice "El logotipo de Campus". Los títulos de los pasos bajan a un detalle (número en mono, nombre en Geist de 14 px y siete segmentos, sobre una línea fina) y se reescribieron: utensilios dentro de las letras, un pin de ubicación con cubiertos, tenedor y cuchillo cruzados, aparecen las patas y un brazo, una cuchara que corre, los cubiertos ya corren. **Transición a la siguiente sección:** la primera foto del campus sale como una ventana, recortada con márgenes y esquinas sobre el lavanda, y se abre a todo el ancho a medida que llega arriba.

### Grilla del caso (22 oct 2026)
Comparador `caso/grillas-tapin/` con cinco grillas sobre el resumen, la portada del capítulo 01 y la decisión 01 (doce, editorial, riel, modular, fina). Elegiste **una mezcla de la editorial y el riel**, que queda como norma para lo que viene:
- 12 columnas, medianil de 24 px, margen `max(clamp(24px, 5vw, 96px), (100vw − 1600px) / 2)`: márgenes amplios y 1600 px de contenido como máximo.
- **Riel de rótulos en las columnas 1 a 3** (etiquetas, números y "Capítulo 0X · año"), como el home y el índice de trabajos; el texto va de la 4 a la 9 y las piezas pueden llegar a la 12.
- Aplicado: resumen (rótulo en el riel, enunciado y encargo de 4 a 9, credencial de 10 a 12, línea de tiempo de 4 a 12), aperturas de capítulo (rótulo en el riel, título desde la 4) y decisión 01 (numeral y rótulo en el riel, texto de 4 a 6, formas de 8 a 12). La barra superior toma el mismo margen. En móvil, una columna.
- **Excepción:** el **resumen** usa la ubicación editorial (columnas 1 y 12 libres, texto de 2 a 7, credencial de 9 a 11 y línea de tiempo de 2 a 11); el resto del caso sigue el riel.

### Decisión 02 de Tap In: La marca salió al campus (22 oct 2026)
Comparador en `caso/campus-tapin/`. Elegiste **la B (del QR al pedido)**, con fotos más atractivas y abajo solo las de las activaciones. Aplicado:
- **Escena fija de tres pasos** con la grilla del caso (numeral y rótulo en el riel, texto de 4 a 6, pieza de 8 a 12): el pendón real de pie como un roll-up (riel, base y sombra en el piso) y un teléfono de bisel fino. Paso 1: el visor se marca sobre el QR del pendón, el teléfono se inclina hacia él y su cámara muestra ese mismo QR de cerca, con una línea de barrido y el aviso "QR detectado". Pasos 2 y 3: la pantalla pasa a la app con la promo de Red Bull y luego la de Banco de Chile, como tarjeta completa sobre el menú insinuado. El rótulo de pasos es el mismo detalle de la decisión 01.
- **Texto:** "60 QR en los locales de la UC y promociones con Red Bull y Banco de Chile dentro de la app"; por qué: "La entrada era un QR: tenía que entenderse de pie, con hambre y frente al mesón"; cifras 60 y 2 en el morado de Campus.
- **Las activaciones:** salen las fotos del campus que no eran de activación. Quedan dos grupos con su rótulo en el riel (Red Bull, Campus UC; Banco de Chile, stand en la UC), tres fotos cada uno, escalonadas, con parallax interno a distinta velocidad, esquinas redondeadas, un destape desde abajo al entrar y zoom leve al pasar el mouse. En móvil, dos columnas y la tercera foto a lo ancho.
- **Ajustes (22 oct 2026), teléfono:** el mockup se rehízo. Ahora tiene marco de titanio con sus cuatro botones, bisel negro, isla, barra de estado, indicador de inicio y un reflejo que cruza el vidrio con el scroll; todo se mide en relación al teléfono, así se ve nítido en cualquier tamaño. La cámara tiene viñeta, visor, barrido, los modos y el disparador, y el aviso es un banner con el ícono de Tap In ("Abrir app.tapin.cl"). La app se abre desde ese aviso: cabecera con el wordmark, "Promos", y las dos promos en un **carrusel** que avanza con el paso (puntos, nombre de la marca, botón "Usar en mi pedido" y barra de pestañas).
- **Las activaciones, cinco formas** en `caso/activaciones-tapin/`: A carrete (riel horizontal fijo), B pliego (foto a sangre con la marca en grande y dos apoyos), C texto fijo (ficha fija y fotos que pasan), D hoja de contactos (tiras de película y caja de luz con flechas) y E pila que se reparte. El audit: cinco de las seis fotos son horizontales y estaban en marcos 4:5, todas del mismo tamaño y chicas, con un escalonado que se lee como error. Pendiente de tu elección.
- **Activaciones, elegida la B · Pliego**, con los logos de las marcas. Cada activación abre con una foto a sangre que se aleja suave al cruzar la pantalla; abajo a la izquierda, el **logo de la marca en blanco** (Red Bull y Banco de Chile, los SVG de la landing de Tap In, con alturas ópticas distintas) sobre "Activación 0X" y el lugar, y el nombre de la marca en grande desde la columna 4. Debajo, el índice de las tres fotos en el riel y dos fotos de apoyo en su proporción real, que se destapan al entrar. En móvil, foto a sangre más baja y apoyos en dos columnas.
- **Ajustes (22 oct 2026):**
  - **Teléfono:** se quitó la línea blanca que se colaba en el borde de la pantalla (el fondo de la pantalla ahora es negro). La hora queda centrada con la isla y la cabecera de la app respira más. Se sumaron chips (Todas, Bebidas, Bancos) y se repartió el espacio para que no quede un hueco sobre las pestañas.
  - **Galerías:** las fotos de apoyo de cada pliego pasan a ser una **galería** con nueve fotos editadas de cada activación (`media/tp-rb-01…09.webp` y `tp-bc-01…09.webp`, elegidas de `Pictures/Tap In/Activaciones/…/Editadas`). Es un riel con snap que sale por el borde derecho; en el riel de la grilla van el contador grande, una barra de avance y dos flechas con hover. Se arrastra con el mouse, se recorre con las flechas del teclado y las fotos entran en cascada.
  - **Cifras 60 y 2:** cada una tiene un rótulo mono con su ícono (QR y dos círculos), una línea arriba y un texto más claro ("en locales de la UC", "con marcas: Red Bull y Banco de Chile"). Al pasar el mouse, la línea se llena en morado, la cifra sube y vuelve a contar, el QR gira y los círculos se juntan.

### Navegación del portafolio en revisión (22 oct 2026)
Home (`hero/h1-capas.html`), works (`works/w3-pila.html`) y el caso Tap In quedan conectados:
- **Home:** "ver proyectos", Works y el enlace del final llevan al índice de trabajos; Contact abre el correo (agustin@uc.cl); LinkedIn, Behance e Instagram son los reales.
- **Works:** el logo y About vuelven al home; Contact abre el correo. Al hacer clic en la lámina de Tap In, la escena viaja a sangre como siempre y al terminar se entra al caso. Si se vuelve con el navegador, la lámina regresa a su lugar. Llegó Farma y Mend siguen con el caso de prueba hasta tener su página.
- **Tap In:** el logo, About y Contact van al home; Works e Índice, al índice de trabajos.
- **Home con works integrado** (`works/inicio.html`): al bajar desde el hero, la apertura "works" lo cubre como cortina y siguen la pila de destacados (Llegó Farma, Tap In, Mend) y el archivo, todo en una sola página. Works y "ver proyectos" bajan a esa sección, el logo y About vuelven arriba y la barra compacta solo aparece cuando el hero ya quedó atrás. Para que convivan, los estilos del hero y de works quedan separados (la escena del hero y las letras que suben no se pisan). Desde el caso, Works e Índice llevan a `inicio.html#works`. `hero/h1-capas.html` y `works/w3-pila.html` siguen como exploraciones sueltas.
- **Ajustes (22 oct 2026):** la primera foto de la galería de Banco de Chile es la promotora con las tarjetas (antes la quinta). **Carruseles:** la primera foto se veía cortada antes de interactuar porque las fotos entraban desplazadas 32 px y el snap se enganchaba a esa posición; ahora entran con un barrido (clip-path) que no mueve el ancla y el riel parte en 0.
- **Paso del 01 al 02, cinco versiones** en `caso/pasos-tapin/` (más la actual): A el logotipo viaja al logo del pendón, B el pendón se despliega como roll-up, C el isotipo corre y arrastra el morado de Campus, D sesenta QR que llenan la pantalla y uno se vuelve el del pendón, E entrar a una foto del stand hasta el logo del pendón. Pendiente de tu elección.
- **Activaciones, audit y tres mejoras** en `caso/activaciones-v2/`: A pliego afinado (lockup Tap In × marca, título contenido con una línea de qué pasó, pie de foto, segmentos, pastilla de cursor y caja de luz), B selector de marca (un solo módulo) y C escenario y tira (avanza solo, como historias). Pendiente de tu elección.
- **Elegidos: paso B (se despliega) y pliego afinado (A).**
  - **Paso:** sale la foto ventana. La escena del QR se monta transparente sobre las últimas 100svh de la decisión 01 (que ahora reparte sus siete pasos en el 70 % de su pista y deja al logotipo solo un momento). Mientras se fija, el logotipo sube y se apaga, entra la base del roll-up, la tela sube desde ella hasta montar el riel, el texto de la 01 da paso al de la 02 y al final llegan el teléfono y el rótulo de pasos. La escena del QR pasa a tener 4 pasos (el primero es este paso) y su fondo solo es transparente donde monta sobre la 01.
  - **Pliego afinado:** cada foto a sangre lleva arriba el lockup Tap In × marca (wordmark, cruz fina y logo, en blanco) y "Activación 0X / 02"; abajo, el lugar en el riel, la marca más contenida y una línea de qué pasó. La galería cambia la etiqueta y la barra por un segmento por foto y el pie de la foto en pantalla; suma una pastilla que acompaña al cursor ("Arrastra · Clic para ampliar") y una caja de luz con flechas, Esc y el pie de cada foto.
- **Ajuste:** sale la pastilla que acompañaba al cursor en las galerías. Usaba la misma clase que el cursor de la línea de tiempo del resumen, y el script movía ese cursor (la barra con el círculo) detrás del mouse.
- **Lockup de la alianza afinado:** la X quedaba baja y pegada porque compartía nombre con el lockup de la sección de arquitectura (`.tp-lockup`, alineado por línea base con 6 px de espacio), que además se veía afectado. Ahora es `.tp-alianza`: todo se mide desde la altura del wordmark (la cruz es un tercio de ella, en SVG con trazo de 1,3 px y puntas redondas; los dos espacios son la mitad de esa altura) y el wordmark, la cruz y el logo quedan centrados en el mismo eje.
- **Paso a El Rebirth, tres propuestas** en `caso/rebirth-tapin/` (más el actual): A la línea del tiempo sigue (el cursor entra al capítulo 02 y la noche se extiende detrás de él), B telón de la paleta (las cuatro tiras suben hasta cubrir la pantalla y luego bajan a su altura) y C de Campus a Connect (la noche se abre en círculo desde el isotipo, que se vuelve el cerebro de Connect). Pendiente de tu elección.
- **Paso a El Rebirth, elegido el B (telón de la paleta).** La escena del capítulo 02 se monta transparente sobre el final de las activaciones (margen de −100svh, fondo claro donde monta): las cuatro tiras suben de a una hasta cubrir la pantalla mientras las fotos se van hacia arriba, recién entonces se enciende la noche, y las tiras bajan su borde a su altura para dejar ver el título. Los nombres, códigos y la etiqueta de Connect aparecen cuando ya bajaron; la decisión 04 entra al final.
- **El Rebirth, audit y tres mejoras** en `caso/rebirth-v2/`: la sección no sigue la grilla (título y decisión con "space-between"), la decisión 04 se pierde al lado del título y el texto blanco sobre Health mide 2,79:1 (no pasa AA). A grilla y sistema (portada como las demás aperturas, luego las tiras viajan a las columnas 8 a 12 y la decisión entra con su patrón; Connect más ancho, Health con texto noche 6,8:1 y el contraste de cada tono), B tonos en uso (tarjetas de la 4 a la 12 con una pieza real de cada producto) y C una sola escala (las tiras se funden en una escala continua con cada producto marcado). Pendiente de tu elección.
- **El Rebirth, elegida la A (grilla y sistema), con las barras rehechas.** La escena pasa a 480svh con tres tiempos: el telón de la paleta, la portada en la grilla (rótulo en el riel, título desde la 4, bajada de 4 a 9) y la decisión 04 con su patrón (04 grande y rótulo en el riel, texto de 4 a 6, "Por qué"), mientras las tiras viajan a las columnas 8 a 12 y Connect se ensancha.
  - **Audit de las barras:** el degradado lavaba el tono real; el isotipo flotaba sin estructura; los textos eran de 11 px y solo el código; Health tenía texto blanco a 2,79:1 y un círculo punteado que se veía sin terminar; Connect medía lo mismo que las demás.
  - **Tarjetas de tono, como en un manual:** el tono real de fondo con una luz suave arriba y un filo interior; número arriba (y "Principal" en Connect, dentro de la tarjeta); el isotipo al centro; abajo la escala del tono (100, 70, 42 y 18 %), el nombre, el código y una etiqueta de contraste con una muestra "Aa" (AAA o AA; la cifra se ve en la portada y al pasar el mouse). Health lleva texto noche (6,8:1) y, en vez del círculo punteado, una órbita fina con un punto que la recorre. Al pasar el mouse, la tarjeta se ensancha y muestra el uso, el RGB y la cifra del contraste. En móvil, nombre y nivel de contraste.
- **Ajustes a las tarjetas de tono (22 oct 2026):** salen los cuatro bloques de escala. En la pieza (columnas 8 a 12) cada tarjeta queda limpia, con el isotipo y el nombre; al pasar el mouse, con el foco del teclado (son enfocables) o con un toque en móvil, se ensancha, el isotipo sube y se despliegan en cascada el número, el uso, el código con su RGB y el contraste. Las otras se angostan y apagan su nombre para no quedar cortadas. Se corrigieron de paso tres restos de la ronda anterior: una llave suelta en el CSS, roles de lista repetidos en el HTML y la prioridad de la tarjeta abierta frente a las demás.
- **Paso a la decisión 03, cinco versiones** en `caso/arq-pasos/`: A la familia se arma (la tira de Empresa se vuelve la marca madre y las otras sus hijos, mientras el claro sube), B telón claro (el espejo del telón de la paleta), C al wordmark (la cámara entra al wordmark y su tono se recoge en la tarjeta madre), D iris de Connect (el claro se abre en círculo desde el principal) y E persiana de tonos (los cuatro tonos suben en franjas y la última es el claro). Pendiente de tu elección.
- **Paso A (la familia se arma) y decisión de la arquitectura rehecha.** La arquitectura deja de ser una sección aparte: es el cuarto tiempo de la escena de El Rebirth (ahora de 680svh). Desde la pieza de la paleta, el claro sube desde abajo, la tira de Empresa viaja y se vuelve la marca madre, y Campus, Connect y Health bajan a ser sus hijos (el JS lleva cada tira a su nodo). Se dibujan las ramas y, al final, el bus se alarga y el +1 entra deslizándose: "si mañana hay un cuarto producto, entra solo", demostrado. La barra superior pasa a tinta sobre el claro.
  - **Audit:** el diagrama iba de la 1 a la 8 y el texto de la 10 a la 12, al revés de las demás decisiones; las ramas casi no se veían; los lockups de los hijos eran mínimos; la idea clave (el wordmark nunca cambia) no se mostraba; y la numeración iba 04 antes que 03.
  - **Ahora:** texto con el patrón de las decisiones (número y rótulo en el riel, texto de 4 a 6, "Más contexto" al final) y el árbol de la 8 a la 12. Madre en el tono de Empresa con el wordmark grande; ramas de 1,5 px que se dibujan; hijos como tarjetas de tono con isotipo y lockup (wordmark y nombre); el +1 punteado con un "+" en órbita; y una nota bajo los cuatro: "Igual en todos: el wordmark · Cambia: isotipo, nombre y tono".
  - **Numeración corregida:** la paleta pasa a ser la decisión 03 y la arquitectura la 04, así el caso se lee 01, 02, 03, 04, 05.
  - De paso: la caja de luz (fija, de pantalla completa) dejaba a la barra superior sin detectar el módulo de abajo en todas las secciones siguientes; ahora no cuenta como módulo.
- **Ajustes:** Health va en blanco en el árbol, como Campus y Connect (el blanco sobre su tono mide 2,79:1).
- **Decisión 04, cinco maneras de mostrarla** en `caso/arq-v2/`: el esquema de cajas se leía genérico. A matriz de marca (una fila por producto con isotipo, lockup, tono; banda sobre lo constante), B anatomía del lockup (un lockup grande anotado en el que cambian isotipo, nombre y tono con el scroll y el wordmark queda quieto), C eje común (lockups apilados a gran tamaño, guía punteada donde termina lo que nunca cambia), D árbol editorial (organigrama con filetes de 1 px, sin cajas) y E en sus piezas (sitio de Empresa, app de Campus y módulo de Connect con su lockup, bajo una llave). Pendiente de tu elección.
- **Decisión 04, elegida la B (anatomía del lockup), rehecha en la marca.** El lockup negro sobre blanco no es como se usa Tap In (siempre en blanco sobre sus tonos) y se leía como texto suelto. Ahora es una placa en el tono del producto con el lockup en blanco (isotipo, wordmark y nombre), una línea mono con el número, el uso y el código, y debajo las cotas alineadas con cada parte (Isotipo cambia · Wordmark nunca cambia, en morado · Nombre y tono cambian) y la serie de los cuatro productos.
  - Al bajar, la placa pasa por Campus, Connect, Health y +1 (tono por definir, en tinta): cambian el tono (transición de color registrada con @property), el isotipo y el nombre; el wordmark no se mueve. Con el mouse o el teclado sobre la serie se puede ver cada uno.
  - El paso: las cuatro tiras de la paleta viajan juntas hasta la placa (Campus queda arriba) mientras sube el claro. La escena de El Rebirth pasa a 820svh: los tres primeros tiempos usan los primeros 380svh (--pr) y la decisión 04 el resto (--p4), para que cada producto tenga su tramo.
  - Sale el árbol de tarjetas.
