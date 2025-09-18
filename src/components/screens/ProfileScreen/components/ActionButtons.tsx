import Button from '@/src/components/ui/button';
import { HStack } from '@/src/components/ui/hstack';
import { VStack } from '@/src/components/ui/vstack';
import { Colors } from '@/src/constants/Colors';
import { StyleSheet } from 'react-native';

interface ActionButtonsProps {
  editMode: boolean;
  updating: boolean;
  onEdit: () => void;
  onSave: () => void;
  onCancel: () => void;
}

export default function ActionButtons({
  editMode,
  updating,
  onEdit,
  onSave,
  onCancel,
}: ActionButtonsProps) {
  return (
    <VStack space="md" style={styles.actionsSection}>
      {editMode ? (
        <HStack space="md">
          <Button
            title="Скасувати"
            variant="secondary"
            onPress={onCancel}
            style={styles.actionButton}
            disabled={updating}
          />
          <Button
            title={updating ? "Збереження..." : "Зберегти"}
            variant="primary"
            onPress={onSave}
            style={styles.actionButton}
            disabled={updating}
          />
        </HStack>
      ) : (
        <Button
          title="Редагувати"
          variant="primary"
          onPress={onEdit}
          style={styles.editButton}
        />
      )}
    </VStack>
  );
}

const styles = StyleSheet.create({
  actionsSection: {
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
  actionButton: {
    flex: 1,
  },
  editButton: {
    alignSelf: 'stretch',
  },
});
