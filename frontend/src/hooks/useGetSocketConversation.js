import { useSelector, useDispatch } from "react-redux";
import { addMessages } from "../redux/slice/conversationSlice";
import { useSocketContext } from "../context/socketContext";
import { useEffect } from "react";

const useGetSocketConversation = () => {
  const { messages } = useSelector((data) => data.conversation);
  const dispatch = useDispatch();
  const { socket } = useSocketContext();

  useEffect(() => {
    socket.on("recieved-message", (msg) => {
      dispatch(addMessages([...messages, msg]));
    });

    return () => socket.off("recieved-message");
  }, [messages, socket]);
};

export default useGetSocketConversation;
