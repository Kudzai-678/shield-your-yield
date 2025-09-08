import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ThemeToggle } from '@/components/ui/theme-toggle';
import { Leaf, CheckCircle } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

export const EmailConfirmation = () => {
  const navigate = useNavigate();
  const { user, session } = useAuth();

  useEffect(() => {
    // If user is authenticated and email is confirmed, redirect to profile setup
    if (user && session) {
      // Small delay to show the confirmation page briefly
      const timer = setTimeout(() => {
        navigate('/auth/profile-setup');
      }, 2000);
      
      return () => clearTimeout(timer);
    }
  }, [user, session, navigate]);

  return (
    <div className="min-h-screen bg-gradient-primary flex items-center justify-center p-4">
      {/* Theme Toggle */}
      <div className="fixed top-6 right-6 z-50">
        <ThemeToggle />
      </div>
      
      <div className="w-full max-w-md space-y-6">
        {/* Header */}
        <div className="text-center text-primary-foreground">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Leaf className="h-8 w-8" />
            <h1 className="text-2xl font-bold">InsurAgri</h1>
          </div>
        </div>

        {/* Confirmation Card */}
        <Card className="shadow-soft">
          <CardHeader className="text-center pb-6">
            <div className="flex justify-center mb-4">
              <CheckCircle className="h-16 w-16 text-success" />
            </div>
            <CardTitle className="text-2xl">Email Confirmed!</CardTitle>
            <CardDescription>
              Your email has been successfully verified. You'll be redirected to complete your profile setup.
            </CardDescription>
          </CardHeader>
          <CardContent className="text-center">
            <p className="text-sm text-muted-foreground">
              Redirecting you to profile setup...
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};