import { Timestamp } from "firebase/firestore";

export interface Conversation {
  users: string[];
}

export interface appUser {
  email: string;
  lastSeen: Timestamp;
  photoURL: string;
}

export interface IMessage {
  id: string;
  conversation_id: string;
  text: string;
  sent_at: string;
  user: string;
}
