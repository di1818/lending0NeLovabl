import { useMemo, useState } from "react";
import {
  AlertTriangle,
  CalendarClock,
  CheckCircle2,
  ChevronRight,
  Download,
  FileText,
  FolderPlus,
  GanttChartSquare,
  Grid2X2,
  LayoutDashboard,
  ListChecks,
  MoreHorizontal,
  Paperclip,
  Plus,
  Search,
  ShieldCheck,
  Smartphone,
  Sparkles,
  SquareKanban,
  TreePine,
  UploadCloud,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

const folders = ["Личное", "Клиенты", "Запуск продукта", "Дом"];

const tasks = [
  {
    title: "Закрыть просроченный отчёт",
    folder: "Клиенты",
    status: "В работе",
    due: "Вчера, 18:00",
    tone: "overdue",
    urgent: true,
    important: true,
    progress: 65,
    files: 2,
  },
  {
    title: "Созвониться с дизайнером по главному экрану",
    folder: "Запуск продукта",
    status: "Новое",
    due: "Сегодня, 12:30",
    tone: "today",
    urgent: true,
    important: true,
    progress: 20,
    files: 1,
  },
  {
    title: "Проверить счета за хостинг и домен",
    folder: "Личное",
    status: "Проверка",
    due: "Завтра, 09:00",
    tone: "tomorrow",
    urgent: false,
    important: true,
    progress: 80,
    files: 0,
  },
  {
    title: "Собрать идеи для мобильной версии PWA",
    folder: "Без папки",
    status: "Новое",
    due: "Без даты",
    tone: "nodate",
    urgent: false,
    important: false,
    progress: 0,
    files: 3,
  },
];

const sections = [
  { key: "overdue", label: "Просроченные", color: "border-red-200 bg-red-50 text-red-700" },
  { key: "today", label: "Сегодня", color: "border-emerald-200 bg-emerald-50 text-emerald-700" },
  { key: "tomorrow", label: "Завтра", color: "border-amber-200 bg-amber-50 text-amber-700" },
  { key: "nodate", label: "Без даты", color: "border-slate-200 bg-slate-50 text-slate-600" },
];

const columns = ["Новое", "В работе", "Проверка", "Готово"];
const quadrants = [
  ["Срочно и важно", "Сделать сейчас", "bg-red-50 border-red-100"],
  ["Не срочно, но важно", "Запланировать", "bg-blue-50 border-blue-100"],
  ["Срочно, не важно", "Делегировать", "bg-amber-50 border-amber-100"],
  ["Не срочно и не важно", "Убрать или позже", "bg-slate-50 border-slate-100"],
];

const toneClass: Record<string, string> = {
  overdue: "border-l-red-500",
  today: "border-l-emerald-500",
  tomorrow: "border-l-amber-400",
  nodate: "border-l-slate-300",
};

const Index = () => {
  const [search, setSearch] = useState("");
  const [taskModalOpen, setTaskModalOpen] = useState(false);
  const [confirmCloseOpen, setConfirmCloseOpen] = useState(false);
  const [dirty, setDirty] = useState(false);

  const filteredTasks = useMemo(
    () => tasks.filter((task) => task.title.toLowerCase().includes(search.toLowerCase())),
    [search],
  );

  const closeTaskModal = () => {
    if (dirty) {
      setConfirmCloseOpen(true);
      return;
    }
    setTaskModalOpen(false);
  };

  return (
    <main className="min-h-screen bg-[#f5f5f7] text-slate-950">
      <div className="flex min-h-screen flex-col lg:flex-row">
        <aside className="border-b border-white/70 bg-white/80 p-4 backdrop-blur-xl lg:sticky lg:top-0 lg:h-screen lg:w-72 lg:border-b-0 lg:border-r">
          <div className="mb-8 flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-slate-950 text-white shadow-lg shadow-slate-300">
              <Sparkles className="h-5 w-5" />
            </div>
            <div>
              <p className="text-sm text-slate-500">Личный задачник</p>
              <h1 className="font-sans text-lg font-semibold tracking-tight">Zadachnik</h1>
            </div>
          </div>

          <Button className="mb-6 h-12 w-full rounded-2xl bg-slate-950 text-white hover:bg-slate-800" onClick={() => setTaskModalOpen(true)}>
            <Plus className="mr-2 h-4 w-4" /> Создать задачу
          </Button>

          <nav className="space-y-6">
            <div>
              <p className="mb-2 px-2 text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">Сводка</p>
              <Button variant="ghost" className="w-full justify-start rounded-2xl bg-slate-100">
                <LayoutDashboard className="mr-2 h-4 w-4" /> Главный дашборд
              </Button>
              <Button variant="ghost" className="mt-1 w-full justify-start rounded-2xl text-slate-600">
                <ListChecks className="mr-2 h-4 w-4" /> Задачи без папки
              </Button>
            </div>

            <div>
              <div className="mb-2 flex items-center justify-between px-2">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">Папки / проекты</p>
                <Button variant="ghost" size="icon" className="h-8 w-8 rounded-xl">
                  <FolderPlus className="h-4 w-4" />
                </Button>
              </div>
              <div className="space-y-1">
                {folders.map((folder) => (
                  <Button key={folder} variant="ghost" className="w-full justify-between rounded-2xl text-slate-700">
                    <span>{folder}</span>
                    <ChevronRight className="h-4 w-4 text-slate-300" />
                  </Button>
                ))}
              </div>
            </div>
          </nav>
        </aside>

        <section className="flex-1 p-4 md:p-8">
          <div className="mx-auto max-w-7xl space-y-8">
            <header className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
              <div>
                <Badge className="mb-3 rounded-full bg-white px-3 py-1 text-slate-600 shadow-sm hover:bg-white">
                  <ShieldCheck className="mr-1 h-3.5 w-3.5" /> Данные проектируются под сервер и БД
                </Badge>
                <h2 className="font-sans text-3xl font-semibold tracking-[-0.04em] md:text-5xl">Главный дашборд</h2>
                <p className="mt-3 max-w-2xl text-slate-500">Минималистичная сводка по задачам: сначала горящее, потом сегодня, завтра и всё без даты.</p>
              </div>
              <div className="flex items-center gap-2 rounded-2xl bg-white p-2 shadow-sm">
                <Smartphone className="h-4 w-4 text-slate-400" />
                <span className="text-sm text-slate-500">Адаптивно для телефона и PWA</span>
              </div>
            </header>

            <div className="grid gap-4 md:grid-cols-4">
              {[
                ["Просрочено", "4", "text-red-600", 32],
                ["Сегодня", "7", "text-emerald-600", 58],
                ["Завтра", "3", "text-amber-500", 24],
                ["Выполнено", "38%", "text-slate-500", 38],
              ].map(([label, value, color, progress]) => (
                <Card key={label as string} className="rounded-[2rem] border-white/80 bg-white/85 shadow-sm backdrop-blur">
                  <CardContent className="p-5">
                    <p className="text-sm text-slate-500">{label}</p>
                    <div className="mt-3 flex items-end justify-between">
                      <span className={`text-4xl font-semibold tracking-[-0.06em] ${color}`}>{value}</span>
                      <MoreHorizontal className="h-5 w-5 text-slate-300" />
                    </div>
                    <Progress value={Number(progress)} className="mt-4 h-2" />
                  </CardContent>
                </Card>
              ))}
            </div>

            <Card className="rounded-[2rem] border-white/80 bg-white/85 shadow-sm backdrop-blur">
              <CardHeader className="gap-4 md:flex-row md:items-center md:justify-between">
                <div>
                  <CardTitle className="font-sans text-2xl tracking-[-0.03em]">Все задачи</CardTitle>
                  <p className="text-sm text-slate-500">Поиск, группировка по срокам и быстрое открытие карточки.</p>
                </div>
                <div className="relative w-full md:w-80">
                  <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                  <Input className="h-12 rounded-2xl border-slate-100 bg-slate-50 pl-11" placeholder="Поиск по названию" value={search} onChange={(event) => setSearch(event.target.value)} />
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                {sections.map((section) => {
                  const items = filteredTasks.filter((task) => task.tone === section.key);
                  return (
                    <div key={section.key}>
                      <div className={`mb-3 inline-flex rounded-full border px-3 py-1 text-sm font-medium ${section.color}`}>{section.label}</div>
                      <div className="grid gap-3">
                        {items.map((task) => (
                          <button key={task.title} onClick={() => setTaskModalOpen(true)} className={`rounded-3xl border border-slate-100 border-l-4 bg-white p-4 text-left shadow-sm transition hover:-translate-y-0.5 hover:shadow-md ${toneClass[task.tone]}`}>
                            <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                              <div>
                                <h3 className="font-medium tracking-[-0.02em]">{task.title}</h3>
                                <p className="mt-1 text-sm text-slate-500">{task.folder} · {task.due}</p>
                              </div>
                              <div className="flex flex-wrap items-center gap-2">
                                {task.files > 0 && <Badge variant="secondary" className="rounded-full"><Paperclip className="mr-1 h-3 w-3" />{task.files}</Badge>}
                                <Badge className="rounded-full bg-slate-100 text-slate-600 hover:bg-slate-100">{task.status}</Badge>
                              </div>
                            </div>
                          </button>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </CardContent>
            </Card>

            <Card className="rounded-[2rem] border-white/80 bg-white/85 shadow-sm backdrop-blur">
              <CardHeader>
                <CardTitle className="font-sans text-2xl tracking-[-0.03em]">Папка: Запуск продукта</CardTitle>
                <p className="text-sm text-slate-500">Один набор задач — пять разных углов просмотра.</p>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="list" className="w-full">
                  <TabsList className="grid h-auto grid-cols-2 rounded-3xl bg-slate-100 p-1 md:grid-cols-5">
                    <TabsTrigger value="list" className="rounded-2xl"><ListChecks className="mr-2 h-4 w-4" />Список</TabsTrigger>
                    <TabsTrigger value="kanban" className="rounded-2xl"><SquareKanban className="mr-2 h-4 w-4" />Канбан</TabsTrigger>
                    <TabsTrigger value="tree" className="rounded-2xl"><TreePine className="mr-2 h-4 w-4" />Дерево</TabsTrigger>
                    <TabsTrigger value="gantt" className="rounded-2xl"><GanttChartSquare className="mr-2 h-4 w-4" />Гант</TabsTrigger>
                    <TabsTrigger value="matrix" className="rounded-2xl"><Grid2X2 className="mr-2 h-4 w-4" />Матрица</TabsTrigger>
                  </TabsList>

                  <TabsContent value="list" className="mt-5 space-y-3">
                    <Input className="h-12 rounded-2xl bg-slate-50" placeholder="Быстро добавить задачу и нажать Enter" />
                    {tasks.slice(0, 3).map((task) => <TaskMini key={task.title} task={task} />)}
                  </TabsContent>

                  <TabsContent value="kanban" className="mt-5 grid gap-4 overflow-x-auto md:grid-cols-4">
                    {columns.map((column) => (
                      <div key={column} className="min-h-72 rounded-3xl bg-slate-50 p-3">
                        <div className="mb-3 flex items-center justify-between px-1"><strong>{column}</strong><Badge variant="secondary" className="rounded-full">{tasks.filter((task) => task.status === column).length}</Badge></div>
                        {tasks.filter((task) => task.status === column).map((task) => <TaskMini key={task.title} task={task} />)}
                      </div>
                    ))}
                  </TabsContent>

                  <TabsContent value="tree" className="mt-5 rounded-3xl bg-slate-50 p-5">
                    <TreeLine title="Запустить аккуратный задачник" level={0} />
                    <TreeLine title="Собрать главный экран" level={1} />
                    <TreeLine title="Подключить базу данных и файлы" level={1} />
                    <TreeLine title="Сделать PWA для телефона" level={2} />
                  </TabsContent>

                  <TabsContent value="gantt" className="mt-5 overflow-hidden rounded-3xl bg-slate-50 p-5">
                    {tasks.slice(0, 3).map((task, index) => (
                      <div key={task.title} className="mb-4 grid grid-cols-[170px_1fr] items-center gap-4 text-sm">
                        <span className="truncate text-slate-600">{task.title}</span>
                        <div className="h-8 rounded-full bg-white p-1"><div className="h-6 rounded-full bg-slate-900" style={{ width: `${35 + index * 20}%`, marginLeft: `${index * 8}%` }} /></div>
                      </div>
                    ))}
                  </TabsContent>

                  <TabsContent value="matrix" className="mt-5 grid gap-4 md:grid-cols-2">
                    {quadrants.map(([title, subtitle, tone], index) => (
                      <div key={title} className={`min-h-40 rounded-3xl border p-5 ${tone}`}>
                        <h3 className="font-semibold">{title}</h3>
                        <p className="mb-4 text-sm text-slate-500">{subtitle}</p>
                        {tasks[index] && <TaskMini task={tasks[index]} />}
                      </div>
                    ))}
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>
        </section>
      </div>

      <Dialog open={taskModalOpen} onOpenChange={(open) => (open ? setTaskModalOpen(true) : closeTaskModal())}>
        <DialogContent className="max-h-[92vh] overflow-y-auto rounded-[2rem] sm:max-w-3xl">
          <DialogHeader>
            <DialogTitle className="font-sans text-2xl tracking-[-0.03em]">Карточка задачи</DialogTitle>
            <DialogDescription>Название, папка, сроки, приоритеты и вложения — всё в одном месте.</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-2 md:grid-cols-2">
            <Input className="h-12 rounded-2xl md:col-span-2" placeholder="Название задачи *" onChange={() => setDirty(true)} />
            <Textarea className="min-h-28 rounded-2xl md:col-span-2" placeholder="Подробное описание" onChange={() => setDirty(true)} />
            <Input className="h-12 rounded-2xl" placeholder="Папка / проект" onChange={() => setDirty(true)} />
            <Input className="h-12 rounded-2xl" placeholder="Статус: Новое / В работе / Готово" onChange={() => setDirty(true)} />
            <Input className="h-12 rounded-2xl" placeholder="Срочность" onChange={() => setDirty(true)} />
            <Input className="h-12 rounded-2xl" placeholder="Важность" onChange={() => setDirty(true)} />
            <Input className="h-12 rounded-2xl" placeholder="Дата и время старта" onChange={() => setDirty(true)} />
            <Input className="h-12 rounded-2xl" placeholder="Дедлайн" onChange={() => setDirty(true)} />
          </div>
          <div className="rounded-3xl border border-dashed border-slate-200 bg-slate-50 p-5">
            <div className="mb-4 flex items-center gap-2"><UploadCloud className="h-5 w-5 text-slate-400" /><strong>Вложения</strong></div>
            <div className="space-y-2">
              {["brief.pdf", "reference.png", "table.xlsx"].map((file) => (
                <div key={file} className="flex items-center justify-between rounded-2xl bg-white p-3 text-sm">
                  <button className="flex items-center gap-2 font-medium"><FileText className="h-4 w-4 text-slate-400" />{file}</button>
                  <div className="flex gap-2"><Button size="sm" variant="ghost" className="rounded-xl"><Download className="h-4 w-4" /></Button><Button size="sm" variant="ghost" className="rounded-xl text-red-500">Удалить</Button></div>
                </div>
              ))}
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" className="rounded-2xl" onClick={closeTaskModal}>Закрыть</Button>
            <Button className="rounded-2xl bg-slate-950" onClick={() => { setDirty(false); setTaskModalOpen(false); }}>Сохранить</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <AlertDialog open={confirmCloseOpen} onOpenChange={setConfirmCloseOpen}>
        <AlertDialogContent className="rounded-[2rem]">
          <AlertDialogHeader>
            <AlertDialogTitle>Сохранить изменения?</AlertDialogTitle>
            <AlertDialogDescription>Вы изменили карточку задачи. Можно сохранить, закрыть без сохранения или вернуться к редактированию.</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="rounded-2xl">Отмена</AlertDialogCancel>
            <Button variant="outline" className="rounded-2xl" onClick={() => { setDirty(false); setConfirmCloseOpen(false); setTaskModalOpen(false); }}>Не сохранять</Button>
            <AlertDialogAction className="rounded-2xl bg-slate-950" onClick={() => { setDirty(false); setTaskModalOpen(false); }}>Сохранить</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </main>
  );
};

const TaskMini = ({ task }: { task: (typeof tasks)[number] }) => (
  <div className={`mb-3 rounded-2xl border border-slate-100 border-l-4 bg-white p-3 shadow-sm ${toneClass[task.tone]}`}>
    <p className="font-medium tracking-[-0.02em]">{task.title}</p>
    <div className="mt-2 flex items-center justify-between text-xs text-slate-500">
      <span>{task.due}</span>
      <span>{task.status}</span>
    </div>
  </div>
);

const TreeLine = ({ title, level }: { title: string; level: number }) => (
  <div className="flex items-center gap-3 py-2" style={{ paddingLeft: `${level * 28}px` }}>
    {level === 0 ? <AlertTriangle className="h-4 w-4 text-red-500" /> : level === 1 ? <CalendarClock className="h-4 w-4 text-emerald-500" /> : <CheckCircle2 className="h-4 w-4 text-slate-400" />}
    <span>{title}</span>
    <Button size="icon" variant="ghost" className="ml-auto h-8 w-8 rounded-xl"><Plus className="h-4 w-4" /></Button>
  </div>
);

export default Index;
