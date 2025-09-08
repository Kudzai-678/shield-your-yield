import { Settings, User, Palette, Bell, LogOut } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuLabel,
} from '@/components/ui/dropdown-menu';
import { Switch } from '@/components/ui/switch';
import { ThemeToggle } from '@/components/ui/theme-toggle';
import { LanguageSelector } from '@/components/ui/language-selector';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';

export const SettingsDropdown = () => {
  const navigate = useNavigate();
  const { signOut } = useAuth();
  const { t } = useTranslation();
  const [pushNotifications, setPushNotifications] = useState(true);

  const handleLogout = async () => {
    await signOut();
    navigate('/');
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon">
          <Settings className="h-5 w-5" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56 bg-background border border-border">
        <DropdownMenuLabel className="text-foreground">{t('settings.title')}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        
        <DropdownMenuItem onClick={() => navigate('/profile')} className="text-foreground hover:bg-muted cursor-pointer">
          <User className="mr-2 h-4 w-4" />
          <span>{t('settings.profile')}</span>
        </DropdownMenuItem>
        
        <DropdownMenuItem className="text-foreground hover:bg-muted cursor-pointer">
          <Palette className="mr-2 h-4 w-4" />
          <div className="flex items-center justify-between w-full">
            <span>{t('settings.appearance')}</span>
            <ThemeToggle className="ml-2 scale-75" />
          </div>
        </DropdownMenuItem>
        
        <DropdownMenuItem className="text-foreground hover:bg-muted cursor-pointer">
          <LanguageSelector />
        </DropdownMenuItem>
        
        <DropdownMenuItem className="text-foreground hover:bg-muted cursor-pointer">
          <Bell className="mr-2 h-4 w-4" />
          <div className="flex items-center justify-between w-full">
            <span>{t('settings.notifications')}</span>
            <Switch 
              checked={pushNotifications}
              onCheckedChange={setPushNotifications}
              className="ml-2"
            />
          </div>
        </DropdownMenuItem>
        
        <DropdownMenuSeparator />
        
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <DropdownMenuItem onSelect={(e) => e.preventDefault()} className="text-destructive hover:bg-destructive/10 cursor-pointer">
              <LogOut className="mr-2 h-4 w-4" />
              <span>{t('settings.logout')}</span>
            </DropdownMenuItem>
          </AlertDialogTrigger>
          <AlertDialogContent className="bg-background border border-border">
            <AlertDialogHeader>
              <AlertDialogTitle className="text-foreground">{t('settings.logoutConfirm')}</AlertDialogTitle>
              <AlertDialogDescription className="text-muted-foreground">
                {t('settings.logoutDescription')}
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel className="text-foreground">{t('settings.cancel')}</AlertDialogCancel>
              <AlertDialogAction onClick={handleLogout} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
                {t('settings.logout')}
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};