import { HStack } from '@/src/components/ui/hstack';
import { VStack } from '@/src/components/ui/vstack';
import { supabase } from '@/src/config/supabaseClient';
import type { Course } from '@/src/constants/types/course';
import { useAuthStore, useUserProgressStore } from '@/src/stores';
import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import Button from '../../../ui/button';
import ProgressBar from '../../../ui/progress-bar';

interface CourseCardProps {
  course: Course;
}

const CourseCard: React.FC<CourseCardProps> = ({ course }) => {
  const router = useRouter();
  const { getCourseProgress, progressByModule } = useUserProgressStore();
  const { user } = useAuthStore();
  const [courseProgress, setCourseProgress] = useState(0);

  // Получаем модули курса для расчёта прогресса
  useEffect(() => {
    const fetchModulesAndCalculateProgress = async () => {
      try {
        const { data: modules } = await supabase
          .from('modules')
          .select('id')
          .eq('course_id', course.id);
        
        if (modules) {
          const moduleIds = modules.map(module => module.id);
          const progress = getCourseProgress(moduleIds);
          setCourseProgress(progress);
        }
      } catch (error) {
        console.error('Error fetching modules for progress:', error);
      }
    };

    fetchModulesAndCalculateProgress();
  }, [course.id, getCourseProgress, progressByModule]); // Добавили progressByModule в зависимости

  // Отправляем прогресс курса в БД (debounce через таймер внутри эффекта)
  useEffect(() => {
    if (!user?.id) return;
    if (courseProgress < 0 || courseProgress > 100) return;

    const timeout = setTimeout(async () => {
      try {
        await supabase
          .from('course_progress')
          .upsert(
            {
              user_id: user.id,
              course_id: course.id,
              progress: courseProgress,
            },
            { onConflict: 'user_id,course_id' }
          );
      } catch (e) {
        console.warn('Failed to upsert course progress', e);
      }
    }, 500);

    return () => clearTimeout(timeout);
  }, [courseProgress, course.id, user?.id]);

  return (
    <View style={styles.card}>
      <Image
        source={{ uri: course.image || 'https://picsum.photos/800/600' }}
        style={styles.image}
      />
      <VStack style={styles.content}>
        <Text style={styles.title}>{course.title}</Text>
        <Text style={styles.description} numberOfLines={2}>
          {course.description || 'Опис відсутній'}
        </Text>
        
        {/* Показываем прогресс только если он больше 0 */}
        {courseProgress > 0 && (
          <View style={styles.progressContainer}>
            <View style={styles.progressRow}>
              <Text style={styles.progressLabel}>Прогрес:</Text>
              <Text style={styles.progressText}>{courseProgress}%</Text>
            </View>
            <ProgressBar percent={courseProgress} height={6} />
          </View>
        )}
        
        <HStack style={styles.button_block}>
          <Button
            title={courseProgress > 0 ? "ПРОДОВЖИТИ" : "ПОЧАТИ КУРС"}
            variant="primary"
            size="md"
            onPress={() => router.push(`/courses/${course.id}`)}
            style={styles.button}
          />
        </HStack>
      </VStack>
    </View>
  );
};

export default CourseCard;

const styles = StyleSheet.create({
  card: {
    borderRadius: 16,
    backgroundColor: '#ffffff',
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    marginBottom: 16,
  },
  image: { width: '100%', height: 160 },
  content: { padding: 16, gap: 8 },
  title: { fontSize: 16, fontWeight: 'bold', color: '#111' },
  instructor: { fontSize: 14, color: '#555' },
  description: { fontSize: 13, color: '#333' },
  statsRow: { display:'flex' ,flexDirection: 'row', justifyContent: 'space-between', marginTop: 8 },
  stat: {display:'flex', flexDirection: 'row', alignItems: 'center', gap: 4 },
  statText: { fontSize: 12, color: '#555' },
  progressContainer: {
    marginTop: 8,
    marginBottom: 8,
  },
  progressRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  progressLabel: {
    fontSize: 12,
    color: '#666',
    fontWeight: '500',
  },
  progressText: {
    fontSize: 12,
    color: '#026b1e',
    fontWeight: '600',
  },
  button: {
    marginTop: 16,
    width: '50%',
  },
  button_block: {width:'100%', display:"flex", alignItems:'center', justifyContent:'center'}
});
