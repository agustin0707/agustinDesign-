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

### Decisión 05 · El cerebro de Connect, audit (22 oct 2026)
Comparador en `caso/cerebro-v2/` con un audit de 11 puntos (grilla fuera del patrón, corte desde el claro de la 04, rótulo distinto de los pasos de las decisiones 01 y 02, números de armado sobre las piezas, grilla de cuadros genérica, separación sin peso, piezas sin significado, prueba de escala en fichas con un naranja fuera de la paleta, sin interacción, "Aprobado" en lugar de un porqué y móvil apretado), tres direcciones animadas (A del lockup al cerebro, B piezas y módulos, C construcción y legibilidad) y un catálogo de 16 mejoras sueltas para combinar. Pendiente de tu elección.
- **Elegida la C (construcción).** La decisión 05 pasa a ser una lámina técnica en tres pasos, con el rótulo de las demás decisiones (01 / 03, Construcción · Relleno · Legibilidad): la grilla de construcción (círculos y ejes) y el contorno del cerebro se dibujan con el scroll; el isotipo se rellena; y se achica para dejar lugar a una regla de tamaños reales de 128 a 16 px (Ideal, Pasa, Mínimo, Riesgo, No) con una barra que se llena hasta el mínimo de 32 px. Texto con el patrón de las decisiones (riel, 4 a 6) y pieza de la 8 a la 12. El fondo cambia la grilla de cuadros por la luz de Connect y una trama de puntos que se apaga hacia los bordes. Salen los números de armado, el lema central y las fichas de escala (con el naranja fuera de la paleta). En móvil, la regla va de 64 a 16 px.
- **Decisión 05, audit gráfico y de interacción y tres variantes** en `caso/cerebro-v3/`: la composición se cargaba arriba (vacío abajo a la izquierda), el cerebro tocaba la línea del rótulo, el avance eran tres segmentos de 18 × 3 px y el cierre era una regla técnica. Las tres ponen el texto a lo alto de la escena con los pasos abajo, sacan el rótulo de la pieza para que el cerebro respire, hacen los pasos clicables y cambian la regla por el isotipo en uso: A índice de pasos con línea que se llena y usos en fila (pestaña, ícono de la app, notificación), B ecosistema (el cerebro vuela a la pestaña de un navegador con la barra de Connect y entra un teléfono con el ícono y una notificación, pasos en riel) y C cuatro usos en 2 × 2 con números grandes en el riel. Pendiente de tu elección.
- **Elegidos: los números grandes (C) como pasos y el ecosistema (B) como cierre, con los mockups rehechos.**
  - **Composición:** el texto va a lo alto de la escena (la decisión arriba y los pasos abajo, alineados con el fondo de la pieza) y la pieza ya no lleva rótulo, así el cerebro no toca ninguna línea.
  - **Pasos:** 01, 02 y 03 en grande en el riel, con su nombre; el actual en blanco y los demás apagados. Son botones que llevan a su tramo.
  - **Audit de los mockups:** el navegador eran barras grises de esqueleto, sin controles ni dirección, con un vacío blanco; el teléfono tenía un bisel negro grueso, cuadros iguales y una notificación cortada.
  - **Ahora:** el navegador es una ventana de macOS (luces, pestañas, barra con candado y tapin.cl) con la captura real del sitio de Connect ("Todo conectado"). El teléfono usa el mismo marco de la decisión 02 (titanio, bisel fino, isla y barra de estado), con un fondo en los tonos de Connect, una notificación de cristal ("Casino · marzo · El pago ya está conciliado") que baja al final, íconos de cristal sin marca (para no inventar apps), el de Connect con su nombre y un dock.
  - **Gesto:** en el paso 3 el cerebro vuela hasta la pestaña y se vuelve su favicon. Al pie, los tamaños: pestaña 16 px, barra 32 px, notificación 38 px e ícono 60 px.
- **Mockups del ecosistema, segundo audit y tres variantes** en `caso/cerebro-v4/`: la captura del navegador terminaba en el título de preguntas frecuentes cortado, el teléfono mostraba un inicio inventado (cuadros de cristal vacíos y un dock en blanco), las sombras eran de una capa, el teléfono tapaba contenido y los tamaños iban sueltos lejos de cada uso. Las tres usan pantallas reales del sitio, sombras en capas (contacto, media y ambiente), botones laterales, brillo de vidrio y la imagen bajo la barra de estado: A pantallas reales (el hero de tapin.cl en la ventana, el inicio móvil en el teléfono con la notificación encima y el ícono flotando con su tamaño), B pantalla de bloqueo (hora grande, widgets de Connect y dos notificaciones apiladas; detrás, el bloque "Todo conectado" sin el título cortado; ficha del ícono con su rejilla) y C lámina anotada (ventana y teléfono en leve perspectiva con líneas guía punteadas desde la pestaña, la notificación y el ícono hasta su ficha). Recomendada la A. Nota: la pantalla móvil del comedor corta su bajada a la derecha en el sitio real, por eso las variantes usan el inicio. Pendiente de tu elección.
- **Elegida la A (pantallas reales), con una leve perspectiva en cada pieza.** La ventana muestra el hero real de tapin.cl (con una segunda pestaña, Correo) y el teléfono el inicio real del sitio móvil bajo una barra de estado oscura con batería, con la notificación de Connect encima. Ventana, teléfono e ícono llevan cada uno su perspectiva (`--persp`: 10° en Y y 4° en X), sombras en capas (contacto, media y ambiente); el teléfono suma botones laterales y un brillo de vidrio. El ícono de la app flota junto al teléfono con su nombre y su tamaño (60 px) y entra al final. Salen el inicio inventado (cuadros de cristal y dock) y la línea de tamaños suelta. El cerebro sigue volando hasta la pestaña. En móvil, el ícono flotante se oculta.

### El manual · Audit y tres direcciones (22 oct 2026)
Comparador en `caso/manual-tapin/`. Audit: seis láminas 16:9 en un riel horizontal se leen como un PDF pegado; a 62vw su texto queda en 8 a 10 px; tres de seis láminas (sistema, paleta y cerebro) repiten las decisiones 03, 04 y 05; se ven errores de las láminas ("Ligth", la del cerebro titulada "Paleta de Color"); la interacción es solo un riel y un contador; y es el único momento del caso que muestra un entregable en vez de una decisión. Lo único nuevo del manual es el ADN (cinco reglas) y Poppins como familia única. Tres direcciones, todas escenas fijas con pasos clicables y números grandes como la decisión 05, sobre fondo noche:
- **A · El ADN, en vivo (recomendada):** las cinco reglas del manual, una por paso, cada una demostrada con los isotipos reales: el cerebro que se separa en sus cuatro piezas (también con el cursor), la silueta de 200 a 16 px, los cubiertos que corren con estela y sombra, una escala de literal a críptico con el isotipo al medio, y "se ve / se entiende" para Campus y Connect.
- **B · Del manual al código:** el manual se escribe como CSS en un editor (cuatro tonos, Poppins, radio) y un componente vacío se arma con cada línea; al final una sola línea cambia el producto. Clic en un color lo aplica. Puente al capítulo 03. Antes de aplicarla hay que confirmar que la web usa estas variables.
- **C · Un sistema que escala:** una matriz de ícono, lockup, botón y aviso para Campus, Connect y Health que se arma con el scroll; la cuarta columna aparece vacía y se llena con las mismas reglas. Pasar o hacer clic sobre una columna la destaca.
- **Opción cero:** sacar la sección y pasar del cerebro a la web. Pendiente de tu elección.
- **Elegida la B (del manual al código), con un audit de información** en `caso/manual-v2/`. La primera B contaba poco: tonos, una fuente y un radio. Faltaba qué es el manual y para quién, el problema que resuelve (con tres productos y uno en camino, cada pieza podía verse distinta), los neutros y la regla 100 % morada, los pesos de Poppins y su porqué, la regla del lockup escrita, el ADN (lo más valioso del manual) y el puente al capítulo 03. "Esquinas de 22 px" sale porque no es una regla del manual. La B mejorada tiene seis pasos (Color, Tipografía, Lockup, ADN, Producto y La web) con un solo archivo `marca.css` que se escribe con el scroll, se desplaza al bloque activo y atenúa los anteriores. La vista previa es clara, como contraste con el editor:
  - Paleta con neutros y un acento naranja que el sistema rechaza en vivo.
  - Espécimen de Poppins en seis pesos, una jerarquía real y los tres públicos.
  - Lockup con el wordmark fijo y el isotipo, el nombre y el tono rotando.
  - El ADN como un test que el isotipo de Campus pasa regla por regla.
  - Un kit (ícono, tarjeta, botón y aviso) que cambia de producto con una línea, incluido "Nuevo", con un selector.
  - La vista previa se vuelve tapin.cl y anuncia el capítulo 03.

  En el riel, una ficha del entregable. Cada paso cierra con una cita corta del manual. Por confirmar: si tapin.cl usa estas variables, para quién es el manual, los hex de los neutros (muestreados de la lámina) y la fecha de entrega.
- **Manual, tercera vuelta (audit gráfico, de repetición y de texto)** en `caso/manual-v3/`.
  - **Repeticiones que salen:** los hex de los cuatro tonos (ya en las tiras de la decisión 03) quedan como una línea de referencia en el código. Sale el paso del lockup, que es la anatomía de la decisión 04, y sale "Nuevo", porque la 04 ya tiene el "+1". Sale el hero de tapin.cl (misma captura que el cierre de la 05; el capítulo 03 hace de puente). La interfaz ya no usa ícono ni notificación (ya en la 05).
  - **Pasos:** quedan cuatro: Color (neutros con violeta frente al gris puro y el acento rechazado), Tipografía (tres pesos, tres niveles y los públicos), ADN (el test con una prueba por regla sobre el isotipo de Campus, que corre al pasar movimiento) e Interfaz (`--tono` y `--suave` con `color-mix` mueven tarjeta, barras, chip y botón entre los tres productos).
  - **Texto:** arriba a la izquierda baja de unas 105 a unas 30 palabras. Queda el rótulo, el título, una bajada de diez palabras y la regla con título y una línea. La cita del manual pasa al código como comentario y sale la ficha.
  - **Gráfica:** una sola ventana partida (código, barra "escribiendo / compilado", vista previa), así nada se tapa. Las líneas guía van de cada variable a lo que dibuja, por el margen izquierdo o derecho cuando las piezas están apiladas. Pasar el cursor por una línea o por una pieza enciende el par.
  - **Por confirmar:** los hex de los neutros y si tapin.cl usa estas variables.
- **Manual, cuarta vuelta** en `caso/manual-v4/`. Vuelve la disposición de la v2: el editor arriba y la vista previa en su propia ventana encima. El código se ancla arriba y la vista solo cubre la esquina vacía. Salen las líneas guía. Los paneles conversan con una etiqueta de variable sobre cada pieza (aparece con un pulso cuando su línea compila) y con el foco cruzado al pasar el cursor.
  - **Editor:** pestañas (`marca.css` y `manual.pdf`), una ruta que sigue al paso, la línea actual marcada y un minimapa con el bloque activo.
  - **Vista previa:** ventana clara con lienzo de puntos y estado "escribiendo / en vivo".
  - **Color:** cada neutro es una muestra tipo carta de color, con su gris puro en un círculo; la muestra naranja recibe el sello "No entra" y se cae.
  - **Tipografía:** un espécimen en el tono de Campus, los tres pesos en grande y un panel real con los tres niveles.
  - **ADN:** un corredor de tests con tiempos y barra de avance, junto a la placa del isotipo con sus pruebas.
  - **Interfaz:** un panel con barras y anillo que derivan de `--tono` y `--suave`.
- **Aplicado al caso: el manual en código** (`.tp-man`, reemplaza el riel de láminas). Es la cuarta vuelta con estos ajustes:
  - El editor se corre hacia la columna 7, así la vista previa queda a un costado.
  - La vista previa ya no tiene grilla de puntos y usa el cursor normal (sin el de texto).
  - El foco es más suave: la pieza sube 3 px con una sombra morada y las líneas de texto solo se tiñen, con transiciones de 300 ms.
  - Salen las pruebas "cubiertos · alguien corre" y "literal / críptico".
  - Las etiquetas de variable pasan al morado del editor, sin el doble guion y con un anillo claro que las separa.
  - La etiqueta "familia" pasa del cuadro morado (morado sobre morado no se leía) a la fila de los tres pesos, que es lo que la variable controla.
  - La interfaz se rehace como una pantalla de comedor: banda en degradé del tono, consumos con curva y área en `--tono`, dos filas con iniciales y chip "Pagado" en `--suave`, y un selector segmentado cuya pastilla se desliza.
  - Sale la línea morada sobre la pestaña `marca.css`.
  - Poppins suma el peso 300 en el `<link>`. Los pasos reutilizan los números grandes de la decisión 05.
- **Manual, paso 04 (Interfaz): audit y tres variantes** en `caso/interfaz-tapin/`.
  - **Audit:** la pantalla de comedor (consumos, alumnos, "Pagado") cuenta un producto y no el sistema. En Health sigue diciendo "Almuerzo", que no tiene sentido (además, Health está en definición). El ojo se va a los datos y no al color, y el tono toca pocas superficies. También anticipa los mockups del comedor de la decisión 11, y el selector se confunde con la interfaz.
  - **A · Kit del sistema:** una hoja de componentes genéricos que cambia de producto en bloque.
  - **B · Dial del tono (recomendada):** una perilla recorre el rango morado del manual, de Empresa a Health. Se detiene en cada producto con el scroll y se puede arrastrar; cualquier tono intermedio funciona, con el hex en vivo en el código.
  - **C · Tres a la vez:** el mismo componente tres veces, con su valor de `--tono` cada uno.
  - En las tres, sobre los tonos claros (Health) el texto pasa a tinta, como en las tiras de la decisión 03. Pendiente de tu elección.
- **Aplicada la B en el paso 04 del manual (dial del tono), con mejoras.**
  - **Gráfica:**
    - Las seis cajas pasan a una sola hoja de componentes en cuatro filas (Acción, Control, Estado, Entrada), todos genéricos.
    - El riel tiene muescas en cada producto.
    - La perilla lleva un anillo blanco y la etiqueta "tono"; la fila Estado lleva la etiqueta "suave".
    - Sobre los tonos claros el texto pasa a tinta.
    - El código muestra el hex en vivo y el producto más cercano (o "entre tonos").
  - **Interacción:**
    - Con el scroll, la perilla avanza en continuo de Campus a Health y se frena en cada producto.
    - Se arrastra (crece al tomarla) y, al soltarla cerca de un producto, se ajusta sola. Fuera del rango hace resistencia y vuelve.
    - Clic en la pista o en el nombre de un producto la lleva ahí. Al pasar por la pista, una ficha muestra el hex bajo el cursor.
    - Con teclado: flechas (con Shift, más rápido), Inicio, Fin y Re Pág / Av Pág de producto en producto.
    - Al llegar a un producto, la hoja responde con una ola del tono suave.
- **Paso 04 del manual:** salen las etiquetas "tono" y "suave", y el riel se compacta. La perilla persigue la posición del scroll con un suavizado por cuadro: el recorrido y el color se sienten continuos aunque el scroll avance a saltos.

### Capítulo 03 · Portada y paso desde el manual, audit y tres direcciones (23 oct 2026)
Comparador en `caso/cap3-tapin/`, montado sobre el último cuadro real del manual.
- **Audit:** al soltarse el manual aparece una costura horizontal (donde empieza el degradé de la portada). La barra es una píldora suelta sin navegador alrededor, centrada en la pantalla mientras el título va en la columna 4. La barra vacía espera demasiado. Al terminar de escribirse solo se pinta un borde y una línea de 2 px, y la barra y el título compiten.
- **A · La vista se abre (recomendada):** la ventana de la vista previa del manual crece hasta ser la portada y su cabecera se vuelve la barra de direcciones (alineada a la columna 4). Se escribe tapin.cl, aparece el favicon y la página carga debajo mientras el título se retira: entrega al navegador de la sección del sitio.
- **B · Ventana del navegador:** los paneles del manual suben y se desenfocan, y entra una ventana a la derecha; la pestaña pasa de "Nueva pestaña" a "Tap In · Gestión escolar" y la página se dibuja adentro.
- **C · Buscador con sugerencias:** la portada sube como una hoja sobre el manual, que se hunde y desenfoca. Mientras se escribe aparecen sugerencias; después, Enter y una barra de carga arriba de la pantalla.
- En las tres se mantiene tapin.cl escribiéndose con el scroll. Pendiente de tu elección.
- **Aplicada la B (ventana del navegador) en la portada del capítulo 03 y en el paso desde el manual.**
  - **Superposición:** la portada se monta sobre el final del manual, con `margin-top: -200svh` y fondo transparente, como el QR. El manual pasa a 730svh y su animación termina 1,5 pantallas antes del final de su pista.
  - **Salida del manual:** en el tramo compartido, los paneles del manual suben, se apagan y se desenfocan (`--sale`, que fija el JS de la portada). Al mismo tiempo entran el fondo, el "03" y una ventana de navegador en las columnas 6 a 12.
  - **Título:** "La web" queda a la izquierda, en las columnas 1 a 5.
  - **Dirección y carga:** tapin.cl sigue escribiéndose con el scroll en la barra de la ventana. Al terminar, una línea de carga cruza la barra, aparece el favicon de Connect, la pestaña pasa de "Nueva pestaña" a "Tap In · Gestión escolar" y el hero del sitio se dibuja adentro de arriba hacia abajo.
  - **Móvil:** la ventana va arriba y el título abajo.

### Capítulo 03 · Paso de la portada al sitio, audit y cinco pasos (23 oct 2026)
Comparador en `caso/sitio-paso/`, sobre una réplica de las dos secciones.
- **Audit:** la portada oscura sube y aparece de golpe una franja clara. Hay dos navegadores distintos (uno oscuro, chico y a la derecha; otro claro, grande y a la izquierda), el hero de tapin.cl se repite seguido y la sección arranca con el foco de la decisión 06 ya puesto. Además, el índice aparece de una vez.
- **A · Una ventana (recomendada):** la ventana de la portada viaja a la izquierda y crece hasta ser el navegador del sitio. Su cromo pasa de oscuro a claro y la barra se recoge, mientras una luz clara se abre desde la ventana (sin pasar por gris). Después el título se retira, el índice entra en cascada y al final se pone el foco de la decisión 06.
- **B · Entrar a la página:** la ventana llena la pantalla y retrocede a su lugar como navegador claro.
- **C · Amanecer:** un círculo claro se expande desde la barra de direcciones; anticipa la decisión 09.
- **D · Hoja:** la portada sube como una hoja y deja ver el sitio, que se acerca y se aclara.
- **E · Título al índice:** como A, pero "La web" viaja y se achica hacia la cabecera del índice.
- Pendiente de tu elección.
- **Aplicado el paso A (una ventana) entre la portada del capítulo 03 y el sitio.**
  - **Superposición:** el sitio se monta sobre el final de la portada (`margin-top: -200svh`, fondo transparente) y no se ve mientras entra por abajo. Al fijarse, la portada le cede su ventana.
  - **Vuelo:** el navegador del sitio arranca exactamente donde estaba la ventana de la portada, con su cromo oscuro, la pestaña con el favicon y la barra con tapin.cl. Durante una pantalla de scroll viaja y crece a su lugar en las columnas 1 a 8, el cromo pasa a claro, la barra se recoge y el contenido pierde su margen.
  - **Luz e índice:** una luz clara se abre desde el centro del navegador mientras "La web" y el "03" se retiran. Después el índice entra en cascada y, al aterrizar, empieza el recorrido con el foco de la decisión 06.
  - **Relevo sin corte:** la ventana de la portada ahora muestra la misma captura del sitio (`tp-larga.jpg`).
  - **Pistas:** la portada pasa a 520svh y el sitio a 800svh, para que los tramos propios no se acorten.
  - **Corrección:** las reglas de `.tp-nav-barra` quedan acotadas a sus hijos directos; también le daban fondo blanco y relleno a los elementos de adentro.
- **Portada del capítulo 03, ajustes:**
  - La dirección baja de tamaño, a `clamp(17px, 1.5vw, 24px)` con barra de 44 a 56 px; el navegador del sitio, que la recibe en el vuelo, usa la misma medida.
  - "Capítulo 03 · Abr a sep 2026" pasa a ser un rótulo con punto arriba a la izquierda, en la misma línea que el borde superior de la ventana, con el "03" debajo. En móvil va bajo la ventana.
- **Paso 04 del manual:** sale la ola del tono suave que teñía la hoja. Comparador en `caso/producto-tapin/` con tres maneras de anunciar el producto sin teñir nada:
  - A · Ficha del producto (recomendada): el isotipo y el nombre en la cabecera de la hoja, con el nombre girando como un contador.
  - B · Etiqueta en la perilla.
  - C · Registro de cambios en la voz de una consola.
  - Pendiente de tu elección.

### Decisiones 06 a 10 · Audit y cinco formas (23 oct 2026)
Comparador en `caso/decisiones-tapin/`, sobre la captura real del sitio.
- **Audit:**
  - El foco oscurece todo el sitio con un velo gris.
  - El navegador va en las columnas 1 a 8 y el índice en la 10 a 12, y eso rompe el patrón de las decisiones 01 a 05.
  - Los números de decisión miden 11 px, entre paradas no queda nada activo y el foco solo aparece y desaparece con fundidos.
  - El texto queda lejos de la pieza, y la única interacción es el clic en el índice.
- **A · Decisión a decisión (recomendada):** el patrón del caso, con números grandes en el riel, el texto en las columnas 4 a 6 y el navegador de la 7 a la 12. El marco viaja entre paradas con un velo claro alrededor.
- **B · Lupa:** el marco numerado en el sitio y, al lado, una lupa con la parte ampliada.
- **C · Notas al margen:** marcadores numerados que quedan sobre el sitio y notas apiladas al costado.
- **D · Revisión en vivo:** mi cursor recorre el sitio, hace clic y deja un comentario con la decisión.
- **E · Mapa y detalle:** la página completa en miniatura con un marco que baja, el detalle ampliado y el número grande.
- Pendiente de tu elección.
- **Aplicadas: la etiqueta en la perilla (paso 04) y las notas al margen (decisiones 06 a 10).**
  - **Paso 04:**
    - Una pastilla clara, no negra, viaja sobre la perilla con el isotipo del producto en el tono actual.
    - Rebota al llegar a Campus, Connect o Health, y entre productos muestra el hex.
    - En los extremos se ajusta para no salirse; la flecha sigue a la perilla.
  - **Decisiones, marcos medidos en la captura** (en píxeles del sitio a 1440, cada uno con el radio de su elemento):
    - 06: la barra de menú completa.
    - 07: "Presentes en Chile y Perú" con la fila de logos.
    - 08: la fila de pestañas de módulos.
    - 09: el bloque "Todo conectado".
    - 10: las preguntas con su respuesta al lado.
  - **El marco:**
    - Sin velo: borde de 2 px con un halo suave y el número de la nota en su esquina.
    - Ya no desaparece entre paradas: viaja y cambia de tamaño hasta el elemento siguiente.
    - Las paradas ya vistas dejan un marcador numerado sobre el sitio.
  - **Notas (columnas 9 a 12):**
    - Rótulo, contador y una barra de avance en cinco tramos.
    - La nota actual va en una tarjeta abierta con su texto y la línea "En el sitio · …", que nombra exactamente lo enmarcado.
    - Las demás van en filas con el número lleno (vistas) o en contorno (por venir), con hover.
- **Decisiones 06 a 10, ajustes:**
  - **La decisión 09 cambia por el formulario.** Sale "De oscuro a claro" (la más débil como decisión) y entra el formulario de la demo, que es el fin del sitio. Para seguir el orden de la página, las objeciones pasan a ser la 09 y el formulario la 10: "Cuatro campos para pedir la demo", con el marco medido sobre la tarjeta "Reserva tu demo". El texto es un borrador para que lo ajustes.
  - **Captura completa:** la de antes terminaba en mitad del formulario. Ahora es la original hasta los 4600 px más el tramo final del sitio del repo, hasta antes del pie, con 5140 px de alto a 1440. Queda en 1800 px de ancho para no pasar el límite de decodificación de imágenes en móvil, que dejaba el navegador en blanco.
  - **Scroll del navegador:** cada marco queda centrado en la pantalla del navegador. Después de la última decisión el sitio queda quieto (sin el scroll extra del final).
  - **Notas más livianas:** sale la barra de avance, la nota actual pierde la sombra, los números van sin círculo salvo el actual, los títulos inactivos bajan a peso 500 y "En el sitio · …" pasa a gris sin ícono.
- **Decisiones 06 a 10, scroll afinado:**
  - **Suavizado:** el sitio y el marco persiguen su posición con un amortiguado por cuadro, así se mueven en continuo aunque la rueda avance a saltos.
  - **Imán:** si el scroll se detiene a mitad de un viaje, el recorrido termina de llegar a la parada en la dirección en que se venía (probado bajando y subiendo con la rueda). En las paradas no actúa, y con movimiento reducido se apaga.
  - **Marcadores clicables:** los que quedan sobre el sitio llevan a su decisión.
  - **Corrección:** la captura del sitio cargaba con `loading="lazy"`. Al llegar directo a mitad de la sección (al recargar o desde el índice), la imagen ya estaba desplazada y no cargaba nunca, y el navegador quedaba en blanco. Ahora carga normal, con prioridad baja.

### Decisión 10 → 11 · Audit y cinco pasos (23 oct 2026)
Comparador en `caso/d11-paso/`, réplica a 1440 × 900 con el sitio real y capturas del caso.
- **Audit:** el navegador sube con el formulario y queda una franja vacía antes de la 11. La 11 vuelve al número grande sin explicar el cambio de sistema, no se ve que sus mockups están dentro del sitio y las cuatro tarjetas entran casi juntas.
- **A · El mockup sale del sitio (recomendada):** el navegador vuelve a "Elige por dónde empezar", el marco toma el mockup del comedor y aparece la nota 11. Después el mockup sale del sitio y aterriza como la tarjeta destacada, el navegador se retira y entran el texto y las otras tres en cascada.
- **B · La ventana se reparte:** el navegador se divide en cuatro ventanas que se vuelven las tarjetas.
- **C · Hoja:** la sección sube como una hoja y deja ver la 11.
- **D · El contador sigue:** el 10 gira a 11 y viaja hasta ser el número grande.
- **E · Zoom al hero:** la cámara se acerca a la tarjeta flotante del comedor en el hero.
- Pendiente de tu elección.
- **Aplicado el paso C (hoja) de la decisión 10 a la 11, auditado:**
  - **La 11 espera debajo:** se monta una pantalla antes (`margin-top: -100svh`, debajo de la sección del sitio). Mientras la hoja sube se queda quieta, porque el JS compensa su desplazamiento, y se acerca de 0,94 a 1 con un velo tinta (máx. 0,32) que se disuelve. No usa filtros, por rendimiento; con movimiento reducido no hay escala.
  - **La hoja:** en la última pantalla la sección del sitio sube entera, con las esquinas de abajo redondeadas (32 px) y una sombra que aparece al despegar.
  - **Pausa de lectura:** la sección del sitio pasa a 900svh y el último tramo (`FINAL`) a 1,2. Así la nota 10 se lee quieta antes de que la hoja suba, y el imán no actúa en ese tramo.
  - **Relevo sin salto:** al terminar, la 11 queda exactamente donde estaba y sigue con su scroll normal. Probado en desktop y móvil.
- **Temblor corregido en el paso a la decisión 11:** la 11 se movía con el scroll nativo y el JS la compensaba un cuadro tarde, por eso temblaba. Ahora queda quieta con `position: sticky`, sostenida por un separador de una pantalla (con relleno no funcionaba, porque el sticky solo se mueve dentro del área de contenido), y el JS solo maneja la hoja, la escala y el velo. Medido: durante toda la subida de la hoja la 11 queda en 158 px exactos.

### Decisión 11 · Audit y propuesta (23 oct 2026)
Comparador en `caso/d11-mejora/`, con hoy y propuesta lado a lado.
- **Audit:** la historia del comedor solo está en el texto, y la grilla 2 × 2 le da el mismo peso a los cuatro módulos. Nada dice que los mockups están en vivo, la grilla no sigue el patrón de las decisiones, "Decisión 11" se repite en la tarjeta y la única interacción es el fundido de entrada.
- **Propuesta:**
  - El patrón del caso: número en el riel, texto de la 4 a la 6 y el comedor grande de la 7 a la 12, con una etiqueta "En vivo" que late.
  - Debajo, la decisión como flujo: "Antes · Acceso denegado" tachado y Pago → Validación → Aviso de saldo, encendiéndose en orden.
  - Los otros tres módulos en una fila secundaria con hover.
  - Pendiente de tu visto bueno.

### tapin.cl en el teléfono · Audit y cinco variantes (23 oct 2026)
Comparador en `caso/movil-tapin/`, con una captura nueva del sitio completo en móvil (390 px).
- **Audit:** la idea de la sección ("la misma web, diseñada y programada a la par") va en un pie de 11 px. Además son tres capturas quietas en la composición más común, sin interacción y sin conexión con lo anterior ni lo siguiente.
- **A · A la par (recomendada):** el navegador y el teléfono bajan juntos con el scroll, con un rótulo que dice la parte del sitio.
- **B · Un teléfono que recorre:** el sitio entero en una pantalla grande, con etiquetas alternadas.
- **C · Abanico:** tres teléfonos que giran como carrusel.
- **D · Muro de pantallas:** columnas inclinadas a distinta velocidad.
- **E · De 1440 a 390:** el navegador se angosta, cambia a móvil y se vuelve teléfono.
- Pendiente de tu elección.

### Decisión 11 y muro de pantallas · Aplicados al caso (23 oct 2026)
Elegidos: la nueva 11 (`d11-mejora`) y la variante D del teléfono (`movil-tapin`).
- **Decisión 11:**
  - Riel con el número en las columnas 1 a 3. Texto en la 4 a 6, fijo mientras pasa la pieza.
  - En la 7 a 12: el comedor en vivo en un escenario grande y, debajo, el flujo ("Antes · Acceso denegado", tachado, y luego Pago, Validación y Aviso de saldo).
  - Más abajo, los otros tres módulos en vivo.
- **Mejoras de interacción en la 11:**
  - El flujo sigue el reloj real del mockup: mockup-start lo reinicia y la página lo escucha. La barra de cada paso se llena al ritmo de la escena y los pasos ya hechos quedan con un visto.
  - El escenario se inclina hasta 3° hacia el cursor, con inercia, y un brillo sigue al puntero.
  - Las tarjetas chicas suben al pasar el cursor. En móvil quedan en un carrusel con snap.
- **Arreglo:** la pista de la sección del sitio tapaba la 11 y bloqueaba el puntero (no se podía abrir "Más contexto"). Ahora solo su panel recibe eventos.
- **Muro de pantallas:**
  - Cuatro columnas inclinadas (tres en tablet y móvil) de siete teléfonos con marco de titanio. Cada uno muestra otra parte de la captura completa del sitio en móvil (`media/tp-movil.jpg`).
  - Las columnas se mueven solo con CSS, entre `--a` y `--b`, con el `--v` del parallax: suben y bajan alternadas, a distinta velocidad.
  - Bordes con fundido. El título va sobre un velo a la izquierda en desktop y abajo en móvil.
- **Interacción del muro:**
  - Al pasar el cursor (o tocar, en móvil), el teléfono se adelanta, los demás se apagan y su pantalla recorre el sitio de ida y vuelta.
  - La pista ("Pasa el cursor por una pantalla" / "Toca una pantalla para recorrerla") se oculta mientras hay foco.

### Decisión 11, paso al teléfono y muro · Audit y propuestas (23 oct 2026)
Comparador en `caso/paso-muro/` (artifact https://claude.ai/artifact/XDLWtAA3ox7mTZttRUTyQv).
- **Parte 1, audit de la 11:** conmutador entre hoy y con mejoras, con el comedor en vivo.
  - **Relato (revisar):** el paso 03 dice "Aviso de saldo", pero el mockup muestra el panel del comedor registrando el pago (Juan pasa de pendiente a suscrito). Propuesta: "Panel al día" y ajustar la frase de la decisión.
  - El "antes" visible: al pasar el cursor o tocar "Antes", el escenario muestra la pantalla de acceso denegado.
  - Una línea bajo el flujo que dice qué pasa en cada paso.
  - Mockup un 10% más grande y centrado.
  - Los otros tres módulos quietos; se animan al pasar el cursor (en móvil, el del centro del carrusel).
  - Riel y texto en un solo bloque fijo; la sombra de la hoja se apaga al terminar; sale "Más contexto".
- **Parte 2, seis pasos de la 11 al teléfono:**
  - A · Hoja morada.
  - B · Barrido inclinado (12°, el ángulo del muro).
  - C · Un teléfono, todo el sitio (recomendado): el teléfono sale del comedor, crece y se acomoda en el muro.
  - D · Columnas que suben.
  - E · Del claro al morado.
  - F · Zoom al escenario.
- **Parte 3, audit del muro:** es textura sin lectura, con cortes a mitad de bloque y repetidos, pantallas lavadas, un scroll largo con solo parallax, "a la par" sin demostrar y un título pesado en móvil. Las tres mejoras corrigen los encuadres, el contraste y el móvil.
  - M1 · Recorrido guiado (recomendado): cinco paradas con índice; el teléfono de cada una se adelanta y se endereza.
  - M2 · A la par: las mismas paradas con un navegador de escritorio al lado.
  - M3 · Pruébalo: el muro se endereza y queda un teléfono que se recorre.
- Pendiente de tu elección.

### Barrido de la 11 al muro · Aplicado al caso, y muro en tres columnas (23 oct 2026)
Elegido: B · Barrido inclinado.
- **Barrido:**
  - El muro se superpone a la 11. Su panel queda fijo y un borde inclinado 12° (el ángulo del muro) lo destapa de abajo hacia arriba en la primera pantalla de su pista (`--barre`, por clip-path).
  - El fondo morado y el grano pasan de la sección al panel, para no teñir la 11.
- **La 11 quieta durante el barrido:**
  - Un marco nuevo (`.tp-v11-marco`) se fija por segunda vez. La 11 queda en su sitio si cabe o alineada abajo si no, para que se vean los otros módulos. El JS calcula `--t11` con el alto real de la grilla.
  - Medido: la grilla no se mueve un píxel durante todo el barrido, en desktop y en móvil.
- **Barra:** pasa a blanco recién cuando el barrido terminó.
- **Muro:** tres columnas en todos los anchos, con teléfonos un poco más grandes.
- **Comparador nuevo del muro:** `caso/muro-v2/` (artifact https://claude.ai/artifact/Etd68H1TtfhTPpeZVvHcym), en tres columnas, reemplaza la parte 3 del anterior. Arreglos:
  - El foco solo responde a un movimiento real del cursor y se suelta con el scroll.
  - En cada parada el muro se detiene y el teléfono elegido es de la columna del medio.
  - En M2 el navegador ya no tapa el índice.
- Pendiente: elegir entre M1, M2 y M3.

### Muro M3 · Pruébalo, aplicado al caso con audit (23 oct 2026)
Elegido: M3. Audit y mejoras sobre la versión del comparador:
- **El sitio real, no la captura:**
  - El teléfono final tiene tapin.cl de verdad (`works/sitios/tapin/index.html`) en un iframe a 390 px, escalado a la pantalla.
  - Se monta al acercarse a la cámara; la captura queda de póster hasta que carga.
  - Al entrar, el sitio se abre en la misma parte que mostraba el teléfono elegido, sin salto.
- **Sin scroll atrapado:** el teléfono se activa con un clic o un toque ("Probar el sitio"). Se suelta con Esc, con un clic afuera o al salir de la sección.
- **Formulario:** el de demo enviaba solicitudes reales a Formspree. Desde el portafolio se intercepta y avisa que es una demostración.
- **Detalle:**
  - Barra de estado con la hora en vivo; el sitio empieza debajo, como en Safari.
  - Barra lateral de avance que lee el scroll real del sitio.
  - El estado bajo el título cambia: link a tapin.cl, "Usando tapin.cl", aviso del formulario.
- **Muro antes de la cámara:**
  - Cortes al inicio de cada parte, sin repetir entre vecinos.
  - Velo más corto y brillo a la mitad.
  - El cursor solo responde a movimiento real.
  - Las columnas avanzan y se detienen antes de la cámara; el teléfono elegido es de la columna del medio.
- **Pista de la sección (460 svh):** barrido, muro, cámara (0,7 pantallas) y 1,15 pantallas para probar.

### Decisión 11 más tiempo en pantalla y Resultado · Audit y cinco propuestas (23 oct 2026)
- **La 11:** quieta y entera solo 0,4 pantallas entre el fin de la hoja y el barrido. El segundo tramo quieto pasa de 110 a 240 svh. Ahora:
  - 1,5 pantallas en desktop y 1,7 en móvil, más la pantalla del barrido.
  - Verificado: sigue sin moverse durante el barrido.
- **Resultado:** comparador en `caso/resultado-tapin/` (artifact https://claude.ai/artifact/TTqkGZoKfpPCHZ8k5ey6Qb).
- **Audit:**
  - Cuenta esfuerzo (páginas, líneas, mockups, productos), no resultados.
  - "8 mockups" repite la 11.
  - Nada se puede comprobar y el link queda chico al final.
  - Es un bloque de estadísticas genérico.
  - Corte seco desde el morado.
  - Dos citas que rotan, y la segunda casi no se lee.
- **Propuestas:**
  - A · Tablero (panel del producto, citas como notificaciones).
  - B · Una cifra por pantalla.
  - C · El sitio, medido (puntajes de PageSpeed, de ejemplo hasta medirlos).
  - D · El cliente primero (la cita como titular).
  - E · Sigue en línea (recomendada): cierra el capítulo 03 con la misma ventana del navegador.
- **En las cinco:** entrada que funde del morado a la noche; sale "8 mockups"; las cifras de la empresa y las citas siguen marcadas como pendientes.
- Pendiente de tu elección.

### Resultado D · El cliente primero, aplicado con audit (23 oct 2026)
Elegido: D. Audit y mejoras sobre la propuesta:
- **Otra entrada para la cita:** encender palabra por palabra ya se usa en el resumen y en Aprendizaje, que viene justo después; sería la tercera vez, y seguida. Ahora:
  - Cada línea sube desde su máscara, en cascada.
  - Después se subraya "una sola imagen", la idea de la cita.
  - Las líneas se arman con el ancho real y se rearman al cargar Poppins o al cambiar el ancho.
- **Composición:** comilla dibujada (la de Poppins se leía como "//") colgando en el riel; en móvil va sobre la cita. Firma con el wordmark de Tap In.
- **Cifras al pie:**
  - "Lo que quedó andando": 9 páginas, ≈40.000 líneas, +27.000 estudiantes y +15.000 familias.
  - Sale "8 mockups", que repetía la 11.
  - Las cifras de la empresa llevan asterisco y la nota "Según la empresa, por confirmar" (en la propuesta faltaba explicarlo).
- **Cita:** una sola, la más fuerte; sale la rotación. Sigue marcada "publicar solo con aprobación".
- **Entrada:** funde del morado del muro a la noche.
- **Limpieza:** salen el CSS de las cifras, el contexto y las citas antiguas, y el JS de la rotación.

### Resultado · Cita nueva y líneas medidas (23 oct 2026)
- **Cita:** "Un director entra a tapin.cl y en una sola pantalla entiende qué hacemos." Se subraya "en una sola pantalla".
  - Nombra a quien compra Tap In y un resultado concreto, en 13 palabras.
  - La anterior era abstracta ("en una sola imagen se entiende cómo funciona").
  - Queda marcada "Cita por aprobar con los cofundadores".
- **Líneas de código:** "≈40.000" pasa a "+47.000", medido en el código del sitio en el repo: 47.747 líneas de HTML, CSS y JS propios, con los 8 mockups (40.643 sin ellos).
  - El signo + reemplaza al ≈, que parecía un =, y queda igual a las demás cifras.

### Resultado · Sin bloques por confirmar y cifras corregidas (23 oct 2026)
- Salen la etiqueta de la cita, la nota "Según la empresa, por confirmar", los asteriscos y el estilo `.tp-verificar`, que ya no se usaba.
- **Líneas:** "+47.000" contaba también las líneas vacías. Con el método del documento del caso (líneas no vacías) son 44.645 con los mockups y 37.946 sin ellos. Queda "+44.000".
- **27.000:** según `tapin-caso-de-estudio.md` es el total de estudiantes de los dos campus de la UC donde se lanzó Campus, no sus usuarios (el pitch de oct 2025 habla de 1.500 usuarios activos). El texto ahora dice "estudiantes en los dos campus de la UC donde funciona Campus".

### Sale Aprendizaje; los créditos pasan al Resultado (23 oct 2026)
- Sale la sección Aprendizaje. La frase repetía lo que el capítulo del Rebirth ya muestra con piezas, el giro Campus → Connect se contaba por tercera vez y era el tercer texto que se enciende palabra por palabra.
- Los créditos (marca, UX/UI y front end: Agustín · producto y deploy: equipo de Tap In · con: los cofundadores) quedan como una franja bajo "Ver tapin.cl en vivo", en el mismo fondo oscuro.
- El caso cierra con la cita del cliente, las cifras y el link, y pasa directo al siguiente proyecto.
- Salen el CSS del giro (`.tp-giro*`, `tpViaje`) y sus reglas de móvil y de movimiento reducido.
- **Fondo del siguiente proyecto:** en Tap In, el bloque "Sigue bajando para abrir Mend" se abre sobre la noche del Resultado (`.tp .sig`), sin la franja clara. Queda acotado a este caso; `caso-siguiente.css` no cambia.

### Panel del siguiente proyecto (Mend) · Audit y arreglo (23 oct 2026)
- **Fondo raro tras el teléfono:** `mend-app.jpg` ya traía un iPhone dibujado con fondo negro y además iba dentro de un marco CSS: dos biseles y esquinas negras.
  - Ahora el teléfono tiene un marco de titanio con bisel e isla, como los de los casos, con tono verde de Mend.
  - La pantalla es la captura limpia (`mend-app-larga.jpg`), con un margen arriba para la isla, y baja por la app con el avance (`--p`).
  - El splash sigue apareciendo al abrir.
- **Choques:** el teléfono pisaba las etiquetas y, al final, el anillo de avance.
  - En la escena de Mend el texto ocupa la mitad izquierda y las etiquetas pasan bajo la bajada.
  - El teléfono queda en la derecha (79%), bajo el anillo.
- **Móvil:** el teléfono ya no pasa por encima del nombre. Recorrido más corto (12svh) y aparece con un fundido; queda entre el logo y el texto.
- Archivos: `caso-siguiente.css` y `caso-siguiente.js` (componente común). El cambio solo afecta a la escena de Mend.
- **Información que sobraba (audit gráfico):**
  - El nombre salía dos veces (logo "mend salud" arriba y "Mend" gigante): de la marca queda solo el isotipo animado, con su animación adelantada.
  - Salen las etiquetas (Investigación, Marca, Web app, 2026): repetían la bajada ("de la investigación al producto").
  - Sale el contador "03 / 03".
  - El anillo dice "Sigue bajando" (antes "Sigue bajando para abrir Mend", que repetía el nombre). Al abrir dice "Abriendo Mend".
  - Esto afecta a todos los paneles del componente; salen `.sig-info` y `.sig-chips`.
- **Logo en vez del nombre:** en el panel de Mend, el "Mend" grande pasa a ser el logo horizontal con su animación oficial (se dibuja el trazo, se rellena y el isotipo encaja). Sale el isotipo de arriba.
  - El componente acepta una marca por proyecto (`marcas`) para mostrar el nombre con su logo.
  - Sale la tipografía Neue Haas que usaba el nombre de Mend.
- **Logo con el scroll:** la animación del logo de Mend avanza y retrocede con el scroll.
  - Todas sus animaciones quedan en pausa; `--l` (0 a 1) fija el momento en la línea de 4,3 s con `animation-delay` negativo.
  - Empieza a media entrada del panel y queda completo al 40% de la pista.
  - Con movimiento reducido se muestra completo.
  - Verificado: el relleno y el encaje siguen el scroll de ida y de vuelta, en desktop y móvil.

### Caso Tap In · Audit del resto de pantallas (23 oct 2026)
Recorrido completo, capturado cada 0,75 pantallas, en 375×667, 390×844, 820×1180 (iPad vertical), 1024×768 y 1180×820 (iPad horizontal) y 844×390 (teléfono horizontal). Más un barrido de elementos que se salen del borde. El formato PC no cambia: verificado en 1440 (mismos valores y escenas, sin errores).
- **Tablet vertical:** usaba el diseño de PC, compuesto para pantallas horizontales: texto diminuto y media pantalla vacía en cada escena.
  - Ahora usa la vista móvil (`(max-width: 768px), (orientation: portrait) and (max-width: 1100px)`, igual en el JS con `vistaMovil`).
  - Encima, una escala propia: títulos un escalón más grandes y texto corrido con largo de línea cómodo (46 a 52 caracteres).
- **Decisión 04 entre 769 y 1199 px:** el lockup tenía mínimos fijos y la placa cortaba "Campus". Se achica un escalón solo en ese rango.
- **Decisión 11 en móvil:** se fijaba alineada abajo y cortaba el texto a media línea ("…ilia."). Ahora se fija mostrando la pieza entera, centrada entre 16 y 64 px del borde.
- **Teléfono del QR en móvil:** tocaba el borde derecho; ahora tiene un margen de 3vw.
- **Teléfonos bajos (≤720 px de alto):**
  - La vista previa del manual se cortaba: menos aire arriba y más alto para la pieza.
  - El teléfono de Mend pisaba el rótulo: más chico y más arriba.
- **Tablet vertical, panel de Mend:** el teléfono topaba con el logo; más chico y más arriba.
- **Teléfono horizontal:** las escenas fijas no caben en 390 px de alto. Aparece un aviso para girar el teléfono, solo en pantallas táctiles bajas en horizontal.
- **Revisado y sin cambios:**
  - La pantalla morada antes del capítulo 01: es el final de la onda de tap, dura una pantalla.
  - Las tablets horizontales, que usan el diseño de PC bien escalado.

### Caso Tap In · Audit exhaustivo de la vista de celular (24 oct 2026)
Recorrido completo a 390×844 en 2x, capturado cada 0,4 pantallas, más una revisión de las áreas de toque. Decisiones tomadas por Agustín: sitio móvil en las decisiones, paleta con nombre y hex, ventana del capítulo 03 más baja y onda del capítulo 01 más corta. PC no cambia (verificado en 1440).
- **Decisiones 06 a 10 con tapin.cl en versión móvil:**
  - Captura nueva del sitio en el teléfono (`media/tp-movil-sitio.jpg`, 390 × 7446, con las animaciones de entrada ya hechas).
  - La ventana la usa en la vista móvil (`<picture>`), igual que la portada del capítulo 03, para que el vuelo muestre la misma imagen.
  - Marcos propios medidos en el sitio real (`data-caja-m`): barra, colegios, tarjeta de módulos, preguntas y formulario. Marcadores con su posición móvil (`--pxm`, `--pym`).
  - Los marcos más altos que la ventana se alinean arriba, con 30 px de aire para no tapar su número.
  - Las etiquetas cambian donde el sitio móvil es distinto: "Las tarjetas de módulos" y "con su respuesta abajo" (`.tp-solo-pc` / `.tp-solo-movil`). Se oculta el panel desplegable del menú de escritorio.
  - En tablet vertical la ventana mide hasta 560 px, centrada, para no ampliar el sitio al doble.
- **Paleta del Rebirth:** las columnas apretaban la descripción y el RGB letra por letra. Ahora muestran solo el nombre y el hex; al tocar una tira, se ensancha y muestra el uso, el código completo y el contraste.
- **Capítulo 03:** la ventana "Nueva pestaña" baja de 46 a 34svh (menos vacío) y el rótulo sube con ella.
- **Onda del capítulo 01:**
  - En móvil la onda llena la pantalla más tarde, justo antes de que el resumen se desvanezca.
  - El título del capítulo ya está visible al aparecer, sin esperar al observador.
  - El morado vacío pasa de una pantalla entera a un instante.
- **Áreas de toque:** ninguna bajo 44 px, agrandadas sin mover el diseño (pseudoelementos o padding compensado):
  - Hitos y etapas de la línea de tiempo.
  - Números de paso del cerebro y del manual.
  - Serie de la decisión 04.
  - Paradas y perilla del dial.
  - "Más contexto" y el link a tapin.cl.
- **Legibilidad:** las cotas de la decisión 04 suben de 10 a 11 px.
- **Revisado y sin cambios:** hero, decisiones 01 y 02, activaciones (el carrusel ya se desliza con el dedo), decisión 05, manual, decisión 11, muro, resultado y siguiente proyecto.

### Caso Tap In · Correcciones desde el iPhone y PC (24 oct 2026)
**Móvil**
- **Scroll lateral:** bloqueado con `overflow-x: clip` en `html` y `body` del caso. `clip` no crea un contenedor de scroll: no hay doble barra en Chrome y el sticky funciona. Los carruseles mantienen su scroll propio.
- **Estirón del scroll (overscroll):** el lienzo muestra el borde más cercano. Arriba, el degradado morado del hero; abajo, el verde de Mend (el JS cambia a mitad de página).
- **Franjas abajo y temblores:** en iPhone la barra de Safari se esconde y la pantalla crece.
  - Los paneles fijos (`.tp-fijo`, el panel del siguiente proyecto y la espera de la 11) pasan de `100svh` a `100lvh`.
  - El JS mide el alto con una sonda de 100lvh y ya no recalcula las escenas cuando solo aparece o se esconde la barra.
- **Hero:**
  - Wordmark, bajada y link centrados.
  - En el teléfono, el navegador lleva una captura del sitio (no el sitio en vivo) y una sombra fija, en vez de recalcular una sombra de 140 px dentro de un plano en 3D en cada cuadro.
- **Resumen:** más aire entre bloques (26 px entre filas, 84 px arriba y 40 abajo).
- **Activaciones:** degradado oscuro más alto bajo el título, la descripción y los datos de la foto.
- **Manual:**
  - El código arriba y la vista previa abajo, sin encimarse (antes la vista tapaba la línea del error de color).
  - La pieza mide 66svh y la vista previa trae menos relleno; en teléfonos bajos, 70svh y el contenido al 88%.
  - La muestra de color deja aire al sello inclinado.
- **Cinco decisiones:**
  - La ventana sube a 63svh (con un tope para teléfonos bajos).
  - El tramo final es más corto en móvil (sección de 780svh, cierre de 0,4 en vez de 1,2, espera de la 11 de 170svh).
  - El imán queda desactivado en pantallas táctiles: peleaba con la inercia del dedo y devolvía el scroll, la causa probable del paso "infinito".

**PC**
- **Cinco decisiones al recargar:**
  - Las medidas se repiten al cargar las fuentes y la página, y el marco se repinta en la parada actual.
  - El imán espera a que la persona mueva el scroll; antes podía mover sola la posición que el navegador restauraba.
- **Carrusel de Banco de Chile:** la sección del Rebirth se monta encima antes de quedar fija y sus tiras se quedaban con los clics de las flechas. Ahora solo recibe clics cuando está fija (`.activa`).

### Caso Tap In · Safari en blanco, fluidez en iPhone y cambios de tamaño en PC (26 oct 2026)

**iPhone (Safari)**
- **Pantalla en blanco desde "5 decisiones":** en la decisión 11, la imagen de cada mockup estaba en el flujo dentro de una caja con `aspect-ratio`. Safari entraba en un bucle de altura y la página llegaba a 33 millones de píxeles. La imagen pasa a `position: absolute`.
- **Escenario de la 11 de 1778 px de ancho:** la columna `1fr` tomaba el ancho mínimo del contenido. Ahora `minmax(0, 1fr)` y `min-width: 0` en la pieza.
- **Carrusel de Banco de Chile:** la capa del Rebirth (y sus tiras invisibles) tapaba las flechas. La sección deja pasar los toques; solo las tiras y los controles los reciben.
- **Fluidez (hero, activaciones a Rebirth, "La web" a las 5 decisiones):** cada cuadro de scroll medía el diseño entre escrituras y obligaba a Safari a recalcular toda la página varias veces por cuadro.
  - Las posiciones de las secciones se miden una vez (al cargar, al cambiar el tamaño y cuando cambia el alto de la página) y cada cuadro solo lee el scroll.
  - Lo que todavía hay que medir (los textos que se encienden) se lee antes de escribir.
  - El origen de la onda del hero, el viaje de las tiras a la placa y el vuelo de la ventana de la portada se miden al partir, no en cada cuadro.
- **Encuadre de la 11 al cargar:** se medía con la pieza a mitad de su entrada (40 px más abajo). Ahora se mide sin transformaciones.

**PC**
- **Cambiar el tamaño de la ventana:** las pistas miden en alto de pantalla, así que el mismo scroll caía en otra sección. Al achicar estando abajo, la página quedaba al final y el panel de Mend navegaba solo.
  - Se guarda en qué módulo y a qué altura de su pista va el lector, y al redimensionar se vuelve ahí.
  - El panel de Mend solo navega por el scroll del lector, nunca por un cambio de tamaño.
- **Cruzar entre PC y vista móvil:** el hero cambia entre el sitio en vivo y la captura de teléfono, y el recorrido de las 5 decisiones relee su tramo final. Antes quedaban como al cargar.
- **Verificación:** cada sección después de redimensionar (1440 a 1100, 1440 a 700 y 700 a 1440) se comparó contra una carga limpia del mismo tamaño. Solo difieren las animaciones en vivo y la barra de navegación.

**Detalles**
- **Favicon de las maquetas:** igual al real de tapin.cl (morado #4A3CAE, isotipo al 78 % y esquina de ícono de app). Antes era lila y con el cerebro chico.
- **Logo de Mend:** se arma desde que asoma (30 % de la entrada) y queda completo justo antes de que el panel llene la pantalla. Antes llegaba al 60 % donde uno se detiene.
- **Cita:** firmada por Diego Dihmes, Cofundador de Tap In, junto al wordmark.

### Caso Tap In · Auditoría de bugs en celular y PC (26 oct 2026)

Recorrido completo cuadro a cuadro en iPhone 14 Pro y iPhone SE (WebKit) y en PC a 1280 × 720, 1440 × 900 y 1920 × 1080 (Chromium): sin errores de consola, sin scroll lateral y sin imágenes rotas.

- **Logo de Mend:** la animación se ve completa. Parte cuando el logo ya está entero en pantalla (90 % de la entrada), dibuja el trazo, rellena y suma el isotipo con el scroll, y termina al 40 % de la pista, antes de abrir Mend.
- **Panel de Mend en celular:** el teléfono tapaba "Siguiente proyecto" y aparecía recién después de llegar.
  - Ahora el JS mide el hueco libre sobre el rótulo y el teléfono cabe y se centra ahí en cualquier alto de pantalla.
  - Entra junto con el panel, así ya está en su lugar al llegar.
- **Manual en celular:** la cabecera de la vista previa chocaba ("Interfaz• escribiendo") y en el SE se partía en dos líneas. Sin "Vista previa ·", el paso y el estado caben en una línea.
- **Decisión 11 en laptops bajos (720 a 840 px de alto):** no cabía y el escenario quedaba cortado arriba.
  - El escenario se acorta según el alto de la pantalla y el mockup en vivo se achica centrado, con el fondo del mockup (#F4F2FC) para que no quede franja.
  - Desde 900 px de alto queda igual que antes.

### Caso Tap In · Estirón superior en PC (26 oct 2026)
- Chrome en PC pinta el estirón del scroll solo con el color de fondo del lienzo, no con el degradado, y arriba quedaba una franja blanca. El lienzo lleva ahora el tono medio del borde superior del hero (#6B5CDC), y el degradado copia ese borde de izquierda a derecha.

### Works · Destacados, tres direcciones (26 oct 2026)
- Comparador en `redesign/explorations/works/destacados/destacados.html`: A · Portada (recomendada), B · Índice con visor y C · Pliego.
- Diagnóstico: los tres destacados son la misma lámina (una captura en un navegador), el nombre queda cortado por el panel siguiente, no hay resultado y los datos compiten en mono diminuto.

### Works · Auditoría y siete mejoras (26 oct 2026)
- Elegida la dirección A · Portada para los destacados.
- Referencias recorridas: Order (capítulos por disciplina en cada proyecto), Ragged Edge (una cifra de resultado), Koto (riel fijo con la ficha), Locomotive (índice tipográfico), Instrument (filtros y cambio de vista) y Collins (la marca del cliente sobre su imagen).
- Demo en `redesign/explorations/works/mejoras/mejoras.html`:
  - M1, apertura con índice.
  - M2, capítulos Marca, Web y En uso.
  - M3, una cifra protagonista.
  - M4, regla de avance con teclas 1 a 3.
  - M5, barra legible.
  - M6, archivo con vistas Hoja y Lista.
  - M7, el archivo sube como hoja sobre la última portada.

### Home · Works con la Portada y las siete mejoras (26 oct 2026)
Aplicado en `redesign/explorations/works/inicio.html`. El JS de la sección vive en `inicio-works.js`; `w3-pila.js` queda solo para su comparador.

- **M1 · Apertura con índice:** la frase de valor es el titular y los destacados son una tabla (proyecto, disciplinas, año y estado) que lleva a cada portada.
- **Portadas:** cada proyecto a pantalla completa con su mundo (la foto aérea de Llegó, el morado de Tap In, el degradado con grano de Mend). La siguiente se destapa desde abajo y la anterior se aleja.
- **M2 · Capítulos:** Marca, Web y En uso sobre la misma pieza (en Mend: Marca, App e Inicio). Al abrir la marca de Mend, su logo se dibuja con las animaciones del manual. Las flechas recorren las pestañas.
- **M3 · Una cifra:**
  - Llegó Farma: pitch ganado.
  - Tap In: +15.000 familias.
  - Mend: en testeo con pacientes.
- **M4 · Regla de avance:** una sola, en el marco. Cada tramo se llena con su portada y las teclas 1, 2 y 3 saltan. Solo la portada al frente recibe foco y clics.
- **M5 · Barra legible:** sobre works lleva un velo con blur en vez de la mezcla por diferencia; se esconde al bajar y vuelve con una subida clara.
- **M6 · Archivo:** dos vistas, Hoja (la hoja de contactos) y Lista (solo tipografía). La elección se recuerda.
- **M7 · Entrega:** el archivo sube como una hoja sobre la última portada.
- **Ver caso:** la pieza viaja a la página de caso; Tap In entra a su caso real.
- **Celular:** la pieza va arriba y abajo quedan el nombre, la cifra y el botón. La bajada queda para el caso.

### Home · Regla de destacados, capítulos de Mend y opciones de portada (26 oct 2026)
- **Regla:** ahora es un vidrio con tres pestañas. Cada una lleva número, nombre y una pista que se llena con el avance de su portada. En el teléfono queda el nombre completo, sin número.
- **Mend:** los capítulos son Marca, Web y En uso, como en los otros dos; Web parte activo en los tres. "En uso" es el render del teléfono con el inicio de la app (`media/mend-en-uso.webp`, recortado con esquinas transparentes).
- **Comparador** `redesign/explorations/works/portadas-opciones/portadas-opciones.html`:
  - Cinco diagramaciones del bloque izquierdo: ficha técnica, la cifra manda, riel editorial (recomendada), logo como firma y tarjeta de cristal.
  - Tres fondos por proyecto. Llegó Farma: aérea en duotono (recomendada), red de nodos y fondo del manual. Tap In: tiras de la paleta (recomendada), isotipos gigantes y onda de tap. Mend: bruma en movimiento, isotipo gigante y arcos de movimiento (recomendada).
- **¿Logo en vez del nombre?** Se recomienda no: el nombre en Geist es parte del marco y los logos desequilibran el ritmo entre portadas.

### Home · Cifra alineada, regla editorial y cinco fondos por portada (26 oct 2026)
- **Cifra:** el dato junto al número se apoya en su base: su última línea calza con la línea base de la cifra, en vez de colgar hacia abajo.
- **Regla de destacados:** deja de ser una pastilla de vidrio. Ahora es una regla editorial de margen a margen que cierra la portada abajo, como los rótulos la abren arriba.
  - Tres tramos, cada uno con su línea que se llena con el avance de su portada.
  - Cada tramo lleva número y nombre; el activo va en blanco y muestra sus disciplinas.
  - Un velo suave al pie da contraste. En el teléfono quedan el número y el nombre.
- **Comparador de fondos** `redesign/explorations/works/fondos/fondos.html`: cinco fondos por proyecto con material real, más el de hoy como referencia.
  - **Llegó Farma:** seguimiento en vivo (recomendada), bruma del manual, matriz de puntos, última milla y empaque en estudio.
  - **Tap In:** la activación (recomendada), muro de stickers, claim gigante, QR de noche y campus en duotono.
  - **Mend:** luz de ventana (recomendada), tríptico de movimiento, degradado oficial y Encaje, sombras de ventana y hueso editorial.

### Works · Fondos, segunda ronda (26 oct 2026)
- **Llegó Farma:** la bruma del manual sin isotipos (degradado de la secuencia oficial y las retículas de puntos), más la retícula de precisión del sitio. Se respeta su regla: líneas de 1 px, blanco al 16 % sobre oscuro, cuatro columnas entre márgenes y un corte de 8 px antes de cada cruce. Dos dosis: la retícula completa, con horizontales que calzan con los rótulos y la regla, o solo como detalle del lado de la pieza.
- **Tap In, cinco nuevas:** la credencial colgando (recomendada), la familia de íconos en profundidad, el muro de pantallas, el mapa del campus con los 60 QR y el foco de escenario.
- **Mend, cinco nuevas:** pose en movimiento (recomendada), la semana en acción, lino en primer plano, respiración guiada y la app en abanico.

### Works · Fondos, tercera ronda (26 oct 2026)
- **Llegó Farma (B mejorada):** la retícula se construye desde los elementos de la portada, no desde una grilla fija.
  - La línea de los rótulos pasa a ser parte de la retícula.
  - La pieza queda en su celda, a 16 px de las líneas.
  - El bloque de texto tiene su propia celda, y el eje de la pieza continúa hacia arriba.
  - Se mantienen 1 px, blanco al 16 % y cortes de 8 px en cada cruce.
  - En B2, el módulo de puntos del manual llena exactamente la celda libre sobre el nombre (recomendada).
- **Tap In, seis nuevas:** vidrio acanalado (recomendada), esferas de marca, semitono del tap (interactivo), la cinta de marca, la marca desarmada y contorno de luz.
- **Mend:** varios teléfonos con pantallas reales y distintas de la versión actual (Inicio, Calendario, Explorar y Perfil), siempre con Inicio como principal. Tres composiciones sin abanico: escalera (recomendada), la fila y en profundidad.

### Works · Fondos, cuarta ronda (26 oct 2026)
- **Llegó Farma, B2 más liviana:** pesaba porque sumaba ocho líneas, el módulo de puntos y la bruma, todo con la misma intensidad. La bruma se aclara, las líneas bajan al 12 % (la de los rótulos queda al 20 %) y el módulo se achica. Tres dosis:
  - L1 · Esencial (recomendada): la línea de los rótulos, la celda de la pieza y un bloque chico de puntos.
  - L2 · Solo esquinas: esquinas de 1 px con sus cortes de 8 px.
  - L3 · La celda del texto: la pieza flota libre y solo se arma la celda del texto.
- **Tap In · la cinta, con oficio (recomendada):**
  - La cinta principal: sombra proyectada, volumen con brillo al centro, bordes cosidos, trama de tela y el wordmark impreso.
  - La segunda cinta queda fuera de foco detrás de la pieza, y ninguna toca el texto.
  - Cinco nuevas: stickers troquelados, holograma, papel en capas, neón de vitrina y marquesina tipográfica.
- **Mend · escalera, seis detalles para el degradado:** grano y viñeta, halo y reflejo (recomendada: les da a los teléfonos dónde pararse), isotipo en relieve, luz de ventana, bokeh y curvas de nivel.

### Home · Fondos elegidos para las portadas (26 oct 2026)
Aplicado en `redesign/explorations/works/inicio.html` e `inicio-works.js`.

- **Llegó Farma · L1 esencial, animada:**
  - Fondo: la bruma con la secuencia oficial del degradado.
  - Retícula: la línea de los rótulos y la celda de la ventana del sitio a 16 px, con 1 px, 12 % (20 % la de los rótulos) y cortes de 8 px. Esquiva los capítulos y la arma el JS leyendo los elementos.
  - Animación: las líneas se dibujan en cascada la primera vez que la portada queda a la vista. Después, una luz recorre cada línea larga de vez en cuando.
  - En escritorio, un bloque de 12 × 6 puntos late en ola.
- **Tap In · la cinta de marca, sin las costuras punteadas:**
  - Sombra proyectada, volumen, trama de tela y el wordmark impreso en Poppins que corre por la cinta.
  - Atrás, otra cinta fuera de foco. Con movimiento reducido, las animaciones se pausan.
- **Mend · escalera con grano y viñeta:**
  - Escalera de tres teléfonos con pantallas reales: Inicio al frente, Calendario y Explorar detrás.
  - Fondo con grano más fuerte, viñeta, una entrada de luz cálida y el isotipo en relieve. El relieve se dibuja solo con bordes de luz y sombra, usando `mask-composite: exclude`.

### Home y destacados, ronda de ajustes (26 oct 2026)
Aplicado en `redesign/explorations/works/inicio.html` y comparador en `works/destacados-v2/`.

- **Llegó Farma, texto:** sale "Pitch ganado". Ahora cuenta la marca madre y mi rol: submarca de salud de Llegó, referente de la logística en Chile; identidad, manual y sitio diseñados y programados por mí. Cifra: +21 años de Llegó en logística, hoy también en México. Lo de la marca madre queda fuera hasta que esté confirmado.
- **Tap In, la cinta:** sin la trama diagonal. Cada "tap in" va separado por el mismo aire (repeticiones independientes, cada 27 unidades), así el loop no salta. En el teléfono se oculta la cinta lejana, que cruzaba el rótulo.
- **Tap In, Web:** la captura de tapin.cl ahora muestra los cuatro mockups del hero (se ocultaban al hacer scroll durante la captura; el hero se compone desde la vista inicial).
- **Mend, escalera:** Calendario a la izquierda, Explorar al centro bajando sola y el Inicio a la derecha.
- **Mend, relieve:** el isotipo pasa arriba a la izquierda y más chico, el mismo rincón que la retícula de Llegó y la cinta de Tap In.
- **Comparador (destacados-v2):**
  - Llegó, En uso: seis versiones (en ruta, sale de la celda (recomendada), tríptico, secuencia, pieza y detalle, del manual a la calle).
  - Marca animada de Llegó (puntos, rutas, nodos y luego el wordmark) y de Tap In (cascada, tap de la i y cada tap abre un producto con su tono).
  - Siete transiciones entre destacados contra la actual; recomendada: la ventana que se abre.

### Destacados, quinta ronda (26 oct 2026)
- **Home · Llegó, En uso como secuencia:** un marco que recorre flota, uniforme, bodega, entrega y pantalla (la papelería sale), con barras de avance y el rótulo que cambia. Todo en CSS; con movimiento reducido queda la primera foto.
- **Home · paso entre destacados como hoja:** cada portada sube como el archivo sobre Mend. Bordes de 22 px (18 en el teléfono) que se enderezan en el último cuarto, sombra hacia arriba y la anterior se oscurece un poco. Va lineal con el scroll: la pista crece a 480svh y cada paso ocupa 100svh, con pausas de 60svh en cada portada.
- **Comparador · Llegó, marca:** solo el isotipo real (cruz de cinco nodos). El centro aparece, los brazos crecen y los dos nodos sueltos llegan; el nodo de la derecha sale como mensajero, destapa la palabra y se vuelve la o, y el tilde se marca como un visto. La placa queda limpia, sin guías ni rótulos.
- **Comparador · Tap In, tres placas:** tarjetas que hacen tap (recomendada), wordmark a sangre y bandas de producto.

### Destacados, sexta ronda (26 oct 2026)
- **Sin placas:** las marcas de Llegó y Tap In van directo sobre el fondo de cada portada, sin bloque detrás.
- **Llegó, fluidez:** las fases se encadenan sin pausas (3,5 s en total). Los brazos y los nodos entran con salida exponencial, el mensajero se estira al viajar, destapa la palabra con un borde difuso (máscara con degradado en vez de corte duro) y se abre en la o.
- **Tap In, tarjetas elegidas:** el tap ahora es físico. La tarjeta se apoya, la señal NFC se enciende de adentro hacia afuera, salen ondas desde ese punto y un brillo la cruza. Después pasa hacia adelante con desenfoque y la siguiente avanza; la que vuelve al fondo entra con un fundido. Ciclo de 3,2 s.
- **Health sin isotipo:** esa rama de Tap In todavía no se desarrolla, así que su tarjeta lleva solo la señal, el wordmark y el nombre.
- Salen del comparador el wordmark a sangre y las bandas de producto.

### Home · marcas animadas de Llegó y Tap In (26 oct 2026)
- **Llegó, Marca:** el logo animado de la sexta ronda reemplaza al logo estático, sobre el fondo de la portada. Se arma cada vez que se abre Marca, igual que Mend; con movimiento reducido aparece armado.
- **Tap In, Marca:** las tres tarjetas reemplazan al wordmark suelto. Entran al abrir Marca y hacen tap cada 3,2 s mientras el capítulo está abierto; al salir, el ciclo se detiene. Con movimiento reducido quedan quietas.
- Las tarjetas se miden en unidades de contenedor (1 px de la maqueta de 796 x 621); en el teléfono toman casi todo el ancho de la vista.
- Las curvas usan los tokens del sitio (`--ease`, `--ease-morph`) y un `--rebote` en la pista de portadas. Sale la regla `.pt-marca`, que ya no se usaba.

### Home · animaciones en pantalla, En uso de Tap In y archivo (26 oct 2026)
- **Archivo sobre Mend:** el archivo subía mientras Mend todavía estaba subiendo (la pista medía 480svh y el archivo tiene margen de -100svh). La pista pasa a 580svh: Mend llega, queda quieta 60svh y recién ahí sube el archivo.
- **Animaciones solo en pantalla:** el sitio que baja en Web, los logos de Marca, la secuencia de En uso y la escalera de Mend corren solo con la portada en pantalla y su capítulo abierto. Fuera de eso quedan sin animación, así que al volver parten desde el principio. Las tarjetas de Tap In detienen su ciclo al salir.
- **Tap In, En uso:** sale el render del teléfono. Ahora es la misma secuencia de Llegó con fotos reales de activaciones: Red Bull, Banco de Chile, el campus, la cafetería y la app.

### Home · En uso de Mend y foto 04 de Tap In (26 oct 2026)
- **Tap In, foto 04:** sale la cafetería; entra la activación de Red Bull con el teléfono adelante, con el rótulo "Entre clases".
- **Mend, En uso:** sale el render antiguo del teléfono (una versión anterior de la app). Ahora muestra el producto entre sus dos lados: el panel del kine en el navegador (app.mendsalud.cl) y el teléfono del paciente adelante, el mismo de la escalera. Dos momentos que se alternan cada 5 s: Rosa hace su check-in mientras el kine ve a quién mirar primero, y el kine le aplaude mientras a ella le llega el aviso. Capturas de la fase 2 con Supabase, recortadas sin la barra de revisión.
- En el teléfono el rótulo se oculta y el teléfono se monta sobre el navegador. Con movimiento reducido queda el primer momento.

### Home · En uso de Mend, segunda versión (26 oct 2026)
- **Gráfica:** el panel del kine va en un navegador de vidrio teñido (barra con candado y app.mendsalud.cl) en vez del navegador gris, con sombra profunda y una sombra de piso bajo la escena. El teléfono es el mismo de la escalera, adelante a la derecha.
- **Escena de proporción fija:** 160 x 110 unidades, para que los focos calcen con las pantallas en cualquier ancho.
- **Coreografía (12 s):** Rosa toca "Algo molesto" (toque y anillo de luz), una señal viaja del teléfono al panel y su fila se enciende; el panel navega de lado a su ficha, el kine revisa su semana (anillo en su registro de hoy), la señal vuelve y el aviso sube en el teléfono con su anillo. El rótulo cambia con cada momento.
- Las capturas del panel se recortan sin el chip de aplauso ni la barra de revisión. En el teléfono el rótulo se oculta; con movimiento reducido queda el primer momento quieto.

### Home · En uso de Mend, tercera versión (26 oct 2026)
- **Sin líneas punteadas:** la información viaja como un dato con la forma de la interfaz, una píldora crema con la tipografía y el color del panel.
- **Ida:** Rosa toca "Algo molesto" (gota de luz y anillo), la píldora "Rosa · Algo molesto" se despega del botón, viaja en arco y se disuelve sobre la señal de alarma de su fila, que se enciende.
- **Vuelta:** en la ficha de Rosa el kine toca "Marcar semana revisada"; la píldora "Semana revisada" viaja al teléfono y al llegar sube la pantalla de avisos con su anillo.
- El arco sale de mover el eje x en el envoltorio y el eje y en la píldora, con curvas distintas.

### Home · En uso de Mend, panel vivo (26 oct 2026)
- **Panel del kine en HTML:** ya no es una captura. Es una réplica liviana del panel real (barra, columna de pacientes, "Tu día" y la ficha de Rosa) construida en HTML y medida en em, para que se actualice de verdad.
- **Lo que pasa en el panel:** cuando llega el dato, la fila de Rosa crece arriba de "Para mirar primero" y destella, los contadores giran de 8 a 9 y su subtítulo en la columna cambia a "Algo molesto · hoy". Un cursor llega a la fila y hace clic; la vista pasa a su ficha (la columna queda y la marca). Ahí aparece el check-in de hoy con su marca en el día lunes, el cursor presiona "Marcar semana revisada" y el botón cambia a "Semana revisada".
- **Traspaso:** el dato es una ficha con avatar, el dato y quién lo manda ("Algo molesto · Rosa, check-in de hoy" y "Semana revisada · Paula, tu kine"). Se despega del botón con un salto, viaja en arco y se abre y funde en lo que provoca: la fila nueva del panel o la notificación del teléfono, que cae desde arriba con un leve rebote.
- **Teléfono:** el botón "Algo molesto" queda elegido tras el toque. La pantalla de avisos sale; la respuesta llega como notificación sobre el check-in.
- La ficha suma "Cómo ha estado" (barras de las últimas tres semanas) y "Su plan"; la columna suma "Por revisar".

### Home · En uso de Mend, la historia completa (26 oct 2026)
- **Cuatro capítulos en 28 s:** (1) Rosa hace su check-in y entra arriba de la lista de su kine. (2) Va a Explorar, abre la rutina de hoy, desliza para empezar y su semana suma un día; el kine lo ve al instante en su ficha. (3) El kine marca la semana como revisada y a ella le llega la notificación. (4) Rosa responde "Lo vi, gracias" y el kine recibe un aviso breve.
- **Pantallas reales:** el teléfono encadena capturas de la app con sus datos de ejemplo (check-in elegido, inicio, Explorar, la rutina, el inicio con la semana en 1 de 3 días, avisos y la respuesta), tomadas con Rosa como paciente. Cada pantalla entra como en la app: el inicio sube, la rutina llega de lado.
- **Sin videos ni la hoja de la rutina guiada**, que aún no existen: después de deslizar para empezar (la barra se llena y dice "Empecemos"), la historia salta al inicio con la semana sumando el día.
- **Panel:** la ficha suma la meta (0 a 1 de 3 días con su barra), la fila del check-in pasa de "Rutina pendiente" a la rutina hecha, el lunes se marca y la última barra de "Cómo ha estado" sube. Al final aparece el aviso breve "Rosa vio tu aviso".
- Cuatro datos viajan entre ambos lados (check-in, rutina hecha, semana revisada y respuesta), cada uno con su avatar y quién lo manda. Los tiempos se generan desde un guion en segundos.

### Home · cierre de las tres portadas (27 oct 2026)
- **Descripciones sin punto final** en Llegó, Tap In y Mend.
- **Web como video:** los mockups web ya no bajan una captura larga. Son grabaciones del scroll real de cada sitio con sus animaciones de entrada (Llegó y Tap In desde sus copias locales, Mend desde la app con sus datos de ejemplo, en Explorar). Se cargan recién al verse y parten desde el inicio cada vez que la portada entra en pantalla con Web abierto. Esto también arregla la propuesta de valor de Llegó, que en la captura quedaba a medio animar. En el teléfono, la ventana toma la proporción del video.
- **Mend, isotipo de vidrio:** más luz y sombra en sus bordes y una cara clara que desenfoca el fondo (backdrop-filter con la máscara del isotipo).
- **Mend, En uso:**
  - Sin la sombra de piso bajo la escena.
  - El teléfono es un video del recorrido real en la app, grabado con los tiempos de la coreografía: la presión del check-in, la entrada de cada pantalla y el deslizar para empezar tal como está diseñado (pista que se llena, "Empecemos" y check). La hoja de la rutina guiada se corta del video.
  - El panel se reinicia con cada vuelta del video para ir sincronizados.
  - Los toques son círculos tenues, como las grabaciones de pantalla del iPhone, y uno sigue el dedo al deslizar.
  - La notificación tiene la estética de iPhone: material claro desenfocado, ícono de la app, título en negrita con la hora a la derecha y el texto debajo; cae con resorte y sube al tocarla.
  - El panel pasa a martes 27 (el lunes ya estaba hecho): la meta va de 1 a 2 de 3 días.
- **Pendiente:** fotos nuevas para En uso de Llegó, hechas al tamaño y resolución de la secuencia (PLAN, S2c).

### Home · notificación de Mend y scroll fluido en los mockups web (27 oct 2026)
- **Notificación de Mend:** baja y se separa de los bordes del teléfono (margen de unos 15 pt a los lados y 25 pt arriba), así no choca con las esquinas redondeadas de la pantalla. El toque y el dato del kine apuntan a su nuevo centro.
- **Scroll fluido:** las grabaciones anteriores salían del screencast en tiempo real, con 30 cuadros irregulares por segundo, y el scroll se sentía a saltos. Ahora se graban en cámara lenta: la página corre a 1/4 de velocidad (1/12 en Mend), con las animaciones CSS, el reloj de JS, los timers y los videos frenados, y la captura se acelera al codificar. Salen entre 180 y 300 cuadros efectivos por segundo, que se codifican a 60 fps.
- El scroll va a velocidad constante con entrada y salida suaves, y las imágenes se cargan y decodifican antes de bajar para que no traben el render.
- Mend se graba más lento porque la app tiene pausas fijas de unos 270 ms; a 1/12 quedan en menos de dos cuadros.

### Home · mockups web cuadro a cuadro (27 oct 2026)
- **Scroll fluido de verdad:** la cámara lenta todavía dejaba pasos desiguales, porque el screencast entrega los cuadros cuando puede y no cuando se dibujan, y el scroll se sentía como con flechas. Ahora la grabación es determinista, cuadro a cuadro: el tiempo de la página es virtual y avanza exactamente 1/60 s por cuadro. Se controlan el reloj de JS, los timers, requestAnimationFrame, todas las animaciones y transiciones CSS (pausadas y puestas en su tiempo exacto) y el scroll, y cada cuadro se captura con la página quieta.
- **Entradas que no se veían:** la ventana del mockup recortaba el video por abajo cuando la vista era más ancha que el video, y los sitios disparan sus entradas justo en esa franja. Ahora la ventana toma la proporción del video y se encaja en la vista, en cualquier tamaño de pantalla y en el teléfono.

## S5 · Contacto y footer

### Investigación y seis variantes (27 oct 2026)
Comparador en `redesign/explorations/contacto/contacto.html`, con los hallazgos y los links arriba.

- **Patrones encontrados:**
  - Los design engineers que no venden servicios dejan un correo o ni eso (Rauno, Paco Coursey, Emil Kowalski, Brian Lovin, Jakub Krehel).
  - Los estudios de marca separan los canales por propósito, los hacen copiables y nombran a una persona (Ragged Edge, Studio Dumbar, Pentagram, Collins, Studio Freight).
  - Los que reciben muchos proyectos califican con opciones de servicio y presupuesto (Cuberto, basement.studio, AREA 17).
  - Otros cierran con un gran llamado, más lugar y hora (Lusion, Koto, Joffrey Spitzer).
  - Las guías para freelancers piden que el paso siguiente sea una conversación y que se diga qué pasa después de escribir.
  - En Chile, WhatsApp llega al 89,7 % de quienes usan internet.
- **Lo que le sirve al portafolio:**
  - Una persona, no un formulario.
  - Un paso principal con atajos al lado.
  - Tres preguntas con opciones, como máximo.
  - El detalle como prueba.
  - El verde solo para "disponible" y el reloj de Santiago.
  - Un correo propio: hola@agustindesign.cl, en vez del de la UC.
- **Variantes:**
  - (01) Índice de canales.
  - (02) Brief en una frase, recomendada.
  - (03) Alcance y proceso.
  - (04) Agenda primero.
  - (05) El correo como titular.
  - (06) Comando.
- Todas funcionan: copiar, elegir, escribir y un envío de prueba. El pie es común a todas.

### Brief en una frase elegido y footer nuevo (27 oct 2026)
- **Elegida la 02, brief en una frase.**
- **Rangos de inversión:** menos de $800 mil, $800 mil a $1,5 M, $1,5 a $4 M, $4 a $8 M y por definir. Sale "más de $8 M".
- **Footer, el colofón:** cierra el sitio como lo abre el hero, con el nombre.
  - **Arriba:** la firma, una línea de qué haces, el estado disponible y tres índices: sitio, casos y redes. Cada link tiene su subrayado que entra y su atajo de teclado (H, W, A, C, 1, 2, 3).
  - **Al medio, el colofón vivo:** hecho a mano con HTML, CSS y JS, y cuánto cargó y cuánto pesa la página que estás viendo, medido en el navegador de quien la ve. Al lado van el tema (sistema, oscuro, claro) y "Arriba" con un anillo que marca cuánto llevas leído.
  - **Abajo:** el nombre de margen a margen, que sube letra por letra al entrar en pantalla, más la línea legal con la hora de Santiago y la fecha.
- El comparador ahora tiene tema claro: los mismos roles con valores invertidos.

### Home · contacto y footer (27 oct 2026)
- El brief en una frase y el footer (colofón) quedan en el home, después del archivo. El contacto es la sección 03.
- **Envío:** arma el mensaje con la frase completa y lo abre en el correo de quien escribe, dirigido a hola@agustindesign.cl. La confirmación dice que solo falta enviarlo y cuándo respondo (24 h hábiles, hora de Santiago). Cuando exista un servicio de envío (por ejemplo, un Worker de Cloudflare), se manda directo.
- **Canales:** copiar el correo funciona. WhatsApp y la agenda avisan "pronto" hasta tener el número y el link de Cal.com.
- **Enlaces:** Contact (en el hero y la barra) y el índice del footer bajan a la frase. Atajos: H arriba, W works, C contacto, y 1 a 3 para las portadas, que ya existían.
- **Footer:**
  - Redes reales: LinkedIn, Instagram, GitHub y Behance.
  - "Sobre mí" y "Sobre este sitio" marcados como pronto.
  - Sin el selector de tema por ahora, porque el home todavía mezcla secciones claras y oscuras; se suma cuando todo el sitio tenga los dos temas (fase 7).
- En el teléfono, la lista de opciones se corre hacia adentro si no cabe.
- **Datos pendientes de Agustín:** número de WhatsApp, link de agenda (Cal.com) y crear hola@agustindesign.cl con el reenvío de correos de Cloudflare.

### Contacto con datos reales (27 oct 2026)
- **Correo:** agus.avendano@gmail.com. Se copia desde el contacto y es el destino del mensaje que arma la frase.
- **WhatsApp:** +56 9 5624 7539. El chat se abre con un mensaje listo: "Hola Agustín, vi tu portafolio y quiero conversar un proyecto."
- La confirmación ahora dice, por ejemplo, "Te escribo antes del miércoles a las 15:46".
- **Pendiente:** el link de agenda para la llamada de 20 minutos (Agenda de citas de Google Calendar o Cal.com). Mientras tanto avisa "pronto".
