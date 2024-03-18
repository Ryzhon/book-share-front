import React, { createContext, useContext, useState } from "react";
import { Alert, Box } from "@mui/material";
import {
  FlashMessageType,
  FlashMessageContextType,
  FlashMessageProviderProps,
} from "@/types/FlashMessage";

const defaultState: FlashMessageContextType = {
  flash: { message: "", type: "info" },
  setFlash: () => {},
};

const FlashMessageContext =
  createContext<FlashMessageContextType>(defaultState);

export const useFlashMessageContext = () => useContext(FlashMessageContext);

export const FlashMessageProvider: React.FC<FlashMessageProviderProps> = ({
  children,
}) => {
  const [flash, setFlash] = useState<FlashMessageType>({
    message: "",
    type: "info",
  });

  return (
    <>
      {flash.message && (
        <Box my={2}>
          <Alert severity={flash.type}>{flash.message}</Alert>
        </Box>
      )}
      <FlashMessageContext.Provider value={{ flash, setFlash }}>
        {children}
      </FlashMessageContext.Provider>
    </>
  );
};
