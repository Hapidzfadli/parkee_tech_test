#!/bin/bash

LOG_FILE="/var/log/system_update.log"

# Mengecek hak akses root
if [ "$(id -u)" -ne 0 ]; then
    echo "Script ini harus dijalankan sebagai root."
    exit 1
fi

# Mengecek distribusi Linux dan menjalankan update yang sesuai
if command -v apt > /dev/null; then
    apt update && apt upgrade -y | tee -a "$LOG_FILE"
elif command -v yum > /dev/null; then
    yum update -y | tee -a "$LOG_FILE"
elif command -v dnf > /dev/null; then
    dnf upgrade -y | tee -a "$LOG_FILE"
else
    echo "Paket manager tidak dikenali." | tee -a "$LOG_FILE"
    exit 1
fi

echo "Update selesai. Log disimpan di $LOG_FILE"