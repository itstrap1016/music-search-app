import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { getArtistInfo } from '../api/api';
import {
  PopupOverlay,
  PopupArea,
  ImgContainer,
  Img,
  TextContainer,
  TitleContainer,
  Title,
  SubTitle,
  Summary,
  Tags,
  Tag,
  MoreInfo,
  CloseBtn,
} from './Popupstyled';

const ArtistPopup = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const type = queryParams.get('type');
  const artist = queryParams.get('artist');
  const { data: artistInfo } = useQuery({
    queryKey: ['artistInfo'],
    queryFn: () => getArtistInfo(artist || ''),
  });

  const backClick = () => {
    navigate(-1);
  };

  return (
    <PopupOverlay onClick={backClick}>
      <PopupArea onClick={(e) => e.stopPropagation()}>
        <ImgContainer>
          <Img
            src={
              artistInfo?.artist?.image[3]['#text']
                ? artistInfo?.artist?.image[3]['#text']
                : 'https://via.placeholder.com/200'
            }
          />
          <TitleContainer>
            <Title>{artistInfo?.artist?.name}</Title>
            {artistInfo?.artist?.bio?.published && (
              <SubTitle>{artistInfo.artist.bio.published}</SubTitle>
            )}
            {artistInfo?.artist?.tags?.tag &&
              (Array.isArray(artistInfo.artist.tags.tag) ? (
                <Tags>
                  {artistInfo.artist.tags.tag.map(
                    (tag: { name: string; url: string }) => (
                      <Tag href={tag.url} target="blank" key={tag.name}>
                        #{tag.name}
                      </Tag>
                    ),
                  )}
                </Tags>
              ) : (
                <Tags>
                  <Tag href={artistInfo.artist.tags.tag.url} target="blank">
                    #{artistInfo.artist.tags.tag.name}
                  </Tag>
                </Tags>
              ))}
            {artistInfo?.artist?.url && (
              <MoreInfo href={artistInfo.artist.url} target="blank">
                More Info &raquo;
              </MoreInfo>
            )}
          </TitleContainer>
        </ImgContainer>
        {(artistInfo?.artist?.bio?.content ||
          artistInfo?.artist?.similar?.artist) && (
          <TextContainer>
            <Summary>
              {artistInfo?.artist?.bio?.content &&
              artistInfo.artist.bio.content.length > 1000
                ? `${artistInfo.artist.bio.content.slice(0, 1000)}...`
                : artistInfo.artist.bio.content}
            </Summary>
          </TextContainer>
        )}
        <CloseBtn onClick={backClick}>X</CloseBtn>
      </PopupArea>
    </PopupOverlay>
  );
};

export default ArtistPopup;
