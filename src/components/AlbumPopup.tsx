import React, { useRef, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { getAlbumInfo } from '../api/api';
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
  Tracks,
  Track,
} from './Popupstyled';

const AlbumPopup = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const type = queryParams.get('type');
  const album = queryParams.get('album');
  const artist = queryParams.get('artist');
  const { data: albumInfo } = useQuery({
    queryKey: ['getAlbumInfo'],
    queryFn: () => getAlbumInfo(album || '', artist || ''),
  });
  const tracksRef = useRef<HTMLUListElement>(null);

  const backClick = () => {
    navigate(-1);
  };

  useEffect(() => {
    console.log(tracksRef.current?.offsetHeight);
    if (tracksRef.current) {
      if (tracksRef.current.offsetHeight >= 600) {
        tracksRef.current.classList.add('overflow');
      } else {
        tracksRef.current.classList.remove('overflow');
      }
    }
  }, [albumInfo]);

  return (
    <PopupOverlay onClick={backClick}>
      <PopupArea onClick={(e) => e.stopPropagation()}>
        <ImgContainer>
          <Img
            src={
              albumInfo?.album?.image[3]['#text']
                ? albumInfo?.album?.image[3]['#text']
                : 'https://via.placeholder.com/200'
            }
          />
          <TitleContainer>
            <Title>{album}</Title>
            <SubTitle>{artist}</SubTitle>
            {albumInfo?.album?.wiki?.published && (
              <SubTitle>{albumInfo.album.wiki.published}</SubTitle>
            )}
            {albumInfo?.album?.tags?.tag &&
              (Array.isArray(albumInfo.album.tags.tag) ? (
                <Tags>
                  {albumInfo.album.tags.tag.map(
                    (tag: { name: string; url: string }) => (
                      <Tag href={tag.url} target="blank" key={tag.name}>
                        #{tag.name}
                      </Tag>
                    ),
                  )}
                </Tags>
              ) : (
                <Tags>
                  <Tag href={albumInfo.album.tags.tag.url} target="blank">
                    #{albumInfo.album.tags.tag.name}
                  </Tag>
                </Tags>
              ))}
            {albumInfo?.album?.url && (
              <MoreInfo href={albumInfo?.album?.url} target="blank">
                More Info &raquo;
              </MoreInfo>
            )}
          </TitleContainer>
        </ImgContainer>
        {(albumInfo?.album?.tracks?.track ||
          albumInfo?.album?.wiki?.content) && (
          <TextContainer>
            {albumInfo?.album?.tracks?.track &&
            Array.isArray(albumInfo.album.tracks.track) ? (
              <Tracks ref={tracksRef}>
                {albumInfo?.album?.tracks?.track.map(
                  (track: any, index: number) => (
                    <Track key={index}>
                      {index + 1}. {track.name}
                    </Track>
                  ),
                )}
              </Tracks>
            ) : (
              <Tracks ref={tracksRef}>
                <Track>1. {albumInfo.album.tracks.track.name}</Track>
              </Tracks>
            )}
            {albumInfo?.album?.wiki?.content && (
              <Summary>
                {albumInfo.album.wiki.content.length > 300
                  ? `${albumInfo.album.wiki.content.slice(0, 300)}...`
                  : albumInfo.album.wiki.content}
              </Summary>
            )}
          </TextContainer>
        )}
        <CloseBtn onClick={backClick}>X</CloseBtn>
      </PopupArea>
    </PopupOverlay>
  );
};

export default AlbumPopup;