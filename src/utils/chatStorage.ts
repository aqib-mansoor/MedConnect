export interface ChatMessage {
  id: string;
  sender: "doctor" | "patient";
  receiver: "doctor" | "patient";
  message: string;
  timestamp: string;
}

export const saveMessage = (msg: ChatMessage) => {
  const data = localStorage.getItem("chatMessages");
  const messages: ChatMessage[] = data ? JSON.parse(data) : [];
  messages.push(msg);
  localStorage.setItem("chatMessages", JSON.stringify(messages));
};

export const getMessages = (userRole: "doctor" | "patient") => {
  const data = localStorage.getItem("chatMessages");
  const messages: ChatMessage[] = data ? JSON.parse(data) : [];
  return messages.filter(
    (m) =>
      (m.sender === userRole || m.receiver === userRole)
  );
};
