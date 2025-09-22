import { supabase } from '../config/supabaseClient';

export const saveUserRating = async (
  slideId: string,
  userId: string,
  rating: string | number
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
