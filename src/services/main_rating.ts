import { supabase } from '../config/supabaseClient';

export const saveUserRating = async (
  slideId: string,
  userId: string,
  rating: string | number,
  moduleId?: string 
): Promise<{ data: any; error: any }> => {
  try {
    if (!slideId || !userId || rating == null) {
      throw new Error('Не передані обовʼязкові параметри для збереження оцінки');
    }
    const normalizedRating =
      typeof rating === 'string' ? parseInt(rating, 10) : rating;

    const { data, error } = await supabase
      .from('main_rating')
      .upsert(
        [
          {
            slide_id: slideId,
            user_id: userId,
            rating: normalizedRating,
            module_id: moduleId, 
          },
        ],
        { onConflict: 'slide_id, user_id' } 
      )
      .select();

    if (error) {
      console.error('❌ Помилка при збереженні оцінки в Supabase:', error.message);
      return { data: null, error };
    }

    return { data, error: null };
  } catch (err: any) {
    console.error('❌ Виняток при збереженні оцінки:', err.message);
    return { data: null, error: err };
  }
};


export const getUserModuleRating = async (
  userId: string,
  moduleId: string
): Promise<{ data: any; error: any }> => {
  try {
    const { data, error } = await supabase
      .from('main_rating')
      .select('*')
      .eq('user_id', userId)
      .eq('module_id', moduleId)
      .single(); 

    if (error) {
      console.error('❌ Помилка при отриманні оцінки за модуль:', error.message);
      return { data: null, error };
    }

    return { data, error: null };
  } catch (err: any) {
    console.error('❌ Виняток при отриманні оцінки за модуль:', err.message);
    return { data: null, error: err };
  }
};


export const getUserCourseRating = async (
  userId: string,
  courseId: string
): Promise<{ data: any; error: any }> => {
  try {
    const { data, error } = await supabase
      .from('main_rating')
      .select(`
        *,
        modules:module_id(*)   -- робимо join на таблицю modules
      `)
      .eq('user_id', userId)
      .eq('modules.course_id', courseId); 

    if (error) {
      console.error('❌ Помилка при отриманні оцінки за курс:', error.message);
      return { data: null, error };
    }

    return { data, error: null };
  } catch (err: any) {
    console.error('❌ Виняток при отриманні оцінки за курс:', err.message);
    return { data: null, error: err };
  }
};
