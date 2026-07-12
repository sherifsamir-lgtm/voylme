#!/data/data/com.termux/files/usr/bin/bash

set -e

STAMP=$(date +%Y%m%d-%H%M%S)
DEST="backups/$STAMP"

mkdir -p "$DEST"

cp -r app "$DEST"/
cp -r components "$DEST"/
cp -r public "$DEST"/

[ -d data ] && cp -r data "$DEST"/

cp package.json "$DEST"/
[ -f package-lock.json ] && cp package-lock.json "$DEST"/

git add . >/dev/null 2>&1 || true

echo
echo "=================================="
echo " Backup created:"
echo " $DEST"
echo "=================================="
