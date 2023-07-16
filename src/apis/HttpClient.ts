import axios, { AxiosResponse } from 'axios';

export class HttpClient {
  private baseURL;
  constructor(baseURL: string) {
    this.baseURL = baseURL;
  }
  async create(endpoint: string, options?: object): Promise<AxiosResponse> {
    return await axios(this.baseURL + endpoint, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
}
const initialUrl = 'http://localhost:4000';
export const httpClient = new HttpClient(initialUrl);
