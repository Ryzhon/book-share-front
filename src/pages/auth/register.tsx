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

import { RegisterFormData } from "@/types/Auth";

const RegisterPage: React.FC = () => {
  const router = useRouter();
  const [formData, setFormData] = useState<RegisterFormData>({
    email: "",
    password: "",
    passwordConfirmation: "",
    firstName: "",
    lastName: "",
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const userRegistrationData = {
      user: {
        email: formData.email,
        password: formData.password,
        password_confirmation: formData.passwordConfirmation,
        first_name: formData.firstName,
        last_name: formData.lastName,
      },
    };

    try {
      const registrationResponse = await fetch(
        `${process.env.NEXT_PUBLIC_API_ENDPOINT}/users`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(userRegistrationData),
        },
      );

      if (!registrationResponse.ok) {
        throw new Error(`Error: ${registrationResponse.statusText}`);
      }

      const loginResponse = await fetch(
        `${process.env.NEXT_PUBLIC_API_ENDPOINT}/login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: formData.email,
            password: formData.password,
          }),
        },
      );

      if (!loginResponse.ok) {
        throw new Error(`Login Error: ${loginResponse.statusText}`);
      }

      const loginResult = await loginResponse.json();
      localStorage.setItem("accessToken", loginResult.access_token);

      router.push("/books");
    } catch (error) {
      console.error("Registration or Login failed:", error);
    }
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" sx={{ my: 4 }}>
        ユーザー登録
      </Typography>
      <Box sx={{ mt: 2 }}>
        <Typography variant="body2">
          すでにアカウントをお持ちですか？
          <Link href="/auth/login" passHref legacyBehavior>
            <MUILink>ログインする</MUILink>
          </Link>
        </Typography>
      </Box>

      <Box component="form" onSubmit={handleSubmit}>
        <TextField
          fullWidth
          margin="normal"
          label="名"
          name="firstName"
          value={formData.firstName}
          onChange={handleChange}
        />
        <TextField
          fullWidth
          margin="normal"
          label="姓"
          name="lastName"
          value={formData.lastName}
          onChange={handleChange}
        />
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
        <TextField
          fullWidth
          margin="normal"
          label="パスワード確認"
          name="passwordConfirmation"
          type="password"
          value={formData.passwordConfirmation}
          onChange={handleChange}
        />
        <Button type="submit" variant="contained" sx={{ mt: 3 }}>
          登録
        </Button>
      </Box>
    </Container>
  );
};

export default RegisterPage;
