import { useEffect, useState } from 'react';
import { token } from '../../config';

const useFetchData = (url) => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [retries, setRetries] = useState(3); // Optional retry mechanism

    useEffect(() => {
        let isMounted = true;
        const controller = new AbortController();

        const fetchData = async () => {
            if (!isMounted) return;

            // Validate token exists
            if (!token) {
                setError('Authentication token missing');
                setLoading(false);
                return;
            }

            setLoading(true);
            setError(null);

            try {
                const res = await fetch(url, {
                    headers: { 
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    },
                    signal: controller.signal
                });

                // Check if response is JSON
                const contentType = res.headers.get('content-type');
                if (!contentType || !contentType.includes('application/json')) {
                    const text = await res.text();
                    throw new Error(`Expected JSON, got ${contentType}. Response: ${text.substring(0, 100)}`);
                }

                const result = await res.json();

                if (!res.ok) {
                    throw new Error(result.message || `Request failed with status ${res.status}`);
                }

                if (isMounted) {
                    setData(result.data || result); // Handle both { data } and direct responses
                }
            } catch (err) {
                if (isMounted) {
                    // Handle abort errors differently
                    if (err.name === 'AbortError') {
                        console.log('Request was aborted');
                    } else {
                        setError(err.message || 'Failed to fetch data');
                        console.error('Fetch error:', err);
                        
                        // Optional: Retry mechanism
                        if (retries > 0) {
                            setTimeout(() => {
                                setRetries(r => r - 1);
                                fetchData();
                            }, 1000);
                            return;
                        }
                    }
                }
            } finally {
                if (isMounted) {
                    setLoading(false);
                }
            }
        };

        fetchData();

        return () => {
            isMounted = false;
            controller.abort();
        };
    }, [url, retries]); // Added retries to dependency array

    return { data, loading, error, retries };
};

export default useFetchData;