# Fase 5 · UI por secciones

Rama `redesign`. A pedido de Agustín, la UI se trabaja sección por sección. Exploraciones en `explorations/`.

---

## S1 · Hero

**Elegido: Hero 1 · Capas (v4)**, `explorations/hero/h1-capas.html` + `h1-capas.js` (21 oct 2026). Las versiones anteriores quedan en el historial de git.

| Elemento | Decisión |
|---|---|
| Nombre | "agustín design" en Geist 500, tracking -0.065em, a todo el ancho. Encima del retrato con `mix-blend-mode: difference`: negro sobre el fondo, claro sobre la foto |
| Retrato | El recorte actual (`img/fotodeperfilgus5.webp`), anclado abajo, a todo el ancho |
| Logo | "agustín.design" arriba a la izquierda con cursor que parpadea. A Agustín le gusta mucho este detalle |
| Links | **About · Works · Contact**, en la tipografía del sitio actual (Inter 200 en cursiva, 1.1rem, tracking -0.05em) con el hover de la marca: la línea entra por la izquierda y sale por la derecha. Centrados en desktop; en columna arriba a la derecha en móvil |
| Llamado | **Botón "ver proyectos" como el actual** (píldora con borde, se llena de izquierda a derecha y flota). Reemplaza la frase "Diseño marcas y construyo sus sitios", que Agustín sentía mejorable |
| Arriba a la derecha | Punto "disponible" que late (sin color) y hora de Santiago en vivo, en Geist Mono |
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

**Pendientes del hero:**
- Los links quedan en inglés ("About, Works, Contact") por decisión de Agustín, como excepción a la regla de voz.
- La propuesta de valor sale del hero: se ubica en la siguiente sección, junto al índice de trabajos.
- Técnico para la Fase 6: los links y el botón animan el wrapper (`li`, `.cta-hero`) para no pisar el hover, según los aprendizajes del repo.

---

## S2 · Índice de trabajos y entrada al proyecto
_Pendiente. Se rehace desde cero: tiene que ser atractivo presionar un proyecto y que lleve a una página muy única._
