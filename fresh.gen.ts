// DO NOT EDIT. This file is generated by Fresh.
// This file SHOULD be checked into source version control.
// This file is automatically updated during development when running `dev.ts`.

import * as $_app from "./routes/_app.tsx";
import * as $FlickeringGrid from "./islands/FlickeringGrid.tsx";
import * as $FooterAnimation from "./islands/FooterAnimation.tsx";
import * as $GeneratePr from "./islands/GeneratePr.tsx";
import * as $Hero from "./islands/Hero.tsx";
import * as $HeroAnimation from "./islands/HeroAnimation.tsx";
import * as $NavBarAnimation from "./islands/NavBarAnimation.tsx";
import type { Manifest } from "$fresh/server.ts";

const manifest = {
  routes: {
    "./routes/_app.tsx": $_app,
  },
  islands: {
    "./islands/FlickeringGrid.tsx": $FlickeringGrid,
    "./islands/FooterAnimation.tsx": $FooterAnimation,
    "./islands/GeneratePr.tsx": $GeneratePr,
    "./islands/Hero.tsx": $Hero,
    "./islands/HeroAnimation.tsx": $HeroAnimation,
    "./islands/NavBarAnimation.tsx": $NavBarAnimation,
  },
  baseUrl: import.meta.url,
} satisfies Manifest;

export default manifest;
