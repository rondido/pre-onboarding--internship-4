import { HttpClient } from '../apis/HttpClient';
/*
  get(endpoint,options)=> Promise<Search[]>
*/

export class SearchService {
  private httpClient;
  constructor(httpClient: HttpClient) {
    this.httpClient = httpClient;
  }
  async get(query: string) {
    try {
      const res = await this.httpClient.create(`/sick?q=${query}`);
      console.info('calling api');
      return res.data;
    } catch (e) {
      throw new Error();
    }
  }
}

//인스턴화 및 의존성 주입
