import React from "react";

const Console = ({ messages }) => {
  return (
    <div className="console scroll-container">
      <h2> Messages</h2>
      {messages.map(
        (message, index) =>
          index !== 0 && (
            <div className="msg" key={index}>
              <b>{message}</b>
            </div>
          )
      )}
    </div>
  );
};

export default Console;
