
import { useState, useCallback } from 'react';
import { useToast } from '@/hooks/use-toast';
import { useAnimeAPI } from '@/hooks/useAnimeAPI';
import { useFavorites } from '@/hooks/useFavorites';
import Header from '@/components/Header';
import HeroSection from '@/components/HeroSection';
import DiscoverSection from '@/components/DiscoverSection';
import FavoritesSection from '@/components/FavoritesSection';
import narutoRedMoonBg from '@/assets/naruto-red-moon-bg.jpg';

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

const Index = () => {
  const { toast } = useToast();
  const { genres, currentAnime, loading, shownCount, isExhausted, getNextAnime, resetSession } = useAnimeAPI();
  const { favoritesCount } = useFavorites();
  
  const [filters, setFilters] = useState<FilterState>({
    genres: [],
    type: '',
    minScore: 1,
    status: '',
    season: '',
    year: null,
    endYear: null,
    episodeCount: '',
    rating: '',
    source: '',
    orderBy: 'score',
    sort: 'desc'
  });

  const handleSummonAnime = useCallback(() => {
    console.log('Summoning anime with filters:', filters);
    getNextAnime(filters);
  }, [getNextAnime, filters]);

  const handleFiltersChange = useCallback((newFilters: FilterState) => {
    console.log('Filters changing from:', filters, 'to:', newFilters);
    setFilters(newFilters);
    // Clear cache when filters change so new filters take effect
    resetSession();
  }, [filters, resetSession]);

  const handleResetFilters = useCallback(() => {
    setFilters({
      genres: [],
      type: '',
      minScore: 1,
      status: '',
      season: '',
      year: null,
      endYear: null,
      episodeCount: '',
      rating: '',
      source: '',
      orderBy: 'score',
      sort: 'desc'
    });
  }, []);

  const handleResetSession = useCallback(() => {
    resetSession();
    toast({
      title: "Session Reset",
      description: "Ready to explore anime again! All recommendations are back in the pool.",
    });
  }, [resetSession, toast]);

  return (
    <div className="min-h-screen">
      {/* Background */}
      <div 
        className="fixed inset-0 -z-10"
        style={{
          background: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.7)), url(${narutoRedMoonBg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          backgroundAttachment: 'fixed'
        }}
      />
      
      {/* Header */}
      <Header 
        genres={genres}
        filters={filters}
        onFiltersChange={handleFiltersChange}
        onResetFilters={handleResetFilters}
        favoritesCount={favoritesCount}
      />

      {/* Main Content */}
      <main className="container mx-auto px-4 space-y-12 sm:space-y-16">
        <HeroSection 
          shownCount={shownCount}
          onResetSession={handleResetSession}
        />
        
        <DiscoverSection
          genres={genres}
          filters={filters}
          onFiltersChange={handleFiltersChange}
          onResetFilters={handleResetFilters}
          onSummonAnime={handleSummonAnime}
          loading={loading}
          currentAnime={currentAnime}
          isExhausted={isExhausted}
          onResetSession={handleResetSession}
        />
        
        <FavoritesSection />
      </main>

      {/* Footer */}
      <footer className="border-t border-border/20 bg-background/10 backdrop-blur-md mt-12 sm:mt-16">
        <div className="container mx-auto px-4 py-6 sm:py-8 text-center">
          <p className="text-xs sm:text-sm text-muted-foreground">
            Powered by{' '}
            <span className="text-primary font-medium">Jikan API</span>
            {' '}• Built with anime passion ❤️
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
