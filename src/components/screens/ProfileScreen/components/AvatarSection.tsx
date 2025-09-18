import { Input, InputField } from '@/src/components/ui/input';
import { Text } from '@/src/components/ui/text';
import { View } from '@/src/components/ui/view';
import { VStack } from '@/src/components/ui/vstack';
import { Image, StyleSheet } from 'react-native';

interface AvatarSectionProps {
  avatarUrl?: string;
  editMode: boolean;
  onAvatarUrlChange: (url: string) => void;
}

export default function AvatarSection({ 
  avatarUrl, 
  editMode, 
  onAvatarUrlChange 
}: AvatarSectionProps) {
  return (
    <VStack space="md" style={styles.largeAvatarSection}>
      <View style={styles.avatarContainer}>
        {avatarUrl ? (
          <Image
            source={{ uri: avatarUrl }}
            style={styles.largeAvatar}
            onError={(error) => {
              console.log('Image loading error:', error);
            }}
          />
        ) : (
          <View style={[styles.largeAvatar, styles.placeholderAvatar]}>
            <Text style={styles.placeholderText}>📸</Text>
            <Text style={styles.placeholderSubText}>Фото</Text>
          </View>
        )}
      </View>
      {editMode && (
        <Input style={styles.input}>
          <InputField
            placeholder="URL аватару"
            value={avatarUrl || ''}
            onChangeText={onAvatarUrlChange}
          />
        </Input>
      )}
    </VStack>
  );
}

const styles = StyleSheet.create({
  largeAvatarSection: {
    alignItems: 'center',
    paddingVertical: 30,
  },
  avatarContainer: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  largeAvatar: {
    width: 150,
    height: 150,
    borderRadius: 75,
    borderWidth: 4,
    borderColor: '#007AFF',
    backgroundColor: '#f0f0f0',
  },
  placeholderAvatar: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#e3f2fd',
  },
  placeholderText: {
    fontSize: 40,
    marginBottom: 5,
  },
  placeholderSubText: {
    fontSize: 14,
    color: '#666',
    fontWeight: '500',
  },
  input: {
    marginTop: 4,
  },
});
