import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, Shield, Tractor, CloudRain, DollarSign } from "lucide-react";

export function RegistrationSuccess() {
  const [userProfile, setUserProfile] = useState<any>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const profile = localStorage.getItem("userProfile");
    if (profile) {
      setUserProfile(JSON.parse(profile));
    } else {
      navigate("/auth/register");
    }
  }, [navigate]);

  const features = [
    {
      icon: Shield,
      title: "Insurance Protection",
      description: "Comprehensive coverage for your farming operations"
    },
    {
      icon: Tractor,
      title: "Equipment Coverage",
      description: "Protect your valuable farming equipment and machinery"
    },
    {
      icon: CloudRain,
      title: "Weather Monitoring",
      description: "Real-time weather alerts and risk assessments"
    },
    {
      icon: DollarSign,
      title: "Claims Management",
      description: "Quick and easy claims processing with digital support"
    }
  ];

  const handleGetStarted = () => {
    navigate("/");
  };

  const handleSkipTour = () => {
    navigate("/");
  };

  if (!userProfile) {
    return null;
  }

  return (
    <div className="min-h-screen bg-background p-4 flex items-center justify-center">
      <Card className="w-full max-w-2xl shadow-card">
        <CardHeader className="text-center space-y-4">
          <div className="mx-auto w-20 h-20 bg-success rounded-full flex items-center justify-center">
            <CheckCircle className="w-12 h-12 text-success-foreground" />
          </div>
          <CardTitle className="text-3xl">Welcome to AgriInsure!</CardTitle>
          <CardDescription className="text-lg">
            Hello {userProfile.firstName}! Your account has been successfully created.
          </CardDescription>
        </CardHeader>
        
        <CardContent className="space-y-8">
          {/* User Summary */}
          <div className="bg-muted rounded-lg p-6 space-y-2">
            <h3 className="font-semibold text-lg">Your Profile Summary</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-muted-foreground">Name:</span>
                <span className="ml-2 font-medium">
                  {userProfile.firstName} {userProfile.lastName}
                </span>
              </div>
              <div>
                <span className="text-muted-foreground">Province:</span>
                <span className="ml-2 font-medium">{userProfile.province}</span>
              </div>
              <div>
                <span className="text-muted-foreground">Farm Type:</span>
                <span className="ml-2 font-medium">{userProfile.farmType}</span>
              </div>
              <div>
                <span className="text-muted-foreground">Insurance Interests:</span>
                <span className="ml-2 font-medium">
                  {userProfile.insuranceInterest.length} selected
                </span>
              </div>
            </div>
          </div>

          {/* Features Overview */}
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-center">What you can do now:</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {features.map((feature, index) => (
                <div key={index} className="flex items-start gap-3 p-4 border border-border rounded-lg">
                  <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <feature.icon className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-medium text-sm">{feature.title}</h4>
                    <p className="text-xs text-muted-foreground mt-1">
                      {feature.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-3">
            <Button
              onClick={handleGetStarted}
              className="w-full h-12 text-lg"
              size="lg"
            >
              Explore Insurance Options
            </Button>
            
            <Button
              onClick={handleSkipTour}
              variant="outline"
              className="w-full"
            >
              Go to Dashboard
            </Button>
          </div>

          <div className="text-center">
            <p className="text-sm text-muted-foreground">
              Need help? Visit our{" "}
              <button className="text-primary underline">Help Center</button>
              {" "}or contact support
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}