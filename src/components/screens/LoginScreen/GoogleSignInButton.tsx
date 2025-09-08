import React from 'react';
import type { TouchableOpacityProps } from 'react-native';
import { AntDesign } from '@expo/vector-icons';

import { Button, ButtonIcon, ButtonText } from '@/src/components/ui/button';

/**
 * GoogleSignInButton component props
 * @interface GoogleSignInButtonProps
 * @extends {Omit<TouchableOpacityProps, 'style'>}
 * @property {string} [text] - The text to display on the button
 * @property {string} [className] - Additional class names for styling
 */
interface GoogleSignInButtonProps extends Omit<TouchableOpacityProps, 'style'> {
  text?: string;
  className?: string;
}

/**
 * GoogleSignInButton component
 *
 * A button component for Google Sign-In functionality that follows the project's
 * established button patterns and styling.
 *
 * @param {GoogleSignInButtonProps} props - The component props
 * @returns {JSX.Element} The rendered component
 */
export default function GoogleSignInButton({
  text = 'Sign in with Google',
  className,
  ...props
}: GoogleSignInButtonProps): React.ReactElement {
  return (
    <Button
      variant='outline'
      className={`bg-background mb-4 h-12 w-full border border-outline-200 ${className || ''}`}
      {...props}
    >
      <ButtonIcon
        className='text-primary-500'
        size='sm'
        as={props => <AntDesign name='google' {...props} />}
      />
      <ButtonText className='ml-2 font-medium text-primary-300'>{text}</ButtonText>
    </Button>
  );
}
