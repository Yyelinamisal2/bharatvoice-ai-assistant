import { Mic, MicOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface VoiceButtonProps {
  isListening: boolean;
  onClick: () => void;
  disabled?: boolean;
  size?: "default" | "large";
}

const VoiceButton = ({ isListening, onClick, disabled, size = "default" }: VoiceButtonProps) => {
  return (
    <div className="relative">
      {/* Pulse rings when listening */}
      {isListening && (
        <>
          <span className="absolute inset-0 rounded-full bg-primary/30 pulse-ring" />
          <span className="absolute inset-0 rounded-full bg-primary/20 pulse-ring" style={{ animationDelay: "0.3s" }} />
        </>
      )}
      
      <Button
        variant="voice"
        size={size === "large" ? "icon-xl" : "icon-lg"}
        onClick={onClick}
        disabled={disabled}
        className={cn(
          "relative z-10",
          isListening && "bg-destructive hover:bg-destructive/90"
        )}
      >
        {isListening ? (
          <MicOff className={size === "large" ? "w-7 h-7" : "w-6 h-6"} />
        ) : (
          <Mic className={size === "large" ? "w-7 h-7" : "w-6 h-6"} />
        )}
      </Button>
    </div>
  );
};

export default VoiceButton;
