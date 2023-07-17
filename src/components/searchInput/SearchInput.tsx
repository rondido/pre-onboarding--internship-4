import React from 'react';
import styled from 'styled-components';
interface Props {
  getSearch: (text: string) => void;
}

export default function SearchInput({ getSearch }: Props) {
  const searchInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    getSearch(value);
  };
  return (
    <Base>
      <Inputstyled
        type='text'
        placeholder='검색어를 입력해주세요'
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => searchInputChange(e)}
      />
      <Buttonstyled>검색</Buttonstyled>
    </Base>
  );
}

const Base = styled.div`
  display: flex;
  justify-content: center;
`;

const Inputstyled = styled.input`
  border: none;
  width: 500px;
  height: 50px;
  border-top-left-radius: 10px;
  border-bottom-left-radius: 10px;
  &:focus {
    outline: none;
  }
`;

const Buttonstyled = styled.button`
  background-color: #5ad2ff;
  height: 52px;
  width: 100px;
  border: none;
  color: white;
  border-top-right-radius: 10px;
  border-bottom-right-radius: 10px;
`;
