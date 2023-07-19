import React, { Dispatch, SetStateAction } from 'react';
import styled from 'styled-components';
import search from '../../assets/search.png';
interface Props {
  setSearchText: Dispatch<SetStateAction<string>>;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}

export default function SearchInput({ setSearchText, setIsOpen }: Props) {
  const searchInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchText(value);
    if (value.length > 0) {
      setIsOpen(true);
      return;
    }
    setIsOpen(false);
  };

  return (
    <Base>
      <Inputstyled
        type='text'
        placeholder='질환명을 입력해주세요'
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => searchInputChange(e)}></Inputstyled>
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
  width: 490px;
  height: 49px;
  border-top-left-radius: 15px;
  border-bottom-left-radius: 15px;
  background-image: url(${search});
  background-repeat: no-repeat;
  background-position: 10px;
  padding-right: 2px;
  padding-left: 40px;
  &:focus {
    outline: none;
  }
`;

const Buttonstyled = styled.button`
  background-color: #5ad2ff;
  height: 50px;
  width: 100px;
  border: none;
  color: white;
  border-top-right-radius: 10px;
  border-bottom-right-radius: 10px;
`;
