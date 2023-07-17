import React, { useState } from 'react';
import { searchService } from '../services/SearchService';
import SearchInput from './searchInput/SearchInput';
import styled from 'styled-components';

interface Props {
  sickCd: string;
  sickNm: string;
}

export default function Search() {
  const [searchData, setSearchData] = useState<Props[]>([]);

  const getSearch = async (textData: string) => {
    if (textData.length === 0) {
      setSearchData([]);
      return;
    }
    const data: any = await searchService.get(textData);
    setSearchData(data);
  };

  return (
    <>
      <Base>
        <Wapper>
          <div>
            <SearchInput getSearch={getSearch} />
            <DataDiv>
              <WapperUl>
                {searchData.length === 0 ? (
                  <div>
                    <p>검색어 없음</p>
                  </div>
                ) : (
                  searchData.map(v => <ItemLi>{v.sickNm}</ItemLi>)
                )}
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

const DataDiv = styled.div`
  background-color: white;
  display: flex;
  justify-content: center;
  width: 500px;
  margin-top: 20px;
  height: 200px;
  border-radius: 10px;
`;

const WapperUl = styled.ul`
  display: flex;
  flex-direction: column;
  list-style: none;
  justify-content: flex-start;
`;

const ItemLi = styled.li`
  display: flex;
`;
