import FlickeringGrid from "site/islands/FlickeringGrid.tsx";

export interface Props {
  /**
   * @title Enable Background Animation
   * @description Enable the flickering grid background
   * @default true
   */
  enableBackground?: boolean;

  /**
   * @title Background Color
   * @description Color of the grid squares
   * @default rgb(100, 100, 100)
   */
  backgroundColor?: string;

  /**
   * @title Background Opacity
   * @description Maximum opacity of the background grid (0-1)
   * @default 0.1
   */
  backgroundOpacity?: number;
}

export default function Background({
  enableBackground = true,
  backgroundColor = "rgb(100, 100, 100)",
  backgroundOpacity = 0.1,
}: Props) {
  // Generate a unique ID to identify this section
  const backgroundId = "background-" +
    Math.random().toString(36).substring(2, 9);

  return (
    <>
      <style
        dangerouslySetInnerHTML={{
          __html: `
        /* Background container styles */
        #${backgroundId} {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          width: 100vw;
          height: 100vh;
          pointer-events: none;
          z-index: -999;
          overflow: hidden;
        }
      `,
        }}
      />

      {/* Script to ensure this section stays behind everything */}
      <script
        dangerouslySetInnerHTML={{
          __html: `
        document.addEventListener("DOMContentLoaded", function() {
          // Find all deco sections
          const sections = document.querySelectorAll(".deco-page-section");
          
          // Set z-index for all sections except ours
          sections.forEach(section => {
            if (!section.querySelector("#${backgroundId}")) {
              section.style.position = "relative";
              section.style.zIndex = "10";
            } else {
              section.style.position = "fixed";
              section.style.inset = "0";
              section.style.zIndex = "-999";
              section.style.pointerEvents = "none";
            }
          });
        });
      `,
        }}
      />

      <div
        id={backgroundId}
      >
        {enableBackground && (
          <FlickeringGrid
            color={backgroundColor}
            maxOpacity={backgroundOpacity}
            squareSize={4}
            gridGap={6}
            flickerChance={0.3}
            className="w-full h-full"
          />
        )}
      </div>
    </>
  );
}
