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
  line-height: 1.25;
  width: 100%;
  overflow: hidden;
  color: ${(props) => props.theme.colors.black};
  display: -webkit-box;
  -webkit-line-clamp: 2; /* 최대 줄 수 */
  -webkit-box-orient: vertical;
  white-space: normal;
  text-overflow: ellipsis;
  height: 50px;
  word-wrap: break-word;
`;
const SubTitle = styled.p`
  text-align: center;
  font-size: 16px;
  margin-top: 10px;
  line-height: 1.25;
  width: 100%;
  overflow: hidden;
  color: ${(props) => props.theme.colors.mediumGray};
  display: -webkit-box;
  -webkit-line-clamp: 2; /* 최대 줄 수 */
  -webkit-box-orient: vertical;
  white-space: normal;
  text-overflow: ellipsis;
  word-wrap: break-word;
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
      <Image
        imgurl={imgurl !== '' ? imgurl : 'https://via.placeholder.com/200'}
      />
      <TextContainer>
        <Title>{title !== '(null)' ? title : '제목 없음'}</Title>
        {type !== 'artists' ? <SubTitle>{subTitle}</SubTitle> : null}
      </TextContainer>
    </StyledLink>
  );
};

export default SearchResult;
