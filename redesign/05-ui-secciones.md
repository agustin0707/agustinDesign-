# Fase 5 · UI por secciones

Rama `redesign`. A pedido de Agustín, la UI se trabaja sección por sección. Exploraciones en `explorations/`.

---

## S1 · Hero

**Elegido: Hero 1 · Capas (v2)**, `explorations/hero/h1-capas.html` (20 oct 2026).

| Elemento | Decisión |
|---|---|
| Nombre | "agustín design" en Geist 500, tracking -0.065em, a todo el ancho. Encima del retrato con `mix-blend-mode: difference`: negro sobre el fondo, claro sobre la foto |
| Retrato | El recorte actual (`img/fotodeperfilgus5.webp`), anclado abajo, a todo el ancho |
| Logo | "agustín.design" arriba a la izquierda con cursor que parpadea. A Agustín le gusta mucho este detalle |
| Links | **Estética del sitio actual:** Inter 200 en cursiva, 1.1rem, tracking -0.05em, subrayado que crece y leve subida al pasar el mouse. Centrados en desktop; en columna arriba a la derecha en móvil, como hoy |
| Llamado | **Botón "ver proyectos" como el actual** (píldora con borde, se llena de izquierda a derecha y flota). Reemplaza la frase "Diseño marcas y construyo sus sitios", que Agustín sentía mejorable |
| Arriba a la derecha | Punto "disponible" que late (sin color) y hora de Santiago en vivo, en Geist Mono |
| Abajo a la izquierda | Redes en mono, con inversión de color sobre la foto |
| Motion | Letras del nombre que suben en cascada, links y botón que aparecen con desenfoque, parallax entre nombre y retrato con el mouse y el scroll. Respeta reducir movimiento |
| Fondo | Gris claro `#D9D9D6`, cercano al `#dddddd` actual |

**Pendientes del hero:**
- Los links quedaron en español ("Sobre mí, Trabajo, Contacto") por la regla de voz de la marca. Si Agustín prefiere mantener "About, Works, Contact", es un cambio de texto.
- La propuesta de valor sale del hero: se ubica en la siguiente sección, junto al índice de trabajos.
- Técnico para la Fase 6: los links y el botón animan el wrapper (`li`, `.cta-hero`) para no pisar el hover, según los aprendizajes del repo.

---

## S2 · Índice de trabajos y entrada al proyecto
_Pendiente. Se rehace desde cero: tiene que ser atractivo presionar un proyecto y que lleve a una página muy única._
