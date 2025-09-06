import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Smartphone, MessageSquare } from "lucide-react";

export function PhoneRegistration() {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const formatPhoneNumber = (value: string) => {
    // Remove all non-digits
    const digits = value.replace(/\D/g, "");
    
    // Format as South African number
    if (digits.startsWith("27")) {
      return digits.replace(/(\d{2})(\d{2})(\d{3})(\d{4})/, "+$1 $2 $3 $4");
    } else if (digits.startsWith("0")) {
      return digits.replace(/(\d{1})(\d{2})(\d{3})(\d{4})/, "$1$2 $3 $4");
    }
    return digits;
  };

  const validatePhoneNumber = (phone: string) => {
    const digits = phone.replace(/\D/g, "");
    return (
      (digits.startsWith("27") && digits.length === 11) ||
      (digits.startsWith("0") && digits.length === 10)
    );
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatPhoneNumber(e.target.value);
    setPhoneNumber(formatted);
    setError("");
  };

  const handleSendOTP = async () => {
    if (!validatePhoneNumber(phoneNumber)) {
      setError("Please enter a valid South African phone number");
      return;
    }

    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      // Store phone number for verification step
      localStorage.setItem("registrationPhone", phoneNumber);
      navigate("/auth/verify");
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-background p-4 flex items-center justify-center">
      <Card className="w-full max-w-md shadow-card">
        <CardHeader className="text-center space-y-4">
          <div className="mx-auto w-16 h-16 bg-primary rounded-full flex items-center justify-center">
            <Smartphone className="w-8 h-8 text-primary-foreground" />
          </div>
          <CardTitle className="text-2xl">Register Your Phone</CardTitle>
          <CardDescription>
            Enter your phone number to get started with InsurAgri
          </CardDescription>
        </CardHeader>
        
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="phone">Phone Number</Label>
            <Input
              id="phone"
              type="tel"
              placeholder="+27 82 123 4567"
              value={phoneNumber}
              onChange={handlePhoneChange}
              className="text-lg"
            />
            <p className="text-sm text-muted-foreground">
              We'll send you a verification code via SMS
            </p>
          </div>

          {error && (
            <Alert variant="destructive">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <Button
            onClick={handleSendOTP}
            disabled={!phoneNumber || isLoading}
            className="w-full h-12 text-lg"
            size="lg"
          >
            {isLoading ? "Sending..." : "Send Verification Code"}
          </Button>

          <div className="text-center space-y-3">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <MessageSquare className="w-4 h-4" />
              <span>Or dial *123*456# for USSD registration</span>
            </div>
            
            <p className="text-xs text-muted-foreground">
              By continuing, you agree to our{" "}
              <button className="text-primary underline">Terms of Service</button>
              {" "}and{" "}
              <button className="text-primary underline">Privacy Policy</button>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}