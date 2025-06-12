const { useState, useEffect } = require('react');

const useFetch = (cb: () => Promise<any>) => {
    const [data, setData] = useState(undefined);
    const [loading, setLoading] = useState(null);
    const [error, setError] = useState(null);

    const fetchData = async () => {
        try {
            setLoading(true);
            const result = await cb();
            setData(result);
        } catch (err) {
            setError(err);
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