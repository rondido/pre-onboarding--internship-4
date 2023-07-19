import { useEffect, useState } from 'react';
import { searchService } from '../index';

const useDebounce = (value: string, delay: number) => {
  const [sickNameData, setSickNameData] = useState([]);
  useEffect(() => {
    if (value === null || value.trim() === '') {
      setSickNameData([]);
      return;
    }

    const getSickName = async () => {
      const searchResult: [] = await searchService.get(value);
      setSickNameData(searchResult);
    };
    const timer = setTimeout(() => getSickName(), delay);

    return () => clearTimeout(timer);
  }, [value, delay]);

  return sickNameData;
};

export default useDebounce;
