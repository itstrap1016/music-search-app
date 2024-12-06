import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { fetchTracks, fetchAlbums, fetchArtists } from '../api/api';
import { useQuery } from '@tanstack/react-query';

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

const Home = () => {
  const [searchOption, setSearchOption] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [shouldFetch, setShouldFetch] = useState(false);
  const [test, setTest] = useState('');

  const {
    data: trackData,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['searchTracks'],
    queryFn: () => {
      console.log('other working');
      setTest('test!');
      return fetchTracks(searchQuery);
    },
    enabled: shouldFetch,
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
    setShouldFetch(true);
  };

  return (
    <SearchSection>
      <SearchInput
        value={searchQuery}
        onChange={handleSearchInput}
        placeholder="검색어를 입력하세요"
      />
      <SearchSelect value={searchOption} onChange={handleSearchOption}>
        <option value="tracks">곡명</option>
        <option value="albums">앨범명</option>
        <option value="artists">아티스트명</option>
      </SearchSelect>
      <SearchBtn onClick={handleSearch}>검색</SearchBtn>
    </SearchSection>
  );
};

export default Home;
