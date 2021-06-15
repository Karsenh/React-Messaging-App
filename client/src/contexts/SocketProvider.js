import React, { useContext, useEffect, useState } from 'react';
import io from 'socket.io-client';

const SocketContext = React.createContext();

export function useSocket() {
  return useContext(SocketContext);
}

export function SocketProvider({ children, id }) {
  useEffect(() => {
    const newSocket = io('http://localhost:5000', { query: { id } });
    setSocket(newSocket);

    return () => newSocket.close();
  }, [id]);
  const [socket, setSocket] = useState();
  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
}
