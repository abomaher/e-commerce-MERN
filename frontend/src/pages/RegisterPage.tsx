import { Box, Button, Container, TextField, Typography } from "@mui/material";
import { useRef, useState } from "react";
import { BASE_URL } from "../constants/BaseUrl";
import { useAuth } from "../context/Auth/AuthContext";

const RegisterPage = () => {
    const [error, setError] = useState("");
    const fristNameRef = useRef<HTMLInputElement>(null);
  const lastNameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const { login } = useAuth();

  const onSubmit = async () => {
    const fristName = fristNameRef.current?.value;
    const lastName = lastNameRef.current?.value;
    const email = emailRef.current?.value;
    const password = passwordRef.current?.value;

    // Validate the form data
    if(!fristName || !lastName || !email || !password){
        setError("Check submitted data!");
        return;
    }

    console.log(name, email, password);

    // Make the call to API to create the user
    const response = await fetch(`${BASE_URL}/user/register`, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            fristName,
            lastName,
            email,
            password,
        }),
    }); 

    if(!response.ok){
        setError(await response.json());
        return;
    }

    const token = await response.json();

    if(!token){
        setError("Incorrect token.");
        return;
    }

    login(email, token);
  };

  return (
    <Container sx={{ mt: 4 }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <Typography variant="h6">Register New Account</Typography>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 2,
            mt: 2,
            border: 1,
            borderColor: "#f3f3f3",
            p: 2,
          }}
        >
          <TextField inputRef={fristNameRef} label="Frist Name" name="fristName" />
          <TextField inputRef={lastNameRef} label="Last Name" name="lastName" />
          <TextField inputRef={emailRef} label="Email" name="email" />
          <TextField inputRef={passwordRef} type="password" label="Password" name="password" />
          <Button onClick={onSubmit} variant="contained">
            Register
          </Button>
          {error && <Typography sx={{color: "red"}}>{error}</Typography>}
        </Box>
      </Box>
    </Container>
  );
};

export default RegisterPage;
