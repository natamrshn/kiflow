import { VStack } from '@/src/components/ui/vstack';
import type { User, UserUpdateData } from '@/src/constants/types/user';
import { StyleSheet } from 'react-native';
import ProfileField from './ProfileField';

interface UserInfoSectionProps {
  user: User | null;
  formData: UserUpdateData;
  editMode: boolean;
  onFormDataChange: (field: keyof UserUpdateData, value: string) => void;
}

export default function UserInfoSection({
  user,
  formData,
  editMode,
  onFormDataChange,
}: UserInfoSectionProps) {
  const formatDate = (dateString: string | null) => {
    if (!dateString) return 'Не вказано';
    return new Date(dateString).toLocaleDateString('uk-UA');
  };

  return (
    <VStack space="md" style={styles.infoSection}>
      <ProfileField
        label="Повне ім'я"
        value={editMode ? formData.full_name : user?.full_name}
        placeholder="Введіть повне ім'я"
        editMode={editMode}
        onValueChange={(value) => onFormDataChange('full_name', value)}
      />

      <ProfileField
        label="Email"
        value={editMode ? formData.email : user?.email}
        placeholder="Введіть email"
        editMode={editMode}
        onValueChange={(value) => onFormDataChange('email', value)}
        inputProps={{
          keyboardType: 'email-address',
          autoCapitalize: 'none',
        }}
      />

      <ProfileField
        label="Дата реєстрації"
        value={formatDate(user?.created_at)}
        editMode={false}
        readOnly={true}
      />
    </VStack>
  );
}

const styles = StyleSheet.create({
  infoSection: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
});
