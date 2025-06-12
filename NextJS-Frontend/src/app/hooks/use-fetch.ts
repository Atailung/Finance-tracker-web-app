const { useState, useEffect } = require('react');

const useFetch = (cb: () => Promise<any>) => {
    const [data, setData] = useState(undefined);
    const [loading, setLoading] = useState(null);
    const [error, setError] = useState(null);

    const fetchData = async () => {
    }
    return {
        data,   
        loading,
        error,
        fetchData
    };
}