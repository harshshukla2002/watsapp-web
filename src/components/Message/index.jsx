import React from "react";

import "./styles.css";

const Message = ({ message }) => {
  return (
    <div className="messages">
      <div className="message">
        <p>{message}</p>
      </div>
    </div>
  );
};

export default Message;
