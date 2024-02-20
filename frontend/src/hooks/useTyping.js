import { useEffect, useState } from "react";
import { useSocketContext } from "../context/socketContext";

const useTyping = () => {
  const [typing, setTyping] = useState(false);
  const { socket } = useSocketContext();
  useEffect(() => {
    if (socket) {
      socket.on("isTyping", (flag) => {
        console.log(flag);
      });
    }
  }, [socket]);
};

export default useTyping;
