import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { AlertCircle, CheckCircle, ExternalLink } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { toast } from 'sonner';

interface MapboxTokenManagerProps {
  onTokenValidated: (token: string) => void;
  currentToken?: string;
}

export const MapboxTokenManager: React.FC<MapboxTokenManagerProps> = ({
  onTokenValidated,
  currentToken
}) => {
  const [token, setToken] = useState(currentToken || '');
  const [isValidating, setIsValidating] = useState(false);
  const [isValid, setIsValid] = useState(false);

  useEffect(() => {
    // Check localStorage for existing token
    const savedToken = localStorage.getItem('mapbox_token');
    if (savedToken && !currentToken) {
      setToken(savedToken);
      validateToken(savedToken);
    }
  }, []);

  const validateToken = async (tokenToValidate: string) => {
    if (!tokenToValidate || !tokenToValidate.startsWith('pk.')) {
      setIsValid(false);
      return false;
    }

    setIsValidating(true);
    try {
      // Test token by making a simple API call
      const response = await fetch(
        `https://api.mapbox.com/tokens/v2?access_token=${tokenToValidate}`
      );
      
      if (response.ok) {
        setIsValid(true);
        localStorage.setItem('mapbox_token', tokenToValidate);
        onTokenValidated(tokenToValidate);
        toast.success('Mapbox token validated successfully!');
        return true;
      } else {
        setIsValid(false);
        toast.error('Invalid Mapbox token');
        return false;
      }
    } catch (error) {
      setIsValid(false);
      toast.error('Error validating token');
      return false;
    } finally {
      setIsValidating(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    validateToken(token);
  };

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          {isValid ? (
            <CheckCircle className="w-5 h-5 text-green-500" />
          ) : (
            <AlertCircle className="w-5 h-5 text-yellow-500" />
          )}
          Mapbox Configuration
        </CardTitle>
        <CardDescription>
          Enter your Mapbox public token to enable map functionality
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <form onSubmit={handleSubmit} className="space-y-3">
          <div>
            <Input
              type="text"
              placeholder="pk.your_mapbox_token_here"
              value={token}
              onChange={(e) => setToken(e.target.value)}
              className={isValid ? 'border-green-500' : ''}
            />
          </div>
          <Button 
            type="submit" 
            className="w-full" 
            disabled={isValidating || !token}
          >
            {isValidating ? 'Validating...' : 'Validate Token'}
          </Button>
        </form>

        <Alert>
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            Get your free Mapbox public token from{' '}
            <a 
              href="https://mapbox.com/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-primary hover:underline"
            >
              mapbox.com
              <ExternalLink className="w-3 h-3" />
            </a>
          </AlertDescription>
        </Alert>

        {isValid && (
          <Alert className="border-green-500 bg-green-50">
            <CheckCircle className="h-4 w-4 text-green-500" />
            <AlertDescription className="text-green-700">
              Token is valid and ready to use!
            </AlertDescription>
          </Alert>
        )}
      </CardContent>
    </Card>
  );
};