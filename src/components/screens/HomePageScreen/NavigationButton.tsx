import { Button, ButtonIcon, ButtonText } from '@/src/components/ui/button';
import type { LucideIcon } from 'lucide-react-native';
import React from 'react';

export type AppRoute =
  | '/'
  | '/admin'
  | '/ai-chat'
  | '/auth/forgot-password'
  | '/auth/login'
  | '/ai-instructions'
  | '/course'
  | '/courses'
  | '/profile'
  | '/real-estate-simulator'
  | '/+not-found'
  | '/company-dashboard';

interface NavigationButtonProps {
  route: AppRoute;
  icon: LucideIcon;
  label: string;
  onNavigate: (route: AppRoute) => void;
  variant?: 'solid' | 'outline';
  action?: 'primary' | 'secondary' | 'positive' | 'negative' | 'default';
  className?: string;
}

export const NavigationButton: React.FC<NavigationButtonProps> = ({
  route,
  icon,
  label,
  onNavigate,
  variant = 'outline',
  action = 'primary',
  className = 'w-full',
}) => {
  return (
    <Button
      variant={variant}
      action={action}
      className={className}
      onPress={() => onNavigate(route)}
    >
      <ButtonIcon as={icon} />
      <ButtonText className='uppercase'>{label}</ButtonText>
    </Button>
  );
};