## 원티드 인턴십 프리온 보딩 4주자 과제

## About
---

한국임상정보의 검색 구현하기
검색창, 검색어 추천 기능, 캐싱 기능 구현 개인 과제 입니다.

---
## 요구 사항
- - API 호출별로 로컬 캐싱 구현
    - 캐싱 기능을 제공하는 라이브러리 사용 금지(React-Query 등)
    - 캐싱을 어떻게 기술했는지에 대한 내용 README에 기술
    - expire time을 구현할 경우 가산점
- 입력마다 API 호출하지 않도록 API 호출 횟수를 줄이는 전략 수립 및 실행
    - README에 전략에 대한 설명 기술
    
- API를 호출할 때 마다 `console.info("calling api")` 출력을 통해 콘솔창에서 API 호출 횟수 확인이 가능하도록 설정

- 키보드만으로 추천 검색어들로 이동 가능하도록 구현
    - 사용법 README에 기술

---

📦src
 ┣ 📂apis
 ┣ 📂assets
 ┣ 📂components
 ┣ 📂hooks
 ┣ 📂pages
 ┣ 📂services
 ┣ 📂styles
 ┣ 📂utils

 ---

## 기술 스택

- React
- Styled-components
- Axios
- Typescript

---

## 실행 방법

```
npm install
npm start
```
## 기능 구현 설명

API 호출별로 로컬 캐싱 구현
- 캐싱을 어떻게 기술했는지에 대한 내용 README에 기술

cachestorage를 사용하여 로컬 캐시 구현

### Why?

- 웹 스토리지
  - 키와 기능 자체는 유사하지만 쿠키는 약 4KB까지 밖에 저장하지 못함
  - 웹 스토리지는 약 5MB까지 저장 가능
 
- 캐시 스토리지
  - 비동기 처리 방식
 ```
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
    return await cached;
  } catch (error) {
    console.error('Error while getting data from cache:', error);
  }
}

```
    
- 입력마다 API 호출하지 않도록 API 호출 횟수를 줄이는 전략 수립 및 실행
   - debounce
```
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
```

- 키보드만으로 추천 검색어들로 이동 가능하도록 구현

- 사용법
  - 검색창에서 검색 후 검색이 완료되면 제일 첫번째 데이터의 focus
  - 키보드로 드롭다운의 통하여 사용 가능
  
  ```
  const [selectedOption, setSelectedOption] = useState<number>(0);
  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (event.key === 'ArrowUp') {
        setSelectedOption(prevSelectedOption => {
          const newSelectedOption = prevSelectedOption - 1;
          return newSelectedOption < 0 ? searchData.length - 1 : newSelectedOption;
        });
      } else if (event.key === 'ArrowDown') {
        setSelectedOption(prevSelectedOption => {
          const newSelectedOption = prevSelectedOption + 1;
          return newSelectedOption >= searchData.length ? 0 : newSelectedOption;
        });
      }
    };

    document.addEventListener('keydown', handleKeyPress);

    return () => {
      document.removeEventListener('keydown', handleKeyPress);
    };
  }, [searchData]);

  return selectedOption;
  ```

## 데모 영상

https://github.com/rondido/pre-onboarding--internship-4/assets/55516901/6499b0fb-8d04-4617-8ae5-98212dcd6460


