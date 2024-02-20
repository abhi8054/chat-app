import React from "react";
import styles from "./MessageContainer.module.css";
import Message from "./Message";
import useGetMessages from "../../hooks/useGetMessages";

const Messages = () => {
  const { loading, messages } = useGetMessages();

  return (
    <div className={styles.messageContainer}>
      {!loading &&
        messages.length !== 0 &&
        messages.map((msg) => {
          return <Message message={msg} />;
        })}
      {!loading && messages.length === 0 && (
        <div className={styles.warning}>
          <p>Send message to start conversation.</p>
        </div>
      )}
    </div>
  );
};

export default Messages;
