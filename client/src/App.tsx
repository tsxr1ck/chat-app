import { useState, useEffect, useRef } from 'react';
import axios, { AxiosResponse } from 'axios';
import { NicknameModal } from '@/components/NicknameModal';
import { ChatInterface } from '@/components/ChatInterface';
import { Message } from '@/components/ChatMessage';
import { io, Socket } from 'socket.io-client';

const SOCKET_SERVER_URL = import.meta.env.VITE_SOCKET_SERVER_URL || "http://localhost:3001";

function App() {
  const [nickname, setNickname] = useState<string>('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [showModal, setShowModal] = useState(true);
  const socketRef = useRef<Socket | null>(null);

  useEffect(() => {
    if (!nickname) return;
    // Fetch old messages first
    axios.get<MessageFromServer[]>(`${SOCKET_SERVER_URL}/messages`).then((res: AxiosResponse<MessageFromServer[]>) => {
      setMessages(
        res.data.map((msg) => ({
          id: String(msg.id),
          nickname: msg.username,
          content: msg.content,
          timestamp: msg.created_at ? new Date(msg.created_at) : new Date(),
          isOwn: msg.username === nickname,
        }))
      );
      // Then connect to socket
      socketRef.current = io(SOCKET_SERVER_URL);
      socketRef.current.on('connect', () => {
        // Optionally, you can emit a join event here
      });
      socketRef.current.on('chat message', (msg: MessageFromServer) => {
        setMessages(prev => [
          ...prev,
          {
            id: String(msg.id),
            nickname: msg.username,
            content: msg.content,
            timestamp: msg.created_at ? new Date(msg.created_at) : new Date(),
            isOwn: msg.username === nickname,
          }
        ]);
      });
    });
// Type for messages from server
type MessageFromServer = {
  id: number | string;
  username: string;
  content: string;
  created_at?: string;
};
    return () => {
      socketRef.current?.disconnect();
    };
  }, [nickname]);

  const handleNicknameSubmit = (newNickname: string) => {
    setNickname(newNickname);
    setShowModal(false);
    setMessages([]);
  };

  const handleSendMessage = (content: string) => {
    if (!socketRef.current) return;
    socketRef.current.emit('chat message', {
      username: nickname,
      content,
    });
  };

  const handleLogout = () => {
    setNickname('');
    setMessages([]);
    setShowModal(true);
    socketRef.current?.disconnect();
  };

  return (
    <div className="min-h-screen h-screen w-screen bg-gradient-to-br from-blue-900 via-blue-800 to-blue-900">
      <NicknameModal 
        open={showModal} 
        onSubmit={handleNicknameSubmit} 
      />
      {nickname && !showModal && (
        <ChatInterface
          nickname={nickname}
          messages={messages}
          onSendMessage={handleSendMessage}
          onLogout={handleLogout}
        />
      )}
    </div>
  );
}

export default App;
