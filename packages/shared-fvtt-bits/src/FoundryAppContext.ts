import React from "react";

export const FoundryAppContext =
  React.createContext<foundry.applications.api.ApplicationV2 | null>(null);
