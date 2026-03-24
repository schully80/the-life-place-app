import { useEffect, useState } from 'react';
import {
  deriveDevotionalsFromBlogFeed,
  Devotional,
  fetchBlogFeed,
  fetchBootstrap,
} from '~/lib/contentApi';

export function useDevotionals() {
  const [data, setData] = useState<Devotional[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let active = true;

    (async () => {
      let blogFeedError: string | null = null;

      try {
        const payload = await fetchBlogFeed();
        const derived = deriveDevotionalsFromBlogFeed(payload.items);

        if (derived.length > 0) {
          if (!active) return;
          setData(derived);
          setError(null);
          return;
        }

        blogFeedError = 'No devotional excerpts are available from the blog feed right now.';
      } catch (err: any) {
        blogFeedError = err?.message || 'Failed to load devotional excerpts from the blog feed.';
      }

      try {
        const bootstrap = await fetchBootstrap();
        if (!active) return;

        if (bootstrap.devotionals.length > 0) {
          setData(bootstrap.devotionals);
          setError(null);
          return;
        }
      } catch {
        // Fall through to the feed error below.
      }

      if (active) {
        setError(blogFeedError || 'No devotionals are available right now.');
      }
    })().finally(() => {
      if (active) setLoading(false);
    });

    return () => {
      active = false;
    };
  }, []);

  return { data, loading, error };
}
