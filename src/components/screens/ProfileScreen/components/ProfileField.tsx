import { Input, InputField } from '@/src/components/ui/input';
import { Text } from '@/src/components/ui/text';
import { View } from '@/src/components/ui/view';
import { Colors } from '@/src/constants/Colors';
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
    marginBottom: 20,
  },
  fieldLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.gray[700],
    marginBottom: 8,
    letterSpacing: 0.5,
    textTransform: 'uppercase',
  },
  fieldValue: {
    height: 40,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: 18,
    color: Colors.gray[900],
    backgroundColor: Colors.gray[50],
    borderRadius: 8,
    borderWidth: 1,
    borderColor: Colors.gray[200],
    fontWeight: '500',
  },
  input: {
    marginTop: 0,
  },
});
