import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { SplashCursor } from '@/components/ui/splash-cursor';
import { Shield, Smartphone, Zap, Users, Leaf, TrendingUp } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import heroImage from '@/assets/hero-farming.jpg';

export const Landing = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: Shield,
      title: "Smart Crop Protection",
      description: "Satellite monitoring and weather-based insurance for your crops"
    },
    {
      icon: Smartphone,
      title: "Mobile-First Claims",
      description: "File and track claims directly from your phone in minutes"
    },
    {
      icon: Zap,
      title: "Instant Payouts",
      description: "Automatic payouts triggered by verified weather events"
    },
    {
      icon: Users,
      title: "Farmer Community",
      description: "Join thousands of South African farmers protecting their livelihood"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <SplashCursor />
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-primary text-primary-foreground">
        <div className="absolute inset-0">
          <img 
            src={heroImage} 
            alt="South African farmer in green fields" 
            className="w-full h-full object-cover opacity-30"
          />
        </div>
        <div className="relative px-4 py-16 text-center">
          <div className="flex items-center justify-center gap-2 mb-6">
            <Leaf className="h-8 w-8" />
            <h1 className="text-3xl font-bold">InsurAgri</h1>
          </div>
          <h2 className="text-xl font-semibold mb-4">
            Smart Insurance for South African Farmers
          </h2>
          <p className="text-primary-foreground/90 mb-8 max-w-md mx-auto">
            Protect your crops and livestock with technology-driven insurance solutions designed for modern farming.
          </p>
          <div className="space-y-3">
            <Button 
              size="lg" 
              variant="secondary" 
              className="w-full max-w-xs"
              onClick={() => navigate('/auth/register')}
            >
              Sign Up Now
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="w-full max-w-xs bg-white/10 border-white/20 text-white hover:bg-white/20"
              onClick={() => navigate('/auth/login')}
            >
              Login
            </Button>
          </div>
          <p className="text-sm text-primary-foreground/70 mt-4">
            Or dial *123*456# from any phone
          </p>
        </div>
      </section>

      {/* Why Choose InsurAgri */}
      <section className="px-4 py-12">
        <div className="text-center mb-8">
          <h3 className="text-2xl font-bold mb-3">Why Choose InsurAgri?</h3>
          <p className="text-muted-foreground max-w-md mx-auto">
            Revolutionary insurance technology built specifically for South African agriculture
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-4xl mx-auto">
          {features.map((feature, index) => (
            <Card key={index} className="shadow-card">
              <CardContent className="p-6 text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-primary/10 rounded-lg mb-4">
                  <feature.icon className="h-6 w-6 text-primary" />
                </div>
                <h4 className="font-semibold mb-2">{feature.title}</h4>
                <p className="text-sm text-muted-foreground">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Trust Section */}
      <section className="px-4 py-12 bg-muted/30">
        <Card className="bg-gradient-earth text-earth-foreground shadow-card max-w-md mx-auto">
          <CardContent className="p-6 text-center">
            <TrendingUp className="h-8 w-8 mx-auto mb-4" />
            <h4 className="font-bold text-lg mb-2">Trusted by 10,000+ Farmers</h4>
            <p className="text-earth-foreground/90 text-sm">
              Join the growing community of South African farmers protecting their future with smart insurance
            </p>
          </CardContent>
        </Card>
      </section>

      {/* CTA Footer */}
      <section className="px-4 py-8 text-center">
        <h4 className="font-semibold mb-4">Ready to protect your farm?</h4>
        <Button 
          size="lg" 
          className="w-full max-w-xs"
          onClick={() => navigate('/auth/register')}
        >
          Get Started Today
        </Button>
      </section>
    </div>
  );
};