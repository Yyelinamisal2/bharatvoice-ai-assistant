import { Globe, Heart } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-foreground text-background py-16 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center">
                <Globe className="w-5 h-5 text-primary-foreground" />
              </div>
              <span className="text-xl font-bold">
                Bharat<span className="text-primary">Voice</span>
              </span>
            </div>
            <p className="text-background/70 max-w-sm leading-relaxed">
              Bridging India's linguistic diversity through AI-powered translation and voice assistance. 
              Making digital services accessible to every Indian in their own language.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {["Features", "Translate", "Languages", "API Access"].map(link => (
                <li key={link}>
                  <a href="#" className="text-background/70 hover:text-primary transition-colors text-sm">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Languages */}
          <div>
            <h4 className="font-semibold mb-4">Top Languages</h4>
            <ul className="space-y-2">
              {["Hindi", "Bengali", "Tamil", "Telugu", "Marathi"].map(lang => (
                <li key={lang}>
                  <a href="#" className="text-background/70 hover:text-primary transition-colors text-sm">
                    {lang}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-background/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-background/60 text-sm">
            © 2024 BharatVoice. Made with <Heart className="inline w-4 h-4 text-primary" /> for India.
          </p>
          <div className="flex items-center gap-6">
            <a href="#" className="text-background/60 hover:text-primary text-sm transition-colors">Privacy</a>
            <a href="#" className="text-background/60 hover:text-primary text-sm transition-colors">Terms</a>
            <a href="#" className="text-background/60 hover:text-primary text-sm transition-colors">Contact</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
