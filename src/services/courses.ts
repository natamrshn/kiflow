import type { Course } from '@/src/constants/types/course';
import { supabase } from '../config/supabaseClient';

export const getCourses = async (): Promise<{ data: Course[] | null; error: any }> => {
  try {
    const { data, error } = await supabase
      .from('courses')   
      .select('*');  


    console.log('data', data)

    return { data, error };
  } catch (err) {
    console.error('Error fetching courses:', err);
    return { data: null, error: err };
  }
};
