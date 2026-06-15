# Проверка сервера через Termius

Текущий IP сервера: `80.74.30.154`.

Цель этого файла — дать безопасные команды, которые можно вставить в Termius перед деплоем задачника. Эти команды ничего не удаляют и не ломают: они только показывают информацию о сервере и Telegram-боте.

## Самый простой вариант для новичка

Если ты уже зашёл в Termius и видишь приветствие Ubuntu, не ищи команды по файлам. Открой `docs/TERMIUS_ONE_COMMAND_RU.md`: там есть одна длинная команда, которую нужно просто скопировать, вставить в Termius и нажать Enter.

## 1. Подключение

В Termius создай Host:

- Address: `80.74.30.154`
- Username: `root`
- Password: пароль из панели хостинга или письма

После подключения вставь команды ниже по очереди.

## 2. Узнать систему и ресурсы

```bash
hostnamectl
free -h
df -h
uname -a
```

## 3. Проверить, что уже занято на сервере

```bash
ss -tulpn
```

Особенно важны порты:

- `80` — обычный сайт без HTTPS;
- `443` — сайт с HTTPS;
- `3000`, `5173`, `8000`, `8080` — часто используются приложениями;
- если там работает бот или панель, мы не должны их случайно занять.

## 4. Найти процессы Telegram-бота

```bash
ps aux | grep -Ei 'python|node|telegram|bot|pm2|docker' | grep -v grep
```

## 5. Проверить Docker, если он есть

```bash
docker ps -a
```

Если команда напишет `docker: command not found`, это нормально — значит Docker пока не установлен.

## 6. Проверить systemd-сервисы бота

```bash
systemctl list-units --type=service --state=running | grep -Ei 'bot|telegram|python|node|pm2|docker|nginx|apache|mysql|postgres'
```

## 7. Проверить веб-серверы

```bash
nginx -v
apache2 -v
```

Если какая-то команда пишет `command not found`, это не ошибка. Это значит, что такая программа не установлена.

## 8. Что прислать обратно

Скопируй и пришли мне вывод этих команд:

```bash
hostnamectl
free -h
df -h
ss -tulpn
ps aux | grep -Ei 'python|node|telegram|bot|pm2|docker' | grep -v grep
systemctl list-units --type=service --state=running | grep -Ei 'bot|telegram|python|node|pm2|docker|nginx|apache|mysql|postgres'
```

После этого можно будет безопасно выбрать схему деплоя, чтобы не сломать Telegram-бота.
