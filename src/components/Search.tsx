import React, { useEffect } from 'react';
import { searchService } from '../services/SearchService';

export default function Search() {
  // const [data, setData] = useState([]);
  useEffect(() => {
    const getSearch = async () => {
      const data = await searchService.get();
      console.log(data);
    };
    getSearch();
  }, []);
  return (
    <div>
      <input type='text' placeholder='검색어를 입력해주세요' />
    </div>
  );
}
