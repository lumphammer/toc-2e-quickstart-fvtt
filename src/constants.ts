import moduleManifest from "../public/module.json";

export const moduleId = "toc-2e-quickstart";
export const moduleTitle = moduleManifest.title;

export const themeName = moduleId;

export const toc2eQuickstartPCAbilityPackName = "pc-abilities";
export const toc2eQuickstartGMCAbilityPackName = "gmc-abilities";

export const adventureImportSettingKey = "adventure-import";
export const adventureImportShow = "show";
export const adventureImportImported = "imported";
export const adventureImportDontShow = "dont-show";

export const adventureImportSettingKeyQualified = `${moduleId}.${adventureImportSettingKey}`;
