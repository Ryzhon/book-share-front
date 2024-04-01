import React from "react";
import { Box, TextField, Button, Alert } from "@mui/material";
import createAuthHeaders from "@/utils/authHeaders";
import { AddElementFormProps } from "@/types/Book";

export const AddElementForm: React.FC<AddElementFormProps> = ({
  elementName,
  setElementName,
  endpoint,
  elementAdded,
  setError,
  error,
}) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setElementName(event.target.value);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!elementName) {
      setError("入力してください。");
      return;
    }
    const response = await fetch(endpoint, {
      method: "POST",
      headers: createAuthHeaders(),
      body: JSON.stringify({ name: elementName }),
    });
    if (!response.ok) {
      setError(`${elementName}はすでに登録されています。`);
    } else {
      elementAdded();
    }
  };

  return (
    <>
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{ display: "flex", gap: 0.5, mb: 2 }}
      >
        <TextField
          label="入力する"
          value={elementName}
          onChange={handleChange}
          variant="outlined"
          size="small"
        />
        <Button type="submit" variant="contained">
          送信
        </Button>
      </Box>
      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}
    </>
  );
};
