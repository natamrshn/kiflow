import { Input, InputField } from '@/src/components/ui/input';
import { Text } from '@/src/components/ui/text';
import { View } from '@/src/components/ui/view';
import { StyleSheet, TextInputProps } from 'react-native';

interface ProfileFieldProps {
  label: string;
  value?: string;
  placeholder?: string;
  editMode: boolean;
  onValueChange?: (value: string) => void;
  inputProps?: Partial<TextInputProps>;
  readOnly?: boolean;
}

export default function ProfileField({
  label,
  value,
  placeholder,
  editMode,
  onValueChange,
  inputProps,
  readOnly = false,
}: ProfileFieldProps) {
  return (
    <View style={styles.fieldContainer}>
      <Text style={styles.fieldLabel}>{label}</Text>
      {editMode && !readOnly ? (
        <Input style={styles.input}>
          <InputField
            placeholder={placeholder}
            value={value || ''}
            onChangeText={onValueChange}
            {...inputProps}
          />
        </Input>
      ) : (
        <Text style={styles.fieldValue}>
          {value || 'Не вказано'}
        </Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  fieldContainer: {
    marginBottom: 16,
  },
  fieldLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#666',
    marginBottom: 4,
  },
  fieldValue: {
    fontSize: 16,
    color: '#333',
    paddingVertical: 8,
  },
  input: {
    marginTop: 4,
  },
});
