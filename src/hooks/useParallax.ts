import { useEffect, useRef, useState, useCallback } from "react";

export function useParallax(speed: number = 0.1, disabled?: boolean) {
  const ref = useRef<HTMLDivElement>(null);
  const [style, setStyle] = useState<React.CSSProperties>({});
  const rafId = useRef<number>(0);
  const isMobile = useRef(false);

  const update = useCallback(() => {
    if (isMobile.current || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const center = rect.top + rect.height / 2;
    const viewH = window.innerHeight;
    const offset = (center - viewH / 2) * speed;
    const clamped = Math.max(-80, Math.min(80, offset));
    setStyle({ transform: `translateY(${clamped}px)`, willChange: "transform" });
  }, [speed]);

  useEffect(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    isMobile.current = window.innerWidth < 768;
    if (disabled || prefersReduced || isMobile.current) return;

    const onScroll = () => {
      cancelAnimationFrame(rafId.current);
      rafId.current = requestAnimationFrame(update);
    };

    const onResize = () => { isMobile.current = window.innerWidth < 768; };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize, { passive: true });
    onScroll();

    return () => {
      cancelAnimationFrame(rafId.current);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
    };
  }, [disabled, update]);

  return { ref, style };
}
