import { SafeAreaView } from '@/src/components/ui/safe-area-view';
import { Text } from '@/src/components/ui/text';
import type { Course } from '@/src/constants/types/course';
import { getCourses } from '@/src/services/courses';
import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import CourseCard from './components/CourseCard';


const CoursesScreen = () => {
  const router = useRouter();
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    setLoading(true);
  
    getCourses()
      .then(({ data, error }) => {
        if (error) {
          console.error('Помилка при завантаженні курсів:', error);
        } else {
          setCourses(data || []);
        }
      })
      .catch(err => {
        console.error('Непередбачена помилка при завантаженні курсів:', err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);
  
  const defaultAvatarUrl =
    'https://www.shutterstock.com/image-vector/blank-avatar-photo-place-holder-600nw-1095249842.jpg';

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.listContainer}>
        {courses.length === 0 ? (
          <Text style={styles.loadingText}>Завантаження курсів...</Text>
        ) : (
          <View style={styles.cardsContainer}>
            {courses.map(course => (
              <CourseCard key={course.id} course={course} />
            ))}
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default CoursesScreen;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#fff',
  },
  headerTitle: { fontSize: 20, fontWeight: 'bold', color: '#111' },
  avatar: { width: 40, height: 40, borderRadius: 20, borderWidth: 2, borderColor: '#000' },
  listContainer: { padding: 16 },
  cardsContainer: { gap: 16 },
  loadingText: { textAlign: 'center', color: '#666' },
});
