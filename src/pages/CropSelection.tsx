import { useState, useMemo } from 'react';
import { ArrowLeft, Search, X, Star, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useNavigate } from 'react-router-dom';

// South African crops data for smallholder farmers
const cropsData = {
  popular: [
    { name: 'Maize (White)', category: 'Cereals', season: 'Summer', coverage: 'R15,000 - R50,000' },
    { name: 'Maize (Yellow)', category: 'Cereals', season: 'Summer', coverage: 'R15,000 - R50,000' },
    { name: 'Sweet Potatoes', category: 'Tubers', season: 'Summer', coverage: 'R8,000 - R25,000' },
    { name: 'Tomatoes', category: 'Vegetables', season: 'All Year', coverage: 'R10,000 - R35,000' },
    { name: 'Cabbage', category: 'Vegetables', season: 'Winter', coverage: 'R5,000 - R20,000' },
    { name: 'Spinach', category: 'Leafy Greens', season: 'All Year', coverage: 'R3,000 - R15,000' },
  ],
  all: [
    // Cereals & Grains
    { name: 'Maize (White)', category: 'Cereals', season: 'Summer', coverage: 'R15,000 - R50,000' },
    { name: 'Maize (Yellow)', category: 'Cereals', season: 'Summer', coverage: 'R15,000 - R50,000' },
    { name: 'Sorghum', category: 'Cereals', season: 'Summer', coverage: 'R8,000 - R25,000' },
    { name: 'Millet', category: 'Cereals', season: 'Summer', coverage: 'R6,000 - R20,000' },
    { name: 'Wheat', category: 'Cereals', season: 'Winter', coverage: 'R12,000 - R40,000' },
    
    // Vegetables
    { name: 'Tomatoes', category: 'Vegetables', season: 'All Year', coverage: 'R10,000 - R35,000' },
    { name: 'Cabbage', category: 'Vegetables', season: 'Winter', coverage: 'R5,000 - R20,000' },
    { name: 'Onions', category: 'Vegetables', season: 'All Year', coverage: 'R8,000 - R25,000' },
    { name: 'Carrots', category: 'Vegetables', season: 'Winter', coverage: 'R6,000 - R22,000' },
    { name: 'Beetroot', category: 'Vegetables', season: 'Winter', coverage: 'R4,000 - R18,000' },
    { name: 'Green Peppers', category: 'Vegetables', season: 'Summer', coverage: 'R8,000 - R28,000' },
    { name: 'Chillies', category: 'Vegetables', season: 'Summer', coverage: 'R5,000 - R20,000' },
    { name: 'Cucumbers', category: 'Vegetables', season: 'Summer', coverage: 'R6,000 - R22,000' },
    { name: 'Lettuce', category: 'Vegetables', season: 'All Year', coverage: 'R3,000 - R15,000' },
    
    // Leafy Greens
    { name: 'Spinach', category: 'Leafy Greens', season: 'All Year', coverage: 'R3,000 - R15,000' },
    { name: 'Swiss Chard', category: 'Leafy Greens', season: 'All Year', coverage: 'R3,000 - R12,000' },
    { name: 'Kale', category: 'Leafy Greens', season: 'Winter', coverage: 'R4,000 - R16,000' },
    
    // Legumes
    { name: 'Sugar Beans', category: 'Legumes', season: 'Summer', coverage: 'R8,000 - R25,000' },
    { name: 'Dry Beans', category: 'Legumes', season: 'Summer', coverage: 'R6,000 - R20,000' },
    { name: 'Groundnuts', category: 'Legumes', season: 'Summer', coverage: 'R10,000 - R30,000' },
    { name: 'Cowpeas', category: 'Legumes', season: 'Summer', coverage: 'R5,000 - R18,000' },
    
    // Tubers & Root Vegetables
    { name: 'Sweet Potatoes', category: 'Tubers', season: 'Summer', coverage: 'R8,000 - R25,000' },
    { name: 'Potatoes', category: 'Tubers', season: 'All Year', coverage: 'R12,000 - R40,000' },
    { name: 'Cassava', category: 'Tubers', season: 'Summer', coverage: 'R6,000 - R20,000' },
    
    // Cucurbits
    { name: 'Pumpkins', category: 'Cucurbits', season: 'Summer', coverage: 'R5,000 - R20,000' },
    { name: 'Butternut', category: 'Cucurbits', season: 'Summer', coverage: 'R6,000 - R22,000' },
    { name: 'Watermelon', category: 'Cucurbits', season: 'Summer', coverage: 'R8,000 - R25,000' },
    { name: 'Gem Squash', category: 'Cucurbits', season: 'Summer', coverage: 'R4,000 - R15,000' },
    
    // Oil Crops
    { name: 'Sunflower', category: 'Oil Crops', season: 'Summer', coverage: 'R10,000 - R35,000' },
    { name: 'Canola', category: 'Oil Crops', season: 'Winter', coverage: 'R8,000 - R25,000' },
    
    // Fruits (Small Scale)
    { name: 'Citrus (Oranges)', category: 'Fruits', season: 'Perennial', coverage: 'R15,000 - R60,000' },
    { name: 'Bananas', category: 'Fruits', season: 'Perennial', coverage: 'R12,000 - R45,000' },
    { name: 'Mangoes', category: 'Fruits', season: 'Perennial', coverage: 'R10,000 - R40,000' },
    
    // Herbs & Spices
    { name: 'Herbs (Mixed)', category: 'Herbs', season: 'All Year', coverage: 'R2,000 - R10,000' },
    { name: 'Coriander', category: 'Herbs', season: 'Winter', coverage: 'R2,000 - R8,000' },
  ]
};

export const CropSelection = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCrop, setSelectedCrop] = useState<string | null>(null);

  const filteredCrops = useMemo(() => {
    if (!searchTerm) return cropsData.all;
    return cropsData.all.filter(crop =>
      crop.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      crop.category.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm]);

  const handleCropSelect = (cropName: string) => {
    setSelectedCrop(cropName);
    // Store selected crop for next step
    localStorage.setItem('selectedCrop', cropName);
  };

  const handleContinue = () => {
    if (selectedCrop) {
      // Navigate to quote form (to be implemented)
      navigate('/cover/quote-form');
    }
  };

  const clearSearch = () => {
    setSearchTerm('');
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="sticky top-0 z-50 bg-background border-b">
        <div className="flex items-center gap-4 p-4">
          <Button variant="ghost" size="icon" onClick={() => navigate('/cover')}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div>
            <h1 className="text-xl font-bold">Select Your Crop</h1>
            <p className="text-sm text-muted-foreground">Choose the crop you want to insure</p>
          </div>
        </div>
      </div>

      <div className="p-4 space-y-6">
        {/* Search Section */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search crops..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 pr-10"
          />
          {searchTerm && (
            <Button
              variant="ghost"
              size="icon"
              className="absolute right-1 top-1/2 transform -translate-y-1/2 h-8 w-8"
              onClick={clearSearch}
            >
              <X className="h-4 w-4" />
            </Button>
          )}
        </div>

        {/* Popular Crops Section */}
        {!searchTerm && (
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Star className="h-5 w-5 text-primary" />
              <h2 className="text-lg font-semibold">Popular Crops</h2>
            </div>
            <div className="grid grid-cols-1 gap-3">
              {cropsData.popular.map((crop) => (
                <Card
                  key={crop.name}
                  className={`cursor-pointer transition-all hover:shadow-md ${
                    selectedCrop === crop.name ? 'ring-2 ring-primary shadow-md' : ''
                  }`}
                  onClick={() => handleCropSelect(crop.name)}
                >
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <h3 className="font-semibold">{crop.name}</h3>
                        <div className="flex items-center gap-2 mt-1">
                          <Badge variant="secondary" className="text-xs">
                            {crop.category}
                          </Badge>
                          <span className="text-xs text-muted-foreground">{crop.season}</span>
                        </div>
                        <p className="text-sm text-primary mt-1">{crop.coverage}</p>
                      </div>
                      <ChevronRight className="h-5 w-5 text-muted-foreground" />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* All Crops Section */}
        <div>
          <h2 className="text-lg font-semibold mb-4">
            {searchTerm ? `Search Results (${filteredCrops.length})` : 'All Crops'}
          </h2>
          
          {filteredCrops.length === 0 ? (
            <Card>
              <CardContent className="p-8 text-center">
                <p className="text-muted-foreground">No crops found matching "{searchTerm}"</p>
                <Button variant="outline" className="mt-4" onClick={clearSearch}>
                  Clear Search
                </Button>
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-1 gap-3">
              {filteredCrops.map((crop) => (
                <Card
                  key={crop.name}
                  className={`cursor-pointer transition-all hover:shadow-md ${
                    selectedCrop === crop.name ? 'ring-2 ring-primary shadow-md' : ''
                  }`}
                  onClick={() => handleCropSelect(crop.name)}
                >
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <h3 className="font-semibold">{crop.name}</h3>
                        <div className="flex items-center gap-2 mt-1">
                          <Badge variant="secondary" className="text-xs">
                            {crop.category}
                          </Badge>
                          <span className="text-xs text-muted-foreground">{crop.season}</span>
                        </div>
                        <p className="text-sm text-primary mt-1">{crop.coverage}</p>
                      </div>
                      <ChevronRight className="h-5 w-5 text-muted-foreground" />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Fixed Continue Button */}
      {selectedCrop && (
        <div className="fixed bottom-0 left-0 right-0 p-4 bg-background border-t">
          <Button onClick={handleContinue} className="w-full" size="lg">
            Continue with {selectedCrop}
          </Button>
        </div>
      )}
    </div>
  );
};