import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import heroBg from "@/assets/hero-bg.jpg";

const stats = [
  { value: "20", label: "мест офлайн · Казань" },
  { value: "40", label: "мест онлайн · любая точка" },
];

const HeroSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const videoY = useTransform(scrollYProgress, [0, 1], [0, -120]);
  const videoRotate = useTransform(scrollYProgress, [0, 1], [2, -4]);
  const videoScale = useTransform(scrollYProgress, [0, 0.5], [1, 0.95]);

  return (
    <section ref={sectionRef} className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 z-0">
        <img src={heroBg} alt="" className="w-full h-full object-cover opacity-30" />
        <div className="absolute inset-0 bg-gradient-to-br from-background via-background/80 to-transparent" />
      </div>

      <div className="container relative z-10 py-20 md:py-32">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Text */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 rounded-full bg-accent px-4 py-2 mb-8"
            >
              <span className="h-2 w-2 rounded-full bg-primary animate-pulse" />
              <span className="text-sm font-medium text-accent-foreground">
                Казань · Старт 10 марта · Офлайн 20 мест + Онлайн
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight mb-3 font-display"
            >
              <span className="text-gradient">HR Инструментарий</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.15 }}
              className="text-xl md:text-2xl font-semibold text-foreground mb-6"
            >
              Перестаньте терять деньги на неэффективном найме
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="text-lg md:text-xl text-muted-foreground mb-10 max-w-2xl leading-relaxed"
            >
              Ваш HR-менеджер пройдёт обучение до уровня HRBP и уже в процессе
              начнёт внедрять систему подбора, адаптации и управления персоналом
              в вашей компании.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <a
                href="#application"
                className="inline-flex items-center justify-center rounded-lg bg-primary px-8 py-4 text-lg font-semibold text-primary-foreground shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/30 transition-all duration-300 hover:-translate-y-0.5"
              >
                Записаться на консультацию
              </a>
              <a
                href="#program"
                className="inline-flex items-center justify-center rounded-lg border border-border px-8 py-4 text-lg font-medium text-foreground hover:bg-secondary transition-colors duration-300"
              >
                Подробнее о программе
              </a>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.7, delay: 0.5 }}
              className="mt-12 flex items-center gap-8 text-sm text-muted-foreground"
            >
              {stats.map((s, i) => (
                <div key={s.label} className="flex items-center gap-2">
                  {i > 0 && <div className="h-4 w-px bg-border mr-6" />}
                  <span className="font-semibold text-foreground text-2xl">{s.value}</span> {s.label}
                </div>
              ))}
            </motion.div>
          </div>

          {/* Video with parallax */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            style={{ y: videoY, rotate: videoRotate, scale: videoScale }}
            className="hidden lg:block"
          >
            <div className="relative rounded-2xl overflow-hidden shadow-2xl shadow-primary/10 border border-border bg-card">
              <div className="aspect-video relative">
                <video
                  className="w-full h-full object-cover"
                  muted
                  loop
                  playsInline
                  autoPlay
                >
                  {/* Положите видео в public/hero-video.mp4 и раскомментируйте: */}
                  {/* <source src="/hero-video.mp4" type="video/mp4" /> */}
                </video>
                {/* Плейсхолдер пока нет видео */}
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-muted">
                  <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                    <svg className="w-8 h-8 text-primary ml-1" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </div>
                  <p className="text-muted-foreground text-sm font-medium">Видео о программе</p>
                  <p className="text-muted-foreground/60 text-xs mt-1">HR Инструментарий</p>
                </div>
              </div>
              <div className="absolute -top-3 -right-3 w-24 h-24 rounded-full bg-primary/5 -z-10" />
              <div className="absolute -bottom-4 -left-4 w-32 h-32 rounded-full bg-accent -z-10" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
