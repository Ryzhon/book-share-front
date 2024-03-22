import Head from "next/head";
import styles from "@/styles/Home.module.css";
import { TextField, Button, Container, Typography } from "@mui/material";
import { useRouter } from "next/router";

export default function Home() {
  const router = useRouter();

  const handleLogin = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    router.push("/books");
  };

  return (
    <>
      <Head>
        <title>BookShare</title>
        <meta name="description" content="Login page" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <Container maxWidth="sm">
          <Typography variant="h4" component="h1" gutterBottom>
            ログイン
          </Typography>
          <form noValidate autoComplete="off" onSubmit={handleLogin}>
            <TextField
              required
              id="email"
              label="メールアドレス"
              variant="outlined"
              margin="normal"
              fullWidth
            />
            <TextField
              required
              id="password"
              label="パスワード"
              type="password"
              variant="outlined"
              margin="normal"
              fullWidth
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              style={{ marginTop: "16px" }}
            >
              ログイン
            </Button>
          </form>
        </Container>
      </main>
    </>
  );
}
