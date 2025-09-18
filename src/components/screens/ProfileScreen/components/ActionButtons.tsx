import Button from '@/src/components/ui/button';
import { HStack } from '@/src/components/ui/hstack';
import { VStack } from '@/src/components/ui/vstack';
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
    paddingTop: 20,
  },
  actionButton: {
    flex: 1,
  },
  editButton: {
    alignSelf: 'center',
    minWidth: 150,
  },
});
