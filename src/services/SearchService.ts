import { HttpClient, httpClient } from '../apis/HttpClient';
/*
  get(endpoint,options)=> Promise<Search[]>
*/

class SearchService {
  private httpClient;
  constructor(httpClient: HttpClient) {
    this.httpClient = httpClient;
  }
  async get(query: string) {
    const res = await this.httpClient.create(`/sick?q=${query}`);
    console.info('calling api');
    return res.data;
  }
}

//인스턴화 및 의존성 주입
export const searchService = new SearchService(httpClient);
