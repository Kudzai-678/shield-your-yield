import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { BottomNavigation } from './navigation/BottomNavigation';
import { TopBar } from './navigation/TopBar';

export const MobileLayout = () => {
  return (
    <div className="min-h-screen bg-background">
      <TopBar />
      <main className="pb-20 pt-16">
        <Outlet />
      </main>
      <BottomNavigation />
    </div>
  );
};