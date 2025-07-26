import {
  adventureImportDontShow,
  adventureImportImported,
  adventureImportSettingKey,
  adventureImportShow,
  moduleId,
} from "./constants";
import type { PresetV1 } from "@lumphammer/investigator-fvtt-types";

/**
 * Shallowly expand all members of T
 */
export type Expand<T> = T extends (...args: infer A) => infer R
  ? (...args: Expand<A>) => Expand<R>
  : T extends infer O
    ? { [K in keyof O]: O[K] }
    : never;

/**
 * Recursively expand all members of T
 */
export type RecursiveExpand<T> = T extends (...args: infer A) => infer R
  ? (...args: RecursiveExpand<A>) => RecursiveExpand<R>
  : T extends object
    ? T extends infer O
      ? { [K in keyof O]: RecursiveExpand<O[K]> }
      : never
    : T;

type Ks = Expand<keyof PresetV1>;

// type MySettingConfig = {
//   [K in keyof PresetV1 as `investigator.${K}`]: PresetV1[K];
// };

export const adventureImportSettingKeyQualified = `${moduleId}.${adventureImportSettingKey}`;

type adventureImportSetting =
  `${typeof moduleId}.${typeof adventureImportSettingKey}`;

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
