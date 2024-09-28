import { SeedColorsV1, ThemeSeedV1 } from "@lumphammer/investigator-fvtt-types";

import { averiaLibre, moduleId } from "./constants";

const colors: SeedColorsV1 = {
  accent: "#a8821a",
  accentContrast: "#fff",
  glow: "#ecd597",
  wallpaper: "#f2f1ef",
  backgroundPrimary: "#ffffff99",
  backgroundSecondary: "#f2f1efdd",
  backgroundButton: "#90752c44",
  text: "#333",
  controlBorder: "#666",
  danger: "#b03",
};

const borderColor = "#cfa225";

const wallpaperImage = `url(modules/${moduleId}/assets/toc2eQuickstartTheme/ToC_character_sheet_background.webp)`;

export const toc2eQuickstartThemeSeed: ThemeSeedV1 = {
  schemaVersion: "v1",
  displayName: "Trail of Cthulhu Quickstart",
  global: `
    @import url('https://fonts.googleapis.com/css2?family=Josefin+Sans:ital,wght@0,100..700;1,100..700&display=swap');
    ${averiaLibre.importStatement}
  `,
  largeSheetRootStyle: {
    backgroundImage: wallpaperImage,
  },
  smallSheetRootStyle: {},
  bodyFont: averiaLibre.fontFamily,
  displayFont: "normal normal 1em 'Engebrechtre', serif",
  logo: {
    fontScaleFactor: 20,
    frontTextElementStyle: {
      // background: metalGradient,
      background: `linear-gradient(
        to bottom right,
        #77823d 0%,
        #e2e773 50%,
        #fffde6 100%
        )`,
      backgroundClip: "text",
    },
    rearTextElementStyle: {
      textShadow: `
        1px -2px 0px #0007,
        0px 0px 10px #fff
        `,
    },
    textElementsStyle: {
      transform: " rotateZ(-1deg)",
    },
    backdropStyle: {
      perspective: "500px",
      perspectiveOrigin: "50% 50%",
      // backgroundImage:
      //   "radial-gradient(closest-side, #ac4d4377 0%, #ac4d4300 100%)",
      // mixBlendMode: "overlay",
    },
  },
  panelStylePrimary: {
    backgroundColor: "#fff3",
    borderStyle: "double",
    borderColor,
    borderWidth: "3px",
  },
  panelStyleSecondary: {
    backgroundColor: "#fff3",
    borderStyle: "solid",
    borderColor,
    borderWidth: "1px",
  },
  tabContentStyle: {
    backgroundColor: colors.backgroundPrimary,
    // backdropFilter: "blur(20px)",
    borderStyle: "none double double double",
    borderColor,
    borderWidth: "3px",
    color: colors.text,
  },
  tabStyle: {
    padding: "0.3em 0",
    color: colors.accent,
    flex: "1",
    textAlign: "center",
    fontSize: "1.5em",
    borderStyle: "double",
    borderColor,
    borderWidth: "3px",
    background: `
      linear-gradient(
        0deg,
        ${colors.backgroundPrimary} 0%,
        ${colors.backgroundPrimary} 100%
      )
    `,
  },
  tabActiveStyle: {
    borderStyle: "double double none double",
  },
  tabSpacerStyle: {
    borderStyle: "none none double none",
    width: "0.5rem",
    borderColor,
    borderWidth: "3px",
  },
  // panelStyleSecondary: {
  //   backgroundColor: colors.backgroundSecondary,
  //   borderStyle: "solid",
  //   borderColor: outsetBorderColors,
  //   borderWidth: "1px",
  //   color: colors.text,
  // },
  colors,
};
