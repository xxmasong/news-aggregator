import React, { createContext } from "react";

export const DisabledComponentContext = createContext(false);

function DisabledComponentContextProvider({
  value,
  children,
}: {
  value: boolean;
  children: React.ReactNode;
}) {
  return (
    <DisabledComponentContext.Provider value={value}>
      {children}
    </DisabledComponentContext.Provider>
  );
}

export default DisabledComponentContextProvider;
