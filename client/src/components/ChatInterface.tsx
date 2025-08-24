import { useRef, useEffect } from 'react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { ChatMessage, Message } from './ChatMessage';
import { ChatInput } from './ChatInput';
import { ChatHeader } from './ChatHeader';
import { MessageCircle, Sparkles } from 'lucide-react';

interface ChatInterfaceProps {
  nickname: string;
  messages: Message[];
  onSendMessage: (message: string) => void;
  onLogout: () => void;
}

export function ChatInterface({ nickname, messages, onSendMessage, onLogout }: ChatInterfaceProps) {
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollAreaRef.current) {
      const scrollContainer = scrollAreaRef.current.querySelector('[data-radix-scroll-area-viewport]');
      if (scrollContainer) {
        scrollContainer.scrollTo({
          top: scrollContainer.scrollHeight,
          behavior: 'smooth'
        });
      }
    }
  }, [messages]);

  return (
  <div className="flex flex-col w-full h-screen max-h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-blue-900">
      <ChatHeader 
        nickname={nickname} 
        onLogout={onLogout}
        messageCount={messages.length}
      />
      
  <ScrollArea ref={scrollAreaRef} className="flex-1 px-1 sm:px-6">
  <div className="py-3 sm:py-6 space-y-2">
          {messages.length === 0 ? (
            <div className="flex items-center justify-center h-full min-h-[200px] sm:min-h-[400px] text-center">
              <div className="space-y-4 sm:space-y-6 max-w-xs sm:max-w-md">
                <div className="w-16 h-16 sm:w-24 sm:h-24 mx-auto rounded-full bg-gradient-to-r from-cyan-400 to-blue-500 flex items-center justify-center shadow-2xl">
                  <MessageCircle className="w-8 h-8 sm:w-12 sm:h-12 text-white" />
                </div>
                <div className="space-y-2 sm:space-y-3">
                  <h3 className="text-lg sm:text-2xl font-bold text-white flex items-center justify-center gap-2">
                    No messages yet <Sparkles className="w-4 h-4 sm:w-6 sm:h-6 text-yellow-300" />
                  </h3>
                  <p className="text-base sm:text-lg text-white/70">Be the first to start this amazing conversation!</p>
                  <p className="text-xs sm:text-sm text-white/50">Share your thoughts, ideas, or just say hello! 44b</p>
                </div>
              </div>
            </div>
          ) : (
            messages.map((message) => (
              <ChatMessage key={message.id} message={message} />
            ))
          )}
        </div>
      </ScrollArea>
      
      <ChatInput onSendMessage={onSendMessage} />
    </div>
  );
}