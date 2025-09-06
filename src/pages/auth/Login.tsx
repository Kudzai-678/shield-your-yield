import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ThemeToggle } from '@/components/ui/theme-toggle';
import { Leaf, ArrowLeft } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

export const Login = () => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = () => {
    // TODO: Implement actual login logic
    console.log('Login attempt:', { phoneNumber, password });
    // For now, navigate to dashboard
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen bg-gradient-primary flex items-center justify-center p-4">
      {/* Theme Toggle */}
      <div className="fixed top-6 right-6 z-50">
        <ThemeToggle />
      </div>
      
      <div className="w-full max-w-md space-y-6">
        {/* Header */}
        <div className="text-center text-primary-foreground">
          <Link 
            to="/" 
            className="inline-flex items-center gap-2 text-primary-foreground/80 hover:text-primary-foreground mb-6"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to home
          </Link>
          <div className="flex items-center justify-center gap-2 mb-4">
            <Leaf className="h-8 w-8" />
            <h1 className="text-2xl font-bold">InsurAgri</h1>
          </div>
          <p className="text-primary-foreground/90">
            Welcome back to your farm insurance portal
          </p>
        </div>

        {/* Login Form */}
        <Card className="shadow-soft">
          <CardHeader className="text-center pb-6">
            <CardTitle className="text-2xl">Login to Your Account</CardTitle>
            <CardDescription>
              Enter your phone number and password to access your account
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number</Label>
              <Input
                id="phone"
                type="tel"
                placeholder="+27 XX XXX XXXX"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <Button 
              onClick={handleLogin}
              className="w-full" 
              size="mobile"
              disabled={!phoneNumber || !password}
            >
              Login
            </Button>

            <div className="text-center">
              <Link 
                to="/auth/forgot-password" 
                className="text-sm text-primary hover:underline"
              >
                Forgot your password?
              </Link>
            </div>

            <div className="text-center pt-4 border-t">
              <p className="text-sm text-muted-foreground">
                Don't have an account?{' '}
                <Link to="/auth/register" className="text-primary hover:underline font-medium">
                  Sign up here
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Alternative Access */}
        <Card className="shadow-card">
          <CardContent className="p-4 text-center">
            <p className="text-sm text-muted-foreground mb-2">
              No internet? Access via USSD
            </p>
            <p className="font-mono text-lg">*123*456#</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};