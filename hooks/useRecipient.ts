import { useAuthState } from "react-firebase-hooks/auth";
import { Conversation, appUser } from "../types";
import { auth, db } from "../config/firebase";
import { getRecipientEmail } from "../utils/getRecipientEmail";
import { collection, query, where } from "firebase/firestore";
import { useCollection } from "react-firebase-hooks/firestore";

export const useRecipient = (conversationUsers: Conversation["users"]) => {
  const [loggedInUser, _loading, _error] = useAuthState(auth);

  const recipientEmail = getRecipientEmail(conversationUsers, loggedInUser);

  const queryGetRecipient = query(
    collection(db, "users"),
    where("email", "==", recipientEmail)
  );

  const [recipientsSnapshot, _loading1, _erro1] =
    useCollection(queryGetRecipient);

  const recipient = recipientsSnapshot?.docs[0]?.data() as appUser | undefined;

  return { recipientEmail, recipient };
};
