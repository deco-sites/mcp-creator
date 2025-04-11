import { ComponentChildren } from "preact";
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
   * @default 0.15
   */
  backgroundOpacity?: number;

  /**
   * @title Children Elements
   * @description Content to render inside the background
   */
  children?: ComponentChildren;
}

export default function BackgroundWrapper({
  enableBackground = true,
  backgroundColor = "rgb(100, 100, 100)",
  backgroundOpacity = 0.15,
  children,
}: Props) {
  return (
    <div class="relative bg-neutral-50 flex flex-col items-center overflow-hidden">
      {/* Background animation layer */}
      {enableBackground && (
        <div class="absolute inset-0 pointer-events-none overflow-hidden">
          <FlickeringGrid
            color={backgroundColor}
            maxOpacity={backgroundOpacity}
            squareSize={4}
            gridGap={6}
            flickerChance={0.3}
          />
        </div>
      )}

      {/* Content layer */}
      <div class="relative z-10 w-full flex flex-col items-center">
        {children}
      </div>
    </div>
  );
}
