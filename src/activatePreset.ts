import { PresetV1 } from "@lumphammer/investigator-fvtt-types";

import { moduleId } from "./constants";
import { toc2eQuickstartPreset } from "./toc2eQuickstartPreset";

/**
 * Write every setting in the preset, one by one. For INVESTIGATOR versions
 * without `applyPreset`: this only resets settings the preset mentions, which
 * is why the preset is `Required<PresetV1>`.
 */
async function writePresetSettings() {
  for (const key in toc2eQuickstartPreset) {
    try {
      (game as foundry.Game).settings.get(
        // @ts-expect-error - we know this exists
        "investigator",
        key,
      );
    } catch {
      // not a setting (e.g. `displayName`), or one this version of
      // INVESTIGATOR doesn't have
      continue;
    }
    const newValue = toc2eQuickstartPreset[key as keyof PresetV1] as any;
    // @ts-expect-error - we know this exists
    await (game as foundry.Game).settings.set("investigator", key, newValue);
  }
  await (game as foundry.Game).settings.set(
    // @ts-expect-error - we know this exists
    "investigator",
    "systemPreset",
    moduleId,
  );
}

/**
 * Apply the preset to the system
 */
export async function activatePreset() {
  try {
    if (CONFIG.Investigator?.applyPreset) {
      // resets everything the preset doesn't set, including settings newer
      // than this module
      await CONFIG.Investigator.applyPreset(moduleId);
    } else {
      await writePresetSettings();
      // as INVESTIGATOR's settings window (and `applyPreset`) does after
      // saving, e.g. to show or hide the alternative item type
      // @ts-expect-error - INVESTIGATOR's own hook, not in Foundry's types
      Hooks.call("investigator.settingsSaved");
    }
  } catch (error) {
    console.error(error);
    ui.notifications!.error(
      `The system preset could not be applied: ${
        error instanceof Error ? error.message : String(error)
      }`,
    );
    return;
  }
  ui.notifications!.notify("System preset has been applied.");
}
