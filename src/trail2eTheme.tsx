import { SeedColorsV1, ThemeSeedV1 } from "@lumphammer/investigator-fvtt-types";

import { averiaLibre, moduleId } from "./constants";

// const assetPath = getRoute("/modules/trail-of-cthulhu-2e/assets");

const lightBackground = "#fafafa";
const darkBackground = "#e1e1e1";

// const glint = "#f3eee1";
// const offGlint = "#efe8d6";
// const outsetBorderColors = `${glint} ${offGlint} ${offGlint} ${glint}`;

const colors: SeedColorsV1 = {
  accent: "#e9e",
  accentContrast: "#404",
  glow: "#ff6594",
  wallpaper: "#333",
  backgroundPrimary: `${lightBackground}dd`,
  backgroundSecondary: `${darkBackground}dd`,
  backgroundButton: "#404",
  text: "#eef",
  controlBorder: "#574b4b",
};

// const metal1 = "#edb488";
// const metal2 = "#61300c";
// const metal3 = "#f6d8c1";

const metal1 = "#dddddd";
const metal2 = "#666666";
const metal3 = "#ffffff";

const metalGradient = `linear-gradient(
  180deg,
  ${metal1} 0%,
  ${metal1} 10%,
  ${metal2} 45%,
  black 45%,
  ${metal3} 50%,
  ${metal2} 90%)
`;

const starfieldImage = `url(modules/${moduleId}/assets/aperture-vintage-Z6EpCdMcoUU-unsplash.jpg)`;

export const trail2eThemeSeed: ThemeSeedV1 = {
  schemaVersion: "v1",
  displayName: "Trail of Cthulhu (Premium) Theme",
  global: `
    @import url('https://fonts.googleapis.com/css2?family=Josefin+Sans:ital,wght@0,100..700;1,100..700&display=swap');
    ${averiaLibre.importStatement}
  `,
  largeSheetRootStyle: {
    backgroundImage: starfieldImage,
  },
  smallSheetRootStyle: {
    // background: `linear-gradient(to bottom, ${darkBackground}dd 0%, ${darkBackground}55 100%), ${starfieldImage}`,
    background: starfieldImage,
    ":before": {
      content: "''",
      position: "absolute",
      top: "0",
      left: "0",
      width: "100%",
      height: "100%",
      backgroundColor: "#0003",
      // zIndex: "-1",
      backdropFilter: "blur(20px)",
    },
    // color: lightBackground,
  },
  bodyFont: averiaLibre.fontFamily,
  displayFont: "normal small-caps bold 1em 'Josefin Sans', serif",
  logo: {
    frontTextElementStyle: {
      background: metalGradient,
      backgroundClip: "text",
    },
    rearTextElementStyle: {
      textShadow: `
      6px 0px 4px #2c1a2077,
        2px -2px 1px #444,
        -1px -1px 0px rgba(255,255,255,0.9)
        `,
    },
    textElementsStyle: {
      transform: "rotateY(20deg) rotateZ(-1deg) translateX(10%)",
    },
    backdropStyle: {
      perspective: "500px",
      perspectiveOrigin: "50% 50%",
      backgroundImage:
        "radial-gradient(closest-side, #ac4d4377 0%, #ac4d4300 100%)",
      mixBlendMode: "overlay",
    },
  },
  panelStylePrimary: {
    backgroundColor: "#0000",
    backdropFilter: "blur(15px)",
    borderStyle: "solid",
    borderColor: "#e9e9",
    borderWidth: "1px",
    color: colors.text,
    // "linear-gradient(135deg, #efb183 0%, #f6d8c1 20%, #222 70%, #efb183 90%)",
  },
  panelStyleSecondary: {
    backgroundColor: "#0000",
    backdropFilter: "blur(5px)",
    borderStyle: "solid",
    borderColor: "#e9e9",
    borderWidth: "1px",
    color: colors.text,
    // "linear-gradient(135deg, #efb183 0%, #f6d8c1 20%, #222 70%, #efb183 90%)",
  },
  tabContentStyle: {
    backgroundColor: "#1111",
    backdropFilter: "blur(20px)",
    borderStyle: "none solid solid solid",
    borderColor: "#e9e9",
    borderWidth: "1px",
    color: colors.text,
  },
  tabStyle: {
    padding: "0.5em",
    flex: "1",
    // justifySelf: "center",
    // alignSelf: "center",
    textAlign: "center",
    fontSize: "1.1em",
    background: `linear-gradient(0deg, ${darkBackground}77 0%, ${darkBackground}77 0em, ${colors.backgroundSecondary} 0.4em, ${colors.backgroundSecondary} 100%)`,
  },
  tabActiveStyle: {
    background: `linear-gradient(0deg, ${colors.backgroundPrimary} 0%,  ${lightBackground} 100%)`,
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
