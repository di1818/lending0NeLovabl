#!/usr/bin/env bash
set -euo pipefail

APP_DIR=/opt/zadachnik
DATA_DIR=/var/lib/zadachnik
DB=$DATA_DIR/zadachnik.db
PORT=3017

apt update
apt install -y nodejs sqlite3 nginx
mkdir -p "$APP_DIR" "$DATA_DIR"

# Reuse the richer task-card server from the direct update script.
# This installer is intended to be pasted/run on the VDS and is safe to rerun.
bash /root/update_zadachnik_task_card.sh 2>/dev/null || true

if [ ! -f "$APP_DIR/server.js" ]; then
  echo "server.js was not created. Paste the full task-card script first or use the assistant-provided combined block."
  exit 1
fi

cat >/etc/systemd/system/zadachnik.service <<SERVICE
[Unit]
Description=Zadachnik SQLite task app
After=network.target

[Service]
WorkingDirectory=$APP_DIR
ExecStart=/usr/bin/node $APP_DIR/server.js
Restart=always
RestartSec=5
User=root
Environment=NODE_ENV=production

[Install]
WantedBy=multi-user.target
SERVICE

cat >/etc/nginx/conf.d/zadachnik.conf <<NGINX
server {
    listen 80;
    server_name 80.74.30.154 _;

    location /zadachnik/ {
        proxy_pass http://127.0.0.1:$PORT/zadachnik/;
        proxy_http_version 1.1;
        proxy_set_header Host \$host;
        proxy_set_header X-Real-IP \$remote_addr;
        proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
    }
}
NGINX

systemctl daemon-reload
systemctl enable --now zadachnik.service
nginx -t
systemctl reload nginx
systemctl status zadachnik.service --no-pager
printf '\nГотово. Открой: http://80.74.30.154/zadachnik/\n'
