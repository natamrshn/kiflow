// src/components/CourseSwiper.tsx
import React, { useEffect, useRef, useState } from 'react';
import { StyleSheet, Text, useWindowDimensions, View } from 'react-native';
import Animated, { runOnJS, useAnimatedScrollHandler } from 'react-native-reanimated';

import { Slide } from '@/src/constants/types/slides';


// type SlideType = 'text' | 'video' | 'quiz' | 'content' | 'completion' | 'ai' | 'dashboard';

// type Slide = {
//   id: string;
//   module_id:string;
//   slide_data: string;
//   slide_order: number;
//   slide_type: SlideType;
//   slide_title: string;
//   content?: string;
// };



interface CourseSwiperProps {
  slides: Slide[];
  initialIndex?: number;
  onIndexChange?: (index: number) => void;
}

const CourseSwiper: React.FC<CourseSwiperProps> = ({ slides = [], initialIndex = 0, onIndexChange }) => {
  const { width, height } = useWindowDimensions();
  const scrollRef = useRef<Animated.ScrollView | null>(null);
  const [currentIndex, setCurrentIndex] = useState<number>(Math.max(0, initialIndex));

  // при скролі — обчислюємо індекс вертикально
  const onScroll = useAnimatedScrollHandler({
    onScroll: event => {
      const idx = Math.round(event.contentOffset.y / height);
      runOnJS(setCurrentIndex)(idx);
      if (onIndexChange) runOnJS(onIndexChange)(idx);
    },
  });

  // Прокручуємо на початковий індекс коли є slides
  useEffect(() => {
    if (!slides || slides.length === 0) return;

    const safeIndex = Math.min(Math.max(0, initialIndex), slides.length - 1);
    setCurrentIndex(safeIndex);

    // reanimated ScrollView: використовуємо any щоб уникнути типових проблем з TS
    (scrollRef.current as any)?.scrollTo?.({ y: safeIndex * height, animated: false });
  }, [slides, height, initialIndex]);

  const renderSlide = (slide: Slide, index: number) => {
    const commonStyle = { 
        width, 
        height, 
        justifyContent: "center" as const, 
        alignItems: "center" as const 
      };
    switch (slide.slide_type) {
      case 'text':
        return (
          <View key={slide.id} style={[commonStyle, { backgroundColor: '#F9FAFB', padding: 20 }]}>
            <Text style={styles.slideTitle}>{slide.slide_title}</Text>
            {/* <Text style={styles.slideContent}>{slide.content}</Text> */}
          </View>
        );
      case 'video':
        return (
          <View key={slide.id} style={[commonStyle, { backgroundColor: '#E0F7FA' }]}>
            <Text style={styles.slideTitle}>{slide.slide_title}</Text>
            <Text style={styles.slideContent}>🎬 Тут буде відеоплеєр (mock)</Text>
          </View>
        );
      case 'quiz':
        return (
          <View key={slide.id} style={[commonStyle, { backgroundColor: '#FFF3E0' }]}>
            <Text style={styles.slideTitle}>{slide.slide_title}</Text>
            <Text style={styles.slideContent}>❓ Коротке питання (mock)</Text>
          </View>
        );
      default:
        return (
          <View key={slide.id} style={[commonStyle, { backgroundColor: '#fff' }]}>
            <Text style={styles.slideTitle}>{slide.slide_title ?? 'Slide'}</Text>
          </View>
        );
    }
  };

  return (
    <View style={styles.wrapper}>
      <Animated.ScrollView
        ref={scrollRef}
        pagingEnabled
        onScroll={onScroll}
        scrollEventThrottle={16}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{}}
      >
        {slides.map((s, i) => renderSlide(s, i))}
      </Animated.ScrollView>

      {/* Пагінація справа */}
      <View style={[styles.pagination, { top: height * 0.2, height: height * 0.6 }]}>
        {slides.map((_, i) => {
          const active = i === currentIndex;
          return (
            <View
              key={i}
              style={[
                styles.dot,
                active ? styles.dotActive : styles.dotInactive,
                active && { height: 18, width: 18, borderRadius: 9 },
              ]}
            />
          );
        })}
      </View>
    </View>
  );
};

export default CourseSwiper;

const styles = StyleSheet.create({
  wrapper: { flex: 1, backgroundColor: '#fff' },
  slideTitle: { fontSize: 22, fontWeight: '700', color: '#111', marginBottom: 8, textAlign: 'center' },
  slideContent: { fontSize: 16, color: '#333', textAlign: 'center', paddingHorizontal: 10 },
  pagination: {
    position: 'absolute',
    right: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginVertical: 6,
  },
  dotActive: { backgroundColor: '#4CAF50' },
  dotInactive: { backgroundColor: '#CFCFCF' },
});
