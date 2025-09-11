import { Module } from '@/src/constants/types/modules';
import { getModulesByCourse } from '@/src/services/modules';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { FlatList, Pressable, StyleSheet, Text, View } from 'react-native';

export default function CourseContentsScreen() {
  const params = useLocalSearchParams<{ id?: string }>();
  const router = useRouter();
  const [modules, setModules] = useState<Module[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchModules = async () => {
      if (!params.id) return;
      const { data, error } = await getModulesByCourse(params.id);
      if (error) console.error(error);
      if (data) setModules(data);
      setLoading(false);
    };
    fetchModules();
  }, [params.id]);

  const handleModulePress = (module: Module) => {
    // Переходимо до CourseScreen і показуємо слайди цього модуля (перший слайд)
    const moduleIndex = modules.findIndex(m => m.id === module.id);
    // router.push(`/course/${params.id}?moduleIndex=${moduleIndex}&slideIndex=0`);
  };

  if (loading) return <Text>Завантаження...</Text>;

  return (
    <View style={styles.container}>
      <FlatList
        data={modules}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <Pressable style={styles.moduleItem} onPress={() => handleModulePress(item)}>
            {/* <Text style={styles.moduleTitle}>{item.module_title}</Text> */}
          </Pressable>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex:1, padding:16 },
  moduleItem: { padding:16, borderBottomWidth:1, borderColor:'#ccc' },
  moduleTitle: { fontSize:18 }
});
