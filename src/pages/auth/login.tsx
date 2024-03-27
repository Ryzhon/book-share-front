import React, { useState } from "react";
import { useRouter } from "next/router";

import {
  Box,
  TextField,
  Button,
  Typography,
  Container,
  Link as MUILink,
} from "@mui/material";
import Link from "next/link";

import { LoginFormData } from "@/types/Auth";

const LoginPage: React.FC = () => {
  const router = useRouter();
  const [formData, setFormData] = useState<LoginFormData>({
    email: "",
    password: "",
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const loginData = {
      email: formData.email,
      password: formData.password,
    };

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_ENDPOINT}/login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(loginData),
        },
      );

      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }

      const result = await response.json();
      localStorage.setItem("access_token", result.access_token);
      console.log("Login successful:", result);
      router.push("/books");
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" sx={{ my: 4 }}>
        ログイン
      </Typography>
      <Box sx={{ mt: 2 }}>
        <Typography variant="body2">
          アカウントをお持ちでないですか？
          <Link href="/auth/register" passHref legacyBehavior>
            <MUILink>ユーザー登録する</MUILink>
          </Link>
        </Typography>
      </Box>
      <Box component="form" onSubmit={handleSubmit}>
        <TextField
          fullWidth
          margin="normal"
          label="メールアドレス"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
        />
        <TextField
          fullWidth
          margin="normal"
          label="パスワード"
          name="password"
          type="password"
          value={formData.password}
          onChange={handleChange}
        />
        <Button type="submit" variant="contained" sx={{ mt: 3 }}>
          ログイン
        </Button>
      </Box>
    </Container>
  );
};

export default LoginPage;
