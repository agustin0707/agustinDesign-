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
_Pendiente. Se rehace desde cero: tiene que ser atractivo presionar un proyecto y que lleve a una página muy única._
