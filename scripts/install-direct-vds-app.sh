#!/usr/bin/env bash
set -euo pipefail

APP_DIR=/opt/zadachnik
DATA_DIR=/var/lib/zadachnik
PORT=3017

apt update
apt install -y nodejs sqlite3 nginx
mkdir -p "$APP_DIR" "$DATA_DIR"

cat > "$APP_DIR/server.js" <<'NODE'
const http = require('http');
const fs = require('fs');
const { execFileSync } = require('child_process');
const DB = '/var/lib/zadachnik/zadachnik.db';
const PORT = 3017;

function sql(args) {
  return execFileSync('sqlite3', ['-json', DB, ...args], { encoding: 'utf8' });
}

function run(statement, params = []) {
  const escaped = params.map((value) => String(value ?? '').replaceAll("'", "''"));
  let i = 0;
  const query = statement.replaceAll('?', () => `'${escaped[i++]}'`);
  execFileSync('sqlite3', [DB, query]);
}

execFileSync('sqlite3', [DB, `
CREATE TABLE IF NOT EXISTS folders (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT NOT NULL, created_at TEXT DEFAULT CURRENT_TIMESTAMP);
CREATE TABLE IF NOT EXISTS tasks (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT NOT NULL, folder_id INTEGER, status TEXT DEFAULT 'new', due_at TEXT, created_at TEXT DEFAULT CURRENT_TIMESTAMP);
`]);

const html = `<!doctype html><html lang="ru"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Zadachnik</title><style>
body{margin:0;background:#f5f5f7;color:#111827;font-family:Inter,Arial,sans-serif}.app{display:grid;grid-template-columns:280px 1fr;min-height:100vh}.side{background:rgba(255,255,255,.88);border-right:1px solid #e5e7eb;padding:22px;position:sticky;top:0;height:100vh;box-sizing:border-box}.logo{font-size:24px;font-weight:800;letter-spacing:-.04em}.muted{color:#6b7280}.btn{border:0;border-radius:18px;padding:14px 16px;background:#111827;color:white;font-weight:700;cursor:pointer}.ghost{background:#f3f4f6;color:#111827}.main{padding:30px;max-width:1160px}.cards{display:grid;grid-template-columns:repeat(4,1fr);gap:14px;margin:24px 0}.card,.panel{background:white;border:1px solid #fff;border-radius:28px;box-shadow:0 12px 40px rgba(15,23,42,.06);padding:20px}.num{font-size:42px;font-weight:800;letter-spacing:-.06em}.red{color:#dc2626}.green{color:#059669}.yellow{color:#d97706}.task{border-left:5px solid #d1d5db;margin:10px 0;padding:16px;border-radius:20px;background:#fff;border-top:1px solid #f1f5f9;border-right:1px solid #f1f5f9;border-bottom:1px solid #f1f5f9}.task.red{border-left-color:#ef4444}.task.green{border-left-color:#10b981}.task.yellow{border-left-color:#f59e0b}.row{display:flex;gap:10px;flex-wrap:wrap}.input{height:46px;border:1px solid #e5e7eb;border-radius:16px;padding:0 14px;font-size:16px}select.input{background:white}.views{display:grid;grid-template-columns:repeat(5,1fr);gap:10px}.view{min-height:120px;background:#f8fafc;border-radius:22px;padding:14px}.kanban{display:grid;grid-template-columns:repeat(4,1fr);gap:12px}@media(max-width:800px){.app{grid-template-columns:1fr}.side{position:relative;height:auto}.cards,.views,.kanban{grid-template-columns:1fr}.main{padding:16px}}
</style></head><body><div class="app"><aside class="side"><div class="logo">Zadachnik</div><p class="muted">Серверная версия: данные сохраняются в SQLite на VDS.</p><button class="btn" onclick="focusTitle()">+ Создать задачу</button><h3>Папки</h3><div id="folders"></div><div class="row"><input id="folderName" class="input" placeholder="Новая папка"><button class="btn ghost" onclick="addFolder()">+</button></div></aside><main class="main"><h1>Главный дашборд</h1><p class="muted">Просроченные, сегодня, завтра и без даты.</p><div class="cards"><div class="card"><span class="muted">Просрочено</span><div id="cOver" class="num red">0</div></div><div class="card"><span class="muted">Сегодня</span><div id="cToday" class="num green">0</div></div><div class="card"><span class="muted">Завтра</span><div id="cTomorrow" class="num yellow">0</div></div><div class="card"><span class="muted">Всего</span><div id="cAll" class="num">0</div></div></div><section class="panel"><h2>Быстро добавить задачу</h2><div class="row"><input id="title" class="input" placeholder="Название задачи"><input id="due" class="input" type="datetime-local"><select id="folder" class="input"></select><button class="btn" onclick="addTask()">Сохранить</button></div><div id="tasks"></div></section><section class="panel" style="margin-top:18px"><h2>Виды внутри папки</h2><div class="views"><div class="view">Список</div><div class="view">Канбан</div><div class="view">Дерево</div><div class="view">Гант</div><div class="view">Матрица</div></div></section></main></div><script>
let folders=[],tasks=[];const api=p=>'/zadachnik/api'+p;async function load(){folders=await fetch(api('/folders')).then(r=>r.json());tasks=await fetch(api('/tasks')).then(r=>r.json());render()}function day(t){if(!t)return 'none';const d=new Date(t),n=new Date(),a=new Date(n);a.setHours(0,0,0,0);const b=new Date(a);b.setDate(a.getDate()+1);const c=new Date(a);c.setDate(a.getDate()+2);if(d<a)return'over';if(d>=a&&d<b)return'today';if(d>=b&&d<c)return'tomorrow';return'future'}function render(){folder.innerHTML='<option value="">Без папки</option>'+folders.map(f=>`<option value="${f.id}">${f.name}</option>`).join('');document.getElementById('folders').innerHTML=folders.map(f=>`<p>📁 ${f.name}</p>`).join('')||'<p class="muted">Папок пока нет</p>';cOver.textContent=tasks.filter(t=>day(t.due_at)=='over').length;cToday.textContent=tasks.filter(t=>day(t.due_at)=='today').length;cTomorrow.textContent=tasks.filter(t=>day(t.due_at)=='tomorrow').length;cAll.textContent=tasks.length;document.getElementById('tasks').innerHTML=tasks.map(t=>`<div class="task ${day(t.due_at)=='over'?'red':day(t.due_at)=='today'?'green':day(t.due_at)=='tomorrow'?'yellow':''}"><b>${t.title}</b><br><span class="muted">${t.due_at||'Без даты'} · ${t.folder_name||'Без папки'}</span></div>`).join('')||'<p class="muted">Задач пока нет</p>'}async function addTask(){if(!title.value.trim())return alert('Название обязательно');await fetch(api('/tasks'),{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({title:title.value,folder_id:folder.value,due_at:due.value})});title.value='';due.value='';await load()}async function addFolder(){if(!folderName.value.trim())return;await fetch(api('/folders'),{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({name:folderName.value})});folderName.value='';await load()}function focusTitle(){title.focus()}load();
</script></body></html>`;

function readBody(req) { return new Promise((resolve) => { let data=''; req.on('data', c => data += c); req.on('end', () => resolve(data ? JSON.parse(data) : {})); }); }

http.createServer(async (req, res) => {
  try {
    if (req.url === '/zadachnik/' || req.url === '/zadachnik') { res.writeHead(200, {'Content-Type':'text/html; charset=utf-8'}); return res.end(html); }
    if (req.url === '/zadachnik/api/folders' && req.method === 'GET') { res.writeHead(200, {'Content-Type':'application/json'}); return res.end(sql(['SELECT * FROM folders ORDER BY id DESC'])); }
    if (req.url === '/zadachnik/api/folders' && req.method === 'POST') { const b = await readBody(req); run('INSERT INTO folders(name) VALUES(?)', [b.name]); res.writeHead(200); return res.end('{}'); }
    if (req.url === '/zadachnik/api/tasks' && req.method === 'GET') { res.writeHead(200, {'Content-Type':'application/json'}); return res.end(sql([`SELECT tasks.*, folders.name as folder_name FROM tasks LEFT JOIN folders ON folders.id=tasks.folder_id ORDER BY tasks.id DESC`])); }
    if (req.url === '/zadachnik/api/tasks' && req.method === 'POST') { const b = await readBody(req); run('INSERT INTO tasks(title, folder_id, due_at) VALUES(?, ?, ?)', [b.title, b.folder_id || null, b.due_at || null]); res.writeHead(200); return res.end('{}'); }
    res.writeHead(404); res.end('Not found');
  } catch (error) { res.writeHead(500, {'Content-Type':'text/plain'}); res.end(String(error.stack || error)); }
}).listen(PORT, '127.0.0.1', () => console.log(`Zadachnik listening on ${PORT}`));
NODE

cat > /etc/systemd/system/zadachnik.service <<'SERVICE'
[Unit]
Description=Zadachnik SQLite task app
After=network.target

[Service]
WorkingDirectory=/opt/zadachnik
ExecStart=/usr/bin/node /opt/zadachnik/server.js
Restart=always
RestartSec=5
User=root
Environment=NODE_ENV=production

[Install]
WantedBy=multi-user.target
SERVICE

cat > /etc/nginx/conf.d/zadachnik.conf <<'NGINX'
server {
    listen 80;
    server_name 80.74.30.154 _;

    location /zadachnik/ {
        proxy_pass http://127.0.0.1:3017/zadachnik/;
        proxy_http_version 1.1;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    }
}
NGINX

systemctl daemon-reload
systemctl enable --now zadachnik.service
nginx -t
systemctl reload nginx
systemctl status zadachnik.service --no-pager
printf '\nОткрой: http://80.74.30.154/zadachnik/\n'
