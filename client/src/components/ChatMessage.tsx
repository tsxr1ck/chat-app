import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';
import { Heart } from 'lucide-react';

export interface Message {
  id: string;
  nickname: string;
  content: string;
  timestamp: Date;
  isOwn?: boolean;
}

interface ChatMessageProps {
  message: Message;
}

export function ChatMessage({ message }: ChatMessageProps) {
  return (
    <div className={cn(
      'flex gap-4 max-w-[85%] mb-6 group',
      message.isOwn ? 'ml-auto flex-row-reverse' : 'mr-auto'
    )}>
      <Avatar className="w-10 h-10 flex-shrink-0 ring-2 ring-white/20 shadow-lg">
        <AvatarFallback className={cn(
          "text-sm font-bold text-white",
          message.isOwn 
            ? "bg-gradient-to-br from-cyan-400 to-blue-500" 
            : "bg-gradient-to-br from-purple-400 to-pink-500"
        )}>
          {message.nickname.substring(0, 2).toUpperCase()}
        </AvatarFallback>
      </Avatar>
      
      <div className={cn(
        'flex flex-col max-w-full',
        message.isOwn ? 'items-end' : 'items-start'
      )}>
        <div className={cn(
          'rounded-3xl px-6 py-4 max-w-full break-words shadow-lg backdrop-blur-sm transition-all duration-200 group-hover:shadow-xl',
          message.isOwn 
            ? 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-br-lg' 
            : 'bg-white/90 text-gray-800 rounded-bl-lg border border-white/20'
        )}>
          <p className="text-base leading-relaxed">{message.content}</p>
        </div>
        
        <div className={cn(
          'flex items-center gap-2 mt-2 text-sm opacity-70 group-hover:opacity-100 transition-opacity',
          message.isOwn ? 'flex-row-reverse' : 'flex-row'
        )}>
          <span className="font-semibold text-white/90">{message.nickname}</span>
          <Heart className="w-3 h-3 text-pink-300" />
          <span className="text-white/70">{format(message.timestamp, 'HH:mm')}</span>
        </div>
      </div>
    </div>
  );
}