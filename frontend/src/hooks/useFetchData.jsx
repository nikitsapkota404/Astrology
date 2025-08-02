import { useEffect, useState } from 'react';
import { BASE_URL } from '../../config';

const useFetchData = (url) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [retries, setRetries] = useState(3);

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();

    const fetchData = async () => {
      if (!isMounted) return;

      const token = localStorage.getItem('token'); // get fresh token here

      if (!token) {
        setError('Authentication token missing');
        setLoading(false);
        return;
      }

      if (!url) {
        setError('No URL provided');
        setLoading(false);
        return;
      }

      setLoading(true);
      setError(null);

      try {
        const res = await fetch(url, {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
          signal: controller.signal,
        });

        // Handle expired token or unauthorized
        if (res.status === 401) {
          const result = await res.json();
          if (result.message && result.message.toLowerCase().includes('token is expired')) {
            localStorage.removeItem('token');
            window.location.href = '/login'; // redirect to login page
            return;
          } else {
            throw new Error(result.message || 'Unauthorized');
          }
        }

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
          setData(result.data || result);
        }
      } catch (err) {
        if (isMounted) {
          if (err.name === 'AbortError') {
            console.log('Request was aborted');
          } else {
            setError(err.message || 'Failed to fetch data');
            console.error('Fetch error:', err);

            if (retries > 0) {
              setTimeout(() => {
                setRetries((r) => r - 1);
              }, 1000);
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
  }, [url, retries]);

  return { data, loading, error, retries };
};

export default useFetchData;
