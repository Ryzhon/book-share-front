import { ReactNode } from "react";

type AlertType = "error" | "warning" | "info" | "success";

export type FlashMessageType = {
  message: string;
  type: AlertType;
};

export type FlashMessageContextType = {
  flash: FlashMessageType;
  setFlash: (message: FlashMessageType) => void;
};

export type FlashMessageProviderProps = {
  children: ReactNode;
};
