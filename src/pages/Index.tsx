import { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Card } from '@/components/ui/card';
import Icon from '@/components/ui/icon';

interface Message {
  id: number;
  text: string;
  sender: 'user' | 'ai';
  timestamp: Date;
}

const AI_RESPONSES = [
  "Привет! Рада тебя видеть 💫",
  "Интересный вопрос! Давай обсудим это подробнее...",
  "Я здесь, чтобы помочь тебе. Чем я могу быть полезна?",
  "Это отличная идея! Расскажи мне больше.",
  "Я понимаю тебя. Давай найдём решение вместе.",
];

export default function Index() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "Привет! Я твой AI-ассистент. Как твои дела? 💜",
      sender: 'ai',
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: messages.length + 1,
      text: inputValue,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages([...messages, userMessage]);
    setInputValue('');
    setIsTyping(true);

    setTimeout(() => {
      const aiResponse: Message = {
        id: messages.length + 2,
        text: AI_RESPONSES[Math.floor(Math.random() * AI_RESPONSES.length)],
        sender: 'ai',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, aiResponse]);
      setIsTyping(false);
    }, 1500);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-accent/20 to-secondary/20">
      <div className="container mx-auto h-screen flex flex-col p-4 max-w-4xl">
        <header className="py-6 flex items-center gap-4 border-b border-border/50 backdrop-blur-sm">
          <Avatar className="h-16 w-16 border-4 border-primary/20 shadow-lg">
            <AvatarImage 
              src="https://cdn.poehali.dev/projects/3896beb7-c0c5-46e8-884f-aafdef4f6e81/files/3db793d8-32d2-471e-b2dd-fdaa5e4535e9.jpg" 
              alt="AI Assistant" 
            />
            <AvatarFallback className="bg-primary text-primary-foreground text-xl">AI</AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <h1 className="text-2xl font-display font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Виртуальный Ассистент
            </h1>
            <p className="text-sm text-muted-foreground">Всегда на связи • Онлайн</p>
          </div>
          <Button variant="ghost" size="icon" className="rounded-full">
            <Icon name="MoreVertical" size={20} />
          </Button>
        </header>

        <div className="flex-1 overflow-y-auto py-6 space-y-4 scrollbar-thin">
          {messages.map((message, index) => (
            <div
              key={message.id}
              className={`flex gap-3 animate-fade-in ${
                message.sender === 'user' ? 'flex-row-reverse' : 'flex-row'
              }`}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {message.sender === 'ai' && (
                <Avatar className="h-10 w-10 border-2 border-primary/30 shadow-md">
                  <AvatarImage 
                    src="https://cdn.poehali.dev/projects/3896beb7-c0c5-46e8-884f-aafdef4f6e81/files/3db793d8-32d2-471e-b2dd-fdaa5e4535e9.jpg" 
                    alt="AI" 
                  />
                  <AvatarFallback className="bg-primary text-primary-foreground">AI</AvatarFallback>
                </Avatar>
              )}
              <div className={`flex flex-col max-w-[70%] ${message.sender === 'user' ? 'items-end' : 'items-start'}`}>
                <Card
                  className={`px-4 py-3 shadow-lg ${
                    message.sender === 'user'
                      ? 'bg-gradient-to-br from-primary to-primary/90 text-primary-foreground border-primary/50'
                      : 'bg-card border-border/50 backdrop-blur-sm'
                  }`}
                >
                  <p className="text-sm leading-relaxed">{message.text}</p>
                </Card>
                <span className="text-xs text-muted-foreground mt-1 px-2">
                  {message.timestamp.toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' })}
                </span>
              </div>
            </div>
          ))}

          {isTyping && (
            <div className="flex gap-3 animate-fade-in">
              <Avatar className="h-10 w-10 border-2 border-primary/30 shadow-md">
                <AvatarImage 
                  src="https://cdn.poehali.dev/projects/3896beb7-c0c5-46e8-884f-aafdef4f6e81/files/3db793d8-32d2-471e-b2dd-fdaa5e4535e9.jpg" 
                  alt="AI" 
                />
                <AvatarFallback className="bg-primary text-primary-foreground">AI</AvatarFallback>
              </Avatar>
              <Card className="px-4 py-3 bg-card border-border/50 backdrop-blur-sm shadow-lg">
                <div className="flex gap-1">
                  <span className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0s' }}></span>
                  <span className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></span>
                  <span className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></span>
                </div>
              </Card>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        <footer className="py-4 border-t border-border/50 backdrop-blur-sm">
          <div className="flex gap-2">
            <Input
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Напиши сообщение..."
              className="flex-1 border-primary/20 focus:border-primary bg-card/50 backdrop-blur-sm"
            />
            <Button
              onClick={handleSendMessage}
              disabled={!inputValue.trim()}
              className="bg-gradient-to-r from-primary to-secondary hover:opacity-90 transition-opacity shadow-lg px-6"
            >
              <Icon name="Send" size={20} />
            </Button>
          </div>
        </footer>
      </div>
    </div>
  );
}
