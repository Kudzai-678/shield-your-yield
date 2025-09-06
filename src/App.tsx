import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "next-themes";
import { SplashCursor } from "./components/ui/splash-cursor";
import { MobileLayout } from "./components/MobileLayout";
import { Landing } from "./pages/Landing";
import { Login } from "./pages/auth/Login"; 
import { Dashboard } from "./pages/Dashboard";
import { Cover } from "./pages/Cover";
import { CropSelection } from "./pages/CropSelection";
import { Farm } from "./pages/Farm";
import { FarmLocation } from "./pages/FarmLocation";
import { Learn } from "./pages/Learn";
import { Wallet } from "./pages/Wallet";
import { PhoneRegistration } from "./pages/auth/PhoneRegistration";
import { OTPVerification } from "./pages/auth/OTPVerification";
import { ProfileSetup } from "./pages/auth/ProfileSetup";
import { RegistrationSuccess } from "./pages/auth/RegistrationSuccess";
import NotFound from "./pages/NotFound";
import "./index.css";

const App = () => {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <SplashCursor 
        DENSITY_DISSIPATION={2.8}
        VELOCITY_DISSIPATION={1.5}
        SPLAT_FORCE={4000}
        SPLAT_RADIUS={0.15}
        COLOR_UPDATE_SPEED={8}
        BACK_COLOR={{ r: 0.2, g: 0.4, b: 0.1 }}
      />
      <BrowserRouter>
        <Routes>
          {/* Landing page (no layout) */}
          <Route path="/" element={<Landing />} />
          
          {/* Auth routes (standalone, no mobile layout) */}
          <Route path="/auth/login" element={<Login />} />
          <Route path="/auth/register" element={<PhoneRegistration />} />
          <Route path="/auth/verify" element={<OTPVerification />} />
          <Route path="/auth/profile-setup" element={<ProfileSetup />} />
          <Route path="/auth/success" element={<RegistrationSuccess />} />
          
          {/* Main app routes (authenticated) */}
          <Route path="/" element={<MobileLayout />}>
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="cover" element={<Cover />} />
            <Route path="cover/crop-selection" element={<CropSelection />} />
            <Route path="farm" element={<Farm />} />
            <Route path="farm/location" element={<FarmLocation />} />
            <Route path="learn" element={<Learn />} />
            <Route path="wallet" element={<Wallet />} />
          </Route>
          
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
};

export default App;