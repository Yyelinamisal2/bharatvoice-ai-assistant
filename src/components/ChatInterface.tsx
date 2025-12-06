import { useState, useRef, useEffect } from "react";
import { Send, ArrowRightLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import LanguageSelector from "@/components/LanguageSelector";
import VoiceButton from "@/components/VoiceButton";
import { type LanguageCode, type Message } from "@/lib/languages";
import { cn } from "@/lib/utils";

const ChatInterface = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState("");
  const [sourceLanguage, setSourceLanguage] = useState<LanguageCode>("en");
  const [targetLanguage, setTargetLanguage] = useState<LanguageCode>("hi");
  const [isListening, setIsListening] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const swapLanguages = () => {
    setSourceLanguage(targetLanguage);
    setTargetLanguage(sourceLanguage);
  };

  const handleSend = async () => {
    if (!inputText.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputText,
      role: "user",
      timestamp: new Date(),
      language: sourceLanguage,
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText("");
    setIsLoading(true);

    // Simulate AI response (would connect to backend)
    setTimeout(() => {
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: `Translation of "${inputText}" to ${targetLanguage} would appear here. Connect to Lovable Cloud for real AI translation.`,
        role: "assistant",
        timestamp: new Date(),
        language: targetLanguage,
      };
      setMessages(prev => [...prev, assistantMessage]);
      setIsLoading(false);
    }, 1000);
  };

  const toggleVoiceInput = () => {
    setIsListening(!isListening);
    // Voice recognition would be implemented here
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <section id="chat" className="py-16 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-3">
            Start <span className="text-gradient-accent">Translating</span>
          </h2>
          <p className="text-muted-foreground">
            Type or speak in your language. Get instant translations and assistance.
          </p>
        </div>

        <div className="bg-card rounded-3xl shadow-card border border-border overflow-hidden">
          {/* Language Selector Bar */}
          <div className="flex items-center justify-center gap-4 p-4 bg-muted/30 border-b border-border">
            <LanguageSelector
              value={sourceLanguage}
              onChange={setSourceLanguage}
              label="From"
            />
            <Button
              variant="ghost"
              size="icon"
              onClick={swapLanguages}
              className="rounded-full hover:bg-primary/10 hover:text-primary"
            >
              <ArrowRightLeft className="w-5 h-5" />
            </Button>
            <LanguageSelector
              value={targetLanguage}
              onChange={setTargetLanguage}
              label="To"
            />
          </div>

          {/* Messages Area */}
          <div className="h-[400px] overflow-y-auto p-4 space-y-4">
            {messages.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center">
                <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mb-4">
                  <span className="text-3xl">🙏</span>
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  नमस्ते! Welcome to BharatVoice
                </h3>
                <p className="text-muted-foreground max-w-sm">
                  Type a message or tap the microphone to start speaking. I'll help you translate and navigate services.
                </p>
              </div>
            ) : (
              messages.map((message) => (
                <div
                  key={message.id}
                  className={cn(
                    "flex animate-slide-up",
                    message.role === "user" ? "justify-end" : "justify-start"
                  )}
                >
                  <div
                    className={cn(
                      "max-w-[80%] px-4 py-3 rounded-2xl",
                      message.role === "user"
                        ? "bg-primary text-primary-foreground rounded-br-md"
                        : "bg-muted text-foreground rounded-bl-md"
                    )}
                  >
                    <p className="text-sm md:text-base">{message.content}</p>
                    <span className="text-xs opacity-70 mt-1 block">
                      {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>
                </div>
              ))
            )}
            {isLoading && (
              <div className="flex justify-start animate-fade-in">
                <div className="bg-muted px-4 py-3 rounded-2xl rounded-bl-md">
                  <div className="flex gap-1.5">
                    <span className="w-2 h-2 bg-primary/60 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                    <span className="w-2 h-2 bg-primary/60 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                    <span className="w-2 h-2 bg-primary/60 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="p-4 bg-muted/30 border-t border-border">
            <div className="flex items-center gap-3">
              <VoiceButton
                isListening={isListening}
                onClick={toggleVoiceInput}
              />
              <div className="flex-1 relative">
                <textarea
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  onKeyDown={handleKeyPress}
                  placeholder="Type your message..."
                  rows={1}
                  className="w-full px-4 py-3 bg-card border border-border rounded-xl resize-none focus:outline-none focus:border-primary/50 text-foreground placeholder:text-muted-foreground"
                />
              </div>
              <Button
                variant="hero"
                size="icon-lg"
                onClick={handleSend}
                disabled={!inputText.trim() || isLoading}
              >
                <Send className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ChatInterface;
