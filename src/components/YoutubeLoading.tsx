import React from 'react';
import styled from 'styled-components';

const Box = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 200px;
  height: 200px;
`;

const YoutubeLoading = () => {
  return <Box>Loading...</Box>;
};

export default YoutubeLoading;
