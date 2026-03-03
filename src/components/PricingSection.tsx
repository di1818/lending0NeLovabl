import { Check } from "lucide-react";
import Reveal from "./Reveal";

const plans = [
  {
    name: "Со скидкой 50%",
    price: "60 000",
    desc: "Скидка в обмен на возможность показать результаты обучения по изменению метрик в вашей компании",
    features: ["Полная программа обучения", "Все артефакты и шаблоны", "6 месяцев сопровождения", "Разбор кейсов 1 раз/мес", "Замер метрик 6 и 12 месяцев"],
    highlighted: false,
  },
  {
    name: "Базовый",
    price: "120 000",
    desc: "Полная программа с конфиденциальностью. Ваши кейсы и компания — только ваши.",
    features: ["Полная программа обучения", "Все артефакты и шаблоны", "6 месяцев сопровождения", "Разбор кейсов 1 раз/мес", "Полная конфиденциальность"],
    highlighted: true,
  },
  {
    name: "Обучение + Аудит",
    price: "250 000",
    desc: "Программа + аудит HR-процессов вашей компании + внедрение под контролем эксперта",
    features: ["Всё из базового пакета", "Аудит HR-процессов компании", "Внедрение под контролем", "Индивидуальное сопровождение", "Максимальный результат"],
    highlighted: false,
  },
];

const PricingSection = () => (
  <section id="pricing" className="section-padding bg-secondary/50">
    <div className="container">
      <Reveal className="text-center mb-16">
        <h2 className="text-3xl md:text-5xl font-bold font-display mb-4">Стоимость</h2>
        <p className="text-muted-foreground text-lg">Выберите формат участия. Цены одинаковы для офлайн и онлайн.</p>
      </Reveal>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
        {plans.map((plan, i) => (
          <Reveal key={plan.name} delay={i * 100}>
            <div
              className={`relative rounded-2xl p-8 flex flex-col h-full ${
                plan.highlighted
                  ? "bg-foreground text-background border-2 border-foreground shadow-2xl scale-105"
                  : "bg-card border border-border"
              }`}
            >
              {plan.highlighted && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground text-xs font-semibold px-4 py-1 rounded-full">
                  Популярный
                </span>
              )}
              <h3 className="text-xl font-semibold mb-2">{plan.name}</h3>
              <p className={`text-sm mb-6 ${plan.highlighted ? "opacity-70" : "text-muted-foreground"}`}>
                {plan.desc}
              </p>
              <div className="mb-6">
                <span className="text-4xl font-bold font-display">{plan.price}</span>
                <span className={`text-sm ml-1 ${plan.highlighted ? "opacity-60" : "text-muted-foreground"}`}>₽</span>
              </div>
              <ul className="space-y-3 mb-8 flex-1">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-center gap-3 text-sm">
                    <Check className="h-4 w-4 shrink-0 text-primary" />
                    {f}
                  </li>
                ))}
              </ul>
              <a
                href="#application"
                className={`inline-flex items-center justify-center rounded-lg px-6 py-3 font-semibold transition-all duration-300 ${
                  plan.highlighted
                    ? "bg-primary text-primary-foreground hover:shadow-lg hover:shadow-primary/30"
                    : "bg-secondary text-secondary-foreground hover:bg-accent"
                }`}
              >
                Записаться
              </a>
            </div>
          </Reveal>
        ))}
      </div>
    </div>
  </section>
);

export default PricingSection;
