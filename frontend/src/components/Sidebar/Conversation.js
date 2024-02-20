import React, { useEffect } from "react";
import styles from "./Sidebar.module.css";
import { useDispatch, useSelector } from "react-redux";
import {
  addConversation,
  resetConversation,
  resetMessages
} from "../../redux/slice/conversationSlice";
import { useSocketContext } from "../../context/socketContext";
import { useNotification } from "../../context/notificationContext";

const Conversation = ({ profile, name, conversation }) => {
  const dispatch = useDispatch();
  const { selectedConversation } = useSelector((data) => data.conversation);
  const selected = selectedConversation?._id === conversation?._id;
  const { onlineUsers } = useSocketContext();
  const online = onlineUsers?.includes(conversation._id);
  const { notification, setNotification } = useNotification();

  const onSelectHandler = () => {
    dispatch(addConversation(conversation));
    setNotification([
      ...notification.filter((notify) => notify.sender_id !== conversation._id)
    ]);
  };

  useEffect(() => {
    return () => {
      dispatch(resetConversation());
      dispatch(resetMessages());
    };
  }, []);

  return (
    <div
      onClick={onSelectHandler}
      className={`${styles.tile} ${selected ? styles.activeTile : ""}`}>
      <div className={styles.left}>
        <div className={`${styles.avatar} ${online ? styles.online : ""}`}>
          <img src={profile} alt="profile" />
          <span></span>
        </div>
        <p className={styles.name}>{name}</p>
      </div>
      <div className={styles.right}>
        <span>🏀</span>
      </div>
    </div>
  );
};

export default Conversation;
