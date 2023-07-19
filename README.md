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
```
📦src
 ┣ 📂apis
 ┣ 📂assets
 ┣ 📂components
 ┣ 📂hooks
 ┣ 📂pages
 ┣ 📂services
 ┣ 📂styles
 ┣ 📂utils
```
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
## 서버 

```
https://github.com/walking-sunset/assignment-api.git
```
---
```
npm install
npm start
```

## 기능 구현 설명

API 호출별로 로컬 캐싱 구현
- 캐싱을 어떻게 기술했는지에 대한 내용 README에 기술
  
- expire time을 구현할 경우 가산점
  - 캐시 스토리지는 프론트 단에서 설정할 수 없다. 
백엔드단에서 headers에서 Cache-Control: max-age<seconds>로 설정할 수 있다.
  - 실제 코드상으로 Cache-Control를 통해 설정해보았으나 설정이 되지 않는걸 알 수 있었다.
    
cachestorage를 사용하여 로컬 캐시 구현

### Why?

- 웹 스토리지
  - 키와 기능 자체는 유사하지만 쿠키는 약 4KB까지 밖에 저장하지 못함
  - 로컬 스토리지는 약 5MB까지 저장 가능
  - 로컬 스토리지는 동기식이며 기본 스레드를 차단하므로 웹 작업자 또는 서비스 작업자가 액세스를 할 수 없다.
 
- 캐시 스토리지
  - 비동기 처리 방식
  - 메인 스레드를 차단하지 않는다.
  - 이러한 API는 window 개체, 웹 작업자 및 서비스 작업자에게 액세스할 수 있으므로 코드의 어디에서나 쉽게 사용할 수 있다.
    
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
     - 짧은 간격으로 연속된 이벤트가 발생하면 이밴트 핸들러를 호출하지 않다가 일정 시간이 경과한 이후 한 번만 호출합니다.
   - throttle
     -  일정 시간 동안 이벤트가 더 이상 발생하지 않으면 이벤트 핸들러가 한 번만 호출되는 디바운스는 resize 이벤트나 input 요소에 입력된 값으로 ajax 요청하는 입력 필드 자동완성, 버튼 중복 클릭 방지 처리에 유용하기 쓰입니다.


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


