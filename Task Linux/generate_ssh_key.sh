#!/bin/bash

# Mengecek apakah direktori tujuan diberikan
if [ $# -ne 1 ]; then
    echo "Usage: $0 <output_directory>"
    exit 1
fi

OUTPUT_DIR=$1

# Membuat direktori jika belum ada
mkdir -p "$OUTPUT_DIR"

# Membuat SSH key tanpa password
ssh-keygen -t rsa -b 2048 -f "$OUTPUT_DIR/id_rsa" -N ""

echo "SSH Key telah dibuat di $OUTPUT_DIR"
