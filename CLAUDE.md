# Agustín Design · Portafolio (agustindesign.cl)

## Quién soy
Agustín Avendaño, diseñador integral (Diseño UC, me titulo en diciembre 2026). UX/UI, branding, dirección de arte y frontend (HTML, CSS, JS). Intercambio en Diseño Gráfico en la UPF de Barcelona y curso UX Enterprise de Shifta.

## Proyecto
Portafolio en HTML, CSS y JS vanilla. Sin frameworks: decisión de autor, se mantiene.

- `index.html` es la home y el benchmark de calidad para interacciones y animaciones.
- Cada caso tiene identidad propia con CSS/JS scopeado por prefijo: `.tp-` Tap In, `.lc-` La Columna, `.mi-` Mido.
- Páginas con template genérico pendiente: Entrena Po, HAI Group, Posters y Afiches, Anco.
- Proyecto nuevo: Llegó Farma (submarca de logística last mile, pitch ganado al incumbente). Hay más por confirmar.
- Producción se publica con GitHub Pages desde `agustin0707/agustinDesign-` (rama `main`, `origin` en esta carpeta). El repo es público. DNS en Cloudflare, dominio registrado en NIC Chile. Nunca hacer push a `main` sin aprobación explícita: es el sitio en vivo.

## Objetivo
Rediseñar el portafolio completo y crear la marca personal Agustín Design, plasmada en la web. Mostrar a un diseñador UX/UI con criterio de marca. Estética minimalista, moderna, de autor; nada que se vea a plantilla. Todos los proyectos con el mismo rigor visual.

## Hipótesis (validar, no dar por hechas)
1. El salto es de posicionamiento, no solo estético: los casos se cuentan desde proceso y decisiones.
2. Mi marca es el marco, el proyecto es el contenido: nav, tipografía, grilla, ritmo, motion y estructura de caso son Agustín Design; la identidad de cada proyecto vive adentro (hero, piezas).
3. Núcleo de marca primero, brandbook al final.
4. Código: reconstruir el shell desde cero y migrar los casos rescatando su trabajo pulido.

## Cómo trabajar
- `redesign/PLAN.md` es la columna vertebral: fases e ítems con estado (`Pendiente`, `En curso`, `Bloqueado`, `Hecho`). Actualizarlo al cerrar cada ítem.
- Una fase a la vez. Al cerrar una fase, resumir lo decidido y esperar visto bueno.
- Fases 0 a 5: no se toca el código del sitio. Exploraciones como HTML standalone en `redesign/explorations/`.
- Trabajar en la rama `redesign`. `main` queda intacto.
- Design first: si algo se ve básico o estándar, proponer una alternativa más sofisticada.
- Referencias reales, buscadas en la web, siempre con link y una línea de por qué sirven.
- Una recomendación con justificación breve, no listas de opciones. Excepción: cuando explorar es el punto (máximo 3 direcciones).
- Español, directo, sin formalidades. En copy redactado para mí: nunca guiones largos ni dobles guiones.
- Feedback loop con capturas desde dispositivos reales (incluido iPhone); varias rondas por sesión es normal.

## Estándares de código (fases 6 y 7)
- DRY. Variables CSS para todo token (color, tipo, espaciado, motion).
- Animaciones nativas de CSS por sobre librerías pesadas.
- 100% responsivo, manteniendo la jerarquía tipográfica en todos los breakpoints.
- Alcance quirúrgico: cambiar solo lo pedido, sin refactors no solicitados. Si un fix requiere tocar otros archivos, avisar antes.
- Antes de cambios visuales grandes, mostrar preview para aprobar.
- CSS de cada página al final de `style.css` bajo su prefijo. JS de cada página en una IIFE con comentarios de inicio y fin. Sin JS inline en el HTML y sin CSS en JS.
- Comentarios con este formato exacto:

```css
/* =======================================================
   NOMBRE DE LA SECCIÓN (Ej: VISTA MÓVIL)
   ======================================================= */

/* --- 1. SUB-SECCIÓN (Ej: CONTENEDORES) --- */
/* Breve explicación de lo que hace el código a continuación */
```

## Aprendizajes del repo (respetarlos siempre)
- Reglas de desktop envueltas en `@media (min-width: 769px)`; no confiar en cascada ni en `!important` para pisar mobile.
- En iOS Safari, un `transform` en un ancestro rompe `position: fixed` en descendientes. Paneles móviles animados con `left`, no con `translateX()`.
- Animar el wrapper, no el target: una entrada con `animation: ... both` retiene su `transform` final y pisa los hovers.
- `filter: drop-shadow` en un wrapper estático; `will-change: transform` solo en el hijo animado.
- Toda Google Font con su `<link>` explícito y sus pesos, o el navegador sustituye pesos.
- Scroll lock en iOS con `position: fixed` + `top: -scrollY`, no con `overflow: hidden` en body.
- `overflow-x: hidden` solo en `body`, nunca en `html` y `body` a la vez (doble scrollbar en Chrome).
- Todo `:hover` dentro de `@media (hover: hover)`.
