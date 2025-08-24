import { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { MessageCircle, Sparkles } from 'lucide-react';

interface NicknameModalProps {
  open: boolean;
  onSubmit: (nickname: string) => void;
}

export function NicknameModal({ open, onSubmit }: NicknameModalProps) {
  const [nickname, setNickname] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmedNickname = nickname.trim();
    
    if (!trimmedNickname) {
      setError('Please enter a nickname');
      return;
    }
    
    if (trimmedNickname.length < 2) {
      setError('Nickname must be at least 2 characters');
      return;
    }
    
    if (trimmedNickname.length > 20) {
      setError('Nickname must be less than 20 characters');
      return;
    }

    setError('');
    onSubmit(trimmedNickname);
  };

  return (
    <Dialog open={open}>
      <DialogContent className="sm:max-w-md bg-gradient-to-br from-blue-900 via-blue-800 to-blue-900 border-blue-700/50 text-white">
        <DialogHeader className="text-center">
          <div className="mx-auto w-16 h-16 rounded-full bg-gradient-to-r from-blue-400 to-cyan-400 flex items-center justify-center mb-4 shadow-lg">
            <MessageCircle className="w-8 h-8 text-white" />
          </div>
          <DialogTitle className="text-3xl font-bold bg-gradient-to-r from-blue-200 to-cyan-200 bg-clip-text text-transparent">
            Welcome to ChatRoom ✨
          </DialogTitle>
          <DialogDescription className="text-blue-200/80 text-base">
            Choose a nickname to start your amazing chat experience
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="nickname" className="text-blue-100 font-medium">Your Nickname</Label>
            <Input
              id="nickname"
              placeholder="Enter something cool..."
              value={nickname}
              onChange={(e) => {
                setNickname(e.target.value);
                setError('');
              }}
              className={`bg-blue-800/50 border-blue-600/50 text-white placeholder:text-blue-300/60 focus:border-cyan-400 focus:ring-cyan-400/20 rounded-xl h-12 ${error ? 'border-red-400' : ''}`}
              autoFocus
            />
            {error && (
              <p className="text-sm text-red-300 flex items-center gap-1">
                <Sparkles className="w-3 h-3" />
                {error}
              </p>
            )}
          </div>
          
          <DialogFooter>
            <Button 
              type="submit" 
              className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white font-semibold rounded-xl h-12 shadow-lg transition-all duration-200 hover:shadow-xl hover:scale-[1.02]" 
              size="lg"
            >
              <MessageCircle className="w-4 h-4 mr-2" />
              Join the Fun! 🚀
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}