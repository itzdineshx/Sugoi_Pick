import { useState } from 'react';
import { Star, Calendar, Play, Hash, ExternalLink, Heart } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useFavorites } from '@/hooks/useFavorites';

interface Genre {
  mal_id: number;
  name: string;
}

interface AnimeData {
  mal_id: number;
  title: string;
  title_english?: string;
  synopsis?: string;
  score?: number;
  type?: string;
  episodes?: number;
  year?: number;
  genres: Genre[];
  images: {
    jpg: {
      large_image_url: string;
    };
  };
}

interface AnimeCardProps {
  anime: AnimeData;
  isLoading?: boolean;
}

const AnimeCard = ({ anime, isLoading = false }: AnimeCardProps) => {
  const [synopsisExpanded, setSynopsisExpanded] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const { isFavorite, toggleFavorite } = useFavorites();

  if (isLoading) {
    return (
      <Card className="sophisticated-card w-full max-w-4xl mx-auto animate-crimson-pulse">
        <CardContent className="p-8">
          <div className="animate-pulse space-y-6">
            <div className="flex flex-col lg:flex-row gap-8">
              <div className="w-full lg:w-80 h-96 bg-muted rounded-lg"></div>
              <div className="flex-1 space-y-4">
                <div className="h-8 bg-muted rounded w-3/4"></div>
                <div className="h-4 bg-muted rounded w-1/2"></div>
                <div className="space-y-2">
                  <div className="h-4 bg-muted rounded"></div>
                  <div className="h-4 bg-muted rounded"></div>
                  <div className="h-4 bg-muted rounded w-5/6"></div>
                </div>
                <div className="flex gap-2">
                  <div className="h-6 w-16 bg-muted rounded-full"></div>
                  <div className="h-6 w-16 bg-muted rounded-full"></div>
                  <div className="h-6 w-20 bg-muted rounded-full"></div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  const truncatedSynopsis = anime.synopsis?.length > 300 
    ? anime.synopsis.substring(0, 300) + '...' 
    : anime.synopsis;

  return (
    <Card className="sophisticated-card w-full max-w-4xl mx-auto overflow-hidden animate-slide-in">
      <CardContent className="p-0">
        <div className="flex flex-col lg:flex-row">
          {/* Anime Cover Image */}
          <div className="relative lg:w-80 w-full">
            <div className="relative overflow-hidden">
              <img
                src={anime.images.jpg.large_image_url}
                alt={anime.title}
                className={`w-full h-64 sm:h-80 lg:h-full object-cover transition-all duration-500 ${
                  imageLoaded ? 'opacity-100' : 'opacity-0'
                }`}
                onLoad={() => setImageLoaded(true)}
              />
              {!imageLoaded && (
                <div className="absolute inset-0 bg-muted animate-pulse flex items-center justify-center">
                  <Play className="w-12 h-12 text-muted-foreground" />
                </div>
              )}
              
              {/* Mobile favorite button overlay */}
              <div className="absolute top-3 right-3 lg:hidden">
                <Button
                  onClick={() => toggleFavorite(anime)}
                  size="sm"
                  variant={isFavorite(anime.mal_id) ? "default" : "secondary"}
                  className="h-10 w-10 p-0 rounded-full shadow-lg backdrop-blur-sm bg-background/80 border-border/50 elegant-glow group"
                >
                  <Heart className={`w-4 h-4 transition-all duration-300 group-hover:scale-125 ${isFavorite(anime.mal_id) ? 'fill-current text-primary' : 'text-muted-foreground group-hover:text-primary'}`} />
                </Button>
              </div>
            </div>
          </div>

          {/* Anime Details */}
          <div className="flex-1 p-4 sm:p-6 lg:p-8 space-y-4 sm:space-y-6">
            {/* Title Section */}
            <div className="space-y-2">
              <h1 className="text-2xl sm:text-3xl font-bold font-anime bg-gradient-red-moon bg-clip-text text-transparent leading-tight">
                {anime.title}
              </h1>
              {anime.title_english && anime.title_english !== anime.title && (
                <p className="text-base sm:text-lg text-muted-foreground">
                  {anime.title_english}
                </p>
              )}
            </div>

            {/* Metadata */}
            <div className="flex flex-wrap gap-3 sm:gap-4 items-center">
              {anime.score && (
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 fill-accent text-accent" />
                  <span className="font-semibold text-accent text-sm sm:text-base">{anime.score}</span>
                </div>
              )}
              
              {anime.type && (
                <Badge variant="secondary" className="font-anime text-xs sm:text-sm">
                  {anime.type}
                </Badge>
              )}

              {anime.episodes && (
                <div className="flex items-center gap-1">
                  <Hash className="w-4 h-4" />
                  <span className="text-sm sm:text-base">{anime.episodes} episodes</span>
                </div>
              )}

              {anime.year && (
                <div className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  <span className="text-sm sm:text-base">{anime.year}</span>
                </div>
              )}
            </div>

            {/* Genres */}
            {anime.genres.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {anime.genres.slice(0, 6).map((genre) => (
                  <Badge key={genre.mal_id} variant="outline" className="text-primary border-primary">
                    {genre.name}
                  </Badge>
                ))}
                {anime.genres.length > 6 && (
                  <Badge variant="outline">+{anime.genres.length - 6} more</Badge>
                )}
              </div>
            )}

            {/* Synopsis */}
            {anime.synopsis && (
              <div className="space-y-3">
                <h3 className="font-semibold text-lg">Synopsis</h3>
                <p className="text-muted-foreground leading-relaxed">
                  {synopsisExpanded ? anime.synopsis : truncatedSynopsis}
                </p>
                {anime.synopsis.length > 300 && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setSynopsisExpanded(!synopsisExpanded)}
                    className="text-primary hover:text-primary-foreground p-0 h-auto font-medium"
                  >
                    {synopsisExpanded ? 'Show less' : 'Read more'}
                  </Button>
                )}
              </div>
            )}

            {/* Action Buttons */}
            <div className="pt-4 flex flex-col sm:flex-row gap-3">
              {/* Desktop favorite button */}
              <Button
                onClick={() => toggleFavorite(anime)}
                variant={isFavorite(anime.mal_id) ? "default" : "outline"}
                size="lg"
                className="hidden lg:flex items-center group elegant-glow bg-gradient-red-moon border-0 hover:shadow-accent flex-shrink-0"
              >
                <Heart className={`w-4 h-4 mr-2 transition-transform group-hover:scale-110 ${isFavorite(anime.mal_id) ? 'fill-current' : ''}`} />
                {isFavorite(anime.mal_id) ? 'Favorited' : 'Add to Favorites'}
              </Button>
              
              <Button
                onClick={() => {
                  if (anime.mal_id) {
                    const url = `https://myanimelist.net/anime/${anime.mal_id}`;
                    window.open(url, '_blank', 'noopener,noreferrer');
                  }
                }}
                variant="premium"
                size="lg"
                className="w-full sm:w-auto lg:w-auto group relative overflow-hidden elegant-glow flex-shrink-0"
              >
                <ExternalLink className="w-4 h-4 mr-2 transition-transform group-hover:scale-110 group-hover:rotate-12 flex-shrink-0" />
                <span className="hidden lg:inline font-display tracking-wide whitespace-nowrap">View on MyAnime</span>
                <span className="hidden sm:inline lg:hidden font-display whitespace-nowrap">View on MAL</span>
                <span className="sm:hidden font-display whitespace-nowrap">MAL</span>
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default AnimeCard;