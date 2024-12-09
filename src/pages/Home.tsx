import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { fetchTracks, fetchAlbums, fetchArtists } from '../api/api';
import { useQuery } from '@tanstack/react-query';
import SearchResult from '../components/SearchResult';
import Loading from '../components/Loading';

const SearchSection = styled.div`
  padding-top: 50px;
  display: flex;
  justify-content: center;
  gap: 10px;
`;
const SearchInput = styled.input`
  width: 600px;
  height: 40px;
  padding-left: 12px;
  border-color: ${(props) => props.theme.colors.lightGray};
`;
const SearchSelect = styled.select`
  width: 125px;
  border-color: ${(props) => props.theme.colors.lightGray};
`;
const SearchBtn = styled.button`
  margin-left: 15px;
  background-color: ${(props) => props.theme.colors.primaryColor};
  color: ${(props) => props.theme.colors.white};
  padding: 0 20px;
  border-radius: 5px;
  font-weight: 500;
`;
const SearchResultsSection = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 40px;
  margin: 0 auto;
  margin-top: 60px;
  width: 1240px;
`;
const Test = styled.div`
  width: 200px;
  height: 200px;
  background-color: gray;
`;

const Home = () => {
  const [searchOption, setSearchOption] = useState('tracks');
  const [searchQuery, setSearchQuery] = useState('');
  const [currentData, setCurrentData] = useState('');
  const {
    data: tracksData,
    isLoading: tracksLoading,
    isError: tracksError,
    refetch: refetchTracks,
  } = useQuery({
    queryKey: ['searchTracks'],
    queryFn: () => fetchTracks(searchQuery),
    enabled: false,
  });
  const {
    data: albumsData,
    isLoading: albumsLoading,
    isError: albumsError,
    refetch: refetchAlbums,
  } = useQuery({
    queryKey: ['searchAlbums'],
    queryFn: () => fetchAlbums(searchQuery),
    enabled: false,
  });
  const {
    data: artistsData,
    isLoading: artistsLoading,
    isError: artistsError,
    refetch: refetchArtists,
  } = useQuery({
    queryKey: ['searchArtists'],
    queryFn: () => fetchArtists(searchQuery),
    enabled: false,
  });
  const handleSearchInput = (e: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setSearchQuery(e.target.value);
  };
  const handleSearchOption = (e: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setSearchOption(e.target.value);
  };
  const handleSearch = () => {
    if (!searchQuery) {
      alert('검색어를 입력하세요!');
      return;
    }
    if (searchOption === 'tracks') {
      refetchTracks();
      setCurrentData('tracks');
    }
    if (searchOption === 'albums') {
      refetchAlbums();
      setCurrentData('albums');
    }
    if (searchOption === 'artists') {
      refetchArtists();
      setCurrentData('artists');
    }
  };
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <>
      <SearchSection>
        <SearchInput
          value={searchQuery}
          onChange={handleSearchInput}
          onKeyDown={handleKeyDown}
          placeholder="검색어를 입력하세요"
        />
        <SearchSelect value={searchOption} onChange={handleSearchOption}>
          <option value="tracks">곡명</option>
          <option value="albums">앨범명</option>
          <option value="artists">아티스트명</option>
        </SearchSelect>
        <SearchBtn onClick={handleSearch}>검색</SearchBtn>
      </SearchSection>
      {(tracksLoading || albumsLoading || artistsLoading) && <Loading />}
      <SearchResultsSection>
        {currentData === 'tracks' &&
          tracksData &&
          tracksData.results?.trackmatches?.track?.map(
            (track: any, index: number) => (
              <SearchResult
                key={index}
                type="tracks"
                imgurl={track.image[3]['#text']}
                title={track.name}
                subTitle={track.artist}
              />
            ),
          )}
        {currentData === 'albums' &&
          albumsData &&
          albumsData.results?.albummatches?.album?.map(
            (album: any, index: number) => (
              <SearchResult
                key={index}
                type="albums"
                imgurl={album.image[3]['#text']}
                title={album.name}
                subTitle={album.artist}
              />
            ),
          )}
        {currentData === 'artists' &&
          artistsData &&
          artistsData.results?.artistmatches?.artist?.map(
            (artist: any, index: number) => (
              <SearchResult
                key={index}
                type="artists"
                imgurl={artist.image[3]['#text']}
                title={artist.name}
                subTitle={''}
              />
            ),
          )}
      </SearchResultsSection>
    </>
  );
};

export default Home;

// tracksData?.results?.trackmatches?.track[0]?.image[3]['#text']
