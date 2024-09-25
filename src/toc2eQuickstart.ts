import { moduleId, moduleTitle } from "./constants";
import processedStyles from "./toc2eQuickstart.scss?inline";
import { toc2eQuickstartThemeSeed } from "./toc2eTheme";
import { trail2ePulpPreset } from "./trail2ePulpPreset";
import { trail2ePuristPreset } from "./trail2ePuristPreset";

// const key = "trail-of-cthulhu-2e";
console.log(`[${moduleTitle}] initializing`);

// Inject CSS
// normal css imports don't work in foundry because the html is loaded from
// foundry itself and vite's css injection never kicks in. So we have to
// import the css as a string and inject it ourselves.
const styleElement = document.createElement("style");
styleElement.innerHTML = processedStyles;
document.head.appendChild(styleElement);

CONFIG.Investigator?.installTheme(moduleId, toc2eQuickstartThemeSeed);
CONFIG.Investigator?.installPreset(`${moduleId}-purist`, trail2ePuristPreset);
CONFIG.Investigator?.installPreset(`${moduleId}-pulp`, trail2ePulpPreset);

// HMR for themes
// we can only trigger HMR from the module that directly imports the module
// being replaced. we call CONFIG.Investigator?.installTheme to replace it in
// runtime config and then call a (Foundry) hook to notify the (React) useTheme
// hook about the change.
if (import.meta.hot) {
  // const themeNames = Object.keys(baseThemes);

  if (import.meta.hot) {
    import.meta.hot.accept(
      ["trail2eTheme.tsx"],
      // keep this list in sync with the exports above.
      // unfortunately the HMR API is staticaly analysed so we can't do anything
      // clever - this *must* be a string literal array in the source code.
      // also this comment should be above the list, but doing so breaks said
      // static analysis.
      (newModules) => {
        newModules.forEach((newModule, i) => {
          if (newModule) {
            // const themeName = themeNames[i];
            CONFIG.Investigator?.installTheme(
              moduleId,
              newModule["trail2eThemeSeed"],
            );
            Hooks.call("investigator:themeHMR", moduleId);
          }
        });
      },
    );
  }
}
