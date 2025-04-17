import Navbar, { Props as NavBarProps } from "./NavBar.tsx";
import Hero, { Props as HeroProps } from "./Hero.tsx";
import CustomFooter, { Props as FooterProps } from "./CustomFooter.tsx";
import { useDevice } from "@deco/deco/hooks";

export interface Props {
  /**
   * @title Navbar Properties
   */
  navbarProps?: NavBarProps;

  /**
   * @title Hero Properties
   */
  heroProps?: HeroProps;

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
