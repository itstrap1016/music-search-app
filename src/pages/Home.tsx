import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { fetchTracks, fetchAlbums, fetchArtists } from '../server/server';
import { useQuery } from '@tanstack/react-query';
import SearchResult from '../components/SearchResult';
import Loading from '../components/Loading';
import NoSearchResult from '../components/NoSearchResult';
import ReactPaginate from 'react-paginate';
import { Outlet } from 'react-router-dom';

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
  width: 1160px;
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
  const [pageCount, setPageCount] = useState(1);
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = useRef(20);
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
    setCurrentPage(0);
    if (searchOption === 'tracks') {
      refetchTracks().then((json) => {
        if (json.data.results.trackmatches.track.length === 0) {
          setNoResult(true);
        } else {
          setNoResult(false);
          setPageCount(
            Math.ceil(
              json.data.results.trackmatches.track.length /
                itemsPerPage.current,
            ),
          );
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
          setPageCount(
            Math.ceil(
              json.data.results.albummatches.album.length /
                itemsPerPage.current,
            ),
          );
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
          setPageCount(
            Math.ceil(
              json.data.results.artistmatches.artist.length /
                itemsPerPage.current,
            ),
          );
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
  const handlePageChange = (selectedPage: { selected: number }) => {
    console.log(selectedPage.selected);
    setCurrentPage(selectedPage.selected);
  };
  const getCurrentPageData = (data: any[]) => {
    const startIndex = currentPage * itemsPerPage.current;
    const endIndex = startIndex + itemsPerPage.current;
    return data.slice(startIndex, endIndex);
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
      {tracksLoading || albumsLoading || artistsLoading ? <Loading /> : null}
      <SearchResultsSection>
        {!noResult
          ? currentData === 'tracks' &&
            tracksData && (
              <>
                <SearchResults>
                  {getCurrentPageData(
                    tracksData.results.trackmatches.track,
                  ).map((track: any, index: number) => (
                    <SearchResult
                      key={index}
                      type="tracks"
                      imgurl={track.image[3]['#text']}
                      title={track.name}
                      subTitle={track.artist}
                    />
                  ))}
                </SearchResults>
                <ReactPaginate
                  pageCount={pageCount} // 총 페이지 수
                  pageRangeDisplayed={5} // 표시할 페이지 수
                  marginPagesDisplayed={2} // 양옆에 표시할 페이지 수
                  onPageChange={handlePageChange}
                  previousLabel={<span>&lt;</span>}
                  nextLabel={<span>&gt;</span>}
                  forcePage={currentPage}
                />
              </>
            )
          : currentData === 'tracks' && <NoSearchResult />}
        {!noResult
          ? currentData === 'albums' &&
            albumsData && (
              <>
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
                <ReactPaginate
                  pageCount={pageCount} // 총 페이지 수
                  pageRangeDisplayed={5} // 표시할 페이지 수
                  marginPagesDisplayed={2} // 양옆에 표시할 페이지 수
                  onPageChange={handlePageChange}
                  previousLabel={<span>&lt;</span>}
                  nextLabel={<span>&gt;</span>}
                  forcePage={currentPage}
                />
              </>
            )
          : currentData === 'albums' && <NoSearchResult />}
        {!noResult
          ? currentData === 'artists' &&
            artistsData && (
              <>
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
                <ReactPaginate
                  pageCount={pageCount} // 총 페이지 수
                  pageRangeDisplayed={5} // 표시할 페이지 수
                  marginPagesDisplayed={2} // 양옆에 표시할 페이지 수
                  onPageChange={handlePageChange}
                  previousLabel={<span>&lt;</span>}
                  nextLabel={<span>&gt;</span>}
                  forcePage={currentPage}
                />
              </>
            )
          : currentData === 'artists' && <NoSearchResult />}
      </SearchResultsSection>
      <Outlet />
    </>
  );
};

export default Home;

// tracksData?.results?.trackmatches?.track[0]?.image[3]['#text']
