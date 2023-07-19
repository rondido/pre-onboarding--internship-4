import SearchImg from '../../assets/search.png';
import styled from 'styled-components';

interface Props {
  sickCd: string;
  sickNm: string;
}

interface PropsType {
  searchData: Props[];
  searchText: string;
  selectedOption: number;
}

export default function SearchData({ searchData, searchText, selectedOption }: PropsType) {
  return (
    <>
      <div>
        <WapperUl>
          <div>
            {searchData.length === 0 ? (
              <></>
            ) : (
              <div>
                <SearchTextDiv>
                  <SearchText>{searchText}</SearchText>
                </SearchTextDiv>
                <CommendSpan>추천 검색어</CommendSpan>
              </div>
            )}
          </div>
          <div>
            {searchData.length === 0 ? (
              <div>
                <SearchNoneText>검색어 없음</SearchNoneText>
              </div>
            ) : (
              searchData.map((sick: Props, index: number) => (
                <ItemLi key={index} className={index === selectedOption ? 'selected' : ''}>
                  <span style={{ padding: '5px' }}>{sick.sickNm}</span>
                </ItemLi>
              ))
            )}
          </div>
        </WapperUl>
      </div>
    </>
  );
}

const WapperUl = styled.ul`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  width: 90%;
  margin-top: 5px;
`;

const ItemLi = styled.li`
  display: flex;
  background-image: url(${SearchImg});
  background-repeat: no-repeat;
  background-position: 10px;
  padding-right: 2px;
  padding-left: 40px;
  &.selected {
    background-color: rgb(153, 153, 153, 0.2);
  }
`;

const SearchTextDiv = styled.div`
  background-image: url(${SearchImg});
  background-repeat: no-repeat;
  background-position: 10px;
  padding-right: 2px;
  padding-left: 40px;
  margin-top: 10px;
`;

const SearchText = styled.p`
  font-weight: bold;
  padding: 5px;
`;

const CommendSpan = styled.span`
  font-size: 12px;
  color: gray;
  padding: 5px;
`;

const SearchNoneText = styled.p`
  margin-left: 5px;
`;
