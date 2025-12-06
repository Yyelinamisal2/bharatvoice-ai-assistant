import { Globe } from "lucide-react";

const Header = () => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border/50">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center shadow-glow">
            <Globe className="w-5 h-5 text-primary-foreground" />
          </div>
          <span className="text-xl font-bold text-foreground">
            Bharat<span className="text-primary">Voice</span>
          </span>
        </div>

        {/* Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          <a href="#features" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
            Features
          </a>
          <a href="#chat" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
            Translate
          </a>
          <a href="#languages" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
            Languages
          </a>
        </nav>

        {/* CTA */}
        <div className="flex items-center gap-3">
          <button className="px-4 py-2 text-sm font-medium text-foreground hover:text-primary transition-colors">
            Sign In
          </button>
          <button className="px-4 py-2 text-sm font-medium bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors shadow-soft">
            Get Started
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
