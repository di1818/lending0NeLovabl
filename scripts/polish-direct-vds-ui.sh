#!/usr/bin/env bash
set -euo pipefail
python3 - <<'PY'
from pathlib import Path
p = Path('/opt/zadachnik/server.js')
s = p.read_text()
start = s.index('<style>') + len('<style>')
end = s.index('</style>')
css = r'''
:root{--bg:#f5f5f7;--panel:rgba(255,255,255,.82);--line:rgba(15,23,42,.08);--text:#0f172a;--muted:#64748b;--dark:#111827;--red:#ef4444;--green:#10b981;--yellow:#f59e0b;--shadow:0 24px 70px rgba(15,23,42,.10)}
*{box-sizing:border-box}body{margin:0;background:radial-gradient(circle at top left,#fff 0,#f5f5f7 38%,#eef1f6 100%);color:var(--text);font-family:Inter,-apple-system,BlinkMacSystemFont,"Segoe UI",Arial,sans-serif}.app{display:grid;grid-template-columns:300px 1fr;min-height:100vh}.side{background:rgba(255,255,255,.72);border-right:1px solid var(--line);padding:26px 22px;backdrop-filter:blur(24px);position:sticky;top:0;height:100vh}.logo{font-size:28px;font-weight:900;letter-spacing:-.06em;margin-bottom:10px}.muted{color:var(--muted);line-height:1.35}.main{padding:44px 34px;max-width:1600px}.main h1{font-size:46px;line-height:1;margin:0 0 14px;letter-spacing:-.07em}.side h3{margin-top:28px;font-size:13px;text-transform:uppercase;letter-spacing:.18em;color:#94a3b8}.card,.panel{background:var(--panel);border:1px solid rgba(255,255,255,.9);border-radius:34px;padding:24px;box-shadow:var(--shadow);backdrop-filter:blur(20px)}.cards{display:grid;grid-template-columns:repeat(4,minmax(170px,1fr));gap:16px;margin:28px 0 22px}.num{font-size:48px;font-weight:900;letter-spacing:-.08em;margin-top:10px}.red{color:#dc2626}.green{color:#059669}.yellow{color:#d97706}.input{height:52px;border:1px solid rgba(15,23,42,.10);border-radius:18px;padding:0 16px;font-size:15px;background:rgba(255,255,255,.9);outline:none}.input:focus{border-color:#111827;box-shadow:0 0 0 4px rgba(17,24,39,.08)}.btn{border:0;border-radius:18px;background:#111827;color:white;padding:15px 18px;font-weight:800;cursor:pointer;box-shadow:0 12px 28px rgba(17,24,39,.16);transition:.18s}.btn:hover{transform:translateY(-1px);background:#020617}.task{border-left:5px solid #cbd5e1;background:rgba(255,255,255,.92);border-radius:22px;margin:12px 0;padding:16px 18px;border-top:1px solid #f1f5f9;border-right:1px solid #f1f5f9;border-bottom:1px solid #f1f5f9;box-shadow:0 10px 24px rgba(15,23,42,.05)}.task.over{border-left-color:var(--red)}.task.today{border-left-color:var(--green)}.task.tomorrow{border-left-color:var(--yellow)}.row{display:flex;gap:12px;flex-wrap:wrap;align-items:center}.views{display:grid;grid-template-columns:repeat(5,1fr);gap:14px;margin-top:15px}.view{background:linear-gradient(180deg,#fff,#f8fafc);border:1px solid #eef2f7;border-radius:24px;padding:20px;min-height:120px;font-weight:800;box-shadow:inset 0 1px 0 rgba(255,255,255,.9)}#foldersList p{background:#f8fafc;border:1px solid #eef2f7;padding:12px 14px;border-radius:16px;margin:8px 0}.panel h2{letter-spacing:-.04em}.side .btn{width:100%;margin:12px 0 4px}@media(max-width:900px){.app{grid-template-columns:1fr}.side{position:relative;height:auto}.cards,.views{grid-template-columns:1fr}.main{padding:22px}.main h1{font-size:34px}}
'''.strip()
s = s[:start] + '\n' + css + '\n' + s[end:]
s = s.replace('Главный дашборд', 'Главный дашборд')
s = s.replace('Первая серверная версия. Данные сохраняются на VDS в SQLite.', 'Серверная версия: папки и задачи сохраняются в SQLite на VDS.')
p.write_text(s)
PY
systemctl restart zadachnik.service
systemctl status zadachnik.service --no-pager
printf '\nГотово. Обнови страницу: http://80.74.30.154/zadachnik/\n'
