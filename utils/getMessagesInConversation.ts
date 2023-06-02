import {
  DocumentData,
  QueryDocumentSnapshot,
  Timestamp,
  collection,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import { db } from "../config/firebase";
import { IMessage } from "../types";

export const generateQueryGetMessages = (conversationId?: string) =>
  query(
    collection(db, "messages"),
    where("conversation_id", "==", conversationId),
    orderBy("sent_at", "asc")
  );

export const transformMessage = (
  messages: QueryDocumentSnapshot<DocumentData>
) =>
  ({
    id: messages.id,
    ...messages.data(),
    sent_at: messages.data().sent_at
      ? convertFireStoreTimestampToString(messages.data().sent_at as Timestamp)
      : null,
  } as IMessage);

export const convertFireStoreTimestampToString = (timestamp: Timestamp) => {
  console.log("timestamp ", timestamp);
  console.log("111 ", new Date(timestamp.toDate()).toLocaleString());
  return new Date(timestamp.toDate()).toLocaleString();
};
