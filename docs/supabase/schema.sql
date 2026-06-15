-- Zadachnik database schema for Supabase/PostgreSQL.
-- This schema stores folders, tasks, kanban columns, and uploaded file metadata on the server.

create extension if not exists pgcrypto;

create table if not exists public.folders (
  id uuid primary key default gen_random_uuid(),
  owner_id uuid not null references auth.users(id) on delete cascade,
  name text not null,
  position integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.tasks (
  id uuid primary key default gen_random_uuid(),
  owner_id uuid not null references auth.users(id) on delete cascade,
  folder_id uuid references public.folders(id) on delete set null,
  parent_task_id uuid references public.tasks(id) on delete cascade,
  title text not null,
  description text,
  status text not null default 'new' check (status in ('new', 'in_progress', 'review', 'done')),
  priority text not null default 'medium' check (priority in ('low', 'medium', 'high')),
  urgency text not null default 'not_urgent' check (urgency in ('urgent', 'not_urgent')),
  importance text not null default 'not_important' check (importance in ('important', 'not_important')),
  start_at timestamptz,
  due_at timestamptz,
  completed_at timestamptz,
  position integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.task_files (
  id uuid primary key default gen_random_uuid(),
  owner_id uuid not null references auth.users(id) on delete cascade,
  task_id uuid not null references public.tasks(id) on delete cascade,
  file_name text not null,
  file_type text,
  file_size bigint not null default 0,
  storage_path text not null,
  created_at timestamptz not null default now()
);

create table if not exists public.kanban_columns (
  id uuid primary key default gen_random_uuid(),
  owner_id uuid not null references auth.users(id) on delete cascade,
  folder_id uuid references public.folders(id) on delete cascade,
  title text not null,
  status_key text not null,
  position integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.folders enable row level security;
alter table public.tasks enable row level security;
alter table public.task_files enable row level security;
alter table public.kanban_columns enable row level security;

create policy "Users can manage own folders" on public.folders
  for all using (auth.uid() = owner_id) with check (auth.uid() = owner_id);

create policy "Users can manage own tasks" on public.tasks
  for all using (auth.uid() = owner_id) with check (auth.uid() = owner_id);

create policy "Users can manage own task files" on public.task_files
  for all using (auth.uid() = owner_id) with check (auth.uid() = owner_id);

create policy "Users can manage own kanban columns" on public.kanban_columns
  for all using (auth.uid() = owner_id) with check (auth.uid() = owner_id);

create index if not exists folders_owner_id_idx on public.folders(owner_id);
create index if not exists tasks_owner_id_idx on public.tasks(owner_id);
create index if not exists tasks_folder_id_idx on public.tasks(folder_id);
create index if not exists tasks_due_at_idx on public.tasks(due_at);
create index if not exists task_files_task_id_idx on public.task_files(task_id);
create index if not exists kanban_columns_folder_id_idx on public.kanban_columns(folder_id);
