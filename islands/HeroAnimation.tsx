import { useEffect } from "preact/hooks";

declare global {
  interface Window {
    // deno-lint-ignore no-explicit-any
    gsap: any;
  }
}

interface Props {
  selector: string;
}

export default function HeroAnimation({ selector }: Props) {
  useEffect(() => {
    // Check if gsap is available (we'll add the script in a moment)
    if (typeof globalThis.window.gsap !== "undefined") {
      const gsap = globalThis.window.gsap;

      // Main animation sequence for consistency across components
      const tl = gsap.timeline({
        defaults: { ease: "power2.out", duration: 0.6 },
      });

      // Animate the title parts with staggered fade up
      tl.from(`${selector} .title-animation span`, {
        y: 30,
        opacity: 0,
        stagger: 0.15,
      });

      // Animate the input card with fade up
      tl.from(`${selector} .input-card`, {
        y: 30,
        opacity: 0,
      }, "-=0.3"); // Slight overlap for smoother flow
    }
  }, [selector]);

  return null; // This island doesn't render anything, it just adds behavior
}
