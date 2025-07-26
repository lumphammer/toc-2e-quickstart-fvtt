import { activatePreset } from "./activatePreset";
import {
  adventureImportDontShow,
  adventureImportImported,
  adventureImportSettingKey,
  adventureImportShow,
  moduleId,
  moduleTitle,
  themeName,
} from "./constants";
import processedStyles from "./toc2eQuickstart.scss?inline";
import { toc2eQuickstartPreset } from "./toc2eQuickstartPreset";
import { toc2eQuickstartThemeSeed } from "./toc2eQuickstartTheme";
import "./configuration";

const adventureId = "iI5qMgsPPkMtl2TT";

// const key = "trail-of-cthulhu-2e";
console.log(`[${moduleTitle}] initializing`);

let addButtonsToAdventureImporter = false;

// Inject CSS
// normal css imports don't work in foundry because the html is loaded from
// foundry itself and vite's css injection never kicks in. So we have to
// import the css as a string and inject it ourselves.
const styleElement = document.createElement("style");
styleElement.innerHTML = processedStyles;
document.head.appendChild(styleElement);

CONFIG.Investigator?.installTheme(themeName, toc2eQuickstartThemeSeed);
CONFIG.Investigator?.installPreset(`${moduleId}`, toc2eQuickstartPreset);

/// ///////////////////////////////////////////////////////////////////////////
// register settings

/// ///////////////////////////////////////////////////////////////////////////
// init hook
Hooks.once("init", () => {
  if (!(game instanceof Game)) {
    return;
  }
  // register the setting for whether to show the adventure sheet on startup
  game.settings.register(moduleId, adventureImportSettingKey, {
    name: "Adventure import",
    scope: "world",
    config: true,
    default: "show",
    type: String,
    choices: {
      [adventureImportShow]: "Show adventure sheet on startup",
      [adventureImportImported]: "Adventure already imported",
      [adventureImportDontShow]: "Don't show adventure sheet on startup",
    },
  });

  // bit of funky logic here to determine whether to add the "don't show again"
  // button to the adventure sheet
  addButtonsToAdventureImporter =
    game.settings.get(moduleId, "adventure-import") === "show";
});

/// ///////////////////////////////////////////////////////////////////////////
// ready hook - show the adventure sheet on startup if needed
Hooks.on("ready", async () => {
  if (!(game instanceof Game) || !game.user?.isGM) {
    return;
  }
  const setting = game.settings.get(moduleId, "adventure-import");
  const pack = game.packs.get("toc-2e-quickstart.stranger-shores");
  if (
    pack === undefined ||
    setting === adventureImportDontShow ||
    setting === adventureImportImported
  ) {
    return;
  }
  const adv = (await pack.getDocuments())[0];
  if (adv === undefined) {
    return;
  }
  // @ts-expect-error - we know it exists
  adv.sheet.render(true);
});

/// ///////////////////////////////////////////////////////////////////////////
// hack the adventure sheet when it renders
//
// look, this is cheap, I know it is. but I don't enjoy working with handlebars
// templates, and anyway making a whole custom adventure sheet seems like a ton
// of faff to add one button.
Hooks.on("renderAdventureImporter", (app: any, html: any, data: any) => {
  if (app.adventure._id !== adventureId) {
    return;
  }
  if (!addButtonsToAdventureImporter) {
    return;
  }
  addButtonsToAdventureImporter = false;
  html[0].style.height = `${parseInt(html[0].style.height) + 30}px`;
  const dontShowAgainButton = $(
    "<button type='button'>Don't show again</button>",
  );
  dontShowAgainButton.on("click", () => {
    void (game as Game).settings.set(
      moduleId,
      "adventure-import",
      adventureImportDontShow,
    );
    app.close();
    const d = new Dialog({
      title: "Adventure sheet",
      content:
        "<p>You can find the adventure in the <b>Trail of Cthulhu 2e Quickstart</b> compendium if you want it later.</p>",
      buttons: {
        ok: {
          icon: '<i class="fas fa-check"></i>',
          label: "Okay!",
        },
      },
      default: "ok",
    });
    d.render(true);
  });
  $(html).find(".adventure-footer").append(dontShowAgainButton);
});

/// ///////////////////////////////////////////////////////////////////////////
// When the adventure gets imported, we start asking some questions
Hooks.on("importAdventure", (adventure: any) => {
  if (adventure._id !== adventureId) {
    return;
  }
  // flip the setting to say it's been imported
  void (game as Game).settings.set(
    moduleId,
    adventureImportSettingKey,
    adventureImportImported,
  );
  // Ask the GM if they want to apply the preset
  const d = new Dialog({
    title: "Apply preset?",
    content:
      "<p>Configure your GUMSHOE System for <b>Trail of Cthulhu 2e Quickstart</b>?</p>",
    buttons: {
      ok: {
        icon: '<i class="fas fa-check"></i>',
        label: "Yes, set it up",
        callback: () => {
          void activatePreset();
        },
      },
      cancel: {
        icon: '<i class="fas fa-times"></i>',
        label: "Cancel",
        callback: () => {
          setTimeout(() => {
            const d = new Dialog({
              title: "Preset not applied",
              content:
                "<p>You can find the preset in the <b>GUMSHOE System Settings</b> at any time.</p>",
              buttons: {
                ok: {
                  label: "Okay",
                },
              },
            });
            d.render(true);
          }, 500);
        },
      },
    },
    default: "ok",
  });
  d.render(true);
});

/// ///////////////////////////////////////////////////////////////////////////
// HMR for themes
// we can only trigger HMR from the module that directly imports the module
// being replaced. we call CONFIG.Investigator?.installTheme to replace it in
// runtime config and then call a (Foundry) hook to notify the (React) useTheme
// hook about the change.
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
          CONFIG.Investigator?.installTheme(
            moduleId,
            newModule["toc2eQuickstartThemeSeed"],
          );
          Hooks.call("investigator:themeHMR", moduleId);
        }
      });
    },
  );
  import.meta.hot.accept(["./toc2eQuickstart.scss?inline"], (newModules) => {
    newModules.forEach((newModule, i) => {
      if (newModule) {
        // @ts-expect-error - we know it's a string
        styleElement.innerHTML = newModule.default;
      }
    });
  });
}
