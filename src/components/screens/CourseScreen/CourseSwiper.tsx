import { Slide } from '@/src/constants/types/slides';
import React, { useEffect, useRef, useState } from 'react';
import { StyleSheet, View, useWindowDimensions } from 'react-native';
import Animated, { runOnJS, useAnimatedScrollHandler } from 'react-native-reanimated';
import ContentWithExample from './slides/ContentWithExample';
import MediaPlaceholder from './slides/MediaPlaceholder';
import TextSlide from './slides/TextSlide';
import VideoPlayer from './VideoPlayer';

interface CourseSwiperProps {
  slides: Slide[];
  initialIndex?: number;
  onIndexChange?: (index: number) => void;
}

const CourseSwiper: React.FC<CourseSwiperProps> = ({ slides = [], initialIndex = 0, onIndexChange }) => {
  const { width, height } = useWindowDimensions();
  const scrollRef = useRef<Animated.ScrollView | null>(null);
  const [currentIndex, setCurrentIndex] = useState<number>(Math.max(0, initialIndex));

  const onScroll = useAnimatedScrollHandler({
    onScroll: event => {
      const idx = Math.round(event.contentOffset.y / height);
      runOnJS(setCurrentIndex)(idx);
      if (onIndexChange) runOnJS(onIndexChange)(idx);
    },
  });

  useEffect(() => {
    if (!slides || slides.length === 0) return;
    const safeIndex = Math.min(Math.max(0, initialIndex), slides.length - 1);
    setCurrentIndex(safeIndex);
    (scrollRef.current as any)?.scrollTo?.({ y: safeIndex * height, animated: false });
  }, [slides, height, initialIndex]);

  const renderSlide = (slide: Slide, index: number) => {
    const isActive = index === currentIndex; // визначаємо, чи активний цей слайд
    const key = `${slide.id}-${index}`;
    switch (slide.slide_type) {
      case 'text':
        return (
          <View key={key} style={{ width, height }}>
            <TextSlide title={slide.slide_title} data={slide.slide_data ?? ''}/>
          </View>
        );

        case 'video': {
            const { uri, mux } = slide.slide_data.video || {};
            const hasVideo = !!uri || !!mux;
            return (
              <View key={key} className='flex-1 bg-white dark:bg-neutral-900'>
                {hasVideo ? (
                  <VideoPlayer uri={uri ?? undefined} mux={mux ?? undefined} isActive={isActive} />
                ) : (
                  <MediaPlaceholder />
                )}
              </View>
            );
          }
      

    //   case 'quiz':
    //     return (
    //       <View key={slide.id} style={{ width, height }}>
    //         <QuizSlide
    //           title={slide.slide_title}
    //           quiz={{
    //             question: slide.content ?? '❓ Питання',
    //             options: slide.options ?? [],
    //           }}
    //           isActive={isActive}
    //         />
    //       </View>
    //     );

    //   case 'ai':
    //     return (
    //       <View key={slide.id} style={{ width, height }}>
    //         <AICourseChatPlaceholder
    //           title={slide.slide_title}
    //           currentIndex={index}
    //           totalSlides={slides.length}
    //           isActive={isActive}
    //         />
    //       </View>
    //     );

      case 'content':
        return (
          <View key={slide.id} style={{ width, height }}>
            <ContentWithExample
              title={slide.slide_title}
            />
          </View>
        );

    //   default:
    //     return (
    //       <View key={slide.id} style={{ width, height, justifyContent: 'center', alignItems: 'center' }}>
    //         <MediaPlaceholder message={`Слайд типу "${slide.slide_type}" ще не підтримується`}  />
    //       </View>
    //     );
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
      >
        {slides.map((s, i) => renderSlide(s, i))}
      </Animated.ScrollView>

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
