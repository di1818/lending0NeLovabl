# Деплой Zadachnik на текущий VDS

Этот вариант рассчитан на твой сервер `80.74.30.154`, где уже есть Nginx, ispmanager и Telegram-бот.

## Что мы делаем безопасно

Мы не трогаем:

- домен `ai-gpt-pay.ru`;
- сервис `ai-gpt-bot.service`;
- папку `/opt/ai_gpt_bot`;
- порт webhook `8088`.

Мы кладём задачник отдельно в:

```text
/var/www/zadachnik
```

И открываем его по адресу:

```text
http://80.74.30.154/zadachnik/
```

Так меньше риск сломать Telegram-бота и текущий сайт.

## Важно: сначала код должен попасть в GitHub

Пустой GitHub-репозиторий на старте — это нормально. Но деплой с сервера сработает только после того, как код проекта будет опубликован в GitHub. Сначала смотри `docs/FIRST_PUBLISH_TO_GITHUB_RU.md`.

Перед запуском команд открой `https://github.com/di1818/Zadachnik021` и убедись, что там есть файлы проекта: `package.json`, `src`, `vite.config.ts`, `index.html`.

Если сервер пишет `warning: You appear to have cloned an empty repository` и `Could not read package.json`, значит GitHub пока пустой или изменения ещё не попали в основную ветку. Тогда смотри `docs/FIX_EMPTY_GITHUB_REPO_RU.md`.

## Шаг 1. Скопировать проект на сервер

Вставь в Termius этот блок целиком:

```bash
apt update
apt install -y git curl
curl -fsSL https://deb.nodesource.com/setup_20.x | bash -
apt install -y nodejs
mkdir -p /var/www
cd /var/www
if [ ! -d zadachnik ]; then git clone https://github.com/di1818/Zadachnik021 zadachnik; fi
cd /var/www/zadachnik
git pull
npm install
VITE_BASE_PATH=/zadachnik/ npm run build
```

## Шаг 2. Подключить папку `/zadachnik/` в Nginx

Вставь в Termius этот блок целиком:

```bash
cat >/etc/nginx/conf.d/zadachnik-location.conf <<'NGINX'
server {
    listen 80;
    server_name 80.74.30.154 _;

    location /zadachnik/ {
        alias /var/www/zadachnik/dist/;
        index index.html;
        try_files $uri $uri/ /zadachnik/index.html;
    }
}
NGINX
nginx -t && systemctl reload nginx
```

## Шаг 3. Открыть в браузере

Открой:

```text
http://80.74.30.154/zadachnik/
```

## Если будет ошибка

Ничего не исправляй сам. Просто скопируй ошибку из Termius и отправь мне.
