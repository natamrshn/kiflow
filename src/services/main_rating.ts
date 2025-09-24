import { supabase } from '../config/supabaseClient';

export const saveUserRating = async (
  slideId: string,
  userId: string,
  rating: string | number,
  moduleId?: string,
  key?: string
): Promise<{ data: any; error: any }> => {
  try {
    if (!slideId || !userId || rating == null || !key) {
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
            criteria_key: key
          }
        ],
        { onConflict: 'slide_id, user_id, criteria_key' }
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


export const getAverageUserRating = async (
  userId: string,
  moduleId: string
): Promise<{ data: { rating: number | null }; error: any }> => {
  try {
    if (!userId || !moduleId) {
      throw new Error('Не передані обовʼязкові параметри');
    }

    const { data, error } = await supabase
      .from('main_rating')
      .select('rating')
      .eq('user_id', userId)
      .eq('module_id', moduleId);

    if (error) {
      console.error('❌ Помилка при отриманні оцінок:', error.message);
      return { data: { rating: null }, error };
    }

    if (!data || data.length === 0) {
      return { data: { rating: null }, error: null };
    }

    const total = data.reduce((sum, item) => sum + (item.rating || 0), 0);
    const average = total / data.length;

    return { data: { rating: average }, error: null };
  } catch (err: any) {
    console.error('❌ Виняток при розрахунку середнього:', err.message);
    return { data: { rating: null }, error: err };
  }
};




