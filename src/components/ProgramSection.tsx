import { Briefcase, Search, LineChart, Bot } from "lucide-react";
import Reveal from "./Reveal";

const modules = [
  { num: "01", icon: Briefcase, title: "Роль HR в бизнесе", desc: "Как HR влияет на прибыль, как выстроить управляемую HR-функцию и начать решать кадровые проблемы системно.", weeks: "Недели 1–2" },
  { num: "02", icon: Search, title: "Подбор как система", desc: "Профиль должности, воронка найма, структурированное интервью — чтобы нанимать тех, кто даёт результат.", weeks: "Недели 3–4" },
  { num: "03", icon: LineChart, title: "Адаптация + метрики", desc: "Система адаптации, снижающая текучку + HR-метрики для контроля эффективности команды.", weeks: "Недели 5–6" },
  { num: "04", icon: Bot, title: "AI-инструменты в HR", desc: "Прикладные AI-инструменты для подбора, аналитики и автоматизации рутины — только то, что работает.", weeks: "Недели 7–8" },
];

const ProgramSection = () => (
  <section id="program" className="section-padding">
    <div className="container">
      <Reveal className="text-center mb-16">
        <h2 className="text-3xl md:text-5xl font-bold font-display mb-4">
          Программа: <span className="text-gradient">4 модуля</span>
        </h2>
        <p className="text-muted-foreground text-lg max-w-xl mx-auto">
          8 недель, 1 раз в неделю по 2 часа. Офлайн в Казани (20 мест) или онлайн. Практика и внедрение в вашей компании.
        </p>
      </Reveal>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
        {modules.map((mod, i) => (
          <Reveal key={mod.num} delay={i * 80}>
            <div className="group relative rounded-2xl border border-border bg-card p-8 hover:border-primary/30 transition-all duration-300 h-full">
              <div className="flex items-start justify-between mb-6">
                <span className="text-5xl font-bold font-display text-muted/80">{mod.num}</span>
                <span className="text-xs font-medium text-muted-foreground bg-secondary px-3 py-1 rounded-full">
                  {mod.weeks}
                </span>
              </div>
              <div className="flex items-center gap-3 mb-3">
                <div className="h-10 w-10 rounded-lg bg-accent flex items-center justify-center">
                  <mod.icon className="h-5 w-5 text-accent-foreground" />
                </div>
                <h3 className="text-xl font-semibold">{mod.title}</h3>
              </div>
              <p className="text-muted-foreground leading-relaxed">{mod.desc}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </div>
  </section>
);

export default ProgramSection;
