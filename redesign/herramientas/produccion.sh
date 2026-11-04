#!/bin/zsh
# =======================================================
# ARMAR EL SITIO DE PRODUCCIÓN (agustindesign.cl)
# Uso: zsh redesign/herramientas/produccion.sh            (arma y deja el commit listo, sin subir)
#      zsh redesign/herramientas/produccion.sh --subir    (además sube a main: el sitio en vivo)
# Arma el sitio nuevo en una copia aparte del repo (../agustindesign-produccion, rama main), con la home en la raíz y
# URLs limpias: / es la home, /caso/llego.html y /caso/tapin.html los casos, /proyecto-*.html el archivo. Las páginas
# de la Jo y el resto del sitio anterior siguen en las mismas rutas. Los medios que git ignora en este repo viajan solo
# en la copia de producción. El sitio anterior completo está respaldado en agustin0707/agustindesign-antiguo
# =======================================================
set -e
ORIGEN="$(cd "$(dirname "$0")/../.." && pwd)"
DESTINO="$(dirname "$ORIGEN")/agustindesign-produccion"
EXP="$ORIGEN/redesign/explorations"
GH=(-c credential.helper= -c credential.helper='!gh auth git-credential')

# --- 1. LA COPIA DE PRODUCCIÓN, AL DÍA CON MAIN ---
if [ ! -d "$DESTINO/.git" ]; then git $GH clone -q https://github.com/agustin0707/agustinDesign-.git "$DESTINO"; fi
# Los permisos de los archivos en el disco no son cambios del sitio
git -C "$DESTINO" config core.fileMode false
git -C "$DESTINO" checkout -q main
git -C "$DESTINO" $GH pull -q --ff-only origin main
ARMADO="$(mktemp -d)"

# --- 2. LO QUE SIGUE DEL SITIO ANTERIOR ---
# Las páginas de la Jo, sus fotos y herramientas, las imágenes, el moodboard del README y el CSS y JS del archivo
cd "$ORIGEN"
cp -R img jotita fotos-tier moodboard "$ARMADO/"
cp photo-ranking* planning-session* supabase-edge-function-generate-summary.ts style.css script.js README.md CNAME "$ARMADO/"
# El archivo: Home y la barra vuelven a la home nueva, Tap In va a su caso nuevo y Anco sale del menú
for PAGINA in lacolumna hai mido entrenapo posters; do
    sed -e 's|href="index.html#home"|href="./"|g' -e 's|href="index.html"|href="./#archivo"|g' \
        -e 's|href="proyecto-tapin.html"|href="caso/tapin.html"|g' -e '/proyecto-anco.html/d' \
        "proyecto-$PAGINA.html" > "$ARMADO/proyecto-$PAGINA.html"
done
# Las rutas viejas de Tap In y Anco no quedan rotas: llevan al caso nuevo y a la home
redirigir() { print -r -- "<!DOCTYPE html><html lang=\"es\"><head><meta charset=\"UTF-8\"><title>agustín.design</title><link rel=\"canonical\" href=\"https://agustindesign.cl/$2\"><meta http-equiv=\"refresh\" content=\"0; url=$2\"></head><body><a href=\"$2\">agustín.design</a></body></html>" > "$ARMADO/$1"; }
redirigir proyecto-tapin.html caso/tapin.html
redirigir proyecto-anco.html ./

# --- 3. LA HOME EN LA RAÍZ ---
# inicio.html pasa a ser index.html; sus rutas a casos, hero e imágenes de la raíz se acortan un nivel
cd "$EXP/works"
cp inicio.html "$ARMADO/index.html"
cp inicio*.js works-base.css works-base.js "$ARMADO/"
cp -R media sitios "$ARMADO/"
# Las páginas sin ícono propio (el archivo, Tap In) piden /favicon.ico: el símbolo en PNG, que los navegadores aceptan
cp media/favicon-32.png "$ARMADO/favicon.ico"
mkdir -p "$ARMADO/hero"; cp "$EXP/hero/hero-base.css" "$EXP/hero/hero-base.js" "$EXP/hero/h1-capas.js" "$ARMADO/hero/"
for ARCHIVO in "$ARMADO/index.html" "$ARMADO"/inicio*.js "$ARMADO"/works-base.css "$ARMADO"/works-base.js; do
    sed -i '' -e 's|\.\./\.\./\.\./||g' -e 's|\.\./caso/|caso/|g' -e 's|\.\./hero/|hero/|g' \
        -e 's|https://agustin0707.github.io/agustindesign-redesign/redesign/explorations/works/media/|https://agustindesign.cl/media/|g' "$ARCHIVO"
done

# --- 4. LOS CASOS ---
# Solo las páginas publicadas y lo que cargan; las rondas de exploración quedan en el repo de revisión
mkdir -p "$ARMADO/caso"
cd "$EXP/caso"
cp llego.html tapin.html caso-*.css caso-*.js llego.css llego.js tapin.css tapin.js datos-*.js tema-*.css tema-*.js "$ARMADO/caso/"
cp -R media "$ARMADO/caso/"
for ARCHIVO in "$ARMADO"/caso/*.(html|css|js); do
    sed -i '' -e 's|\.\./works/inicio\.html|../|g' -e 's|\.\./works/|../|g' "$ARCHIVO"
done
touch "$ARMADO/.nojekyll"
find "$ARMADO" -name '.DS_Store' -delete

# --- 5. A LA COPIA DE PRODUCCIÓN Y COMMIT ---
rsync -a --delete --exclude '.git' "$ARMADO/" "$DESTINO/"
rm -rf "$ARMADO"
cd "$DESTINO"
git add -A
if git diff --cached --quiet; then echo "Sin cambios en producción"; else git commit -q -m "${MENSAJE:-Sitio nuevo de agustindesign.cl}"; echo "Commit listo en $DESTINO"; fi
if [ "$1" = "--subir" ]; then git $GH push -q origin main; echo "Publicado en https://agustindesign.cl"; fi
