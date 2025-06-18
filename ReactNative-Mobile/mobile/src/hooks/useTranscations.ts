// react custom hook file

import { useCallback, useState, useEffect } from "react"
// import { Alert } from "react-native";
import { supabase, handleSupabaseError, SupabaseResponse } from '@/src/lib/supabase';
import { Database } from '@/src/types/supabase';



const API_URL = "http://localhost:5001/api";

// GET method data fetching code
type Transaction = Database['public']['Tables']['transactions']['Row'];
type TransactionInsert = Database['public']['Tables']['transactions']['Insert'];
type TransactionUpdate = Database['public']['Tables']['transactions']['Update'];

interface Summary {
    balance: number;
    income: number;
    expenses: number;
}

interface SummaryAccumulator {
    income: number;
    expenses: number;
}

interface DeleteTransactionsParams {
    id: string;
}

interface DeleteTransactionsResult {
    success: boolean;
    message?: string;
}


export function useTransactions(userId: string) {
    const [transactions, setTransactions] = useState<Transaction[]>([]);
    const [summary, setSummary] = useState<Summary>({
        balance: 0,
        income: 0,
        expenses: 0,
    });
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchTransactions = useCallback(async () => {
        if (!userId) {
            setIsLoading(false);
            return;
        }

        try {
            setIsLoading(true);
            setError(null);

            const { data, error: fetchError } = await supabase
                .from('transactions')
                .select('*')
                .eq('user_id', userId)
                .order('date', { ascending: false });

            if (fetchError) {
                throw fetchError;
            }

            const typedData = (data || []) as Transaction[];
            setTransactions(typedData);

            // Calculate summary
            const summary = typedData.reduce<SummaryAccumulator>(
                (acc, transaction) => {
                    if (transaction.type === 'income') {
                        acc.income += transaction.amount;
                    } else {
                        acc.expenses += transaction.amount;
                    }
                    return acc;
                },
                { income: 0, expenses: 0 }
            );

            setSummary({
                ...summary,
                balance: summary.income - summary.expenses,
            });
        } catch (err) {
            const errorMessage = handleSupabaseError(err);
            setError(errorMessage);
            console.error('Error fetching transactions:', err);
        } finally {
            setIsLoading(false);
        }
    }, [userId]);

    const addTransaction = useCallback(async (transaction: TransactionInsert) => {
        try {
            const { data, error: insertError } = await supabase
                .from('transactions')
                .insert(transaction)
                .select()
                .single();

            if (insertError) {
                throw insertError;
            }

            if (data) {
                setTransactions(prev => [data, ...prev]);
                await fetchTransactions(); // Refresh summary
            }
        } catch (err) {
            const errorMessage = handleSupabaseError(err);
            setError(errorMessage);
            console.error('Error adding transaction:', err);
        }
    }, [fetchTransactions]);

    const updateTransaction = useCallback(async (id: string, updates: TransactionUpdate) => {
        try {
            const { data, error: updateError } = await supabase
                .from('transactions')
                .update(updates)
                .eq('id', id)
                .select()
                .single();

            if (updateError) {
                throw updateError;
            }

            if (data) {
                setTransactions(prev => 
                    prev.map(t => t.id === id ? data : t)
                );
                await fetchTransactions(); // Refresh summary
            }
        } catch (err) {
            const errorMessage = handleSupabaseError(err);
            setError(errorMessage);
            console.error('Error updating transaction:', err);
        }
    }, [fetchTransactions]);

    const deleteTransaction = useCallback(async (id: string) => {
        try {
            const { error: deleteError } = await supabase
                .from('transactions')
                .delete()
                .eq('id', id);

            if (deleteError) {
                throw deleteError;
            }

            setTransactions(prev => prev.filter(t => t.id !== id));
            await fetchTransactions(); // Refresh summary
        } catch (err) {
            const errorMessage = handleSupabaseError(err);
            setError(errorMessage);
            console.error('Error deleting transaction:', err);
        }
    }, [fetchTransactions]);

    useEffect(() => {
        fetchTransactions();
    }, [fetchTransactions]);

    return {
        transactions,
        summary,
        isLoading,
        error,
        addTransaction,
        updateTransaction,
        deleteTransaction,
        refreshTransactions: fetchTransactions,
    };
}