import { useEffect, useState } from 'react';
import { BootstrapPayload, fetchBootstrap } from '~/lib/contentApi';

export function useBootstrap() {
  const [data, setData] = useState<BootstrapPayload | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let active = true;

    (async () => {
      try {
        const payload = await fetchBootstrap();
        if (!active) return;
        setData(payload);
        setError(null);
      } catch (err: any) {
        if (!active) return;
        setError(err?.message || 'Failed to load content');
      } finally {
        if (active) setLoading(false);
      }
    })();

    return () => {
      active = false;
    };
  }, []);

  return { data, loading, error };
}
