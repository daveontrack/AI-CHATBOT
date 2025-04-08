import React from "react";
import ChatbotIcon from "./ChatbotIcon";

const ChatMessage = ({ chat }) => {
  const isUser = chat.role === "user";
  const isBot = chat.role === "model";

  return (
    <div className={`message ${isUser ? "user-message" : "bot-message"}`}>
      {!isUser && <ChatbotIcon />}
      <p className="message-text">
        {chat.loading ? "Dave Ai is Thinking..." : chat.text}
      </p>
    </div>
  );
};

export default ChatMessage;
