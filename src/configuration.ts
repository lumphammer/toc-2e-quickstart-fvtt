import {
  adventureImportDontShow,
  adventureImportImported,
  adventureImportSettingKey,
  adventureImportShow,
  moduleId,
} from "./constants";

export const adventureImportSettingKeyQualified = `${moduleId}.${adventureImportSettingKey}`;

declare module "fvtt-types/configuration" {
  namespace Hooks {
    interface HookConfig {
      "investigator:themeHMR": (themeName: string) => void;
    }
  }

  interface SettingConfig {
    [adventureImportSettingKeyQualified]:
      | typeof adventureImportShow
      | typeof adventureImportImported
      | typeof adventureImportDontShow;
  }
}
