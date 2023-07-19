import { styled } from 'styled-components';

export default function HeaderTitle() {
  return (
    <Base>
      <h1>
        국내 모든 임상시험 검색하고
        <br />
        온라인으로 참여하기
      </h1>
    </Base>
  );
}

const Base = styled.div`
  display: flex;
  justify-content: center;

  font-size: 40px;
  margin-bottom: 20px;
`;
