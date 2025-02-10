#!/bin/bash

# Mengecek apakah dua parameter diberikan
if [ $# -ne 2 ]; then
    echo "Usage: $0 <service_name> <start|stop|status>"
    exit 1
fi

SERVICE=$1
ACTION=$2

# Menjalankan perintah sesuai aksi
case $ACTION in
    start)
        sudo systemctl start "$SERVICE"
        echo "Service $SERVICE telah dimulai."
        ;;
    stop)
        sudo systemctl stop "$SERVICE"
        echo "Service $SERVICE telah dihentikan."
        ;;
    status)
        sudo systemctl status "$SERVICE"
        ;;
    *)
        echo "Perintah tidak valid. Gunakan: start, stop, atau status."
        exit 1
        ;;
esac
