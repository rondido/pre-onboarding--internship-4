import { AxiosResponse } from 'axios';

const INITIAL_STORAGE_NAME = 'sickNmStore';

export async function setCachedData(url: string, response: AxiosResponse<string, string>) {
  const cacheStorage = await caches.open(INITIAL_STORAGE_NAME);
  cacheStorage.put(url, new Response(JSON.stringify(response)));
  return;
}

export async function getCachedData(url: string) {
  try {
    const cacheStorage = await caches.open(INITIAL_STORAGE_NAME);
    const cachedResponse = await cacheStorage.match(url);
    const cached = await cachedResponse?.json();
    console.log(cached);
    return await cached;
  } catch (error) {
    console.error('Error while getting data from cache:', error);
  }
}
