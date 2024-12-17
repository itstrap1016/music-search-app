import React from 'react';
import styled from 'styled-components';

const Box = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 600px;
  height: 600px;
`;

const PopupLoading = () => {
  return <Box>Loading...</Box>;
};

export default PopupLoading;
