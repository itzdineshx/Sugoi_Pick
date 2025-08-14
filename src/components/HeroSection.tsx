import { Sparkles, RotateCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface HeroSectionProps {
  shownCount: number;
  onResetSession: () => void;
}

const HeroSection = ({ shownCount, onResetSession }: HeroSectionProps) => {
  return (
    <section className="py-16 sm:py-20 lg:py-24 mt-8 sm:mt-12 lg:mt-16 text-center space-y-6 sm:space-y-8 px-4">
      <div className="space-y-3 sm:space-y-4">
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-tight leading-tight">
          Discover Your Next
          <span className="block bg-gradient-red-moon bg-clip-text text-transparent animate-fade-in">
            Favorite Anime
          </span>
        </h1>
        <p className="text-base sm:text-lg lg:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed px-2">
          Get personalized anime recommendations based on your preferences. 
          Filter by genre, type, and rating to find exactly what you're looking for.
        </p>
      </div>

      {/* Stats */}
      {shownCount > 0 && (
        <div className="flex items-center justify-center gap-4 sm:gap-6 p-3 sm:p-4 rounded-lg bg-card/50 backdrop-blur-sm border border-border/30 max-w-sm sm:max-w-md mx-auto">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 sm:w-3 sm:h-3 bg-primary rounded-full animate-pulse"></div>
            <span className="text-xs sm:text-sm text-muted-foreground">
              Discovered: <span className="text-primary font-bold text-sm sm:text-lg">{shownCount}</span>
            </span>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={onResetSession}
            className="text-accent hover:text-accent-foreground hover:bg-accent/10 h-6 sm:h-8 px-2 sm:px-3 text-xs sm:text-sm"
          >
            <RotateCcw className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
            Reset
          </Button>
        </div>
      )}

      {/* Decorative line */}
      <div className="flex justify-center items-center gap-3 sm:gap-4 opacity-60">
        <div className="w-12 sm:w-16 h-px bg-gradient-to-r from-transparent via-primary to-transparent"></div>
        <Sparkles className="w-3 h-3 sm:w-4 sm:h-4 text-primary animate-pulse" />
        <div className="w-12 sm:w-16 h-px bg-gradient-to-r from-transparent via-primary to-transparent"></div>
      </div>
    </section>
  );
};

export default HeroSection;