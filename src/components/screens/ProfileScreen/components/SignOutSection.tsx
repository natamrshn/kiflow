import Button from '@/src/components/ui/button';
import { VStack } from '@/src/components/ui/vstack';
import { useAuthStore } from '@/src/stores/authStore';
import { useRouter } from 'expo-router';
import { Alert, StyleSheet } from 'react-native';

export default function SignOutSection() {
  const router = useRouter();
  const { signOut } = useAuthStore();

  const handleSignOut = async () => {
    Alert.alert(
      'Вихід з облікового запису',
      'Ви впевнені, що хочете вийти?',
      [
        {
          text: 'Скасувати',
          style: 'cancel',
        },
        {
          text: 'Вийти',
          style: 'destructive',
          onPress: async () => {
            try {
              await signOut();
              router.replace('/');
            } catch (error) {
              console.error('Error signing out:', error);
              Alert.alert('Помилка', 'Не вдалося вийти з облікового запису');
            }
          },
        },
      ]
    );
  };

  return (
    <VStack space="md" style={styles.signOutSection}>
      <Button
        title="Вийти з облікового запису"
        variant="secondary"
        onPress={handleSignOut}
        size="md"
      />
    </VStack>
  );
}

const styles = StyleSheet.create({
  signOutSection: {
    paddingTop: 20,
    paddingBottom: 30,
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
  },
});
