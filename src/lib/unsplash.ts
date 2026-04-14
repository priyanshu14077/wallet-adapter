// Access environment variable safely for browser compatibility
const getUnsplashKey = (): string => {
  try {
    // @ts-ignore - Bun exposes env vars with BUN_PUBLIC_ prefix to browser
    return (typeof process !== 'undefined' && process.env?.BUN_PUBLIC_UNSPLASH_ACCESS_KEY) || 
           (import.meta as any).env?.BUN_PUBLIC_UNSPLASH_ACCESS_KEY ||
           '';
  } catch {
    return '';
  }
};

const UNSPLASH_ACCESS_KEY = getUnsplashKey();

export interface UnsplashImage {
  id: string;
  url: string;
  thumbUrl: string;
  author: string;
  description: string;
}

const QUERIES = [
  'abstract dark geometric',
  'minimalist architecture dark',
  'cyberpunk texture',
  'dark gradient',
  'futuristic dark',
];

export async function fetchRandomBackground(): Promise<UnsplashImage | null> {
  if (!UNSPLASH_ACCESS_KEY) {
    console.warn('Unsplash access key not configured');
    return null;
  }

  const query = QUERIES[Math.floor(Math.random() * QUERIES.length)] || 'abstract dark';
  
  try {
    const response = await fetch(
      `https://api.unsplash.com/photos/random?query=${encodeURIComponent(query || 'abstract')}&orientation=landscape`,
      {
        headers: {
          Authorization: `Client-ID ${UNSPLASH_ACCESS_KEY}`,
        },
      }
    );

    if (!response.ok) {
      throw new Error(`Unsplash API error: ${response.status}`);
    }

    const data = await response.json();

    return {
      id: data.id,
      url: data.urls.regular,
      thumbUrl: data.urls.small,
      author: data.user.name,
      description: data.description || data.alt_description || 'Abstract background',
    };
  } catch (error) {
    console.error('Failed to fetch Unsplash image:', error);
    return null;
  }
}

export function getFallbackBackgrounds(): string[] {
  return [
    'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1920&q=80',
    'https://images.unsplash.com/photo-1634017839464-5c339bbe3c7c?w=1920&q=80',
    'https://images.unsplash.com/photo-1550684848-fac1c5b4e853?w=1920&q=80',
  ];
}
