import { ArrowRight, Volume2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import heroPattern from "@/assets/hero-pattern.png";

const HeroSection = () => {
  const scrollToChat = () => {
    document.getElementById("chat")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
      {/* Background Pattern */}
      <div 
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: `url(${heroPattern})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
      <div className="absolute inset-0 gradient-hero" />
      
      {/* Decorative Elements */}
      <div className="absolute top-20 left-10 w-32 h-32 bg-primary/10 rounded-full blur-3xl animate-float" />
      <div className="absolute bottom-20 right-10 w-48 h-48 bg-accent/10 rounded-full blur-3xl animate-float" style={{ animationDelay: "2s" }} />
      <div className="absolute top-1/2 left-1/4 w-24 h-24 bg-secondary/10 rounded-full blur-2xl animate-float" style={{ animationDelay: "4s" }} />

      <div className="relative z-10 max-w-5xl mx-auto px-4 text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-card/80 backdrop-blur-sm rounded-full border border-border mb-8 animate-fade-in shadow-soft">
          <span className="w-2 h-2 bg-secondary rounded-full animate-pulse" />
          <span className="text-sm font-medium text-foreground">22+ Indian Languages Supported</span>
        </div>

        {/* Main Heading */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-foreground mb-6 animate-slide-up">
          Your Voice,{" "}
          <span className="text-gradient-primary">Every Language</span>
        </h1>

        {/* Subheading */}
        <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 animate-slide-up" style={{ animationDelay: "100ms" }}>
          BharatVoice connects India through AI-powered translation and voice assistance. 
          Access services, communicate freely, and break language barriers.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-slide-up" style={{ animationDelay: "200ms" }}>
          <Button variant="hero" size="xl" onClick={scrollToChat}>
            Start Translating
            <ArrowRight className="w-5 h-5 ml-1" />
          </Button>
          <Button variant="outline" size="xl">
            <Volume2 className="w-5 h-5 mr-2" />
            Try Voice Assistant
          </Button>
        </div>

        {/* Language Preview */}
        <div className="mt-16 flex flex-wrap justify-center gap-3 animate-fade-in" style={{ animationDelay: "400ms" }}>
          {["हिन्दी", "বাংলা", "தமிழ்", "తెలుగు", "ಕನ್ನಡ", "മലയാളം", "ਪੰਜਾਬੀ", "मराठी"].map((lang, i) => (
            <span
              key={lang}
              className="px-4 py-2 bg-card/60 backdrop-blur-sm rounded-full text-sm font-medium text-foreground border border-border/50 hover:border-primary/50 hover:bg-card transition-all cursor-default"
              style={{ animationDelay: `${500 + i * 50}ms` }}
            >
              {lang}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
