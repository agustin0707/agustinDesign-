# Plan de rediseño · Agustín Design

Estados: `Pendiente` · `En curso` · `Bloqueado` · `Hecho`
Última actualización: 19 oct 2026

---

## Setup
| # | Ítem | Estado |
|---|------|--------|
| S.1 | `CLAUDE.md` en la raíz con lo esencial del brief | Hecho |
| S.2 | Rama `redesign` y carpeta `/redesign/` con este plan | Hecho |
| S.3 | Transferir el repo de GitHub Pages de la cuenta UC a la cuenta personal | Hecho · `agustin0707/agustinDesign-`, sitio verificado en vivo |
| S.4 | Conectar esta carpeta al repo: `main` = producción, `redesign` encima con los cambios locales sin publicar | Hecho · falta decidir si se sube `redesign` a GitHub (el repo es público) |
| S.5 | CNAME de `www` en Cloudflare apuntando a `agustin0707.github.io` | Hecho |
| S.6 | Dominio `agustindesign.cl` verificado en la cuenta `agustin0707` (TXT en Cloudflare) | Hecho |
| S.7 | Renovar `agustindesign.cl` en NIC Chile (vence el 20 nov 2026) | Pendiente · lo haces tú, requiere pago |

## Fase 0 · Auditoría → `00-auditoria.md`
| # | Ítem | Estado |
|---|------|--------|
| 0.1 | Revisión del sitio: interacciones sello, qué se va | Hecho |
| 0.2 | Deuda técnica (CSS, JS, HTML, performance, SEO, accesibilidad) | Hecho |
| 0.3 | Inventario de proyectos por disciplina y material de proceso | Hecho |
| 0.4 | Diagnóstico inicial de las 4 hipótesis | Hecho |
| 0.5 | Respuestas a las 3 preguntas (proyectos nuevos, objetivo, fecha) | Hecho · ver auditoría §10 |

## Fase 1 · Posicionamiento → `01-posicionamiento.md`
| # | Ítem | Estado |
|---|------|--------|
| 1.0 | Debatir y definir el objetivo principal (producto UX/UI, freelance de branding o agencia) | Hecho · clientes de marca + web, con la web como especialidad (revisado) |
| 1.1 | Audiencia principal | Hecho |
| 1.2 | Propuesta de valor en una frase | Hecho |
| 1.3 | Tipo de trabajo a atraer | Hecho |
| 1.4 | Curaduría: casos destacados + archivo | Hecho · 3 destacados (Llegó Farma, Tap In, Mend); 4° solo si aparece algo que lo merezca |
| 1.5 | Aclarar relación entre proyecto de título y Anco | Hecho · Anco ahora es Mend; Anco sale del portafolio |
| 1.5b | Confirmar qué se puede mostrar de Mend | Hecho · todo menos datos de pacientes, médicos y FONIS |
| 1.5c | Demo o video de Mend | Pendiente · más adelante, Agustín se inclina por demo |
| 1.5d | Actualizar el mockup de Mend en el índice (app aún en desarrollo) | Pendiente · cuando la app esté terminada |
| 1.6 | Decidir si la landing de Tap In va dentro del caso Tap In o como caso propio | Hecho · dentro del caso |
| 1.6b | Definir el relato de Tap In | Hecho · "De la cafetería del campus a la plataforma del colegio" |
| 1.8 | Elegir el 4° destacado en reemplazo de Mido | Hecho · se queda en 3; HAI candidato si toma el área de marca y marketing |
| 1.7 | Evaluar juntos La Familia (práctica) | Pendiente · más adelante |

## Fase 2 · Referencias → `02-referencias.md` + moodboard
| # | Ítem | Estado |
|---|------|--------|
| 2.1 | Benchmark de portafolios de autor (UX/UI y brand) con links | Hecho |
| 2.2 | Moodboard por ejes: tipografía, layout, motion, estructura de caso | Hecho |
| 2.3 | Análisis profundo de 3 a 5 referencias | Hecho |
| 2.4 | Anti referencias | Hecho |
| 2.5 | 3 principios de diseño | Hecho |

## Fase 3 · Núcleo de marca → `03-marca.md` + tokens + exploraciones
| # | Ítem | Estado |
|---|------|--------|
| 3.1 | Personalidad y tono verbal | En curso · núcleo común propuesto |
| 3.2 | Firma: logotipo, monograma o ambos | En curso · dirección C elegida; falta resolver "agustín.design" vs dominio .cl |
| 3.0 | Recibir la idea de Agustín para el rediseño (mejorar, no rehacer de cero) | Hecho · referencias de hero y ajustes a la C en `03-marca.md` |
| 3.3 | Tipografía de sistema | Pendiente |
| 3.4 | Paleta | Pendiente |
| 3.5 | Grilla | Pendiente |
| 3.6 | Principios de motion | Pendiente |
| 3.7 | Tokens base (borrador) | Pendiente |

## Fase 4 · Arquitectura y contenido → `04-arquitectura.md`
| # | Ítem | Estado |
|---|------|--------|
| 4.1 | Sitemap | Pendiente |
| 4.2 | Template de case study UX (contexto, problema, rol, proceso, decisiones, resultado, aprendizajes) | Pendiente |
| 4.3 | Copys: home, about, contacto | Pendiente |
| 4.4 | Copys por caso | Pendiente |
| 4.5 | Verificar datos duros de cada caso (ej. el 65% de Tap In) | Pendiente |

## Fase 5 · Diseño UI → `/redesign/explorations/`

A pedido de Agustín, la UI se trabaja **sección por sección**, cerrando marca y arquitectura de cada una en el camino.

| # | Sección | Estado |
|---|------|--------|
| S1 | Hero | Hecho · Hero 1 · Capas v4 final, con tres audits (ver `05-ui-secciones.md`) |
| S2 | Índice de trabajos y entrada al proyecto (interacción nueva) | En curso · Pila v5 (sitios sin parpadeo y con recorrido completo, sin pastilla, archivo con contexto), falta tu visto bueno (ver `05-ui-secciones.md`) |
| S3 | Página de caso | Pendiente |
| S4 | Sobre mí | Pendiente |
| S5 | Contacto y footer | Pendiente |

| # | Ítem | Estado |
|---|------|--------|
| 5.1 | Wireframes de home y caso | Pendiente |
| 5.2 | Design system sobre los tokens | Pendiente |
| 5.3 | Hi fi desktop | Pendiente |
| 5.4 | Hi fi mobile | Pendiente |
| 5.5 | Specs de interacciones clave | Pendiente |

## Fase 6 · Plan de build → `06-plan-build.md`
| # | Ítem | Estado |
|---|------|--------|
| 6.1 | Tokens a variables CSS | Pendiente |
| 6.2 | Inventario de componentes | Pendiente |
| 6.3 | Specs de motion | Pendiente |
| 6.4 | Orden de construcción | Pendiente |
| 6.5 | Estrategia de migración (casos + qué hacer con las páginas personales) | Pendiente |

## Fase 7 · Build, QA y lanzamiento
| # | Ítem | Estado |
|---|------|--------|
| 7.1 | Shell de marca (nav, footer, tipografía, grilla, motion) | Pendiente |
| 7.2 | Home | Pendiente |
| 7.3 | Template de caso | Pendiente |
| 7.4 | Migración de casos uno a uno | Pendiente |
| 7.5 | QA en dispositivos reales (incluido iPhone) | Pendiente |
| 7.6 | Performance | Pendiente |
| 7.7 | SEO básico (meta por página, sitemap, robots) | Pendiente |
| 7.8 | OG images con la marca | Pendiente |
| 7.9 | Brandbook final | Pendiente |
| 7.10 | Lanzamiento | Pendiente |
| 7.11 | Página corta "Sobre este sitio" (enlazada desde el footer, no es un caso) | Pendiente · va al final |
