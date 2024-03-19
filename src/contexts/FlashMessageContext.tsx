import React, { createContext, useContext, useState, useEffect } from "react";
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
  const [showMessage, setShowMessage] = useState(false);
  useEffect(() => {
    if (flash.message) {
      setShowMessage(true);
      setTimeout(() => {
        setShowMessage(false);
      }, 5000);
    }
  }, [flash.message]);

  return (
    <>
      {showMessage && (
        <Box my={2} className="flash-message">
          <Alert severity={flash.type}>{flash.message}</Alert>
        </Box>
      )}
      <FlashMessageContext.Provider value={{ flash, setFlash }}>
        {children}
      </FlashMessageContext.Provider>
    </>
  );
};
