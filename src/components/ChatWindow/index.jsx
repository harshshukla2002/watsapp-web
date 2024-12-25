import React, { useContext, useEffect, useState } from "react";

import "./styles.css";
import Message from "../Message";
import MessageInput from "../MessageInput";
import MessageContext from "../../contexts/MessageContext";

const ChatWindow = () => {
  let { messages, selectedContact, handleSendMessage, messageContent } =
    useContext(MessageContext);

  console.log(messages, messageContent);

  const handleSend = (message) => {
    if (message.trim()) {
      handleSendMessage(message);
    }
  };

  return (
    <div className="chat-screen">
      <div className="header">{selectedContact}</div>
      <div className="message-container">
        {messageContent.map((msg, index) => {
          if (msg.contact === selectedContact) {
            return <Message key={index.id} message={msg.text} />;
          }
        })}
      </div>
      <MessageInput sendMessage={handleSend} />
    </div>
  );
};

export default ChatWindow;
