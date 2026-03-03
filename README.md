# Welcome to your Lovable project

## Project info

**URL**: https://lovable.dev/projects/REPLACE_WITH_PROJECT_ID

## How can I edit this code?

There are several ways of editing your application.

**Use Lovable**

Simply visit the [Lovable Project](https://lovable.dev/projects/REPLACE_WITH_PROJECT_ID) and start prompting.

Changes made via Lovable will be committed automatically to this repo.

**Use your preferred IDE**

If you want to work locally using your own IDE, you can clone this repo and push changes. Pushed changes will also be reflected in Lovable.

The only requirement is having Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

Follow these steps:

```sh
# Step 1: Clone the repository using the project's Git URL.
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory.
cd <YOUR_PROJECT_NAME>

# Step 3: Install the necessary dependencies.
npm i

# Step 4: Start the development server with auto-reloading and an instant preview.
npm run dev
```

**Edit a file directly in GitHub**

- Navigate to the desired file(s).
- Click the "Edit" button (pencil icon) at the top right of the file view.
- Make your changes and commit the changes.

**Use GitHub Codespaces**

- Navigate to the main page of your repository.
- Click on the "Code" button (green button) near the top right.
- Select the "Codespaces" tab.
- Click on "New codespace" to launch a new Codespace environment.
- Edit files directly within the Codespace and commit and push your changes once you're done.

## What technologies are used for this project?

This project is built with:

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS

## Деплой на VDS (FirstVDS)

### 1. Арендуй сервер

На [firstvds.ru](https://firstvds.ru/) выбери тариф с **Ubuntu 22.04/24.04**. Минимального тарифа хватит — сайт статический.

После оплаты тебе придёт письмо с **IP-адресом** и **паролем root**.

### 2. Подключись к серверу

Скачай [PuTTY](https://www.putty.org/) (Windows) или открой Терминал (Mac/Linux).

```sh
ssh root@ТВОЙ_IP_АДРЕС
```

Введи пароль из письма.

### 3. Установи нужное на сервере

Копируй и вставляй по одной строке:

```sh
# Обновить систему
apt update && apt upgrade -y

# Установить Nginx (веб-сервер)
apt install nginx -y

# Установить Node.js
curl -fsSL https://deb.nodesource.com/setup_20.x | bash -
apt install nodejs -y
```

### 4. Загрузи проект на сервер

**Вариант А — через Git (рекомендуется):**

```sh
# Установить git
apt install git -y

# Клонировать проект
cd /var/www
git clone ССЫЛКА_НА_ТВОЙ_РЕПОЗИТОРИЙ site
cd site
```

**Вариант Б — загрузить файлы вручную:**

Скачай проект как ZIP из GitHub → распакуй → загрузи через [WinSCP](https://winscp.net/) или [FileZilla](https://filezilla-project.org/) в папку `/var/www/site`.

### 5. Собери проект

```sh
cd /var/www/site
npm install
npm run build
```

После этого появится папка `dist` — это готовый сайт.

### 6. Настрой Nginx

```sh
nano /etc/nginx/sites-available/default
```

Удали всё содержимое (Ctrl+K несколько раз) и вставь:

```nginx
server {
    listen 80;
    server_name ТВОЙ_ДОМЕН_ИЛИ_IP;

    root /var/www/site/dist;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }
}
```

Сохрани: **Ctrl+O → Enter → Ctrl+X**

```sh
# Проверить конфиг
nginx -t

# Перезапустить Nginx
systemctl restart nginx
```

### 7. Готово!

Открой в браузере: `http://ТВОЙ_IP_АДРЕС` — сайт работает.

### 8. (Бонус) Подключить домен + HTTPS

```sh
# Установить Certbot для бесплатного SSL
apt install certbot python3-certbot-nginx -y

# Получить сертификат (замени example.com на свой домен)
certbot --nginx -d example.com -d www.example.com
```

Перед этим в настройках домена (у регистратора) укажи **A-запись** → IP твоего сервера.

---

### Шпаргалка: обновить сайт после изменений

```sh
cd /var/www/site
git pull
npm install
npm run build
systemctl restart nginx
```
