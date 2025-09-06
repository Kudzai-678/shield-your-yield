import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import { Shield, ArrowLeft } from "lucide-react";

export function OTPVerification() {
  const [otp, setOtp] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [resendTimer, setResendTimer] = useState(30);
  const [canResend, setCanResend] = useState(false);
  const navigate = useNavigate();

  const phoneNumber = localStorage.getItem("registrationPhone") || "";

  useEffect(() => {
    if (!phoneNumber) {
      navigate("/auth/register");
      return;
    }

    const timer = setInterval(() => {
      setResendTimer((prev) => {
        if (prev <= 1) {
          setCanResend(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [phoneNumber, navigate]);

  useEffect(() => {
    if (otp.length === 6) {
      handleVerifyOTP();
    }
  }, [otp]);

  const handleVerifyOTP = async () => {
    setIsLoading(true);
    setError("");

    // Simulate API call - accept "123456" for testing
    setTimeout(() => {
      if (otp === "123456") {
        localStorage.setItem("otpVerified", "true");
        navigate("/auth/profile-setup");
      } else {
        setError("Invalid verification code. Please try again.");
        setOtp("");
      }
      setIsLoading(false);
    }, 1000);
  };

  const handleResendOTP = () => {
    setCanResend(false);
    setResendTimer(30);
    setError("");
    // Simulate resend API call
    console.log("Resending OTP to:", phoneNumber);
  };

  const handleBack = () => {
    navigate("/auth/register");
  };

  return (
    <div className="min-h-screen bg-background p-4 flex items-center justify-center">
      <Card className="w-full max-w-md shadow-card">
        <CardHeader className="text-center space-y-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={handleBack}
            className="absolute top-4 left-4"
          >
            <ArrowLeft className="w-4 h-4" />
          </Button>
          
          <div className="mx-auto w-16 h-16 bg-success rounded-full flex items-center justify-center">
            <Shield className="w-8 h-8 text-success-foreground" />
          </div>
          <CardTitle className="text-2xl">Verify Your Phone</CardTitle>
          <CardDescription>
            We sent a 6-digit code to {phoneNumber}
          </CardDescription>
        </CardHeader>
        
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <div className="flex justify-center">
              <InputOTP
                maxLength={6}
                value={otp}
                onChange={(value) => setOtp(value)}
                disabled={isLoading}
              >
                <InputOTPGroup>
                  <InputOTPSlot index={0} />
                  <InputOTPSlot index={1} />
                  <InputOTPSlot index={2} />
                  <InputOTPSlot index={3} />
                  <InputOTPSlot index={4} />
                  <InputOTPSlot index={5} />
                </InputOTPGroup>
              </InputOTP>
            </div>

            {error && (
              <Alert variant="destructive">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            <div className="text-center">
              {canResend ? (
                <Button
                  variant="ghost"
                  onClick={handleResendOTP}
                  className="text-primary"
                >
                  Resend verification code
                </Button>
              ) : (
                <p className="text-sm text-muted-foreground">
                  Resend code in {resendTimer}s
                </p>
              )}
            </div>
          </div>

          <div className="text-center">
            <p className="text-sm text-muted-foreground">
              For testing, use code: <span className="font-mono text-primary">123456</span>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}