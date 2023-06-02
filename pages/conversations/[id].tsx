import Head from "next/head";
import { styled } from "styled-components";
import Sidebar from "../../components/Sidebar";
import { GetServerSideProps } from "next";
import { doc, getDoc, getDocs } from "firebase/firestore";
import { auth, db } from "../../config/firebase";
import { Conversation, IMessage } from "../../types";
import { getRecipientEmail } from "../../utils/getRecipientEmail";
import { useAuthState } from "react-firebase-hooks/auth";
import {
  generateQueryGetMessages,
  transformMessage,
} from "../../utils/getMessagesInConversation";
import ConversationScreen from "../../components/ConversationScreen";

interface Props {
  conversation: Conversation;
  messages: IMessage[];
}

const StyleContainer = styled.div`
  display: flex;
`;

const StyleConversationContainer = styled.div`
  flex-grow: 1;
  overflow: scroll;
  height: 100vh;
  ::-webkit-scrollbar {
    display: none;
  }

  /* Hide scrollbar for IE, Edge and Firefox */
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
`;

const Conversation = ({ conversation, messages }: Props) => {
  const [loggedInUser, _loading, _error] = useAuthState(auth);
  return (
    <StyleContainer>
      <Head>
        <title>
          Conversation with{" "}
          {getRecipientEmail(conversation.users, loggedInUser)}
        </title>
      </Head>

      <Sidebar></Sidebar>

      {/* {messages.map((message, index) => (
        <p key={index}>{JSON.stringify(message)}</p>
      ))} */}

      <StyleConversationContainer>
        <ConversationScreen conversation={conversation} messages={messages} />
      </StyleConversationContainer>
    </StyleContainer>
  );
};

export default Conversation;

export const getServerSideProps: GetServerSideProps<
  Props,
  { id: string }
> = async (context) => {
  const conversationId = context.params?.id;

  const conversationRef = doc(db, "conversations", conversationId as string);

  const conversationSnapshot = await getDoc(conversationRef);

  const queryMessages = generateQueryGetMessages(conversationId);

  const messagesSnapshot = await getDocs(queryMessages);

  console.log("messagesSnapshot ", messagesSnapshot?.docs[0]?.data());

  const messages = messagesSnapshot.docs.map((messageDoc) =>
    transformMessage(messageDoc)
  );

  return {
    props: {
      conversation: conversationSnapshot.data() as Conversation,
      messages,
    },
  };
};
