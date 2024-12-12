import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useQuery } from '@tanstack/react-query';
import { getTrackInfo } from '../api/api';

const PopupOverlay = styled.div`
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.5);
`;
const PopupArea = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border-radius: 20px;
  background-color: #fff;
  padding: 20px;
  display: flex;
  align-items: center;
  max-height: 800px;
  gap: 40px;
`;
const ImgContainer = styled.div`
  width: 200px;
`;
const Img = styled.img`
  width: 100%;
  height: 200px;
  display: block;
`;
const TextContainer = styled.div`
  width: calc(100% - 240px);
  width: 320px;
`;
const TitleContainer = styled.div``;
const Title = styled.p`
  font-size: 20px;
  font-weight: 500;
  width: 100%;
  margin-bottom: 8px;
  margin-top: 15px;
  line-height: 1.25;
`;
const SubTitle = styled.p`
  color: ${(props) => props.theme.colors.mediumGray};
  width: 100%;
  line-height: 1.25;
`;
const Summary = styled.p`
  font-size: 14px;
  width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: wrap;
  line-height: 1.5;
`;
const Tags = styled.div`
  margin-top: 10px;
  word-break: brea-word;
`;
const Tag = styled.a`
  color: ${(props) => props.theme.colors.primaryColor};
  font-size: 14px;
  line-height: 1.25;
  display: inline-block;
`;
const MoreInfo = styled.a`
  color: ${(props) => props.theme.colors.primaryColor};
  font-size: 14px;
  margin-top: 10px;
  display: inline-block;
`;
const CloseBtn = styled.button`
  width: 40px;
  height: 40px;
  background-color: ${(props) => props.theme.colors.black};
  font-size: 20px;
  border-radius: 50%;
  position: absolute;
  top: -20px;
  right: -20px;
  color: ${(props) => props.theme.colors.white};
`;

const Popup = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const type = queryParams.get('type');
  const artist = queryParams.get('artist');
  const track = queryParams.get('track');
  const album = queryParams.get('album');
  const { data: trackInfo } = useQuery({
    queryKey: ['getTrackInfo'],
    queryFn: () => getTrackInfo(track || '', artist || ''),
  });

  console.log(
    'type:',
    type,
    'artist:',
    artist,
    'track:',
    track,
    'album:',
    album,
  );

  const backClick = () => {
    navigate(-1);
  };

  return (
    <PopupOverlay onClick={backClick}>
      {type === 'tracks' && (
        <PopupArea onClick={(e) => e.stopPropagation()}>
          <ImgContainer>
            <Img
              src={
                trackInfo?.track?.album?.image[3]['#text']
                  ? trackInfo?.track?.album?.image[3]['#text']
                  : 'https://via.placeholder.com/200'
              }
            />
            <TitleContainer>
              <Title>{track}</Title>
              <SubTitle>{artist}</SubTitle>
              <SubTitle>{trackInfo?.track?.wiki?.published}</SubTitle>
              <Tags>
                {trackInfo?.track?.toptags?.tag?.map(
                  (tag: { name: string; url: string }) => (
                    <Tag href={tag.url} target="blank" key={tag.name}>
                      #{tag.name}
                    </Tag>
                  ),
                )}
              </Tags>
              <MoreInfo href={trackInfo?.track?.url} target="blank">
                More Info &raquo;
              </MoreInfo>
            </TitleContainer>
          </ImgContainer>
          {trackInfo?.track?.wiki?.content && (
            <TextContainer>
              <Summary>
                {trackInfo?.track?.wiki?.content.length > 1000
                  ? `${trackInfo?.track?.wiki?.content.slice(0, 1000)}...`
                  : trackInfo?.track?.wiki?.content}
              </Summary>
            </TextContainer>
          )}
          <CloseBtn onClick={backClick}>X</CloseBtn>
        </PopupArea>
      )}
    </PopupOverlay>
  );
};

export default Popup;
