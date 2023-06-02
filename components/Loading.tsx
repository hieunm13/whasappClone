import { styled } from "styled-components";

import Image from "next/image";
import WhatsAppLogo from "../assets/whatsapplogo.png";
import { CircularProgress } from "@mui/material";

const StyledContainerLoading = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100%;
`;

const StyleImageWrapper = styled.div`
  margin-bottom: 50px;
`;

const Loading = () => {
  return (
    <StyledContainerLoading>
      <StyleImageWrapper>
        <Image
          src={WhatsAppLogo}
          alt="WhatsApp Logo"
          height="200px"
          width="200px"
        />
      </StyleImageWrapper>

      <CircularProgress />
    </StyledContainerLoading>
  );
};

export default Loading;
