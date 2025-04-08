import BackgroundWrapper from "./BackgroundWrapper.tsx";
import Navbar from "./NavBar.tsx";
import Hero from "./Hero.tsx";
import CustomFooter from "./CustomFooter.tsx";
import { useDevice } from "@deco/deco/hooks";

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
   * @title Navbar Properties
   */
  navbarProps?: {
    buttonText?: string;
    enableAnimations?: boolean;
  };

  /**
   * @title Hero Properties
   */
  heroProps?: {
    titleFirstPart?: string;
    titleHighlight?: string;
    titleLastPart?: string;
    inputPlaceholder?: string;
    buttonText?: string;
    descriptionText?: string;
    repoLink?: string;
    enableAnimations?: boolean;
  };

  /**
   * @title Footer Properties
   */
  footerProps?: {
    footerText?: string;
    linkText?: string;
    linkUrl?: string;
    enableAnimations?: boolean;
  };
}

export default function LandingPage({
  enableBackground = true,
  backgroundColor = "rgb(100, 100, 100)",
  backgroundOpacity = 0.15,
  navbarProps = {},
  heroProps = {},
  footerProps = {},
}: Props) {
  return (
    <BackgroundWrapper
      enableBackground={enableBackground}
      backgroundColor={backgroundColor}
      backgroundOpacity={backgroundOpacity}
    >
      <Navbar {...navbarProps} />
      <Hero {...heroProps} isDesktop={useDevice() === "desktop"} />
      <CustomFooter {...footerProps} />
    </BackgroundWrapper>
  );
}