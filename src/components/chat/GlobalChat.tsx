import { useState, useEffect, useRef } from "react";
import { getMessages, saveMessage } from "../../utils/chatStorage";
import type { ChatMessage } from "../../utils/chatStorage";
import { FaComments } from "react-icons/fa";

interface Props {
  role: "doctor" | "patient";
}

export default function GlobalChat({ role }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [unreadCount, setUnreadCount] = useState(0);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const toggleChat = () => {
    setIsOpen(!isOpen);
    if (!isOpen) setUnreadCount(0); // reset unread count when opened
  };

  // Load messages and check for unread
  useEffect(() => {
    setMessages(getMessages(role));

    if (!isOpen) {
      const interval = setInterval(() => {
        const allMessages = getMessages(role);
        const newMessages = allMessages.length - messages.length;
        if (newMessages > 0) setUnreadCount(newMessages);
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [messages, role, isOpen]);

  const sendMessage = () => {
    if (!input.trim()) return;

    const newMsg: ChatMessage = {
      id: crypto.randomUUID(),
      sender: role,
      receiver: role === "doctor" ? "patient" : "doctor",
      message: input,
      timestamp: new Date().toISOString(),
    };

    saveMessage(newMsg);
    setMessages(getMessages(role));
    setInput("");
    scrollToBottom();
  };

  const scrollToBottom = () => {
    setTimeout(() => {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 50);
  };

  return (
    <>
      {/* Floating Chat Icon - always bottom-right */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
        <button
          onClick={toggleChat}
          className="w-16 h-16 rounded-full bg-green-700 text-white flex items-center justify-center shadow-xl hover:scale-110 transition-transform relative"
        >
          <FaComments size={28} />
          {unreadCount > 0 && (
            <span className="absolute top-0 right-0 -mt-1 -mr-1 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center animate-pulse">
              {unreadCount}
            </span>
          )}
        </button>

        {/* Chat Window */}
        {isOpen && (
          <div className="mt-2 w-80 h-[450px] bg-white rounded-xl shadow-2xl flex flex-col overflow-hidden animate-fade-in">
            <div className="bg-green-700 text-white p-3 flex justify-between items-center">
              <h3 className="font-bold">Chat</h3>
              <button onClick={toggleChat}>❌</button>
            </div>

            <div className="flex-1 p-3 overflow-y-auto flex flex-col gap-2">
              {messages.map((m) => (
                <div
                  key={m.id}
                  className={`p-2 rounded-md max-w-[75%] ${
                    m.sender === role ? "bg-green-100 self-end" : "bg-gray-200 self-start"
                  }`}
                >
                  <p>{m.message}</p>
                  <span className="text-xs text-gray-500">
                    {new Date(m.timestamp).toLocaleTimeString()}
                  </span>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            <div className="p-2 border-t flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type a message..."
                className="flex-1 p-2 border rounded focus:outline-none focus:ring-2 focus:ring-green-600"
                onKeyDown={(e) => e.key === "Enter" && sendMessage()}
              />
              <button
                onClick={sendMessage}
                className="px-3 py-1 bg-green-700 text-white rounded hover:bg-green-800"
              >
                Send
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
