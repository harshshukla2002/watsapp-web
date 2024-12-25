import { useEffect, useReducer, useState } from "react";

import "./App.css";
import ChatWindow from "./components/ChatWindow";
import ContactList from "./components/ContactList";
import { reducer as contactReducer } from "./reducers/ContactReducer/reducer";
import { reducer as messageReducer } from "./reducers/MesssageReducer/reducer";
import ContactContext from "./contexts/ContactContext";
import MessageContext from "./contexts/MessageContext";
import { SET_CONTACT } from "./reducers/ContactReducer/actiontype";
import useIndexedDB from "./custom-hooks/useIndexDB";
import { ADD_MESSAGE } from "./reducers/MesssageReducer/actiontype";

function App() {
  const [contacts, dispatchContacts] = useReducer(contactReducer, []);
  const [messages, dispatchMessages] = useReducer(messageReducer, {});
  const [selectedContact, setSelectedContact] = useState(null);
  const { addMessage, getMessages } = useIndexedDB("ChatAppDB");
  const [messageTxt, setMessageTxt] = useState("");
  const [messageContent, setMessageContent] = useState([]);

  const fetchContacts = () => {
    const mockContacts = ["Ravi", "John", "Vikram", "Nikhil"];
    dispatchContacts({ type: SET_CONTACT, payload: mockContacts });
  };

  const fetchMessages = async () => {
    const storedMessages = await getMessages();
    const uniqueMessages = {}; // Temporary storage to filter duplicates

    setMessageContent(storedMessages);

    storedMessages.forEach((msg) => {
      if (!uniqueMessages[msg.contact]) uniqueMessages[msg.contact] = new Set();
      if (!uniqueMessages[msg.contact].has(msg.timestamp)) {
        uniqueMessages[msg.contact].add(msg.timestamp);

        // Check if the message already exists in the state
        const existingMessages = messages[msg.contact] || [];
        const isMessageNew = !existingMessages.some(
          (existingMsg) => existingMsg.timestamp === msg.timestamp
        );

        if (isMessageNew) {
          dispatchMessages({
            type: ADD_MESSAGE,
            contact: msg.contact,
            payload: msg,
          });
        }
      }
    });
  };

  useEffect(() => {
    fetchContacts();
  }, []);

  useEffect(() => {
    fetchMessages(); // Call this only once on mount, not on every message send
  }, []);

  const handleSendMessage = async (message) => {
    setMessageTxt(message);
    const newMessage = {
      contact: selectedContact,
      text: message,
      timestamp: new Date().toISOString(),
    };
    dispatchMessages({
      type: "ADD_MESSAGE",
      contact: selectedContact,
      payload: newMessage,
    });
    setMessageContent((prevMessages) => [...prevMessages, newMessage]);
    await addMessage(newMessage);
  };

  return (
    <ContactContext.Provider
      value={{ contacts, selectedContact, setSelectedContact }}
    >
      <MessageContext.Provider
        value={{ messages, selectedContact, handleSendMessage, messageContent }}
      >
        <div className="App">
          <div className="main-container">
            <ContactList />
            <ChatWindow />
          </div>
        </div>
      </MessageContext.Provider>
    </ContactContext.Provider>
  );
}

export default App;
