import { useEffect, useMemo, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

type ScrollRevealProps = {
  children: React.ReactNode;
  scrollContainerRef?: React.RefObject<HTMLElement | Window | null>;
  enableBlur?: boolean;
  baseOpacity?: number;
  baseRotation?: number;
  blurStrength?: number;
  containerClassName?: string;
  textClassName?: string;
  rotationEnd?: string;
  wordAnimationEnd?: string;
};

export default function ScrollReveal({
  children,
  scrollContainerRef,
  enableBlur = true,
  baseOpacity = 0.1,
  baseRotation = 3,
  blurStrength = 4,
  containerClassName = "",
  textClassName = "",
  rotationEnd = "bottom bottom",
  wordAnimationEnd = "bottom bottom"
}: ScrollRevealProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);

  const splitText = useMemo(() => {
    const text = typeof children === "string" ? children : "";
    return text.split(/(\s+)/).map((word, index) => {
      if (word.match(/^\s+$/)) return word;
      return (
        <span className="word" key={`${word}-${index}`}>
          {word}
        </span>
      );
    });
  }, [children]);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const scroller =
      scrollContainerRef &&
      "current" in scrollContainerRef &&
      scrollContainerRef.current
        ? scrollContainerRef.current
        : window;

    const animations: Array<gsap.core.Tween | gsap.core.Timeline> = [];

    const rotationAnimation = gsap.fromTo(
      el,
      { transformOrigin: "0% 50%", rotate: baseRotation },
      {
        ease: "none",
        rotate: 0,
        scrollTrigger: {
          trigger: el,
          scroller,
          start: "top bottom",
          end: rotationEnd,
          scrub: true
        }
      }
    );
    animations.push(rotationAnimation);

    const wordElements = el.querySelectorAll<HTMLElement>(".word");

    const wordAnimation = gsap.fromTo(
      wordElements,
      { opacity: baseOpacity, willChange: "opacity" },
      {
        ease: "none",
        opacity: 1,
        stagger: 0.04,
        scrollTrigger: {
          trigger: el,
          scroller,
          start: "top bottom-=20%",
          end: wordAnimationEnd,
          scrub: true
        }
      }
    );
    animations.push(wordAnimation);

    if (enableBlur) {
      const blurAnimation = gsap.fromTo(
        wordElements,
        { filter: `blur(${blurStrength}px)` },
        {
          ease: "none",
          filter: "blur(0px)",
          stagger: 0.04,
          scrollTrigger: {
            trigger: el,
            scroller,
            start: "top bottom-=20%",
            end: wordAnimationEnd,
            scrub: true
          }
        }
      );
      animations.push(blurAnimation);
    }

    return () => {
      animations.forEach((animation) => {
        if (animation.scrollTrigger) {
          animation.scrollTrigger.kill();
        }
        animation.kill();
      });
    };
  }, [
    scrollContainerRef,
    enableBlur,
    baseRotation,
    baseOpacity,
    rotationEnd,
    wordAnimationEnd,
    blurStrength
  ]);

  return (
    <div
      ref={containerRef}
      className={`scroll-reveal ${containerClassName}`.trim()}
    >
      <p className={`scroll-reveal-text ${textClassName}`.trim()}>
        {splitText}
      </p>
    </div>
  );
}
