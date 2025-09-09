import { Button } from '@/src/components/ui/button';
import { Image } from '@/src/components/ui/image';
import { SafeAreaView } from '@/src/components/ui/safe-area-view';
import { Text } from '@/src/components/ui/text';
import type { Course } from '@/src/constants/types/course';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import CourseCard from './components/CourseCard';

// 🔹 Мок-дані
const mockCourses: Course[] = [
  {
    id: '1',
    title: 'React Native для початківців',
    instructor: 'Іван Петренко',
    description: 'Вивчіть основи React Native та створіть свій перший мобільний додаток.',
    image: 'https://picsum.photos/800/600?random=1',
    duration: '12 годин',
    rating: 4.5,
    students: 123,
    level: 'Початковий',
    slides: [
      {
        id: 's1',
        type: 'text',
        title: 'Вступ',
        content: 'Ласкаво просимо на курс React Native!',
      },
    ],
  },
  {
    id: '2',
    title: 'Основи TypeScript',
    instructor: 'Марія Коваль',
    description: 'Зрозумійте базові концепції TypeScript для кращої типізації.',
    image: 'https://picsum.photos/800/600?random=2',
    duration: '8 годин',
    rating: 4.8,
    students: 87,
    level: 'Середній',
    slides: [
      {
        id: 's2',
        type: 'quiz',
        title: 'Що таке TypeScript?',
        quiz: {
          question: 'TypeScript — це...',
          options: ['Бібліотека', 'Фреймворк', 'Мова програмування'],
          correctAnswer: 2,
        },
      },
    ],
  },
  {
    id: '3',
    title: 'UI/UX Дизайн',
    instructor: 'Олег Сидоренко',
    description: 'Курс про створення привабливих і зручних інтерфейсів.',
    image: 'https://picsum.photos/800/600?random=3',
    duration: '15 годин',
    rating: 4.2,
    students: 200,
    level: 'Початковий',
    slides: [
      {
        id: 's3',
        type: 'content',
        title: 'Основи UI',
        mainPoint: 'Зрозумійте кольори, шрифти та композицію.',
        tips: ['Використовуйте контраст', 'Дотримуйтесь ієрархії'],
        example: 'Приклад: редизайн мобільного застосунку',
      },
    ],
  },
];

const CoursesScreen = () => {
  const router = useRouter();
  const [courses, setCourses] = useState<Course[]>([]);

  useEffect(() => {
    setTimeout(() => {
      setCourses(mockCourses);
    }, 500);
  }, []);

  const defaultAvatarUrl =
    'https://www.shutterstock.com/image-vector/blank-avatar-photo-place-holder-600nw-1095249842.jpg';

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Button variant="link" action="default" onPress={() => router.push('/')}>
          <Ionicons name="arrow-back" size={24} />
        </Button>
        <Text style={styles.headerTitle}>КУРСИ</Text>
        <Image source={{ uri: defaultAvatarUrl }} style={styles.avatar} />
      </View>

      {/* Courses list */}
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
