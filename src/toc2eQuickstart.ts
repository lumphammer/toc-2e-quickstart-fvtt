import { moduleId, moduleTitle, themeName } from "./constants";
import processedStyles from "./toc2eQuickstart.scss?inline";
import { toc2eQuickstartThemeSeed } from "./toc2eQuickstartTheme";
import { toc2eQuickstartPreset } from "./toc2eQuickstartPreset";

// const key = "trail-of-cthulhu-2e";
console.log(`[${moduleTitle}] initializing`);

// Inject CSS
// normal css imports don't work in foundry because the html is loaded from
// foundry itself and vite's css injection never kicks in. So we have to
// import the css as a string and inject it ourselves.
const styleElement = document.createElement("style");
styleElement.innerHTML = processedStyles;
document.head.appendChild(styleElement);

CONFIG.Investigator?.installTheme(themeName, toc2eQuickstartThemeSeed);
CONFIG.Investigator?.installPreset(`${moduleId}`, toc2eQuickstartPreset);

// HMR for themes
// we can only trigger HMR from the module that directly imports the module
// being replaced. we call CONFIG.Investigator?.installTheme to replace it in
// runtime config and then call a (Foundry) hook to notify the (React) useTheme
// hook about the change.
if (import.meta.hot) {
  // const themeNames = Object.keys(baseThemes);

  if (import.meta.hot) {
    import.meta.hot.accept(
      ["toc2eQuickstartTheme.tsx"],
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
              newModule["toc2eQuickstartThemeSeed"],
            );
            Hooks.call("investigator:themeHMR", moduleId);
          }
        });
      },
    );
  }
}
