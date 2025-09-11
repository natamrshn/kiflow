import { Module } from '@/src/constants/types/modules';
import { getModulesByCourse } from '@/src/services/modules';
import { useLocalSearchParams, useRouter } from 'expo-router';

import { Slide } from '@/src/constants/types/slides';
import { getSlidesByModule } from '@/src/services/slides';
import React, { useEffect, useState } from 'react';
import {
    StyleSheet,
    View
} from 'react-native';
import CourseSwiper from './CourseSwiper';


  
  export default function CourseScreen() {
    const params = useLocalSearchParams<{ id?: string; moduleIndex?: string; slideIndex?: string }>();
    const router = useRouter();
  
    const [slides, setSlides] = useState<Slide[]>([]);
    const [modules, setModules] = useState<Module[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
  
    useEffect(() => {
        const fetchModulesAndSlides = async () => {
          setLoading(true);
      
          if (!params.id) {
            setLoading(false);
            return;
          }
      
          try {
            const { data: fetchedModules, error: modulesError } = await getModulesByCourse(params.id);
            if (modulesError) {
              console.error(modulesError);
              return;
            }
      
            if (!fetchedModules) return;

            setModules(fetchedModules);
            const allSlides: Slide[] = [];
            for (const mod of fetchedModules) {
              const { data: slidesData, error: slidesError } = await getSlidesByModule(mod.id);
              if (slidesError) {
                console.error(slidesError);
                continue;
              }
              if (slidesData) {
                allSlides.push(...slidesData);
              }
            }
      
            setSlides(allSlides);
      
          } catch (err) {
            console.error('Unexpected error fetching modules and slides:', err);
          } finally {
            setLoading(false);
          }
        };
      
        fetchModulesAndSlides();
      }, [params.id]);
      
      
  
    const handleSlideChange = (index: number) => {
      const currentSlide = slides[index];
      const moduleIndex = modules.findIndex(mod => mod.id === currentSlide.module_id);
      router.setParams({
        slideIndex: String(index),
        moduleIndex: String(moduleIndex),
      });
    };
  
    return (
      <View style={styles.container}>
        <CourseSwiper
          slides={slides}
          initialIndex={params.slideIndex ? parseInt(params.slideIndex, 10) : 0}
          onIndexChange={handleSlideChange}
        />
      </View>
    );
  }
  

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  loader: { flex: 1, alignItems: 'center', justifyContent: 'center' },
});
