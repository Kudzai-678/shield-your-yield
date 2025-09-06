import { BookOpen, Play, Users, FileText, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';

export const Learn = () => {
  return (
    <div className="p-4">
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-2">Learning Center</h1>
        <p className="text-muted-foreground">Improve your farming knowledge and skills</p>
      </div>

      {/* Search */}
      <Card className="mb-6 shadow-card">
        <CardContent className="p-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search guides, videos, FAQs..."
              className="pl-10"
            />
          </div>
        </CardContent>
      </Card>

      {/* Featured Content */}
      <Card className="mb-6 bg-gradient-primary text-primary-foreground shadow-soft">
        <CardContent className="p-6">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-white/20 rounded-lg">
              <Play className="h-6 w-6" />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold mb-1">Featured: Drought Preparation</h3>
              <p className="text-sm text-primary-foreground/90">
                Learn how to protect your crops during dry seasons
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Categories */}
      <div className="space-y-6">
        {/* Crop Guides */}
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BookOpen className="h-5 w-5" />
              Crop Guides
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="border rounded-lg p-3 flex items-center justify-between">
              <div className="flex-1">
                <h4 className="font-medium">Maize Farming Best Practices</h4>
                <p className="text-sm text-muted-foreground">Planting, care, and harvesting tips</p>
              </div>
              <Badge variant="outline">7 min read</Badge>
            </div>
            
            <div className="border rounded-lg p-3 flex items-center justify-between">
              <div className="flex-1">
                <h4 className="font-medium">Soil Health & Fertilization</h4>
                <p className="text-sm text-muted-foreground">Improve your soil for better yields</p>
              </div>
              <Badge variant="outline">5 min read</Badge>
            </div>
            
            <div className="border rounded-lg p-3 flex items-center justify-between">
              <div className="flex-1">
                <h4 className="font-medium">Pest Management Guide</h4>
                <p className="text-sm text-muted-foreground">Identify and control common pests</p>
              </div>
              <Badge variant="outline">10 min read</Badge>
            </div>
            
            <Button variant="outline" size="sm" className="w-full">
              View All Crop Guides
            </Button>
          </CardContent>
        </Card>

        {/* Livestock Guides */}
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5" />
              Livestock Care
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="border rounded-lg p-3 flex items-center justify-between">
              <div className="flex-1">
                <h4 className="font-medium">Cattle Vaccination Schedule</h4>
                <p className="text-sm text-muted-foreground">Keep your cattle healthy year-round</p>
              </div>
              <Badge variant="outline">6 min read</Badge>
            </div>
            
            <div className="border rounded-lg p-3 flex items-center justify-between">
              <div className="flex-1">
                <h4 className="font-medium">Goat Breeding & Care</h4>
                <p className="text-sm text-muted-foreground">Maximize your goat herd productivity</p>
              </div>
              <Badge variant="outline">8 min read</Badge>
            </div>
            
            <div className="border rounded-lg p-3 flex items-center justify-between">
              <div className="flex-1">
                <h4 className="font-medium">Feed Quality & Nutrition</h4>
                <p className="text-sm text-muted-foreground">Ensure proper animal nutrition</p>
              </div>
              <Badge variant="outline">4 min read</Badge>
            </div>
            
            <Button variant="outline" size="sm" className="w-full">
              View All Livestock Guides
            </Button>
          </CardContent>
        </Card>

        {/* Videos */}
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Play className="h-5 w-5" />
              How-to Videos
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="border rounded-lg p-3">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-16 h-12 bg-muted rounded flex items-center justify-center">
                  <Play className="h-4 w-4" />
                </div>
                <div className="flex-1">
                  <h4 className="font-medium">How to Submit an Insurance Claim</h4>
                  <p className="text-sm text-muted-foreground">Step-by-step walkthrough</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant="outline">3:45</Badge>
                <Badge variant="outline" className="bg-success/10 text-success border-success/20">
                  Available Offline
                </Badge>
              </div>
            </div>
            
            <div className="border rounded-lg p-3">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-16 h-12 bg-muted rounded flex items-center justify-center">
                  <Play className="h-4 w-4" />
                </div>
                <div className="flex-1">
                  <h4 className="font-medium">Using the InsurAgri App</h4>
                  <p className="text-sm text-muted-foreground">Complete app tutorial</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant="outline">7:22</Badge>
                <Badge variant="outline" className="bg-success/10 text-success border-success/20">
                  Available Offline
                </Badge>
              </div>
            </div>
            
            <Button variant="outline" size="sm" className="w-full">
              View All Videos
            </Button>
          </CardContent>
        </Card>

        {/* FAQs */}
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              Frequently Asked Questions
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="border rounded-lg p-3">
              <h4 className="font-medium mb-1">How long does it take to process a claim?</h4>
              <p className="text-sm text-muted-foreground">
                Most claims are processed within 5-7 business days after we receive all required documentation.
              </p>
            </div>
            
            <div className="border rounded-lg p-3">
              <h4 className="font-medium mb-1">What payment methods are accepted?</h4>
              <p className="text-sm text-muted-foreground">
                We accept MTN MoMo, M-Pesa, Vodapay, and traditional bank transfers.
              </p>
            </div>
            
            <div className="border rounded-lg p-3">
              <h4 className="font-medium mb-1">Can I change my payment schedule?</h4>
              <p className="text-sm text-muted-foreground">
                Yes, you can switch between weekly, monthly, or seasonal payments at any time.
              </p>
            </div>
            
            <Button variant="outline" size="sm" className="w-full">
              View All FAQs
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};