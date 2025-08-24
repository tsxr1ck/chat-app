import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Send } from 'lucide-react';

interface ChatInputProps {
  onSendMessage: (message: string) => void;
  disabled?: boolean;
}

export function ChatInput({ onSendMessage, disabled }: ChatInputProps) {
  const [message, setMessage] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!disabled && inputRef.current) {
      inputRef.current.focus();
    }
  }, [disabled]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmedMessage = message.trim();
    if (!trimmedMessage || disabled) return;
    onSendMessage(trimmedMessage);
    setMessage('');
    // Refocus after sending
    if (inputRef.current) inputRef.current.focus();
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-4 p-6 bg-white/10 backdrop-blur-md border-t border-white/20">
      <Input
        ref={inputRef}
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Type something amazing... ✨"
        className="flex-1 bg-white/20 border-white/30 text-white placeholder:text-white/60 focus:border-cyan-400 focus:ring-cyan-400/20 rounded-2xl h-14 px-6 text-base"
        disabled={disabled}
        maxLength={500}
      />
      <Button 
        type="submit" 
        size="lg"
        disabled={!message.trim() || disabled}
        className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white rounded-2xl h-14 px-6 shadow-lg transition-all duration-200 hover:shadow-xl hover:scale-105 disabled:opacity-50 disabled:hover:scale-100"
      >
        <Send className="w-5 h-5" />
      </Button>
    </form>
  );
}