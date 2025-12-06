import { useState, useRef, useEffect, useCallback } from "react";
import { Send, ArrowRightLeft, Volume2, VolumeX, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import LanguageSelector from "@/components/LanguageSelector";
import VoiceButton from "@/components/VoiceButton";
import { type LanguageCode, type Message, INDIAN_LANGUAGES } from "@/lib/languages";
import { cn } from "@/lib/utils";
import { useAIChat } from "@/hooks/useAIChat";
import { useVoiceRecognition } from "@/hooks/useVoiceRecognition";
import { useTextToSpeech } from "@/hooks/useTextToSpeech";
import { toast } from "sonner";

const ChatInterface = () => {
  const [inputText, setInputText] = useState("");
  const [sourceLanguage, setSourceLanguage] = useState<LanguageCode>("en");
  const [targetLanguage, setTargetLanguage] = useState<LanguageCode>("hi");
  const [autoSpeak, setAutoSpeak] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const lastSpokenMessageRef = useRef<string>("");

  const { messages, isLoading, sendMessage, clearMessages } = useAIChat({
    sourceLanguage,
    targetLanguage,
  });

  const { isSpeaking, speak, stop } = useTextToSpeech({
    language: targetLanguage,
    onError: (error) => toast.error(error),
  });

  const { isListening, toggleListening, isSupported: voiceSupported } = useVoiceRecognition({
    language: sourceLanguage,
    onResult: (transcript) => {
      setInputText(transcript);
      // Auto-send voice input
      if (transcript.trim()) {
        handleSendWithContent(transcript);
      }
    },
    onError: (error) => toast.error(error),
  });

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Auto-speak new assistant messages
  useEffect(() => {
    if (autoSpeak && messages.length > 0) {
      const lastMessage = messages[messages.length - 1];
      if (
        lastMessage.role === "assistant" &&
        lastMessage.content &&
        lastMessage.content !== lastSpokenMessageRef.current &&
        !isLoading
      ) {
        lastSpokenMessageRef.current = lastMessage.content;
        speak(lastMessage.content);
      }
    }
  }, [messages, isLoading, autoSpeak, speak]);

  const swapLanguages = () => {
    setSourceLanguage(targetLanguage);
    setTargetLanguage(sourceLanguage);
  };

  const handleSendWithContent = async (content: string) => {
    if (!content.trim()) return;
    setInputText("");
    await sendMessage(content);
  };

  const handleSend = async () => {
    await handleSendWithContent(inputText);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleSpeakMessage = (message: Message) => {
    if (isSpeaking) {
      stop();
    } else {
      speak(message.content);
    }
  };

  const getLanguageName = (code: LanguageCode) => {
    return INDIAN_LANGUAGES.find(l => l.code === code)?.name || code;
  };

  return (
    <section id="chat" className="py-16 px-4 relative z-10">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-3">
            Voice-to-Voice <span className="text-gradient-accent">Translation</span>
          </h2>
          <p className="text-muted-foreground">
            Speak or type in any of 22+ Indian languages. Get instant AI-powered translations.
          </p>
        </div>

        <div className="bg-card/80 backdrop-blur-xl rounded-3xl shadow-card border border-border overflow-hidden">
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
              className="rounded-full hover:bg-primary/10 hover:text-primary transition-all duration-300"
            >
              <ArrowRightLeft className="w-5 h-5" />
            </Button>
            <LanguageSelector
              value={targetLanguage}
              onChange={setTargetLanguage}
              label="To"
            />
          </div>

          {/* Auto-speak toggle and clear */}
          <div className="flex items-center justify-between px-4 py-2 bg-muted/20 border-b border-border">
            <button
              onClick={() => setAutoSpeak(!autoSpeak)}
              className={cn(
                "flex items-center gap-2 text-sm px-3 py-1.5 rounded-full transition-all",
                autoSpeak 
                  ? "bg-primary/20 text-primary" 
                  : "bg-muted text-muted-foreground hover:bg-muted/80"
              )}
            >
              {autoSpeak ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
              Auto-speak responses
            </button>
            {messages.length > 0 && (
              <Button
                variant="ghost"
                size="sm"
                onClick={clearMessages}
                className="text-muted-foreground hover:text-destructive"
              >
                <Trash2 className="w-4 h-4 mr-1" />
                Clear
              </Button>
            )}
          </div>

          {/* Messages Area */}
          <div className="h-[400px] overflow-y-auto p-4 space-y-4">
            {messages.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center">
                <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center mb-4 animate-float">
                  <span className="text-4xl">🎙️</span>
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  नमस्ते! Welcome to BharatVoice
                </h3>
                <p className="text-muted-foreground max-w-sm mb-4">
                  Tap the microphone to speak, or type your message. I'll translate and respond in your chosen language.
                </p>
                <div className="flex flex-wrap gap-2 justify-center text-xs text-muted-foreground">
                  <span className="px-2 py-1 bg-muted rounded-full">{getLanguageName(sourceLanguage)}</span>
                  <span>→</span>
                  <span className="px-2 py-1 bg-muted rounded-full">{getLanguageName(targetLanguage)}</span>
                </div>
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
                      "max-w-[80%] px-4 py-3 rounded-2xl group relative",
                      message.role === "user"
                        ? "bg-gradient-to-r from-primary to-primary/90 text-primary-foreground rounded-br-md"
                        : "bg-muted/80 backdrop-blur text-foreground rounded-bl-md"
                    )}
                  >
                    <p className="text-sm md:text-base whitespace-pre-wrap">{message.content}</p>
                    <div className="flex items-center justify-between mt-2">
                      <span className="text-xs opacity-70">
                        {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </span>
                      <button
                        onClick={() => handleSpeakMessage(message)}
                        className={cn(
                          "opacity-0 group-hover:opacity-100 transition-opacity p-1 rounded-full",
                          message.role === "user" 
                            ? "hover:bg-primary-foreground/20" 
                            : "hover:bg-primary/20"
                        )}
                      >
                        <Volume2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
            {isLoading && (
              <div className="flex justify-start animate-fade-in">
                <div className="bg-muted/80 backdrop-blur px-4 py-3 rounded-2xl rounded-bl-md">
                  <div className="flex gap-1.5">
                    <span className="w-2 h-2 bg-primary/60 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                    <span className="w-2 h-2 bg-accent/60 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                    <span className="w-2 h-2 bg-secondary/60 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
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
                onClick={toggleListening}
                disabled={!voiceSupported}
              />
              <div className="flex-1 relative">
                <textarea
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  onKeyDown={handleKeyPress}
                  placeholder={`Type or speak in ${getLanguageName(sourceLanguage)}...`}
                  rows={1}
                  className="w-full px-4 py-3 bg-card/80 backdrop-blur border border-border rounded-xl resize-none focus:outline-none focus:border-primary/50 focus:ring-2 focus:ring-primary/20 text-foreground placeholder:text-muted-foreground transition-all"
                />
              </div>
              <Button
                variant="hero"
                size="icon-lg"
                onClick={handleSend}
                disabled={!inputText.trim() || isLoading}
                className="shadow-glow"
              >
                <Send className="w-5 h-5" />
              </Button>
            </div>
            {isListening && (
              <div className="mt-3 flex items-center justify-center gap-2 text-primary animate-pulse">
                <div className="flex gap-1">
                  {[...Array(5)].map((_, i) => (
                    <div
                      key={i}
                      className="w-1 bg-primary rounded-full waveform-bar"
                      style={{ animationDelay: `${i * 0.1}s` }}
                    />
                  ))}
                </div>
                <span className="text-sm font-medium">Listening in {getLanguageName(sourceLanguage)}...</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ChatInterface;
