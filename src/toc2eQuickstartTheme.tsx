import { SeedColorsV1, ThemeSeedV1 } from "@lumphammer/investigator-fvtt-types";

import { averiaLibre, moduleId } from "./constants";

// const assetPath = getRoute("/modules/trail-of-cthulhu-2e/assets");

const lightBackground = "#fafafa";
const darkBackground = "#e1e1e1";

// const glint = "#f3eee1";
// const offGlint = "#efe8d6";
// const outsetBorderColors = `${glint} ${offGlint} ${offGlint} ${glint}`;

const colors: SeedColorsV1 = {
  accent: "#a8821a",
  accentContrast: "#404",
  glow: "#ecd597",
  wallpaper: "#f2f1ef",
  backgroundPrimary: `#ffffff99`,
  backgroundSecondary: `#f2f1efdd`,
  backgroundButton: "#90752c44",
  text: "#333",
  controlBorder: "#666",
};

const starfieldImage = `url(modules/${moduleId}/assets/toc2eQuickstartTheme/ToC_character_sheet_background.webp)`;

export const toc2eQuickstartThemeSeed: ThemeSeedV1 = {
  schemaVersion: "v1",
  displayName: "Trail of Cthulhu Quickstart",
  global: `
    @import url('https://fonts.googleapis.com/css2?family=Josefin+Sans:ital,wght@0,100..700;1,100..700&display=swap');
    ${averiaLibre.importStatement}
  `,
  largeSheetRootStyle: {
    backgroundImage: starfieldImage,
  },
  smallSheetRootStyle: {
    // background: `linear-gradient(to bottom, ${darkBackground}dd 0%, ${darkBackground}55 100%), ${starfieldImage}`,
    // background: starfieldImage,
    // ":before": {
    //   content: "''",
    //   position: "absolute",
    //   top: "0",
    //   left: "0",
    //   width: "100%",
    //   height: "100%",
    //   backgroundColor: "#0003",
    //   // zIndex: "-1",
    //   backdropFilter: "blur(20px)",
    // },
    // color: lightBackground,
  },
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
  // panelStylePrimary: {
  //   backgroundColor: "#0000",
  //   backdropFilter: "blur(15px)",
  //   borderStyle: "solid",
  //   borderColor: "#e9e9",
  //   borderWidth: "1px",
  //   color: colors.text,
  // },
  // panelStyleSecondary: {
  //   backgroundColor: "#0000",
  //   backdropFilter: "blur(5px)",
  //   borderStyle: "solid",
  //   borderColor: "#e9e9",
  //   borderWidth: "1px",
  //   color: colors.text,
  // },
  // tabContentStyle: {
  //   backgroundColor: "#1111",
  //   backdropFilter: "blur(20px)",
  //   borderStyle: "none solid solid solid",
  //   borderColor: "#e9e9",
  //   borderWidth: "1px",
  //   color: colors.text,
  // },
  // tabStyle: {
  //   padding: "0.5em",
  //   flex: "1",
  //   // justifySelf: "center",
  //   // alignSelf: "center",
  //   textAlign: "center",
  //   fontSize: "1.1em",
  //   background: `linear-gradient(0deg, ${darkBackground}77 0%, ${darkBackground}77 0em, ${colors.backgroundSecondary} 0.4em, ${colors.backgroundSecondary} 100%)`,
  // },
  // tabActiveStyle: {
  //   background: `linear-gradient(0deg, ${colors.backgroundPrimary} 0%,  ${lightBackground} 100%)`,
  // },
  // panelStyleSecondary: {
  //   backgroundColor: colors.backgroundSecondary,
  //   borderStyle: "solid",
  //   borderColor: outsetBorderColors,
  //   borderWidth: "1px",
  //   color: colors.text,
  // },
  colors,
};
