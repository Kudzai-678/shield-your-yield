import { Home, Shield, Sprout, GraduationCap, Wallet } from 'lucide-react';
import { NavLink } from 'react-router-dom';
import { cn } from '@/lib/utils';

const navItems = [
  { icon: Home, label: 'Home', path: '/' },
  { icon: Shield, label: 'Cover', path: '/cover' },
  { icon: Sprout, label: 'Farm', path: '/farm' },
  { icon: GraduationCap, label: 'Learn', path: '/learn' },
  { icon: Wallet, label: 'Wallet', path: '/wallet' },
];

export const BottomNavigation = () => {
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-background border-t border-border">
      <div className="flex items-center justify-around py-1 sm:py-2 px-1">
        {navItems.map(({ icon: Icon, label, path }) => (
          <NavLink
            key={path}
            to={path}
            className={({ isActive }) =>
              cn(
                'flex flex-col items-center gap-0.5 sm:gap-1 px-2 sm:px-3 py-1.5 sm:py-2 rounded-lg transition-colors min-w-[50px] sm:min-w-[60px] max-w-[80px]',
                isActive
                  ? 'text-primary bg-primary/10'
                  : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
              )
            }
          >
            <Icon className="h-4 w-4 sm:h-5 sm:w-5 flex-shrink-0" />
            <span className="text-[10px] sm:text-xs font-medium truncate w-full text-center leading-tight">{label}</span>
          </NavLink>
        ))}
      </div>
    </nav>
  );
};