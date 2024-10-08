import { PresetV1 } from "@lumphammer/investigator-fvtt-types";

import {
  moduleId,
  themeName,
  toc2eQuickstartGMCAbilityPackName,
  toc2eQuickstartPCAbilityPackName,
} from "./constants";

export const toc2eQuickstartPreset: PresetV1 = {
  schemaVersion: "v1",
  displayName: "Trail of Cthulhu 2e (Quickstart)",
  defaultThemeName: themeName,
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
  newPCPacks: [`${moduleId}.${toc2eQuickstartPCAbilityPackName}`],
  newNPCPacks: [`${moduleId}.${toc2eQuickstartGMCAbilityPackName}`],
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
    creditRating: {
      name: "Credit rating",
      default: 0,
    },
    cthulhuMythosPotential: {
      name: "Cthulhu Mythos Potential",
      default: 0,
    },
    magicPotential: {
      name: "Magic Potential",
      default: 0,
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
      name: "Alertness Modifier",
      default: 0,
      min: -10,
    },
    stealth: {
      name: "Stealth Modifier",
      default: 0,
      min: -10,
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
