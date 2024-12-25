import React, { useEffect, useRef, useState } from "react";
import { IoMdMic, IoMdMicOff } from "react-icons/io";
import { IoSend } from "react-icons/io5";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";

import "./styles.css";

const MessageInput = ({ sendMessage }) => {
  const [messageText, setMessageText] = useState("");
  const [mic, setMic] = useState(false);
  const { transcript, resetTranscript } = useSpeechRecognition();

  const handleSendMessage = () => {
    sendMessage(messageText);
    resetTranscript();
    setMessageText("");
    SpeechRecognition.stopListening();
  };

  useEffect(() => {
    setMessageText(transcript);
  }, [transcript]);

  return (
    <div className="message-input">
      <input
        type="text"
        placeholder="enter message"
        value={messageText}
        onChange={(e) => setMessageText(e.target.value)}
      />
      {mic ? (
        <IoMdMicOff
          size={27}
          onClick={() => {
            setMic(false);
            SpeechRecognition.stopListening();
          }}
        />
      ) : (
        <IoMdMic
          size={27}
          onClick={() => {
            setMic(true);
            SpeechRecognition.startListening({ continuous: true });
          }}
        />
      )}
      {messageText !== "" && <IoSend size={25} onClick={handleSendMessage} />}
    </div>
  );
};

export default MessageInput;
