import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { fetchTracks, fetchAlbums, fetchArtists } from '../api/api';
import { useQuery } from '@tanstack/react-query';
import SearchResult from '../components/SearchResult';
import Loading from '../components/Loading';
import NoSearchResult from '../components/noSearchResult';

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
  margin: 0 auto;
  margin-top: 60px;
  margin-bottom: 60px;
  width: 1240px;
`;
const SearchResults = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 40px;
  margin: 0 auto;
  width: 100%;
`;

const Home = () => {
  const [searchOption, setSearchOption] = useState('tracks');
  const [searchQuery, setSearchQuery] = useState('');
  const [currentData, setCurrentData] = useState('');
  const [noResult, setNoResult] = useState(false);
  const {
    data: tracksData,
    isLoading: tracksLoading,
    isError: tracksError,
    refetch: refetchTracks,
  } = useQuery({
    queryKey: ['searchTracks'],
    queryFn: () => {
      return fetchTracks(searchQuery);
    },
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
      refetchTracks().then((json) => {
        if (json.data.results.trackmatches.track.length === 0) {
          setNoResult(true);
        } else {
          setNoResult(false);
        }
      });
      setCurrentData('tracks');
    }
    if (searchOption === 'albums') {
      refetchAlbums().then((json) => {
        if (json.data.results.albummatches.album.length === 0) {
          setNoResult(true);
        } else {
          setNoResult(false);
        }
      });
      setCurrentData('albums');
    }
    if (searchOption === 'artists') {
      refetchArtists().then((json) => {
        if (json.data.results.artistmatches.artist.length === 0) {
          setNoResult(true);
        } else {
          setNoResult(false);
        }
      });
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
        {!noResult
          ? currentData === 'tracks' &&
            tracksData && (
              <SearchResults>
                {tracksData.results.trackmatches.track.map(
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
              </SearchResults>
            )
          : currentData === 'tracks' && <NoSearchResult />}
        {!noResult
          ? currentData === 'albums' &&
            albumsData && (
              <SearchResults>
                {albumsData.results.albummatches.album.map(
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
              </SearchResults>
            )
          : currentData === 'albums' && <NoSearchResult />}
        {!noResult
          ? currentData === 'artists' &&
            artistsData && (
              <SearchResults>
                {artistsData.results?.artistmatches?.artist?.map(
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
              </SearchResults>
            )
          : currentData === 'artists' && <NoSearchResult />}
      </SearchResultsSection>
    </>
  );
};

export default Home;

// tracksData?.results?.trackmatches?.track[0]?.image[3]['#text']
