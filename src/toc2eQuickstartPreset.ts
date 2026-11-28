import { PresetV1 } from "@lumphammer/investigator-fvtt-types";

import {
  moduleId,
  themeName,
  toc2eQuickstartGMCAbilityPackName,
  toc2eQuickstartPCAbilityPackName,
} from "./constants";

// Required<>, so every setting a preset controls has a value here: applying
// the preset setting by setting (on INVESTIGATOR versions without
// `applyPreset`) then leaves nothing over from the world's last preset.
export const toc2eQuickstartPreset: Required<PresetV1> = {
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
  hideTestDifficulty: true,
  defaultTestDifficulty: null,
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
  useDamageApplication: true,
  useGunfireOnHumans: false,
  useCriticalHits: false,
  useLethalityAndAutofire: false,
  useShotDryAndJams: false,
  useExtendedRange: false,
  useWalkingFire: false,
  useWoundStatusEffects: true,
  walkingFireSpendAbilities: ["Athletics"],
  fullAutoSpendAbilities: ["Athletics", "Stability"],
  useStabilityRules: true,
  stabilityAbility: "Stability",
  useSanityRules: true,
  sanityAbility: "Sanity",
  sanityCapAbility: "Cthulhu Mythos",
  sanityCapBase: 10,
  useStabilityStates: true,
  // `upTo` is the highest Stability pool in each state
  stabilityStates: {
    shaken: { name: "Shaken", upTo: 0 },
    shattered: { name: "Blasted", upTo: -6 },
    gone: { name: "Doomed", upTo: -12 },
  },
  useBonds: false,
  bondRebuildSpendCategory: "Interpersonal",
  useTrauma: false,
  traumaTypes: [],
  useNetworkContacts: false,
  networkAbility: "Network",
  useCards: false,
  cardCategories: [],
};
