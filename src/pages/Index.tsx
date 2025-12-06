import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import FeaturesSection from "@/components/FeaturesSection";
import ChatInterface from "@/components/ChatInterface";
import LanguagesGrid from "@/components/LanguagesGrid";
import Footer from "@/components/Footer";
import Background3D from "@/components/Background3D";

const Index = () => {
  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      <Background3D />
      <Header />
      <main className="pt-16 relative z-10">
        <HeroSection />
        <section id="features">
          <FeaturesSection />
        </section>
        <ChatInterface />
        <LanguagesGrid />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
