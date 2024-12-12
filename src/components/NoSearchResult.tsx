import React from 'react';
import styled from 'styled-components';

const Box = styled.div`
  width: 100%;
  text-align: center;
  font-weight: 500;
`;

const NoSearchResult = () => {
  return <Box>검색 결과 없음</Box>;
};

export default NoSearchResult;
