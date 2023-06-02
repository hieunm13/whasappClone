import { User } from "firebase/auth";
import { Conversation } from "../types";

export const getRecipientEmail = (
  conversationUser: Conversation["users"],
  loggedInUser?: User | null
) => conversationUser.find((userEmail) => userEmail !== loggedInUser?.email);
