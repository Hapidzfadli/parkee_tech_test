#!/bin/bash

# Mengecek apakah tiga parameter diberikan
if [ $# -ne 3 ]; then
    echo "Usage: $0 <file_source> <username> <server_ip>"
    exit 1
fi

FILE_SOURCE=$1
USERNAME=$2
SERVER_IP=$3

# Menyalin file ke server menggunakan SCP
scp "$FILE_SOURCE" "$USERNAME@$SERVER_IP:/home/$USERNAME/"

echo "File telah dikirim ke $USERNAME@$SERVER_IP"
