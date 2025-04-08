import React, { useRef } from "react";

const ChatForm = ({ chatHistory, setChatHistory, generateBotResponse }) => {
  const inputRef = useRef();

  const handleFormSubmit = (e) => {
    e.preventDefault();

    const userMessage = inputRef.current.value.trim();
    if (!userMessage) return;

    // Clear the input after submission
    inputRef.current.value = "";

    // Add user message to chat history
    setChatHistory((prev) => [
      ...prev,
      { role: "user", text: userMessage },
    ]);

    // Simulate thinking message after a slight delay
    setTimeout(() => {
      setChatHistory((prev) => [
        ...prev,
        { role: "model", text: "Dave Ai is Thinking..." },
      ]);
    }, 600);

    // Trigger bot response generation
    generateBotResponse([...chatHistory, { role: "user", text: userMessage }]);
  };

  return (
    <form className="chat-form" onSubmit={handleFormSubmit}>
      <input
        ref={inputRef}
        type="text"
        placeholder="Type your message..."
        className="message-input"
        required
      />
      <button>
        <span className="material-symbols-rounded">arrow_upward</span>
      </button>
    </form>
  );
};

export default ChatForm;
