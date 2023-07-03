import { useState } from "react";

function useStorage(sessionKey?: string) {
  const [mainKey] = useState(sessionKey);

  const writeInSession = (key?: string, data?: any) => {
    if (mainKey)
      sessionStorage.setItem(mainKey, JSON.stringify({data: btoa(JSON.stringify(data || {}))}));
    else if (key)
      sessionStorage.setItem(key, JSON.stringify({data: btoa(JSON.stringify(data || {}))}));
  };

  const readInSession = (key?: string) => {
    let data;
    if (mainKey)
      data = JSON.parse(sessionStorage.getItem(mainKey) || "{}")?.data;
    else if (key)
      data = JSON.parse(sessionStorage.getItem(key) || "{}")?.data;
    if (data) {
      try {
        data = JSON.parse(atob(data || ""));
      } catch (e: any) {
        data = {};
      }
    }

    return data;
  };

  const clearInSession = (key?: string) => {
    if (mainKey)
      sessionStorage.removeItem(mainKey);
    else if (key)
      sessionStorage.removeItem(key);
  };

  const clearAllInSession = () => {
    sessionStorage.clear();
  };

  return {
    writeInSession,
    readInSession,
    clearInSession,
    clearAllInSession,
  };
}

export default useStorage;
