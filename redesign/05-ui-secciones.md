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

