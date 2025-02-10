#!/bin/bash

# Mengecek apakah dua parameter diberikan
if [ $# -ne 2 ]; then
    echo "Usage: $0 <directory> <file_extension>"
    exit 1
fi

DIRECTORY=$1
EXTENSION=$2

# Menampilkan daftar file dengan ekstensi yang sesuai
find "$DIRECTORY" -type f -name "*.$EXTENSION"