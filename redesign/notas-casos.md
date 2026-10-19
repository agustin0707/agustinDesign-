# Notas de casos · Tap In y Mend

19 oct 2026 · Fase 1, ítems 1.4, 1.5b, 1.6 y 1.6b

Notas tomadas leyendo las carpetas del proyecto en el disco. Este archivo vive en un repo público: no incluye precios, datos internos de clientes ni nombres del equipo clínico. Las fuentes quedan indicadas para volver a ellas.

---

## Tap In

### La historia real (cronología)
| Cuándo | Qué pasó | Tu rol |
|---|---|---|
| Feb 2025 | Startup de amigos de la UC. Primer encargo: identidad (logo, isotipo, tipografía, paleta, manual compacto) y diseño de la web app móvil para pedir en cafeterías del campus (Figma, con interacciones y viaje del usuario). La programaron otros a partir de su Figma | Branding + UX/UI |
| Mar 2025 | Adaptación de la interfaz para restaurantes al nuevo sistema visual. Material físico para el punto de venta: stickers, pendones, standcards con QR, carteles | UI + gráfica aplicada |
| 2025 | Operación en campus UC (San Joaquín, Casa Central). Marketing digital, mockups para alianzas y colaboraciones con marcas | Diseño y marketing |
| Oct 2025 | La startup entra a una aceleradora; el pitch se apoya en métricas de tracción de campus | Presentación del pitch |
| Abr a ago 2026 | **Pivote a colegios.** Rebranding de Tap In ("Branding Rebirth") como empresa de entornos educativos. Connect, su producto principal con varios módulos (comedor escolar, centro de padres, talleres, gestión interna), y landing B2B para directivos | Rebranding, marca de Connect, diseño **y desarrollo** de la landing |
| Sep 2026 | **tapin.cl publicado** con tu landing (9 páginas). Varias rondas de revisión con el cofundador a cargo de operaciones | Diseño, código y QA |

Fuentes: `Tap In/Cotización/`, `Tap In/Presentaciones/Start Global/`, `Tap In/Pág Web/Landing Page/` (brief, cuestionario de diagnóstico, feedback por mes, notas de reunión, `Codigos/CHECKLIST.md`), `Tap In/Connect/`.

### Lo que hace fuerte al caso
- **Un mismo cliente durante 18 meses y un pivote completo.** Marca → app → punto de venta → landing B2B. Es la oferta "marca + web" contada con continuidad.
- **Proceso documentado de verdad:** brief de contenido basado en un cuestionario de diagnóstico, benchmark de landings B2B, arquitectura de la landing iterada (hay versiones v1 y v2), notas de reunión con decisiones razonadas (por qué "Soluciones" y no "Productos", por qué el carrusel de colegios va bajo el hero, de oscuro a claro para que respire).
- **Web real en producción** y construida por ti, con auditoría propia de accesibilidad, performance y SEO.

### Problemas a resolver
- **El 65% no aparece en ningún documento.** No encontré respaldo para "65% de reducción de tiempos de espera". Recomiendo sacarlo. Si no se puede defender en una entrevista con un cliente, daña más de lo que suma.
- **Métricas disponibles,** todas del producto del cliente y no del diseño: tracción de campus en el pitch, familias usuarias y almuerzos procesados que aparecen en la landing. Se pueden usar como contexto, atribuidas a Tap In, con su permiso.
- **Cuatro descripciones distintas en el sitio actual** (estadios, alta afluencia, descuentos universitarios, colegios). Todas son etapas o malentendidos de la misma historia; el pivote las ordena.

### Relato propuesto
**"De la cafetería del campus a la plataforma del colegio."** El caso cuenta cómo una marca y un producto acompañaron el pivote de una startup: primero una app para pedir sin filas en la universidad, después una plataforma para colegios que necesitó una web B2B pensada para directivos. La landing (diseño + código) es el clímax.

### Respuestas de Agustín (19 oct 2026)
1. **Branding Rebirth** es el rebranding de Tap In para el pivote: de una app para pedir comida en entornos cerrados a una empresa especializada en entornos educativos, con varios productos o módulos (los de la landing).
2. **Connect** está funcional y es el producto principal, con varios módulos adentro.
3. **La app de pedidos de 2025** la programaron unos amigos a partir del diseño en Figma de Agustín.
4. **Proceso:** se puede mostrar todo. Solo evitar cifras que sean secretas.

---

## Mend (ex Anco)

### La historia real (cronología)
| Cuándo | Qué pasó |
|---|---|
| 2025 | Anco nace como proyecto de taller: app para orientar el tratamiento kinesiológico de personas mayores con artrosis |
| Feb 2026 | Avance del prototipo con justificaciones de diseño. Se explora cambiar el público a 35 a 50 años (prevención) |
| Mar 2026 | Documento estratégico con IA y actualización al equipo médico |
| Abr a ago 2026 | Prototipo en React. Postulaciones a fondos (FONIS, Piensa en Grandes). Se vuelve al foco en personas mayores y Atención Primaria, con asesoría clínica |
| Sep 2026 | **Rebranding: Anco pasa a llamarse Mend**, para no quedar ligado a una sola red de salud y apuntar a escala nacional. Manual V08, dirección fotográfica, propuesta de identidad publicada |
| Oct 2026 | **Web app nueva desde cero** (React, Vite, Tailwind), desplegada con clave de acceso. Anco queda como referencia, no como base. Rondas diarias de revisión en iPhone, cada una registrada en `DECISIONES.md`. Avisos al teléfono funcionando |
| Nov 2026 | Plazo de la app el 20 nov; entrega del informe de título el 23 nov. Testeos con pacientes |

Fuentes: `Título/Documentos de Avances/`, `Título/Fondos/`, `Título/Branding/Rebranding/`, `Título/Codigos mend/` (`README.md`, `DECISIONES.md`, `docs/ESTADO.md`).

### Lo que hace fuerte al caso
- **Es el ciclo completo que vendes:** investigación con equipo de salud, marca, UX para personas mayores y producto construido por ti.
- **Decisiones medidas, no opinadas.** Ejemplos del registro: el manual de marca pedía texto blanco sobre la foto del Home; se midió el contraste y 23 de 41 elementos no pasaban AA, así que se agregó un velo y se cambió el vidrio de las tarjetas hasta que todo pasó AA. "La accesibilidad manda sobre el manual." Eso es exactamente lo que diferencia a un diseñador que construye.
- **Sistema de diseño real:** un solo archivo de tokens, solo los 14 colores del manual en el CSS compilado, componentes accesibles.
- **Tres interfaces para tres actores** (paciente, kinesiólogo, médico), con una razón clara para separarlas.
- **El rebranding** como decisión de diseño en sí misma.

### Riesgos y límites
- Es un proyecto académico con asesoría clínica y postulaciones a fondos: hay que confirmar qué se puede mostrar (la U, el equipo clínico, los datos).
- La app está detrás de una clave. Una demo pública necesitaría datos ficticios (ya los tiene) y decidir qué pantallas se abren.
- **Lo mejor del caso llega después del 23 nov:** los resultados del testeo con pacientes. Conviene que el caso se cierre con eso.

### Respuestas de Agustín (19 oct 2026)
1. **Por qué Mend:** Anco venía de Áncora, la red de CESFAM donde se prototipa. La meta es que la app se use a nivel nacional, así que el nombre no podía quedar ligado a una sola red.
2. **Publicación:** se puede publicar. Reservar información de pacientes y médicos, y no mostrar lo del FONIS. El resto salió de Agustín.
3. **Demo o video:** pendiente, se explicó la diferencia.
4. **Resultados del testeo:** sí habrá, más adelante.

---

## Reemplazo de Mido (slot 4 de destacados)

Revisé lo que hay en el disco y en GitHub. Candidatos:

| Candidato | Qué tiene | Qué le falta |
|---|---|---|
| **HAI Group** | Identidad, presentación comercial y un **brief digital interactivo** que construiste para el cliente. Hay una propuesta de desarrollo web | La web no está construida. Si se hace antes del lanzamiento, pasa a ser marca + web |
| **La Columna** | Dirección de arte editorial sólida | Su fuerte son redes, que es lo que no se busca atraer |
| **La Familia** (práctica) | Por evaluar | Saber qué material hay y si se puede mostrar |
| **Agustín Design** (este sitio) | Marca personal + web de autor hecha a mano, con todo el proceso que estamos documentando | Existe recién al lanzar |

Otros repos (MUNCH, Edición Lupa, etc.) son proyectos personales y no calzan.
