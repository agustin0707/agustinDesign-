#!/bin/zsh
# =======================================================
# PUBLICAR EL REDISEÑO EN EL REPOSITORIO DE REVISIÓN
# Uso: zsh redesign/herramientas/publicar.sh "mensaje del commit"
# Copia las exploraciones (con sus medios), las imágenes raíz que usan, las páginas del archivo y el índice, y sube a
# github.com/agustin0707/agustindesign-redesign (GitHub Pages en main).
# =======================================================
set -e
ORIGEN="$(cd "$(dirname "$0")/../.." && pwd)"
DESTINO="$(dirname "$ORIGEN")/agustindesign-redesign"
MENSAJE="${1:-Actualización del rediseño}"

# --- 1. EXPLORACIONES COMPLETAS (INCLUIDOS LOS MEDIOS QUE GIT IGNORA EN EL REPO PRINCIPAL) ---
mkdir -p "$DESTINO/redesign"
rsync -a --delete --exclude '.DS_Store' "$ORIGEN/redesign/explorations/" "$DESTINO/redesign/explorations/"

# --- 2. IMÁGENES DE LA RAÍZ QUE LAS EXPLORACIONES REFERENCIAN ---
for CARPETA in img moodboard; do
    mkdir -p "$DESTINO/$CARPETA"
    grep -rhoE "(\.\./)+$CARPETA/[A-Za-z0-9_.-]+" "$ORIGEN/redesign/explorations" 2>/dev/null | sed "s|.*$CARPETA/||" | sort -u | while read -r ARCHIVO; do
        [ -f "$ORIGEN/$CARPETA/$ARCHIVO" ] && cp "$ORIGEN/$CARPETA/$ARCHIVO" "$DESTINO/$CARPETA/"
    done
done

# --- 3. PÁGINAS DEL ARCHIVO (LAS DEL SITIO ANTERIOR) ---
# Las fichas del archivo abren estas páginas tal como están en producción. En la copia, Home y la barra vuelven al home
# nuevo, Tap In va a su caso nuevo y Anco sale del menú; los originales de la raíz no se tocan
INICIO="redesign/explorations/works/inicio.html"
for PAGINA in lacolumna hai mido entrenapo posters; do
    sed -e "s|href=\"index.html#home\"|href=\"$INICIO\"|g" -e "s|href=\"index.html\"|href=\"$INICIO#archivo\"|g" \
        -e "s|href=\"proyecto-tapin.html\"|href=\"redesign/explorations/caso/tapin.html\"|g" -e '/proyecto-anco.html/d' \
        "$ORIGEN/proyecto-$PAGINA.html" > "$DESTINO/proyecto-$PAGINA.html"
    grep -oE "img/[^\"' )>,]+" "$ORIGEN/proyecto-$PAGINA.html" | sort -u | while read -r ARCHIVO; do
        [ -f "$ORIGEN/$ARCHIVO" ] && cp "$ORIGEN/$ARCHIVO" "$DESTINO/img/"
    done
done
cp "$ORIGEN/style.css" "$ORIGEN/script.js" "$DESTINO/"

# --- 4. ÍNDICE DE REVISIÓN CON LA FECHA DE PUBLICACIÓN ---
sed "s|{{FECHA}}|$(date '+%d-%m-%Y %H:%M')|" "$ORIGEN/redesign/herramientas/indice-revision.html" > "$DESTINO/index.html"
touch "$DESTINO/.nojekyll"

# --- 5. COMMIT Y PUSH ---
cd "$DESTINO"
git add -A
if git diff --cached --quiet; then echo "Sin cambios para publicar"; exit 0; fi
git commit -q -m "$MENSAJE"
git -c credential.helper= -c credential.helper='!gh auth git-credential' push -q origin main
echo "Publicado: https://agustin0707.github.io/agustindesign-redesign/"
