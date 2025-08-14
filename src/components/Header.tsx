import { useState } from 'react';
import { Menu, X, Search, Bookmark, Filter, RotateCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Badge } from '@/components/ui/badge';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Checkbox } from '@/components/ui/checkbox';
import sugoiLogo from '/lovable-uploads/c5d95c0b-670b-4b65-95d9-923622835f4b.png';

interface Genre {
  mal_id: number;
  name: string;
}

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

interface HeaderProps {
  genres?: Genre[];
  filters?: FilterState;
  onFiltersChange?: (filters: FilterState) => void;
  onResetFilters?: () => void;
  favoritesCount?: number;
}

const animeTypes = [
  { value: 'all', label: 'All Types' },
  { value: 'tv', label: 'TV Series' },
  { value: 'movie', label: 'Movie' },
  { value: 'ova', label: 'OVA' },
  { value: 'special', label: 'Special' },
  { value: 'ona', label: 'ONA' },
  { value: 'music', label: 'Music' },
];

const animeStatuses = [
  { value: 'all', label: 'All Statuses' },
  { value: 'airing', label: 'Currently Airing' },
  { value: 'complete', label: 'Completed' },
  { value: 'upcoming', label: 'Upcoming' },
];

const animeSeasons = [
  { value: 'all', label: 'All Seasons' },
  { value: 'spring', label: 'Spring' },
  { value: 'summer', label: 'Summer' },
  { value: 'fall', label: 'Fall' },
  { value: 'winter', label: 'Winter' },
];

const episodeCounts = [
  { value: 'all', label: 'Any Length' },
  { value: 'short', label: 'Short (1-12 episodes)' },
  { value: 'standard', label: 'Standard (13-26 episodes)' },
  { value: 'long', label: 'Long (27+ episodes)' },
];

const animeRatings = [
  { value: 'all', label: 'All Ratings' },
  { value: 'g', label: 'G - All Ages' },
  { value: 'pg', label: 'PG - Children' },
  { value: 'pg13', label: 'PG-13 - Teens' },
  { value: 'r17', label: 'R - 17+ (violence & profanity)' },
  { value: 'r', label: 'R+ - Mild Nudity' },
  { value: 'rx', label: 'Rx - Hentai' },
];

const animeSources = [
  { value: 'all', label: 'All Sources' },
  { value: 'manga', label: 'Manga' },
  { value: 'light_novel', label: 'Light Novel' },
  { value: 'original', label: 'Original' },
  { value: 'visual_novel', label: 'Visual Novel' },
  { value: 'video_game', label: 'Video Game' },
  { value: 'novel', label: 'Novel' },
  { value: 'web_manga', label: 'Web Manga' },
];

const sortOptions = [
  { value: 'score', label: 'Score' },
  { value: 'popularity', label: 'Popularity' },
  { value: 'members', label: 'Members' },
  { value: 'favorites', label: 'Favorites' },
  { value: 'title', label: 'Title' },
  { value: 'start_date', label: 'Release Date' },
  { value: 'episodes', label: 'Episode Count' },
];

const sortDirections = [
  { value: 'desc', label: 'Descending' },
  { value: 'asc', label: 'Ascending' },
];

const currentYear = new Date().getFullYear();
const years = Array.from({ length: currentYear - 1960 + 1 }, (_, i) => currentYear - i);

const Header = ({ genres = [], filters, onFiltersChange, onResetFilters, favoritesCount = 0 }: HeaderProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const navItems = [
    { label: 'Discover', href: '#discover', icon: Search },
    { label: 'Favorites', href: '#favorites', icon: Bookmark },
  ];

  const handleGenreToggle = (genreId: number) => {
    if (!filters || !onFiltersChange) return;
    const newGenres = filters.genres.includes(genreId)
      ? filters.genres.filter(id => id !== genreId)
      : [...filters.genres, genreId];
    
    onFiltersChange({ ...filters, genres: newGenres });
  };

  const handleTypeChange = (type: string) => {
    if (!filters || !onFiltersChange) return;
    onFiltersChange({ ...filters, type: type === 'all' ? '' : type });
  };

  const handleScoreChange = (scores: number[]) => {
    if (!filters || !onFiltersChange) return;
    onFiltersChange({ ...filters, minScore: scores[0] });
  };

  const handleStatusChange = (status: string) => {
    if (!filters || !onFiltersChange) return;
    onFiltersChange({ ...filters, status: status === 'all' ? '' : status });
  };

  const handleSeasonChange = (season: string) => {
    if (!filters || !onFiltersChange) return;
    onFiltersChange({ ...filters, season: season === 'all' ? '' : season });
  };

  const handleYearChange = (year: string) => {
    if (!filters || !onFiltersChange) return;
    onFiltersChange({ ...filters, year: year === 'all' ? null : parseInt(year) });
  };

  const handleEndYearChange = (endYear: string) => {
    if (!filters || !onFiltersChange) return;
    onFiltersChange({ ...filters, endYear: endYear === 'all' ? null : parseInt(endYear) });
  };

  const handleEpisodeCountChange = (episodeCount: string) => {
    if (!filters || !onFiltersChange) return;
    onFiltersChange({ ...filters, episodeCount: episodeCount === 'all' ? '' : episodeCount });
  };

  const handleRatingChange = (rating: string) => {
    if (!filters || !onFiltersChange) return;
    onFiltersChange({ ...filters, rating: rating === 'all' ? '' : rating });
  };

  const handleSourceChange = (source: string) => {
    if (!filters || !onFiltersChange) return;
    onFiltersChange({ ...filters, source: source === 'all' ? '' : source });
  };

  const handleOrderByChange = (orderBy: string) => {
    if (!filters || !onFiltersChange) return;
    onFiltersChange({ ...filters, orderBy });
  };

  const handleSortChange = (sort: string) => {
    if (!filters || !onFiltersChange) return;
    onFiltersChange({ ...filters, sort });
  };

  const activeFiltersCount = filters ? (
    filters.genres.length +
    (filters.type && filters.type !== '' ? 1 : 0) +
    (filters.minScore > 1 ? 1 : 0) +
    (filters.status && filters.status !== '' ? 1 : 0) +
    (filters.season && filters.season !== '' ? 1 : 0) +
    (filters.year ? 1 : 0) +
    (filters.endYear ? 1 : 0) +
    (filters.episodeCount && filters.episodeCount !== '' ? 1 : 0) +
    (filters.rating && filters.rating !== '' ? 1 : 0) +
    (filters.source && filters.source !== '' ? 1 : 0)
  ) : 0;

  const selectedGenres = genres.filter(genre => filters?.genres.includes(genre.mal_id));

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur-xl">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <img 
              src={sugoiLogo} 
              alt="SugoiPick Logo" 
              className="h-10 w-auto"
            />
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors relative"
              >
                <item.icon className="w-4 h-4" />
                {item.label}
                {item.label === 'Favorites' && favoritesCount > 0 && (
                  <Badge variant="secondary" className="ml-1 h-5 px-2 text-xs">
                    {favoritesCount}
                  </Badge>
                )}
              </a>
            ))}
            
            {/* Filter Button */}
            <Popover open={isFilterOpen} onOpenChange={setIsFilterOpen}>
              <PopoverTrigger asChild>
                <Button variant="outline" size="sm" className="relative">
                  <Filter className="w-4 h-4 mr-2" />
                  Filters
                  {activeFiltersCount > 0 && (
                    <Badge variant="secondary" className="ml-2 h-5 px-2 text-xs">
                      {activeFiltersCount}
                    </Badge>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-[500px] bg-popover border-border z-50" align="end">
                <div className="space-y-4 max-h-[600px] overflow-y-auto">
                  <div className="flex items-center justify-between sticky top-0 bg-popover pb-2 border-b border-border/20">
                    <h3 className="font-semibold">Advanced Filters</h3>
                    {activeFiltersCount > 0 && onResetFilters && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={onResetFilters}
                        className="text-muted-foreground h-6 px-2"
                      >
                        <RotateCcw className="w-3 h-3 mr-1" />
                        Reset All
                      </Button>
                    )}
                  </div>

                  {/* Basic Filters */}
                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-2">
                      <Label className="text-sm font-medium">Type</Label>
                      <Select value={filters?.type || 'all'} onValueChange={handleTypeChange}>
                        <SelectTrigger className="bg-input border-border h-8">
                          <SelectValue placeholder="Select type" />
                        </SelectTrigger>
                        <SelectContent className="bg-popover border-border z-50">
                          {animeTypes.map((type) => (
                            <SelectItem key={type.value} value={type.value}>
                              {type.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label className="text-sm font-medium">Status</Label>
                      <Select value={filters?.status || 'all'} onValueChange={handleStatusChange}>
                        <SelectTrigger className="bg-input border-border h-8">
                          <SelectValue placeholder="Select status" />
                        </SelectTrigger>
                        <SelectContent className="bg-popover border-border z-50">
                          {animeStatuses.map((status) => (
                            <SelectItem key={status.value} value={status.value}>
                              {status.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-2">
                      <Label className="text-sm font-medium">Season</Label>
                      <Select value={filters?.season || 'all'} onValueChange={handleSeasonChange}>
                        <SelectTrigger className="bg-input border-border h-8">
                          <SelectValue placeholder="Select season" />
                        </SelectTrigger>
                        <SelectContent className="bg-popover border-border z-50">
                          {animeSeasons.map((season) => (
                            <SelectItem key={season.value} value={season.value}>
                              {season.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label className="text-sm font-medium">Rating</Label>
                      <Select value={filters?.rating || 'all'} onValueChange={handleRatingChange}>
                        <SelectTrigger className="bg-input border-border h-8">
                          <SelectValue placeholder="Select rating" />
                        </SelectTrigger>
                        <SelectContent className="bg-popover border-border z-50">
                          {animeRatings.map((rating) => (
                            <SelectItem key={rating.value} value={rating.value}>
                              {rating.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-2">
                      <Label className="text-sm font-medium">Start Year</Label>
                      <Select value={filters?.year?.toString() || 'all'} onValueChange={handleYearChange}>
                        <SelectTrigger className="bg-input border-border h-8">
                          <SelectValue placeholder="Select year" />
                        </SelectTrigger>
                        <SelectContent className="bg-popover border-border z-50 max-h-48">
                          <SelectItem value="all">All Years</SelectItem>
                          {years.slice(0, 30).map((year) => (
                            <SelectItem key={year} value={year.toString()}>
                              {year}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label className="text-sm font-medium">End Year</Label>
                      <Select value={filters?.endYear?.toString() || 'all'} onValueChange={handleEndYearChange}>
                        <SelectTrigger className="bg-input border-border h-8">
                          <SelectValue placeholder="Select end year" />
                        </SelectTrigger>
                        <SelectContent className="bg-popover border-border z-50 max-h-48">
                          <SelectItem value="all">All Years</SelectItem>
                          {years.slice(0, 30).map((year) => (
                            <SelectItem key={year} value={year.toString()}>
                              {year}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-2">
                      <Label className="text-sm font-medium">Episode Count</Label>
                      <Select value={filters?.episodeCount || 'all'} onValueChange={handleEpisodeCountChange}>
                        <SelectTrigger className="bg-input border-border h-8">
                          <SelectValue placeholder="Select length" />
                        </SelectTrigger>
                        <SelectContent className="bg-popover border-border z-50">
                          {episodeCounts.map((count) => (
                            <SelectItem key={count.value} value={count.value}>
                              {count.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label className="text-sm font-medium">Source</Label>
                      <Select value={filters?.source || 'all'} onValueChange={handleSourceChange}>
                        <SelectTrigger className="bg-input border-border h-8">
                          <SelectValue placeholder="Select source" />
                        </SelectTrigger>
                        <SelectContent className="bg-popover border-border z-50">
                          {animeSources.map((source) => (
                            <SelectItem key={source.value} value={source.value}>
                              {source.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-2">
                      <Label className="text-sm font-medium">Sort By</Label>
                      <Select value={filters?.orderBy || 'score'} onValueChange={handleOrderByChange}>
                        <SelectTrigger className="bg-input border-border h-8">
                          <SelectValue placeholder="Sort by" />
                        </SelectTrigger>
                        <SelectContent className="bg-popover border-border z-50">
                          {sortOptions.map((option) => (
                            <SelectItem key={option.value} value={option.value}>
                              {option.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label className="text-sm font-medium">Direction</Label>
                      <Select value={filters?.sort || 'desc'} onValueChange={handleSortChange}>
                        <SelectTrigger className="bg-input border-border h-8">
                          <SelectValue placeholder="Sort direction" />
                        </SelectTrigger>
                        <SelectContent className="bg-popover border-border z-50">
                          {sortDirections.map((direction) => (
                            <SelectItem key={direction.value} value={direction.value}>
                              {direction.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  {/* Minimum Score Filter */}
                  <div className="space-y-2">
                    <Label className="text-sm font-medium">
                      Min Score: {filters?.minScore || 1}/10
                    </Label>
                    <Slider
                      value={[filters?.minScore || 1]}
                      onValueChange={handleScoreChange}
                      max={10}
                      min={1}
                      step={0.5}
                      className="w-full"
                    />
                  </div>

                  {/* Genres Filter */}
                  <div className="space-y-2">
                    <Label className="text-sm font-medium">
                      Genres {selectedGenres.length > 0 && `(${selectedGenres.length})`}
                    </Label>
                    
                    {/* Selected Genres */}
                    {selectedGenres.length > 0 && (
                      <div className="flex flex-wrap gap-1 mb-2">
                        {selectedGenres.map((genre) => (
                          <Badge
                            key={genre.mal_id}
                            variant="default"
                            className="text-xs cursor-pointer hover:bg-primary/80 h-5 px-2"
                            onClick={() => handleGenreToggle(genre.mal_id)}
                          >
                            {genre.name}
                            <X className="w-2 h-2 ml-1" />
                          </Badge>
                        ))}
                      </div>
                    )}

                    {/* Genre Selection */}
                    <div className="grid grid-cols-3 gap-2 max-h-32 overflow-y-auto text-xs border border-border/20 rounded p-2">
                      {genres.map((genre) => (
                        <div key={genre.mal_id} className="flex items-center space-x-2">
                          <Checkbox
                            id={`genre-${genre.mal_id}`}
                            checked={filters?.genres.includes(genre.mal_id) || false}
                            onCheckedChange={() => handleGenreToggle(genre.mal_id)}
                            className="border-border data-[state=checked]:bg-primary data-[state=checked]:border-primary h-3 w-3"
                          />
                          <Label
                            htmlFor={`genre-${genre.mal_id}`}
                            className="text-xs cursor-pointer hover:text-primary transition-colors leading-tight"
                          >
                            {genre.name}
                          </Label>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </PopoverContent>
            </Popover>
          </nav>

          {/* Mobile Menu */}
          <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="sm">
                <Menu className="w-5 h-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px] bg-background border-border">
              <div className="flex flex-col space-y-4 mt-8">
                {navItems.map((item) => (
                  <a
                    key={item.label}
                    href={item.href}
                    className="flex items-center gap-3 text-lg font-medium text-muted-foreground hover:text-foreground transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <item.icon className="w-5 h-5" />
                    {item.label}
                    {item.label === 'Favorites' && favoritesCount > 0 && (
                      <Badge variant="secondary" className="ml-2 h-5 px-2 text-xs">
                        {favoritesCount}
                      </Badge>
                    )}
                  </a>
                ))}
                
                {/* Mobile Filters */}
                <div className="border-t border-border pt-4 mt-6">
                  <div className="space-y-4 max-h-[400px] overflow-y-auto">
                    <div className="flex items-center justify-between">
                      <h3 className="font-semibold flex items-center gap-2">
                        <Filter className="w-4 h-4" />
                        Advanced Filters
                      </h3>
                      {activeFiltersCount > 0 && onResetFilters && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={onResetFilters}
                          className="text-muted-foreground"
                        >
                          <RotateCcw className="w-4 h-4 mr-1" />
                          Reset
                        </Button>
                      )}
                    </div>

                    {/* Mobile Basic Filters */}
                    <div className="grid grid-cols-2 gap-3">
                      <div className="space-y-2">
                        <Label>Type</Label>
                        <Select value={filters?.type || 'all'} onValueChange={handleTypeChange}>
                          <SelectTrigger className="bg-input border-border h-8">
                            <SelectValue placeholder="Select type" />
                          </SelectTrigger>
                          <SelectContent className="bg-popover border-border z-50">
                            {animeTypes.map((type) => (
                              <SelectItem key={type.value} value={type.value}>
                                {type.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label>Status</Label>
                        <Select value={filters?.status || 'all'} onValueChange={handleStatusChange}>
                          <SelectTrigger className="bg-input border-border h-8">
                            <SelectValue placeholder="Select status" />
                          </SelectTrigger>
                          <SelectContent className="bg-popover border-border z-50">
                            {animeStatuses.map((status) => (
                              <SelectItem key={status.value} value={status.value}>
                                {status.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div className="space-y-2">
                        <Label>Season</Label>
                        <Select value={filters?.season || 'all'} onValueChange={handleSeasonChange}>
                          <SelectTrigger className="bg-input border-border h-8">
                            <SelectValue placeholder="Select season" />
                          </SelectTrigger>
                          <SelectContent className="bg-popover border-border z-50">
                            {animeSeasons.map((season) => (
                              <SelectItem key={season.value} value={season.value}>
                                {season.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label>Rating</Label>
                        <Select value={filters?.rating || 'all'} onValueChange={handleRatingChange}>
                          <SelectTrigger className="bg-input border-border h-8">
                            <SelectValue placeholder="Select rating" />
                          </SelectTrigger>
                          <SelectContent className="bg-popover border-border z-50">
                            {animeRatings.map((rating) => (
                              <SelectItem key={rating.value} value={rating.value}>
                                {rating.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div className="space-y-2">
                        <Label>Episode Count</Label>
                        <Select value={filters?.episodeCount || 'all'} onValueChange={handleEpisodeCountChange}>
                          <SelectTrigger className="bg-input border-border h-8">
                            <SelectValue placeholder="Select length" />
                          </SelectTrigger>
                          <SelectContent className="bg-popover border-border z-50">
                            {episodeCounts.map((count) => (
                              <SelectItem key={count.value} value={count.value}>
                                {count.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label>Sort By</Label>
                        <Select value={filters?.orderBy || 'score'} onValueChange={handleOrderByChange}>
                          <SelectTrigger className="bg-input border-border h-8">
                            <SelectValue placeholder="Sort by" />
                          </SelectTrigger>
                          <SelectContent className="bg-popover border-border z-50">
                            {sortOptions.map((option) => (
                              <SelectItem key={option.value} value={option.value}>
                                {option.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    {/* Mobile Score Filter */}
                    <div className="space-y-2">
                      <Label>Min Score: {filters?.minScore || 1}/10</Label>
                      <Slider
                        value={[filters?.minScore || 1]}
                        onValueChange={handleScoreChange}
                        max={10}
                        min={1}
                        step={0.5}
                        className="w-full"
                      />
                    </div>

                    {/* Mobile Genre Selection - Simplified */}
                    <div className="space-y-2">
                      <Label>Popular Genres</Label>
                      <div className="grid grid-cols-2 gap-2 text-sm">
                        {genres.slice(0, 12).map((genre) => (
                          <div key={genre.mal_id} className="flex items-center space-x-2">
                            <Checkbox
                              id={`mobile-genre-${genre.mal_id}`}
                              checked={filters?.genres.includes(genre.mal_id) || false}
                              onCheckedChange={() => handleGenreToggle(genre.mal_id)}
                              className="border-border data-[state=checked]:bg-primary data-[state=checked]:border-primary h-3 w-3"
                            />
                            <Label
                              htmlFor={`mobile-genre-${genre.mal_id}`}
                              className="text-xs cursor-pointer hover:text-primary transition-colors leading-tight"
                            >
                              {genre.name}
                            </Label>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
};

export default Header;