import { createContext, useContext, useEffect, useState } from "react";
import { useAuthContext } from "./authContext";
import io from "socket.io-client";

const SocketContext = createContext();

export const useSocketContext = () => {
  return useContext(SocketContext);
};

export const SocketContextProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState();
  const { user } = useAuthContext();

  useEffect(() => {
    console.log(user);
    if (user) {
      const socket = io("http://172.17.135.11:5500", {
        query: {
          userId: user.id
        }
      });

      setSocket(socket);

      socket.on("onlineusers", (users) => {
        console.log(users);
        setOnlineUsers([...users]);
      });

      return () => {
        socket.close();
      };
    } else {
      if (socket) {
        socket.close();
        setSocket(null);
      }
    }
  }, [user]);

  return (
    <SocketContext.Provider value={{ socket, onlineUsers }}>
      {children}
    </SocketContext.Provider>
  );
};
