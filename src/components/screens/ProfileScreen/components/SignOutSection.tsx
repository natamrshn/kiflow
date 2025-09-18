import Button from '@/src/components/ui/button';
import { VStack } from '@/src/components/ui/vstack';
import { Colors } from '@/src/constants/Colors';
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
    backgroundColor: Colors.white,
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: Colors.gray[200],
    shadowColor: Colors.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 2,
  },
});
