import { Suspense } from 'react';
import Search from './components/Search';
import { GlobalStyles } from './styles/GlobalStyles';

function App() {
  return (
    <>
      <Suspense fallback={<div>로딩중..</div>}>
        <GlobalStyles />
        <Search />
      </Suspense>
    </>
  );
}

export default App;
