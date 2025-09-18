import { SafeAreaView } from '@/src/components/ui/safe-area-view';
import { VStack } from '@/src/components/ui/vstack';
import type { User, UserUpdateData } from '@/src/constants/types/user';
import { getCurrentUserProfile, updateCurrentUserProfile } from '@/src/services/users';
import { useAuthStore } from '@/src/stores/authStore';
import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { Alert, ScrollView, StyleSheet } from 'react-native';

// Імпорт компонентів
import ActionButtons from './components/ActionButtons';
import AvatarSection from './components/AvatarSection';
import LoadingState from './components/LoadingState';
import ProfileHeader from './components/ProfileHeader';
import SignOutSection from './components/SignOutSection';
import UserInfoSection from './components/UserInfoSection';

export default function ProfileScreen() {
  const router = useRouter();
  const { user: authUser, isGuest } = useAuthStore();
  
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [editMode, setEditMode] = useState(false);
  
  const [formData, setFormData] = useState<UserUpdateData>({
    full_name: '',
    email: '',
    avatar_url: '',
  });


  useEffect(() => {
    if (isGuest || !authUser) {
      router.replace('/auth/login');
      return;
    }
    
    loadUserProfile();
  }, [authUser, isGuest, router]);

  const loadUserProfile = async () => {
    try {
      setLoading(true);
      const { data, error } = await getCurrentUserProfile();
      
      if (error) {
        console.error('Error loading profile:', error);
        Alert.alert('Помилка', 'Не вдалося завантажити профіль');
        return;
      }
      
      if (data) {
        setUser(data);
        setFormData({
          full_name: data.full_name || '',
          email: data.email || '',
          avatar_url: data.avatar_url || '',
        });
      }
    } catch (error) {
      console.error('Error loading profile:', error);
      Alert.alert('Помилка', 'Сталася помилка при завантаженні профілю');
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    try {
      setUpdating(true);
      
      const { data, error } = await updateCurrentUserProfile(formData);
      
      if (error) {
        console.error('Error updating profile:', error);
        Alert.alert('Помилка', 'Не вдалося оновити профіль');
        return;
      }
      
      if (data) {
        setUser(data);
        setEditMode(false);
        Alert.alert('Успішно', 'Профіль оновлено');
      }
    } catch (error) {
      console.error('Error updating profile:', error);
      Alert.alert('Помилка', 'Сталася помилка при оновленні профілю');
    } finally {
      setUpdating(false);
    }
  };

  const handleCancel = () => {
    if (user) {
      setFormData({
        full_name: user.full_name || '',
        email: user.email || '',
        avatar_url: user.avatar_url || '',
      });
    }
    setEditMode(false);
  };

  // Хендлери для дочірніх компонентів
  const handleFormDataChange = (field: keyof UserUpdateData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleEdit = () => {
    setEditMode(true);
  };

  if (loading) {
    return <LoadingState />;
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
        <VStack space="lg" style={styles.content}>
          <ProfileHeader />
          
          <AvatarSection
            avatarUrl={formData.avatar_url}
            editMode={editMode}
            onAvatarUrlChange={(url) => handleFormDataChange('avatar_url', url)}
          />

          <UserInfoSection
            user={user}
            formData={formData}
            editMode={editMode}
            onFormDataChange={handleFormDataChange}
          />

          <ActionButtons
            editMode={editMode}
            updating={updating}
            onEdit={handleEdit}
            onSave={handleSave}
            onCancel={handleCancel}
          />

          <SignOutSection />
        </VStack>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
  },
  content: {
    padding: 20,
  },
});
