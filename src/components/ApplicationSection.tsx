import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

const steps = [
  { step: "1", text: "Заявка" },
  { step: "2", text: "Консультация" },
  { step: "3", text: "Старт обучения" },
];

const ApplicationSection = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [contact, setContact] = useState("");
  const [consentData, setConsentData] = useState(false);
  const [consentAds, setConsentAds] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !contact.trim()) {
      toast.error("Пожалуйста, заполните все поля");
      return;
    }
    if (!consentData) {
      toast.error("Необходимо согласие на обработку персональных данных");
      return;
    }

    setLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke("send-telegram", {
        body: { name: name.trim(), email: email.trim(), contact: contact.trim(), consentAds },
      });

      if (error) throw error;

      toast.success("Заявка отправлена! Мы скоро свяжемся с вами");
      setName("");
      setEmail("");
      setContact("");
      setConsentData(false);
      setConsentAds(false);
    } catch (err) {
      console.error(err);
      toast.error("Ошибка при отправке. Попробуйте позже или напишите в Telegram");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="application" className="section-padding">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-2xl mx-auto text-center"
        >
          <h2 className="text-3xl md:text-5xl font-bold font-display mb-4">
            Записаться на <span className="text-gradient">консультацию</span>
          </h2>
          <p className="text-muted-foreground text-lg mb-10">
            Оставьте заявку, напишите в Telegram или позвоните — мы ответим на все вопросы
          </p>

          <form onSubmit={handleSubmit} className="bg-card border border-border rounded-2xl p-8 md:p-10 text-left">
            <div className="space-y-5">
              <div>
                <label className="text-sm font-medium mb-2 block">Имя</label>
                <input
                  type="text"
                  placeholder="Как вас зовут?"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full rounded-lg border border-input bg-background px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-ring transition-shadow"
                />
              </div>
              <div>
                <label className="text-sm font-medium mb-2 block">Email</label>
                <input
                  type="email"
                  placeholder="example@mail.ru"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full rounded-lg border border-input bg-background px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-ring transition-shadow"
                />
              </div>
              <div>
                <label className="text-sm font-medium mb-2 block">Телефон или Telegram</label>
                <input
                  type="text"
                  placeholder="+7 (___) ___-__-__ или @username"
                  value={contact}
                  onChange={(e) => setContact(e.target.value)}
                  className="w-full rounded-lg border border-input bg-background px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-ring transition-shadow"
                />
              </div>

              <div className="space-y-3 pt-2">
                <label className="flex items-start gap-3 cursor-pointer group">
                  <input
                    type="checkbox"
                    checked={consentData}
                    onChange={(e) => setConsentData(e.target.checked)}
                    className="mt-1 h-4 w-4 shrink-0 rounded border border-primary accent-primary"
                  />
                  <span className="text-xs text-muted-foreground leading-relaxed">
                    Я даю{" "}
                    <a href="/docs/согласие_на_обработку_персональных_данных.docx" target="_blank" className="underline text-primary hover:text-primary/80 transition-colors">
                      согласие на обработку персональных данных
                    </a>{" "}
                    в соответствии с{" "}
                    <a href="/docs/политика_обработки_персональных_данных.docx" target="_blank" className="underline text-primary hover:text-primary/80 transition-colors">
                      политикой обработки персональных данных
                    </a>{" "}
                    <span className="text-destructive">*</span>
                  </span>
                </label>

                <label className="flex items-start gap-3 cursor-pointer group">
                  <input
                    type="checkbox"
                    checked={consentAds}
                    onChange={(e) => setConsentAds(e.target.checked)}
                    className="mt-1 h-4 w-4 shrink-0 rounded border border-primary accent-primary"
                  />
                  <span className="text-xs text-muted-foreground leading-relaxed">
                    Я даю{" "}
                    <a href="/docs/согласие_на_получение_рекламных_материалов.docx" target="_blank" className="underline text-primary hover:text-primary/80 transition-colors">
                      согласие на получение рекламных материалов
                    </a>
                  </span>
                </label>
              </div>

              <button
                type="submit"
                disabled={loading || !consentData}
                className="w-full inline-flex items-center justify-center gap-2 rounded-lg bg-primary px-8 py-4 text-lg font-semibold text-primary-foreground shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/30 transition-all duration-300 hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <>
                    <Loader2 className="h-5 w-5 animate-spin" />
                    Отправка...
                  </>
                ) : (
                  <>
                    Отправить заявку
                    <ArrowRight className="h-5 w-5" />
                  </>
                )}
              </button>
            </div>
          </form>

          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-6 text-sm text-muted-foreground">
            <a href="tel:+79871837315" className="flex items-center gap-2 hover:text-foreground transition-colors">
              <span>📞</span> +7 (987) 183-73-15 — Екатерина
            </a>
            <span className="hidden sm:inline text-border">|</span>
            <a href="https://t.me/test66_tts_bot" className="flex items-center gap-2 hover:text-foreground transition-colors">
              <span>💬</span> Написать в Telegram
            </a>
          </div>

          <div className="mt-12 grid grid-cols-3 gap-4 text-center">
            {steps.map((item) => (
              <div key={item.step} className="flex flex-col items-center gap-2">
                <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-sm">
                  {item.step}
                </div>
                <span className="text-sm text-muted-foreground">{item.text}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ApplicationSection;
