import Button from '@/src/components/ui/button';
import { HStack } from '@/src/components/ui/hstack';
import { Text } from '@/src/components/ui/text';
import { View } from '@/src/components/ui/view';
import { useRouter } from 'expo-router';
import { StyleSheet } from 'react-native';

interface ProfileHeaderProps {
  title?: string;
}

export default function ProfileHeader({ title = "Профіль користувача" }: ProfileHeaderProps) {
  const router = useRouter();

  return (
    <HStack space="md" style={styles.header}>
      <Button
        title="← Назад"
        variant="secondary"
        size="sm"
        onPress={() => router.back()}
      />
      <View style={styles.headerTitle}>
        <Text style={styles.title}>{title}</Text>
      </View>
    </HStack>
  );
}

const styles = StyleSheet.create({
  header: {
    alignItems: 'center',
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  headerTitle: {
    flex: 1,
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
});
