import React from 'react';
import styled from 'styled-components';

const LoadingText = styled.div`
  width: 100%;
  text-align: center;
  margin-top: 20px;
`;

const Loading = () => {
  return <LoadingText>Loading...</LoadingText>;
};

export default Loading;
