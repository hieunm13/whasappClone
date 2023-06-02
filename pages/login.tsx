import { Button } from "@mui/material";
import Head from "next/head";
import { styled } from "styled-components";
import Image from "next/image";
import WhatsAppLogo from "../assets/whatsapplogo.png";
import { useSignInWithGoogle } from "react-firebase-hooks/auth";
import { auth } from "../config/firebase";

const StyleContainer = styled.div`
  height: 100vh;
  display: grid;
  place-items: center;
  background-color: whitesmoke;
`;

const StyleLoginContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 100px;
  align-items: center;
  background-color: white;
  border-radius: 5px;
  box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);
`;

const StyleImageWrapper = styled.div`
  margin-bottom: 50px;
`;

const Login = () => {
  const [signInWithGoogle, _user, _loading, _error] = useSignInWithGoogle(auth);

  const signIn = () => {
    signInWithGoogle();
  };

  return (
    <StyleContainer>
      <Head>
        <title>Whatsapp 2.0</title>
      </Head>

      <StyleLoginContainer>
        <StyleImageWrapper>
          <Image
            src={WhatsAppLogo}
            alt="WhatsApp Logo"
            height="200px"
            width="200px"
          />
        </StyleImageWrapper>

        <Button variant="outlined" onClick={signIn}>
          Sign in with Google
        </Button>
      </StyleLoginContainer>
    </StyleContainer>
  );
};

export default Login;
