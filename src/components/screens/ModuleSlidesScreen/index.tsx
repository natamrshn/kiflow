
import { Slide } from '@/src/constants/types/slides';
import { getSlidesByModule } from '@/src/services/slides';
import { useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';
import CourseSwiper from '../CourseScreen/CourseSwiper';

export default function ModuleSlidesScreen() {
  const params = useLocalSearchParams<{ id?: string }>(); // id модуля
  const [slides, setSlides] = useState<Slide[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!params.id) return;

    const fetchSlides = async () => {
      setLoading(true);
      try {
        const { data, error } = await getSlidesByModule(params.id!);
        if (error) {
          console.error(error);
          return;
        }
        if (data) setSlides(data);
      } catch (err) {
        console.error('Unexpected error fetching slides:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchSlides();
  }, [params.id]);

  if (loading) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <CourseSwiper
      slides={slides}
      initialIndex={0}
      totalSlides={slides.length}
    />
  );
}

const styles = StyleSheet.create({
  loader: { flex: 1, justifyContent: 'center', alignItems: 'center' },
});
