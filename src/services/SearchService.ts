import { HttpClient, httpClient } from '../apis/HttpClient';
/*
  get(endpoint,options)=> Promise<Search[]>
*/

class SearchService {
  private httpClient;
  constructor(httpClient: HttpClient) {
    this.httpClient = httpClient;
  }
  async get() {
    const res = await this.httpClient.create(`/sick`);
    return res;
  }
}

//인스턴화 및 의존성 주입
export const searchService = new SearchService(httpClient);
