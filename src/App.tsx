import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ThemeProvider } from "next-themes";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { MobileLayout } from "./components/MobileLayout";
import { Home } from "./pages/Home";
import { Cover } from "./pages/Cover";
import { CropSelection } from "./pages/CropSelection";
import { Farm } from "./pages/Farm";
import { Learn } from "./pages/Learn";
import { Wallet } from "./pages/Wallet";
import { PhoneRegistration } from "./pages/auth/PhoneRegistration";
import { OTPVerification } from "./pages/auth/OTPVerification";
import { ProfileSetup } from "./pages/auth/ProfileSetup";
import { RegistrationSuccess } from "./pages/auth/RegistrationSuccess";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
        <Routes>
          {/* Auth routes (standalone, no mobile layout) */}
          <Route path="/auth/register" element={<PhoneRegistration />} />
          <Route path="/auth/verify" element={<OTPVerification />} />
          <Route path="/auth/profile-setup" element={<ProfileSetup />} />
          <Route path="/auth/success" element={<RegistrationSuccess />} />
          
          {/* Main app routes */}
          <Route path="/" element={<MobileLayout />}>
            <Route index element={<Home />} />
            <Route path="cover" element={<Cover />} />
            <Route path="cover/crop-selection" element={<CropSelection />} />
            <Route path="farm" element={<Farm />} />
            <Route path="learn" element={<Learn />} />
            <Route path="wallet" element={<Wallet />} />
          </Route>
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
