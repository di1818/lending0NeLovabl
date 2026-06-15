# Termius: один простой шаг для новичка

Ты уже сделал самое сложное: зашёл на сервер и видишь строку Ubuntu. Теперь ничего искать в файлах не нужно.

## Что сделать

1. Выдели и скопируй команду ниже целиком.
2. Вставь её в Termius.
3. Нажми Enter.
4. Подожди, пока команда закончит работу.
5. Скопируй весь текст, который появился на экране, и отправь его мне в чат.

## Команда для копирования

```bash
printf '\n=== SYSTEM ===\n'; hostnamectl; printf '\n=== MEMORY ===\n'; free -h; printf '\n=== DISK ===\n'; df -h; printf '\n=== PORTS ===\n'; ss -tulpn; printf '\n=== BOT PROCESSES ===\n'; ps aux | grep -Ei 'python|node|telegram|bot|pm2|docker' | grep -v grep || true; printf '\n=== RUNNING SERVICES ===\n'; systemctl list-units --type=service --state=running | grep -Ei 'bot|telegram|python|node|pm2|docker|nginx|apache|mysql|postgres|ispmanager' || true; printf '\n=== WEB SERVERS ===\n'; nginx -v 2>&1 || true; apache2 -v 2>&1 || true; printf '\n=== DONE ===\n'
```

## Если вставилось, но ничего не происходит

Нажми Enter.

## Если появится вопрос или ошибка

Ничего не нажимай лишнего. Просто скопируй, что написано, и отправь мне.

## Что я пойму по этому выводу

По этому выводу я пойму:

- хватит ли серверу ресурсов;
- работает ли уже Nginx/Apache;
- какие порты заняты;
- как примерно запущен Telegram-бот;
- можно ли ставить задачник рядом с ботом без риска.

## После первого вывода

Если первый вывод уже отправлен, следующий шаг описан в `docs/SERVER_ASSESSMENT_RU.md`: там есть команда, которая показывает текущие сайты Nginx и настройки сервиса Telegram-бота.
