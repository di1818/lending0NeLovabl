# Supabase для Zadachnik

Это самый простой и дешёвый стартовый вариант для реального хранения данных без самописного backend на VDS.

Supabase будет отвечать за:

- авторизацию по email/паролю;
- PostgreSQL-базу для папок и задач;
- Storage для файлов задач;
- правила доступа, чтобы каждый пользователь видел только свои данные.

## Что сделать в Supabase

1. Зарегистрироваться на https://supabase.com.
2. Создать новый проект.
3. Открыть SQL Editor.
4. Вставить содержимое файла `docs/supabase/schema.sql`.
5. Нажать Run.
6. В Storage создать bucket `task-files`.
7. В Project Settings > API скопировать:
   - Project URL;
   - anon/public key.
8. Создать `.env` по примеру `.env.example`.

## Почему так

Для сервера с 1 CPU и 2 GB RAM это безопаснее, чем сразу ставить PostgreSQL, backend и файловое хранилище рядом с Telegram-ботом. Frontend можно держать на VDS, а база и файлы будут в управляемом сервисе.
