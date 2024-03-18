import React, { createContext, useContext, useState, ReactNode } from "react";
import { Alert, Box } from "@mui/material";
import { FlashMessageType } from "@/types/flashMessageType";

interface FlashMessageContextType {
  flash: FlashMessageType;
  setFlash: (message: FlashMessageType) => void;
}

const defaultState: FlashMessageContextType = {
  flash: { message: "", type: "info" },
  setFlash: () => {},
};

const FlashMessageContext =
  createContext<FlashMessageContextType>(defaultState);

export const useFlashMessageContext = () => useContext(FlashMessageContext);

interface FlashMessageProviderProps {
  children: ReactNode;
}

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
