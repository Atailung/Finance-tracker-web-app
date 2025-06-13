import { useState } from 'react';

interface FetchState<T> {
    data: T | undefined;
    loading: boolean | null;
    error: Error | null;
}

const useFetch = <T>(cb: () => Promise<T>) => {
    const [data, setData] = useState<T | undefined>(undefined);
    const [loading, setLoading] = useState<boolean | null>(null);
    const [error, setError] = useState<Error | null>(null);

    const fetchData = async () => {
        try {
            setLoading(true);
            const result = await cb();
            setData(result);
        } catch (err) {
            setError(err instanceof Error ? err : new Error(String(err)));
        } finally {
            setLoading(false);
        }
    }
    return {
        data,   
        loading,
        error,
        fetchData
    };
}

export default useFetch;