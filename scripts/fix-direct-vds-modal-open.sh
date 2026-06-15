#!/usr/bin/env bash
set -euo pipefail
python3 - <<'PY'
from pathlib import Path
p=Path('/opt/zadachnik/server.js')
s=p.read_text()
s=s.replace('onclick=openTask()>+ Создать задачу', 'onclick="openTask()">+ Создать задачу')
s=s.replace("const q=(search?.value||'').toLowerCase();", "const searchEl=document.getElementById('search');const q=((searchEl&&searchEl.value)||'').toLowerCase();")
if 'window.openTask=openTask' not in s:
    s=s.replace('load();</script>', 'window.openTask=openTask;window.closeTask=closeTask;window.saveTask=saveTask;window.addFolder=addFolder;window.uploadFile=uploadFile;window.deleteFile=deleteFile;window.previewFile=previewFile;load();</script>')
p.write_text(s)
PY
systemctl restart zadachnik.service
systemctl status zadachnik.service --no-pager
printf '\nГотово. Обнови страницу Ctrl+F5: http://80.74.30.154/zadachnik/\n'
