import { FileText, GitBranch, MessageCircle, BarChart3, ClipboardCheck, Award } from "lucide-react";
import Reveal from "./Reveal";

const metrics = ["Текучесть", "eNPS", "Скорость закрытия", "Качество найма", "Влияние на прибыль"];

const artifacts = [
  { icon: FileText, text: "Шаблоны ключевых HR-документов" },
  { icon: GitBranch, text: "Воронка подбора" },
  { icon: MessageCircle, text: "Структура интервью" },
  { icon: ClipboardCheck, text: "План адаптации" },
  { icon: BarChart3, text: "Список HR-метрик и шаблоны отчётов" },
  { icon: Award, text: "Итоговый проект внедрения" },
];

const ResultsSection = () => (
  <section className="section-padding bg-foreground text-background">
    <div className="container">
      <div className="grid lg:grid-cols-2 gap-16 items-center">
        <Reveal direction="left">
          <h2 className="text-3xl md:text-5xl font-bold font-display mb-6">Что получит ваш бизнес</h2>
          <p className="text-lg opacity-70 mb-8 leading-relaxed">
            За 8 недель ваш HR-менеджер выйдет на уровень HRBP и внедрит систему,
            которая решает проблемы с наймом, текучкой и эффективностью команды.
            Вы получите управляемый HR с измеримыми результатами.
          </p>
          <div className="flex flex-wrap gap-4">
            {metrics.map((m) => (
              <span key={m} className="px-4 py-2 rounded-full border border-background/20 text-sm opacity-80">
                {m}
              </span>
            ))}
          </div>
        </Reveal>

        <Reveal direction="right" delay={150}>
          <h3 className="text-xl font-semibold mb-6 opacity-80">Артефакты программы</h3>
          <div className="space-y-4">
            {artifacts.map((item) => (
              <div
                key={item.text}
                className="flex items-center gap-4 p-4 rounded-xl bg-background/5 border border-background/10"
              >
                <div className="h-10 w-10 rounded-lg bg-primary/20 flex items-center justify-center shrink-0">
                  <item.icon className="h-5 w-5 text-primary" />
                </div>
                <span className="font-medium">{item.text}</span>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </div>
  </section>
);

export default ResultsSection;
