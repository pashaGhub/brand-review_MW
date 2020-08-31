import { useCallback } from "react";

export const useMessage: Function = () => {
  return useCallback((text: string) => {
    if (alert && text) {
      alert(text);
    }
  }, []);
};
