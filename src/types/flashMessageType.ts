type AlertType = "error" | "warning" | "info" | "success";

export type FlashMessageType = {
  message: string;
  type: AlertType;
};
