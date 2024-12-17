import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { getFetchVideo, getTrackInfo } from '../api/api';
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
  PlayBtn,
  PlayIcon,
  YoutubeVideo,
} from './Popupstyled';
import { faPlay } from '@fortawesome/free-solid-svg-icons';

const TrackPopup = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const type = queryParams.get('type');
  const artist = queryParams.get('artist');
  const track = queryParams.get('track');
  const [playYoutube, setPlayYoutube] = useState(false);
  const { data: trackInfo } = useQuery({
    queryKey: ['getTrackInfo'],
    queryFn: () => getTrackInfo(track || '', artist || ''),
  });
  const { data: youtubeData } = useQuery({
    queryKey: ['getVideoInfo'],
    queryFn: () => getFetchVideo(`${artist} ${track}`),
    enabled: playYoutube,
  });

  const backClick = () => {
    navigate('/');
    setPlayYoutube(false);
  };

  const onYoutubeClick = () => {
    setPlayYoutube(true);
  };

  return (
    <PopupOverlay onClick={backClick}>
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
            {trackInfo?.track?.wiki?.published && (
              <SubTitle>{trackInfo.track.wiki.published}</SubTitle>
            )}

            {trackInfo?.track?.toptags?.tag &&
              (Array.isArray(trackInfo.track.toptags.tag) ? (
                <Tags>
                  {trackInfo.track.toptags.tag.map(
                    (tag: { name: string; url: string }) => (
                      <Tag href={tag.url} target="blank" key={tag.name}>
                        #{tag.name}
                      </Tag>
                    ),
                  )}
                </Tags>
              ) : (
                <Tags>
                  <Tag
                    href={trackInfo.track.toptags.tag.url}
                    target="blank"
                    key={trackInfo.track.toptags.tag.name}
                  >
                    #{trackInfo?.track?.toptags?.tag.name}
                  </Tag>
                </Tags>
              ))}
            {trackInfo?.track?.url && (
              <MoreInfo href={trackInfo.track.url} target="blank">
                More Info &raquo;
              </MoreInfo>
            )}
          </TitleContainer>
          <PlayBtn onClick={onYoutubeClick}>
            <PlayIcon icon={faPlay} />
          </PlayBtn>
          {playYoutube && (
            <YoutubeVideo
              src={`https://www.youtube.com/embed/${youtubeData?.items[0]?.id?.videoId}?autoplay=1`}
              title={youtubeData?.items[0]?.snippet?.title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          )}
        </ImgContainer>
        {trackInfo?.track?.wiki?.content && (
          <TextContainer>
            <Summary>
              {trackInfo.track.wiki.content.length > 1000
                ? `${trackInfo.track.wiki.content.slice(0, 1000)}...`
                : trackInfo.track.wiki.content}
            </Summary>
          </TextContainer>
        )}
        <CloseBtn onClick={backClick}>X</CloseBtn>
      </PopupArea>
    </PopupOverlay>
  );
};

export default TrackPopup;
