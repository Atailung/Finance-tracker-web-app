import { useCallback, useState, useEffect } from "react";
import { supabase, handleSupabaseError } from '@/src/lib/supabase';
import { Database } from '@/src/types/supabase';

type Category = Database['public']['Tables']['categories']['Row'];
type CategoryInsert = Database['public']['Tables']['categories']['Insert'];
type CategoryUpdate = Database['public']['Tables']['categories']['Update'];

export function useCategories(userId: string) {
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchCategories = useCallback(async () => {
    if (!userId) {
      setIsLoading(false);
      return;
    }

    try {
      setIsLoading(true);
      setError(null);

      const { data, error: fetchError } = await supabase
        .from('categories')
        .select('*')
        .eq('user_id', userId)
        .order('name');

      if (fetchError) {
        throw fetchError;
      }

      setCategories(data || []);
    } catch (err) {
      const errorMessage = handleSupabaseError(err);
      setError(errorMessage);
      console.error('Error fetching categories:', err);
    } finally {
      setIsLoading(false);
    }
  }, [userId]);

  const addCategory = useCallback(async (category: CategoryInsert) => {
    try {
      const { data, error: insertError } = await supabase
        .from('categories')
        .insert(category)
        .select()
        .single();

      if (insertError) {
        throw insertError;
      }

      if (data) {
        setCategories(prev => [...prev, data]);
      }
    } catch (err) {
      const errorMessage = handleSupabaseError(err);
      setError(errorMessage);
      console.error('Error adding category:', err);
    }
  }, []);

  const updateCategory = useCallback(async (id: string, updates: CategoryUpdate) => {
    try {
      const { data, error: updateError } = await supabase
        .from('categories')
        .update(updates)
        .eq('id', id)
        .select()
        .single();

      if (updateError) {
        throw updateError;
      }

      if (data) {
        setCategories(prev => 
          prev.map(c => c.id === id ? data : c)
        );
      }
    } catch (err) {
      const errorMessage = handleSupabaseError(err);
      setError(errorMessage);
      console.error('Error updating category:', err);
    }
  }, []);

  const deleteCategory = useCallback(async (id: string) => {
    try {
      const { error: deleteError } = await supabase
        .from('categories')
        .delete()
        .eq('id', id);

      if (deleteError) {
        throw deleteError;
      }

      setCategories(prev => prev.filter(c => c.id !== id));
    } catch (err) {
      const errorMessage = handleSupabaseError(err);
      setError(errorMessage);
      console.error('Error deleting category:', err);
    }
  }, []);

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  return {
    categories,
    isLoading,
    error,
    addCategory,
    updateCategory,
    deleteCategory,
    refreshCategories: fetchCategories,
  };
} 