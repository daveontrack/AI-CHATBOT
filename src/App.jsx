//
import React, { useState } from "react";
import ChatbotIcon from "./components/ChatbotIcon";
import ChatForm from "./components/ChatForm";
import ChatMessage from "./components/ChatMessage";

const App = () => {
  const [chatHistory, setChatHistory] = useState([]);

  const generateBotResponse = async (history) => {
    const updateHistory = (text) => {
      setChatHistory((prev) => [
        ...prev.filter((msg) => msg.text !== " Dave Ai is Thinking..."),
        { role: "model", text },
      ]);
    };

    // Format the history for the API request
    history = history.map(({ role, text }) => ({
      role,
      parts: [{ text }],
    }));

    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ content: history }),
    };

    try {
      // Make API request to Gemini
      const response = await fetch(
        import.meta.env.VITE_API_URL,
        requestOptions
      );

      // Check if response is successful
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(
          errorText || "Something went wrong with the API request!"
        );
      }

      // Parse the JSON response
      const data = await response.json();
      console.log("API Response:", data); // Log the response for debugging

      // Extract and clean up the response text
      const apiResponseText = data.candidates[0].content.parts[0].text
        .replace(/\*\*(.*?)\*\*/g, "$1")
        .trim();

      // Update chat history with bot's response
      updateHistory(apiResponseText);
    } catch (error) {
      console.log("Error:", error);
    }
  };

  return (
    <div className="container">
      <div className="chatbot-popup">
        {/* Chatbot Header */}
        <div className="chat-header">
          <div className="header-info">
            <ChatbotIcon />
            <h2 className="logo-text">Chatbot</h2>
          </div>
          <button>
            <span className="material-symbols-rounded">
              keyboard_arrow_down
            </span>
          </button>
        </div>

        {/* Chatbot Body */}
        <div className="chat-body">
          <div className="message bot-message">
            <ChatbotIcon />
            <p className="message-text">
              hey there 👋 <br /> How can I help you today?
            </p>
          </div>
          {chatHistory.map((chat, index) => (
            <ChatMessage key={index} chat={chat} />
          ))}
        </div>

        {/* Chatbot Footer (Form for sending messages) */}
        <div className="chat-footer">
          <ChatForm
            chatHistory={chatHistory}
            setChatHistory={setChatHistory}
            generateBotResponse={generateBotResponse}
          />
        </div>
      </div>
    </div>
  );
};

export default App;
