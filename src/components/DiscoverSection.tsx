import { RefreshCw, Sparkles, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import AnimeLoadingAnimation from './AnimeLoadingAnimation';
import AnimeCard from './AnimeCard';

interface FilterState {
  genres: number[];
  type: string;
  minScore: number;
  status: string;
  season: string;
  year: number | null;
  endYear: number | null;
  episodeCount: string;
  rating: string;
  source: string;
  orderBy: string;
  sort: string;
}

interface DiscoverSectionProps {
  genres: any[];
  filters: FilterState;
  onFiltersChange: (filters: FilterState) => void;
  onResetFilters: () => void;
  onSummonAnime: () => void;
  loading: boolean;
  currentAnime: any;
  isExhausted: boolean;
  onResetSession: () => void;
}

const DiscoverSection = ({
  genres,
  filters,
  onFiltersChange,
  onResetFilters,
  onSummonAnime,
  loading,
  currentAnime,
  isExhausted,
  onResetSession
}: DiscoverSectionProps) => {
  return (
    <section id="discover" className="space-y-6 sm:space-y-8">
      <div className="text-center space-y-2 sm:space-y-4">
        <h2 className="text-2xl sm:text-3xl font-bold">Discover Anime</h2>
        <p className="text-sm sm:text-base text-muted-foreground px-4">
          Use the filters in the navbar to customize your search
        </p>
      </div>

      {/* Discover Button */}
      <div className="flex justify-center px-4">
        <Button
          onClick={onSummonAnime}
          disabled={loading}
          size="lg"
          className="text-base sm:text-lg px-6 sm:px-8 py-4 sm:py-6 font-semibold w-full sm:w-auto max-w-xs elegant-button group relative overflow-hidden"
        >
          {loading ? (
            <>
              <RefreshCw className="w-4 h-4 sm:w-5 sm:h-5 mr-2 animate-spin" />
              <span className="hidden sm:inline">Discovering...</span>
              <span className="sm:hidden">Finding...</span>
            </>
          ) : (
            <>
              <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 mr-2 group-hover:rotate-12 transition-transform" />
              <span className="hidden sm:inline">
                {currentAnime ? 'Find Another' : 'Discover Anime'}
              </span>
              <span className="sm:hidden">
                {currentAnime ? 'Next' : 'Discover'}
              </span>
              <Zap className="w-4 h-4 sm:w-5 sm:h-5 ml-2 group-hover:scale-110 transition-transform" />
            </>
          )}
        </Button>
      </div>

      {/* Content Area */}
      {loading && <AnimeLoadingAnimation />}

      {/* Exhausted Message */}
      {isExhausted && (
        <Card className="max-w-2xl mx-4 sm:mx-auto">
          <CardContent className="text-center py-8 sm:py-12 space-y-4 sm:space-y-6">
            <div className="text-4xl sm:text-6xl">🌙</div>
            <div className="space-y-2 sm:space-y-3">
              <h3 className="text-xl sm:text-2xl font-bold">No More Results</h3>
              <p className="text-sm sm:text-base text-muted-foreground px-2">
                You've explored all available anime with your current filters.
                Try adjusting your filters or start a new session.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center px-4">
              <Button onClick={onResetFilters} variant="outline" className="w-full sm:w-auto elegant-glow hover:bg-primary/10 border-primary group">
                <RefreshCw className="w-4 h-4 mr-2 group-hover:rotate-180 transition-transform duration-500" />
                Clear Filters
              </Button>
              <Button onClick={onResetSession} className="w-full sm:w-auto elegant-button">
                <Sparkles className="w-4 h-4 mr-2" />
                New Session
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Anime Result */}
      {!loading && currentAnime && !isExhausted && (
        <div className="max-w-4xl mx-auto px-4">
          <AnimeCard anime={currentAnime} />
        </div>
      )}

      {/* Welcome Message */}
      {!loading && !currentAnime && !isExhausted && (
        <Card className="max-w-2xl mx-4 sm:mx-auto">
          <CardContent className="text-center py-8 sm:py-12 space-y-4 sm:space-y-6">
            <div className="text-4xl sm:text-6xl animate-float">🔥</div>
            <div className="space-y-2 sm:space-y-3">
              <h3 className="text-xl sm:text-2xl font-bold">Ready to Discover?</h3>
              <p className="text-sm sm:text-base text-muted-foreground px-2">
                Click "Discover Anime" to find amazing recommendations.
                Use the filters above to customize your search!
              </p>
            </div>
          </CardContent>
        </Card>
      )}
    </section>
  );
};

export default DiscoverSection;