import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const StyledLink = styled(Link)`
  width: 200px;
  display: inline-block;
  vertical-align: top;
`;
const Image = styled.div<{ imgurl: string }>`
  width: 100%;
  height: 200px;
  background-image: url(${(props) => props.imgurl});
  background-size: 100% 100%;
`;
const TextContainer = styled.div`
  margin-top: 20px;
`;
const Title = styled.p`
  text-align: center;
  font-size: 20px;
  line-heihgt: 1.25;
  color: ${(props) => props.theme.colors.black};
`;
const SubTitle = styled.p`
  text-align: center;
  font-size: 16px;
  margin-top: 10px;
  color: ${(props) => props.theme.colors.mediumGray};
`;

const SearchResult = ({
  type,
  imgurl,
  title,
  subTitle,
}: {
  type: string;
  imgurl: string;
  title: string;
  subTitle?: string;
}) => {
  return (
    <StyledLink to={'#'}>
      <Image imgurl={imgurl} />
      <TextContainer>
        <Title>{title}</Title>
        {type !== 'artists' ? <SubTitle>{subTitle}</SubTitle> : null}
      </TextContainer>
    </StyledLink>
  );
};

export default SearchResult;
