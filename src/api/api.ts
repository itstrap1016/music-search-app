// src/api/lastfmApi.ts
import axios from 'axios';

const API_KEY = 'b44ffe2e3e6d8d28b43bb669915f5dc5'; // Last.fm에서 발급받은 API 키

const axiosInstance = axios.create({
  baseURL: 'https://ws.audioscrobbler.com/2.0/',
  params: {
    api_key: API_KEY,
    format: 'json',
  },
});

export const fetchTracks = async (query: string) => {
  const response = await axiosInstance.get('', {
    params: {
      method: 'track.search',
      track: query,
    },
  });
  console.log(response.data);
  return response.data;
};

export const fetchAlbums = async (query: string) => {
  const response = await axiosInstance.get('', {
    params: {
      method: 'album.search',
      album: query,
    },
  });
  return response.data;
};

export const fetchArtists = async (query: string) => {
  const response = await axiosInstance.get('', {
    params: {
      method: 'artist.search',
      artist: query,
    },
  });
  return response.data;
};
