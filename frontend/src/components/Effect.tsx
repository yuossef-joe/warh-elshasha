import { Children, isValidElement, useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";

type SlideDirection = "up" | "down" | "left" | "right";

interface EffectProps {
  children: ReactNode;
  delay?: number;
  inView?: boolean;
  blur?: boolean;
  slide?: SlideDirection | boolean;
  fade?: boolean;
  zoom?: boolean;
  className?: string;
}

export function Effect({ children, delay = 0, inView = true, blur = true, slide = "up", fade = true, zoom = false, className = "" }: EffectProps) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [visible, setVisible] = useState(!inView);

  useEffect(() => {
    if (!inView || !ref.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.18, rootMargin: "0px 0px -8% 0px" },
    );
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [inView]);

  const effectClass = [
    "motion-effect",
    visible ? "is-visible" : "",
    fade ? "motion-fade" : "",
    blur ? "motion-blur" : "",
    zoom ? "motion-zoom" : "",
    slide ? `motion-slide-${slide === true ? "up" : slide}` : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div ref={ref} className={effectClass} style={{ "--motion-delay": `${delay}ms` } as CSSProperties}>
      {children}
    </div>
  );
}

export function Effects({ children, delay = 90, ...props }: Omit<EffectProps, "children" | "delay"> & { children: ReactNode; delay?: number }) {
  return (
    <>
      {Children.map(children, (child, index) => {
        if (!isValidElement(child)) return child;
        return (
          <Effect delay={index * delay} {...props}>
            {child}
          </Effect>
        );
      })}
    </>
  );
}
