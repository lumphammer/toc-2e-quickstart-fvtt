import { PresetV1 } from "@lumphammer/investigator-fvtt-types";

import { moduleId } from "./constants";
import { toc2eQuickstartPreset } from "./toc2eQuickstartPreset";

export async function activatePreset() {
  for (const key in toc2eQuickstartPreset) {
    let currentValue;
    try {
      currentValue = (game as Game).settings.get("investigator", key) as any;
      // eslint-disable-next-line unused-imports/no-unused-vars
    } catch (e) {
      continue;
    }
    const newValue = toc2eQuickstartPreset[key as keyof PresetV1] as any;
    console.info(`Activating ${key}`);
    console.log("Current value", currentValue);
    console.log("New value", newValue);
    await (game as Game).settings.set("investigator", key, newValue);
  }
  await (game as Game).settings.set("investigator", "systemPreset", moduleId);
}
