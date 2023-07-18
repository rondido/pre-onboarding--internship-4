import { useState, useEffect } from 'react';
import SearchInput from './searchInput/SearchInput';
import styled from 'styled-components';
import useDebounce from '../hooks/useDebounce';

interface Props {
  sickCd: string;
  sickNm: string;
}

export default function Search() {
  const [searchData, setSearchData] = useState<Props[]>([]);
  const [selectedOption, setSelectedOption] = useState<number>(0);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [searchText, setSearchText] = useState<string>('');

  const debounceReSource = useDebounce(searchText, 300);

  useEffect(() => {
    setSearchData(debounceReSource);
  }, [debounceReSource]);

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

  return (
    <>
      <Base>
        <Wapper>
          <div>
            <SearchInput setSearchText={setSearchText} setIsOpen={setIsOpen} />
            <DataDiv open={isOpen}>
              <WapperUl>
                <div>
                  <div>
                    {searchData.length === 0 ? (
                      <></>
                    ) : (
                      <div>
                        <p>{searchText}</p>
                        <span style={{ fontSize: '12px' }}>추천 검색어</span>
                      </div>
                    )}
                  </div>
                </div>
                <div>
                  {searchData.length === 0 ? (
                    <div>
                      <p>검색어 없음</p>
                    </div>
                  ) : (
                    searchData.map((v: Props, index: number) => (
                      <ItemLi key={index} className={index === selectedOption ? 'selected' : ''}>
                        {v.sickNm}
                      </ItemLi>
                    ))
                  )}
                </div>
              </WapperUl>
            </DataDiv>
          </div>
        </Wapper>
      </Base>
    </>
  );
}
const Base = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Wapper = styled.div`
  background-color: rgb(051, 153, 255);
  width: 50%;
  height: 500px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const DataDiv = styled.div<{ open: boolean }>`
  background-color: white;
  display: flex;
  justify-content: center;
  width: 500px;
  margin-top: 20px;
  height: 200px;
  border-radius: 10px;
  display: ${(props: any) => (props.open ? 'block' : 'none')};
`;

const WapperUl = styled.ul`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  width: 90%;
  margin-top: 5px;
`;

const ItemLi = styled.li`
  display: flex;
  &.selected {
    background-color: red;
  }
`;
