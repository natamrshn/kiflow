import { HStack } from '@/src/components/ui/hstack';
import { VStack } from '@/src/components/ui/vstack';
import type { Course } from '@/src/constants/types/course';
import { useRouter } from 'expo-router';
import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import Button from '../../../ui/button';

interface CourseCardProps {
  course: Course;
}

const CourseCard: React.FC<CourseCardProps> = ({ course }) => {
  const router = useRouter();

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
        <HStack style={styles.button_block}>
          <Button
            title="ПОЧАТИ КУРС"
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
  button: {
    marginTop: 16,
    width: '50%',
  },
  button_block: {width:'100%', display:"flex", alignItems:'center', justifyContent:'center'}
});
