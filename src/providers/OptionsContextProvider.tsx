import { OptionType } from "@/interfaces/CommonInterface";
import React, { createContext } from "react";

export const OptionsContext = createContext<{ [key: string]: OptionType[] }>(
  {}
);

function OptionsContextProvider({
  options,
  children,
}: {
  options: { [key: string]: OptionType[] };
  children: React.ReactNode;
}) {
  return (
    <OptionsContext.Provider value={options}>
      {children}
    </OptionsContext.Provider>
  );
}

export default OptionsContextProvider;
