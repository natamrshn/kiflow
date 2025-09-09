import { HStack } from '@/src/components/ui/hstack';
import { VStack } from '@/src/components/ui/vstack';
import type { Course } from '@/src/constants/types/course';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';

interface CourseCardProps {
  course: Course;
}

const CourseCard: React.FC<CourseCardProps> = ({ course }) => {
  const router = useRouter();
  const [pressed, setPressed] = useState(false);

  return (
    <View style={styles.card}>
      <Image
        source={{ uri: course.image || 'https://picsum.photos/800/600' }}
        style={styles.image}
      />
      <VStack style={styles.content}>
        <Text style={styles.title}>{course.title}</Text>
        <Text style={styles.instructor}>Інструктор: {course.instructor}</Text>
        <Text style={styles.description} numberOfLines={2}>
          {course.description || 'Опис відсутній'}
        </Text>

        <HStack style={styles.statsRow}>
          <HStack style={styles.stat}>
            <Ionicons name="time-outline" size={16} color="#6B7280" />
            <Text style={styles.statText}>{course.duration || 'Тривалість невідома'}</Text>
          </HStack>

          <HStack style={styles.stat}>
            <Ionicons name="star" size={16} color="#F59E0B" />
            <Text style={styles.statText}>{course.rating?.toFixed(1) || 'Н/Д'}</Text>
          </HStack>

          <HStack style={styles.stat}>
            <Ionicons name="people-outline" size={16} color="#6B7280" />
            <Text style={styles.statText}>{course.students || 0} учнів</Text>
          </HStack>
        </HStack>

        {/* Кнопка */}
        <HStack style={styles.button_block}>
        <Pressable
          style={({ pressed }) => [
            styles.button,
            pressed && styles.buttonPressed
          ]}
        //   onPress={() => router.push(`/course/${course.id}`)}
        >
          <Text style={styles.buttonText}>ПОЧАТИ КУРС</Text>
        </Pressable>
        </HStack>
      </VStack>
    </View>
  );
};

export default CourseCard;

const styles = StyleSheet.create({
  card: {
    borderRadius: 16,
    backgroundColor: '#F9FAFB',
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
  button: {
    display:'flex',
    marginTop: 16,
    backgroundColor: '#4CAF50',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    alignSelf: 'center',
    width: '50%',
  },
  buttonPressed: {
    backgroundColor: '#45A049', // темніший при натисканні
  },
  buttonText: { color: '#fff', fontWeight: 'bold', fontSize: 14 },
  button_block: {width:'100%', display:"flex", alignItems:'center', justifyContent:'center'}
});
