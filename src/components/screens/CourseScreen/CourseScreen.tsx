import { Module } from '@/src/constants/types/modules';
import { getModulesByCourse } from '@/src/services/modules';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { FlatList, Pressable, StyleSheet, Text, View } from 'react-native';

export default function CourseScreen() {
  const params = useLocalSearchParams<{ id?: string }>();
  const router = useRouter();
  const [modules, setModules] = useState<Module[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!params.id) return;

    const fetchModules = async () => {
      setLoading(true);
      try {
        const { data, error } = await getModulesByCourse(params.id!);
        if (error) {
          console.error(error);
          return;
        }
        if (data) setModules(data);
      } catch (err) {
        console.error('Unexpected error fetching modules:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchModules();
  }, [params.id]);

  const handleModulePress = (module: Module) => {
    router.push({
      pathname: '/module/[id]',
      params: { id: module.id }, 
    });
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={modules}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => (
          <Pressable style={styles.moduleItem} onPress={() => handleModulePress(item)}>
            <Text style={styles.moduleTitle}>{item.title}</Text>
            {item.description ? (
              <Text style={styles.moduleDescription}>{item.description}</Text>
            ) : null}
          </Pressable>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  moduleItem: {
    padding: 16,
    marginBottom: 12,
    borderRadius: 12,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 2,
  },
  moduleTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111',
    marginBottom: 4,
  },
  moduleDescription: {
    fontSize: 14,
    color: '#444',
  },
});
