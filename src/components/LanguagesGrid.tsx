import { INDIAN_LANGUAGES } from "@/lib/languages";

const LanguagesGrid = () => {
  return (
    <section id="languages" className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            <span className="text-gradient-primary">22+</span> Official Indian Languages
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            From the peaks of Kashmir to the shores of Kerala, we speak your language.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {INDIAN_LANGUAGES.map((lang, index) => (
            <div
              key={lang.code}
              className="group p-4 bg-card rounded-xl border border-border hover:border-primary/50 hover:shadow-card transition-all duration-300 cursor-pointer animate-scale-in"
              style={{ animationDelay: `${index * 30}ms` }}
            >
              <p className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors">
                {lang.name}
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                {lang.englishName}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LanguagesGrid;
