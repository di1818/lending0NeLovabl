import { useState, useEffect } from "react";

const COOKIE_CONSENT_KEY = "cookie_consent";
const YM_ID = 107027471;

function initYandexMetrika() {
  if ((window as any).ym) return;

  (function (m: any, e: any, t: any, r: any, i: any) {
    m[i] = m[i] || function () { (m[i].a = m[i].a || []).push(arguments); };
    m[i].l = 1 * (new Date() as any);
    for (let j = 0; j < e.scripts.length; j++) {
      if (e.scripts[j].src === r) return;
    }
    const k = e.createElement(t);
    const a = e.getElementsByTagName(t)[0];
    k.async = 1;
    k.src = r;
    a.parentNode.insertBefore(k, a);
  })(window, document, "script", `https://mc.yandex.ru/metrika/tag.js?id=${YM_ID}`, "ym");

  (window as any).ym(YM_ID, "init", {
    ssr: true,
    webvisor: true,
    clickmap: true,
    ecommerce: "dataLayer",
    referrer: document.referrer,
    url: location.href,
    accurateTrackBounce: true,
    trackLinks: true,
  });
}

const CookieConsent = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem(COOKIE_CONSENT_KEY);
    if (consent === "accepted") {
      initYandexMetrika();
    } else if (!consent) {
      setVisible(true);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem(COOKIE_CONSENT_KEY, "accepted");
    setVisible(false);
    initYandexMetrika();
  };

  const handleDecline = () => {
    localStorage.setItem(COOKIE_CONSENT_KEY, "declined");
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-[9999] p-4 animate-in slide-in-from-bottom duration-500">
      <div className="max-w-3xl mx-auto bg-card border border-border rounded-2xl shadow-2xl p-5 md:p-6 flex flex-col md:flex-row items-start md:items-center gap-4">
        <div className="flex-1 text-sm text-muted-foreground leading-relaxed">
          🍪 Мы используем файлы cookie и сервисы аналитики для улучшения работы сайта.
          Продолжая использование, вы соглашаетесь с{" "}
          <a
            href="https://yandex.ru/legal/confidential/"
            target="_blank"
            rel="noopener noreferrer"
            className="underline text-primary hover:text-primary/80 transition-colors"
          >
            политикой конфиденциальности
          </a>
          .
        </div>
        <div className="flex gap-3 shrink-0">
          <button
            onClick={handleDecline}
            className="px-4 py-2 text-sm rounded-lg border border-border text-muted-foreground hover:bg-muted transition-colors"
          >
            Отклонить
          </button>
          <button
            onClick={handleAccept}
            className="px-5 py-2 text-sm rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors font-medium"
          >
            Принять
          </button>
        </div>
      </div>
    </div>
  );
};

export default CookieConsent;
