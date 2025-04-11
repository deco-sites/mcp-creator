import Navbar from "./NavBar.tsx";
import Hero from "./Hero.tsx";
import CustomFooter, { Props as FooterProps } from "./CustomFooter.tsx";
import { useDevice } from "@deco/deco/hooks";

export interface Props {
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
  footerProps?: FooterProps;
}

export default function LandingPage({
  navbarProps = {},
  heroProps = {},
  footerProps = {},
}: Props) {
  return (
    <div class="flex flex-col items-center justify-between min-h-[100vh]">
      <Navbar {...navbarProps} />
      <Hero {...heroProps} isDesktop={useDevice() === "desktop"} />
      <CustomFooter {...footerProps} />
    </div>
  );
}
