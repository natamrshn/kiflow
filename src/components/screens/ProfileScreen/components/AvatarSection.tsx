import Button from '@/src/components/ui/button';
import { HStack } from '@/src/components/ui/hstack';
import { Input, InputField } from '@/src/components/ui/input';
import { Text } from '@/src/components/ui/text';
import { View } from '@/src/components/ui/view';
import { VStack } from '@/src/components/ui/vstack';
import * as ImagePicker from 'expo-image-picker';
import { useState } from 'react';
import { Alert, Image, StyleSheet, TouchableOpacity } from 'react-native';

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
  const [isLoading, setIsLoading] = useState(false);

  const requestPermissions = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert(
        'Дозвіл необхідний',
        'Для вибору фото з галереї необхідний дозвіл на доступ до медіафайлів.'
      );
      return false;
    }
    return true;
  };

  const requestCameraPermissions = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert(
        'Дозвіл необхідний',
        'Для зйомки фото необхідний дозвіл на доступ до камери.'
      );
      return false;
    }
    return true;
  };

  const pickImageFromGallery = async () => {
    const hasPermission = await requestPermissions();
    if (!hasPermission) return;

    setIsLoading(true);
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.8,
      });

      if (!result.canceled && result.assets[0]) {
        onAvatarUrlChange(result.assets[0].uri);
      }
    } catch (error) {
      console.error('Error picking image:', error);
      Alert.alert('Помилка', 'Не вдалося вибрати зображення');
    } finally {
      setIsLoading(false);
    }
  };

  const takePhoto = async () => {
    const hasPermission = await requestCameraPermissions();
    if (!hasPermission) return;

    setIsLoading(true);
    try {
      const result = await ImagePicker.launchCameraAsync({
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.8,
      });

      if (!result.canceled && result.assets[0]) {
        onAvatarUrlChange(result.assets[0].uri);
      }
    } catch (error) {
      console.error('Error taking photo:', error);
      Alert.alert('Помилка', 'Не вдалося зробити фото');
    } finally {
      setIsLoading(false);
    }
  };

  const showImageOptions = () => {
    Alert.alert(
      'Виберіть фото',
      'Звідки хочете вибрати зображення?',
      [
        { text: 'Камера', onPress: takePhoto },
        { text: 'Галерея', onPress: pickImageFromGallery },
        { text: 'Скасувати', style: 'cancel' },
      ]
    );
  };

  return (
    <VStack space="md" style={styles.largeAvatarSection}>
      <TouchableOpacity 
        style={styles.avatarContainer} 
        onPress={editMode ? showImageOptions : undefined}
        disabled={isLoading}
      >
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
            <Text style={styles.placeholderSubText}>
              {editMode ? 'Натисніть для вибору фото' : 'Фото'}
            </Text>
          </View>
        )}
        {editMode && (
          <View style={styles.editOverlay}>
            <Text style={styles.editText}>✏️</Text>
          </View>
        )}
      </TouchableOpacity>

      {editMode && (
        <VStack space="sm">
          <HStack space="sm" style={styles.buttonContainer}>
            <Button 
              title="📷 Галерея"
              onPress={pickImageFromGallery} 
              style={styles.photoButton}
              textStyle={styles.buttonText}
              disabled={isLoading}
              variant="primary"
              size="md"
            />
            <Button 
              title="📸 Камера"
              onPress={takePhoto} 
              style={styles.photoButton}
              textStyle={styles.buttonText}
              disabled={isLoading}
              variant="primary"
              size="md"
            />
          </HStack>
          
          <Input style={styles.input}>
            <InputField
              placeholder="Або введіть URL зображення"
              value={avatarUrl || ''}
              onChangeText={onAvatarUrlChange}
              editable={!isLoading}
            />
          </Input>
        </VStack>
      )}

      {isLoading && (
        <Text style={styles.loadingText}>Завантаження...</Text>
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
    position: 'relative',
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
    fontSize: 12,
    color: '#666',
    fontWeight: '500',
    textAlign: 'center',
    paddingHorizontal: 10,
  },
  editOverlay: {
    position: 'absolute',
    bottom: 5,
    right: 5,
    backgroundColor: '#007AFF',
    borderRadius: 20,
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  editText: {
    fontSize: 18,
    color: 'white',
  },
  buttonContainer: {
    justifyContent: 'center',
    width: '100%',
    paddingHorizontal: 20,
  },
  photoButton: {
    flex: 1,
    backgroundColor: '#007AFF',
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 16,
    marginHorizontal: 5,
  },
  buttonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '600',
    textAlign: 'center',
  },
  input: {
    marginTop: 8,
    marginHorizontal: 20,
  },
  loadingText: {
    fontSize: 16,
    color: '#666',
    fontStyle: 'italic',
    marginTop: 10,
  },
});
