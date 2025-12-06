import { Globe, Mic, MessageSquare, Users, Zap, Shield } from "lucide-react";

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  delay?: number;
}

const FeatureCard = ({ icon, title, description, delay = 0 }: FeatureCardProps) => (
  <div 
    className="group p-6 bg-card rounded-2xl shadow-card hover:shadow-glow transition-all duration-500 border border-border/50 hover:border-primary/30 animate-slide-up"
    style={{ animationDelay: `${delay}ms` }}
  >
    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
      <div className="text-primary">{icon}</div>
    </div>
    <h3 className="text-lg font-semibold text-foreground mb-2">{title}</h3>
    <p className="text-muted-foreground text-sm leading-relaxed">{description}</p>
  </div>
);

const FeaturesSection = () => {
  const features = [
    {
      icon: <Globe className="w-6 h-6" />,
      title: "22+ Indian Languages",
      description: "Seamless translation across all official Indian languages and regional dialects with cultural context awareness."
    },
    {
      icon: <Mic className="w-6 h-6" />,
      title: "Voice Assistant",
      description: "Natural voice interactions tuned for Indian phonetics. Speak in your language, get responses instantly."
    },
    {
      icon: <MessageSquare className="w-6 h-6" />,
      title: "Context-Aware AI",
      description: "Understands regional slang, cultural references, and code-mixed languages for accurate translations."
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: "Community Powered",
      description: "Crowd-sourced updates from communities help improve language coverage continuously."
    },
    {
      icon: <Zap className="w-6 h-6" />,
      title: "Instant Translation",
      description: "Real-time text and speech translation powered by advanced neural machine translation."
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: "Secure & Private",
      description: "Your conversations are encrypted and private. We prioritize your data security."
    }
  ];

  return (
    <section className="py-20 px-4 bg-muted/30">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Bridging India's <span className="text-gradient-primary">Linguistic Diversity</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            Access essential services, communicate effortlessly, and break language barriers with AI-powered assistance.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <FeatureCard
              key={feature.title}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
              delay={index * 100}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
