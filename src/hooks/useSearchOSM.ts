import { useState, useEffect } from 'react';

const useSearchOSM = (query: string) => {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchResults = async () => {
      if (query.length === 0) {
        setResults([]);
        return;
      }

      setLoading(true);
      try {
        const response = await fetch(`https://nominatim.openstreetmap.org/search.php?q=${query}&format=jsonv2`);
        const data = await response.json();
        setResults(data);
      } catch (error) {
        console.error('Error fetching data from OSM:', error);
      } finally {
        setLoading(false);
      }
    };

    const debounceFetch = setTimeout(fetchResults, 300);

    return () => clearTimeout(debounceFetch);
  }, [query]);

  return { results, loading };
};

export default useSearchOSM;
