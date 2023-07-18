import axios, { AxiosResponse } from 'axios';
import { getCachedData, setCachedData } from '../utils/cache';

export class HttpClient {
  private baseURL;
  constructor(baseURL: string) {
    this.baseURL = baseURL;
  }
  async create(endpoint: string, options?: object): Promise<AxiosResponse> {
    const url: string = this.baseURL + endpoint;
    try {
      const response = await axios(url, {
        ...options,
        headers: {
          'Content-Type': 'application/json',
        },
      });
      let cachedData = await getCachedData(url);
      if (cachedData) {
        return cachedData;
      }
      await setCachedData(url, response);
      return response;
    } catch (e) {
      throw new Error();
    }
  }
}
const initialUrl = 'http://localhost:4000';
export const httpClient = new HttpClient(initialUrl);
