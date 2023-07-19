import { useState, useEffect } from 'react';
import SearchInput from '../searchInput/SearchInput';
import styled from 'styled-components';
import useDebounce from '../../hooks/useDebounce';
import HeaderTitle from '../title/HeaderTitle';
import SearchData from './SearchData';
import useHandleKeyPress from '../../hooks/useHandleKeyPress';

interface Props {
  sickCd: string;
  sickNm: string;
}

export default function Search() {
  const [searchData, setSearchData] = useState<Props[]>([]);
  const [selectedOption, setSelectedOption] = useState<number>(0);

  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [searchText, setSearchText] = useState<string>('');

  const debounceReSource = useDebounce(searchText, 500);
  useEffect(() => {
    setSearchData(debounceReSource);
  }, [debounceReSource]);

  const searchKeyIndex = useHandleKeyPress(searchData);
  useEffect(() => {
    setSelectedOption(searchKeyIndex);
  }, [searchKeyIndex]);

  return (
    <>
      <Base>
        <Wapper>
          <div>
            <HeaderTitle />
            <div>
              <SearchInput setSearchText={setSearchText} setIsOpen={setIsOpen} />
              <DataDiv open={isOpen}>
                <SearchData
                  searchData={searchData}
                  searchText={searchText}
                  selectedOption={selectedOption}
                />
              </DataDiv>
            </div>
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
  width: 100%;
  height: 200px;
  margin-top: 15%;
`;

const Wapper = styled.section`
  background-color: #cae9ff;
  width: 100%;
  height: 500px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  position: relative;
`;

const DataDiv = styled.div<{ open: boolean }>`
  background-color: white;
  display: flex;
  justify-content: center;
  width: 600px;
  margin-top: 20px;
  border-radius: 20px;
  display: ${(props: any) => (props.open ? 'block' : 'none')};
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.15);
  z-index: 1;
  height: 300px;
  overflow-y: hidden;
  position: absolute;
  top: 65%;
`;
