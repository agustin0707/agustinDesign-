#!/bin/zsh
# =======================================================
# PUBLICAR EL REDISEÑO EN EL REPOSITORIO DE REVISIÓN
# Uso: zsh redesign/herramientas/publicar.sh "mensaje del commit"
# Copia las exploraciones (con sus medios), las imágenes raíz que usan y el índice, y sube a
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

# --- 3. ÍNDICE DE REVISIÓN CON LA FECHA DE PUBLICACIÓN ---
sed "s|{{FECHA}}|$(date '+%d-%m-%Y %H:%M')|" "$ORIGEN/redesign/herramientas/indice-revision.html" > "$DESTINO/index.html"
touch "$DESTINO/.nojekyll"

# --- 4. COMMIT Y PUSH ---
cd "$DESTINO"
git add -A
if git diff --cached --quiet; then echo "Sin cambios para publicar"; exit 0; fi
git commit -q -m "$MENSAJE"
git -c credential.helper= -c credential.helper='!gh auth git-credential' push -q origin main
echo "Publicado: https://agustin0707.github.io/agustindesign-redesign/"
