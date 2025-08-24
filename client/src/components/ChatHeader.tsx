import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { LogOut, MessageCircle, Users, Sparkles } from 'lucide-react';

interface ChatHeaderProps {
  nickname: string;
  onLogout: () => void;
  messageCount: number;
}

export function ChatHeader({ nickname, onLogout, messageCount }: ChatHeaderProps) {
  return (
    <div className="flex flex-col sm:flex-row items-center justify-between px-2 py-3 sm:p-6 bg-white/10 backdrop-blur-md border-b border-white/20 w-full">
      <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-6 w-full sm:w-auto">
        <div className="flex items-center gap-2 sm:gap-3">
          <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-2xl bg-gradient-to-r from-cyan-400 to-blue-500 flex items-center justify-center shadow-lg">
            <MessageCircle className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
          </div>
          <div>
            <h1 className="text-lg sm:text-2xl font-bold text-white">ChatRoom</h1>
            <p className="text-xs sm:text-sm text-white/70">Connect & Chat</p>
          </div>
        </div>
        <div className="hidden sm:block h-8 w-px bg-white/20" />
        <div className="flex items-center gap-1 sm:gap-2 text-xs sm:text-sm text-white/80 bg-white/10 rounded-full px-2 py-1 sm:px-4 sm:py-2 mt-2 sm:mt-0">
          <Users className="w-3 h-3 sm:w-4 sm:h-4 text-cyan-300" />
          <span className="font-medium">{messageCount} messages</span>
          <Sparkles className="w-2 h-2 sm:w-3 sm:h-3 text-yellow-300" />
        </div>
      </div>
      <div className="flex items-center gap-2 sm:gap-4 mt-2 sm:mt-0">
        <div className="flex items-center gap-2 sm:gap-3 bg-white/10 rounded-full px-2 py-1 sm:px-4 sm:py-2">
          <Avatar className="w-7 h-7 sm:w-8 sm:h-8 ring-2 ring-white/30">
            <AvatarFallback className="text-xs sm:text-sm font-bold text-white bg-gradient-to-br from-purple-400 to-pink-500">
              {nickname.substring(0, 2).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <span className="text-sm sm:text-base font-semibold text-white">{nickname}</span>
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={onLogout}
          className="gap-1 sm:gap-2 text-white/80 hover:text-white hover:bg-white/10 rounded-full px-2 py-1 sm:px-4 sm:py-2 transition-all duration-200"
        >
          <LogOut className="w-4 h-4" />
          <span className="hidden sm:inline">Leave</span>
        </Button>
      </div>
    </div>
  );
}