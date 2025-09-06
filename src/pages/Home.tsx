import { CreditCard, FileText, Plus, Cloud, AlertTriangle, Trophy } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import heroImage from '@/assets/hero-farming.jpg';

export const Home = () => {
  return (
    <div className="p-4 space-y-6">
      {/* Hero Section */}
      <Card className="relative overflow-hidden bg-gradient-primary text-primary-foreground shadow-soft">
        <div className="absolute inset-0">
          <img 
            src={heroImage} 
            alt="Farmer in green fields" 
            className="w-full h-full object-cover opacity-20"
          />
        </div>
        <CardContent className="relative p-6">
          <h2 className="text-xl font-bold mb-2">Welcome, John Mthembu</h2>
          <p className="text-primary-foreground/90 mb-4">Protect your crops and livestock with smart insurance</p>
          <Button variant="secondary" size="mobile">
            Get Started
          </Button>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <Card className="shadow-card">
        <CardHeader>
          <CardTitle className="text-lg">Quick Actions</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="grid grid-cols-3 gap-3">
            <Button variant="outline" className="h-20 flex-col gap-2">
              <CreditCard className="h-6 w-6" />
              <span className="text-xs">Pay Premium</span>
            </Button>
            <Button variant="outline" className="h-20 flex-col gap-2">
              <FileText className="h-6 w-6" />
              <span className="text-xs">Make Claim</span>
            </Button>
            <Button variant="outline" className="h-20 flex-col gap-2">
              <Plus className="h-6 w-6" />
              <span className="text-xs">Add Item</span>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Weather Alert */}
      <Card className="border-warning bg-warning/5 shadow-card">
        <CardContent className="p-4">
          <div className="flex items-start gap-3">
            <div className="p-2 bg-warning/20 rounded-lg">
              <Cloud className="h-5 w-5 text-warning" />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-warning mb-1">Weather Alert</h3>
              <p className="text-sm text-muted-foreground">
                Drought conditions expected in KwaZulu-Natal. Consider crop protection.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Claim Status */}
      <Card className="shadow-card">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg flex items-center gap-2">
            <FileText className="h-5 w-5" />
            Recent Claims
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Drought Claim #DK2024001</p>
              <p className="text-sm text-muted-foreground">Maize crop - Submitted 2 days ago</p>
            </div>
            <Badge variant="outline" className="bg-warning/10 text-warning border-warning/20">
              Processing
            </Badge>
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Livestock Theft #LT2024002</p>
              <p className="text-sm text-muted-foreground">3 cattle - Submitted 1 week ago</p>
            </div>
            <Badge variant="outline" className="bg-success/10 text-success border-success/20">
              Approved
            </Badge>
          </div>
        </CardContent>
      </Card>

      {/* Rewards */}
      <Card className="bg-gradient-earth text-earth-foreground shadow-card">
        <CardContent className="p-4">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-white/20 rounded-lg">
              <Trophy className="h-6 w-6" />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold mb-1">You're doing great!</h3>
              <p className="text-sm text-earth-foreground/90">
                875 points earned • Claims-free for 8 months
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};