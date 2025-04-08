import { useEffect } from "preact/hooks";

declare global {
  interface Window {
    gsap: any;
  }
}

interface Props {
  selector: string;
}

export default function FooterAnimation({ selector }: Props) {
  useEffect(() => {
    // Check if gsap is available
    if (typeof window.gsap !== "undefined") {
      const gsap = window.gsap;

      // Main animation sequence for consistency across components
      const tl = gsap.timeline({
        defaults: { ease: "power2.out", duration: 0.6 },
      });

      // Animate the footer with fade up
      tl.from(selector, {
        y: 20,
        opacity: 0,
      });

      // Animate the footer content with staggered fade
      tl.from(`${selector} > div > div`, {
        opacity: 0,
        y: 10,
        stagger: 0.1,
      }, "-=0.4"); // Slight overlap for smoother flow
    }
  }, [selector]);

  return null; // This island doesn't render anything, it just adds behavior
}