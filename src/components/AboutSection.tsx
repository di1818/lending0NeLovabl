import instructorImg from "@/assets/instructor.jpg";
import Reveal from "./Reveal";

const AboutSection = () => (
  <section id="about" className="section-padding">
    <div className="container">
      <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
        <Reveal direction="scale">
          <div className="relative">
            <div className="aspect-[3/4] rounded-2xl overflow-hidden">
              <img src={instructorImg} alt="Преподаватель программы" className="w-full h-full object-cover" />
            </div>
            <div className="absolute -bottom-4 -right-4 h-32 w-32 rounded-2xl bg-primary/10 -z-10" />
          </div>
        </Reveal>

        <Reveal delay={150}>
          <span className="text-sm font-medium text-primary mb-4 block">Преподаватель</span>
          <h2 className="text-3xl md:text-5xl font-bold font-display mb-6">Обо мне</h2>
          <p className="text-lg text-muted-foreground leading-relaxed mb-6">
            Эксперт в области HR с многолетним опытом построения эффективных команд и HR-процессов в бизнесе.
          </p>
          <blockquote className="border-l-4 border-primary pl-6 py-2 mb-8">
            <p className="text-lg italic text-foreground/80 leading-relaxed">
              «Я помогаю собственникам превратить HR из статьи расходов в инструмент роста бизнеса.
              Ваш HR-менеджер получит систему, которая работает на результат.»
            </p>
          </blockquote>
          <div className="bg-accent rounded-xl p-6">
            <p className="text-sm text-muted-foreground mb-3 font-medium">Сопровождение после программы:</p>
            <p className="text-foreground">6 месяцев в Telegram-чате с разбором кейсов 1 раз в месяц</p>
          </div>
        </Reveal>
      </div>
    </div>
  </section>
);

export default AboutSection;
