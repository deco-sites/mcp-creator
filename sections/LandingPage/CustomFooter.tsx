import { useId } from "preact/hooks";
import FooterAnimation from "site/islands/FooterAnimation.tsx";

export interface Props {
  /**
   * @title Footer Text
   * @description Main text displayed in the footer (without the company name)
   * @default made with ❤️ by
   */
  footerText?: string;

  /**
   * @title Company Name
   * @description Company name displayed after the footer text
   * @default carcara.tech
   */
  companyName?: string;

  /**
   * @title Company URL
   * @description URL where the company name will redirect
   * @default https://carcara.tech
   */
  companyUrl?: string;

  /**
   * @title Link Text
   * @description Text for the footer link
   * @default Popular MCPs
   */
  linkText?: string;

  /**
   * @title Link URL
   * @description URL where the link will redirect
   * @default #
   */
  linkUrl?: string;

  /**
   * @title Feature Button Text
   * @description Text for the suggest feature button
   * @default Suggest a feature
   */
  featureButtonText?: string;

  /**
   * @title Feature Button URL
   * @description URL where the feature button will redirect
   * @default #
   */
  featureButtonUrl?: string;

  /**
   * @title Enable Animations
   * @description Enable GSAP animations
   * @default true
   */
  enableAnimations?: boolean;
}

export default function CustomFooter({
  footerText = "made with ❤️ by",
  companyName = "carcara.tech",
  companyUrl = "https://carcara.tech",
  linkText = "Popular MCPs",
  linkUrl = "https://mcp.deco.site/",
  featureButtonText = "Suggest a feature",
  featureButtonUrl =
    "https://calendar.google.com/calendar/u/0/appointments/schedules/AcZssZ2CaepfbH88P8rgiRP8fEEBXy2eu6e5yCvJfq9CznemLqJ0dEwXgtR_JSEMb1f9yfVYlHcpTZwM",
  enableAnimations = true,
}: Props) {
  const footerId = useId();
  const sectionId = `footer-${footerId}`;

  return (
    <>
      {/* Include GSAP script */}
      {enableAnimations && (
        <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js">
        </script>
      )}

      {/* Include Google Fonts */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
      <link
        href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap"
        rel="stylesheet"
      />

      {/* Add hover animation styles */}
      <style
        dangerouslySetInnerHTML={{
          __html: `
        .footer-link {
          transition: all 0.2s ease-in-out;
          position: relative;
        }
        
        .footer-link:hover {
          color: #f97316;
        }
        
        .footer-link:after {
          content: '';
          position: absolute;
          width: 100%;
          transform: scaleX(0);
          height: 1px;
          bottom: -2px;
          left: 0;
          background-color: #f97316;
          transform-origin: bottom right;
          transition: transform 0.3s ease-out;
        }
        
        .footer-link:hover:after {
          transform: scaleX(1);
          transform-origin: bottom left;
        }
        
        .company-link {
          transition: all 0.2s ease-in-out;
          font-weight: 500;
        }
        
        .company-link:hover {
          color: #f97316;
        }
      `,
        }}
      />

      <div
        id={sectionId}
        class="w-full max-w-screen-2xl px-5 md:px-20 py-6 h-[70px] border-t border-neutral-300 flex justify-between items-center font-[Inter] tracking-tight mx-auto"
      >
        <div class="w-full flex justify-center items-center gap-6">
          <div class="text-neutral-950 text-base font-medium leading-tight tracking-tight">
            {footerText}{" "}
            <a
              href={companyUrl}
              class="company-link"
              target="_blank"
              rel="noopener noreferrer"
            >
              {companyName}
            </a>
          </div>
          <div class="hidden md:block w-px h-10 border-r border-neutral-400">
          </div>
          <div class="flex justify-center items-center gap-5">
            <a
              href={linkUrl}
              class="footer-link text-center text-zinc-800 text-base font-normal underline leading-none tracking-tight"
            >
              {linkText}
            </a>
            <div class="hidden md:block w-px h-6 border-r border-neutral-300">
            </div>
            <a
              href={featureButtonUrl}
              class="footer-link text-center text-zinc-800 text-base font-normal underline leading-none tracking-tight"
            >
              {featureButtonText}
            </a>
          </div>
        </div>
      </div>

      {/* Animation island */}
      {enableAnimations && <FooterAnimation selector={`#${sectionId}`} />}
    </>
  );
}
