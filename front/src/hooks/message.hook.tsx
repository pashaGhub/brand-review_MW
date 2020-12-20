import { useCallback } from "react";
import { notification } from "antd";

export const useMessage: Function = () => {
  return useCallback((data: any) => {
    if (data && data.ok) {
      notification["success"]({
        message: "Success",
        description: data.message,
        duration: 20,
      });
    } else if (data && !data.ok) {
      notification["error"]({
        message: "Error",
        description: data.message,
        duration: 20,
      });
    }
  }, []);
};
