import { useEffect, useRef } from "react";

interface RevealProps {
  children: React.ReactNode;
  className?: string;
  direction?: "up" | "left" | "right" | "scale";
  delay?: number;
}

const Reveal = ({ children, className = "", direction = "up", delay = 0 }: RevealProps) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => el.classList.add("revealed"), delay);
          observer.unobserve(el);
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [delay]);

  const dirClass = {
    up: "reveal-up",
    left: "reveal-left",
    right: "reveal-right",
    scale: "reveal-scale",
  }[direction];

  return (
    <div ref={ref} className={`${dirClass} ${className}`}>
      {children}
    </div>
  );
};

export default Reveal;
