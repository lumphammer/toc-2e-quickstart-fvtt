import { PresetV1 } from "@lumphammer/investigator-fvtt-types";

import {
  moduleId,
  trailOfCthulhu2ePCAbilityPackName,
  trailOfCthulhu2ePuristPCAbilityPackName,
} from "./constants";

export const trail2ePuristPreset: PresetV1 = {
  schemaVersion: "v1",
  displayName: "Trail of Cthulhu 2e (Purist)",
  defaultThemeName: "trail-of-cthulhu-2e",
  investigativeAbilityCategories: ["Academic", "Interpersonal", "Technical"],
  generalAbilityCategories: ["General"],
  combatAbilities: ["Scuffling", "Weapons", "Firearms", "Athletics"],
  occupationLabel: "Occupation",
  personalDetails: [{ name: "Drive", type: "item" }],
  longNotes: [
    "Notes, Contacts etc.",
    "Occupational Benefits",
    "Pillars of Sanity",
    "Sources of Stability",
  ],
  newPCPacks: [
    `${moduleId}.${trailOfCthulhu2ePCAbilityPackName}`,
    `${moduleId}.${trailOfCthulhu2ePuristPCAbilityPackName}`,
  ],
  newNPCPacks: ["investigator.opponentAbilities"],
  useBoost: false,
  useMwStyleAbilities: false,
  mwUseAlternativeItemTypes: false,
  useMwInjuryStatus: false,
  genericOccupation: "Investigator",
  mwHiddenShortNotes: [],
  showEmptyInvestigativeCategories: false,
  pcStats: {
    hitThreshold: {
      name: "Hit threshold",
      default: 3,
    },
  },
  npcStats: {
    hitThreshold: {
      name: "Hit threshold",
      default: 3,
    },
    armor: {
      name: "Armor",
      default: 0,
    },
    alertness: {
      name: "Alertness",
      default: 0,
    },
    stealth: {
      name: "Stealth",
      default: 0,
    },
    stabilityLoss: {
      name: "Stability Loss",
      default: 0,
    },
  },
  useNpcCombatBonuses: false,
  useTurnPassingInitiative: false,
  equipmentCategories: {
    general: {
      name: "General",
      fields: {},
    },
  },
  // useCards: false,
  // cardCategories: [],
};
