import { PresetV1 } from "@lumphammer/investigator-fvtt-types";

import {
  moduleId,
  trailOfCthulhu2ePCAbilityPackName,
  trailOfCthulhu2ePulpPCAbilityPackName,
} from "./constants";
import { trail2ePuristPreset } from "./trail2ePuristPreset";

export const trail2ePulpPreset: PresetV1 = {
  ...trail2ePuristPreset,
  displayName: "Trail of Cthulhu 2e (Pulp)",
  newPCPacks: [
    `${moduleId}.${trailOfCthulhu2ePCAbilityPackName}`,
    `${moduleId}.${trailOfCthulhu2ePulpPCAbilityPackName}`,
  ],
};
