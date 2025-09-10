import type { Course } from '@/src/constants/types/course';
import { supabase } from '../config/supabaseClient';

// Допоміжна функція для отримання публічних курсів
const getPublicCourses = async (): Promise<{ data: Course[] | null; error: any }> => {
  const { data, error } = await supabase
    .from('courses')
    .select('*')
    .eq('is_public', true);
  
  return { data, error };
};

// Допоміжна функція для отримання курсів компаній користувача
const getCompanyCourses = async (companyIds: string[]): Promise<Course[]> => {
  if (companyIds.length === 0) return [];

  const { data: companyCourses, error } = await supabase
    .from('company_courses')
    .select('course_id')
    .in('company_id', companyIds);

  if (error || !companyCourses?.length) return [];

  const courseIds = companyCourses.map(item => item.course_id);
  const { data: coursesData, error: coursesError } = await supabase
    .from('courses')
    .select('*')
    .in('id', courseIds);

  return coursesError ? [] : (coursesData || []);
};

export const getCourses = async (): Promise<{ data: Course[] | null; error: any }> => {
  try {
    // Отримуємо поточного користувача
    const { data: { user }, error: userError } = await supabase.auth.getUser();
    
    if (userError || !user) {
      return await getPublicCourses();
    }

    // Отримуємо компанії користувача
    const { data: userCompanies, error: companiesError } = await supabase
      .from('company_members')
      .select('company_id')
      .eq('user_id', user.id);

    if (companiesError) {
      console.error('Error fetching user companies:', companiesError);
      return await getPublicCourses();
    }

    const companyIds = userCompanies?.map(member => member.company_id) || [];
    
    // Отримуємо публічні курси та курси компаній паралельно
    const [publicCoursesResult, companyCourses] = await Promise.all([
      getPublicCourses(),
      getCompanyCourses(companyIds)
    ]);

    if (publicCoursesResult.error) {
      console.error('Error fetching public courses:', publicCoursesResult.error);
      return { data: null, error: publicCoursesResult.error };
    }

    // Об'єднуємо курси, прибираючи дублікати
    const publicCourses = publicCoursesResult.data || [];
    const existingIds = new Set(publicCourses.map(course => course.id));
    const uniqueCompanyCourses = companyCourses.filter(course => !existingIds.has(course.id));
    
    const allCourses = [...publicCourses, ...uniqueCompanyCourses];

    return { data: allCourses, error: null };
  } catch (err) {
    console.error('Error fetching courses:', err);
    return { data: null, error: err };
  }
};

/**
 * Отримати курси для конкретної компанії
 */
export const getCoursesByCompany = async (companyId: string): Promise<{ data: Course[] | null; error: any }> => {
  try {
    const { data, error } = await supabase
      .from('company_courses')
      .select(`
        courses (
          id,
          title,
          description,
          image,
          is_public,
          code,
          contact_email,
          created_at
        )
      `)
      .eq('company_id', companyId);

    if (error) {
      return { data: null, error };
    }

    // Витягуємо дані курсів з результату
    const courses = data?.map(item => item.courses).filter(Boolean) || [];
    
    return { data: courses as unknown as Course[], error: null };
  } catch (err) {
    console.error('Error fetching courses by company:', err);
    return { data: null, error: err };
  }
};
