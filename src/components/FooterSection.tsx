const docs = [
  { label: "Договор оферта", href: "/docs/договор_оферта.docx" },
  { label: "Политика обработки данных", href: "/docs/политика_обработки_персональных_данных.docx" },
  { label: "Согласие на обработку данных", href: "/docs/согласие_на_обработку_персональных_данных.docx" },
  { label: "Согласие на рекламу", href: "/docs/согласие_на_получение_рекламных_материалов.docx" },
];

const FooterSection = () => (
  <footer className="border-t border-border py-10 px-4">
    <div className="container flex flex-col items-center gap-6 text-sm text-muted-foreground">
      <div className="flex flex-col md:flex-row items-center justify-between w-full gap-4">
        <p>© 2025 HR Инструментарий. Казань.</p>
        <div className="flex flex-col md:flex-row items-center gap-4">
          <nav className="flex gap-6">
            <a href="#program" className="hover:text-foreground transition-colors">Программа</a>
            <a href="#pricing" className="hover:text-foreground transition-colors">Стоимость</a>
            <a href="#application" className="hover:text-foreground transition-colors">Записаться</a>
          </nav>
          <span className="hidden md:inline text-border">|</span>
          <a href="tel:+79871837315" className="hover:text-foreground transition-colors">+7 (987) 183-73-15</a>
        </div>
      </div>
      <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-xs">
        {docs.map((doc) => (
          <a
            key={doc.href}
            href={doc.href}
            target="_blank"
            rel="noopener noreferrer"
            download
            className="underline underline-offset-2 hover:text-foreground transition-colors"
          >
            {doc.label}
          </a>
        ))}
      </div>
    </div>
  </footer>
);

export default FooterSection;
