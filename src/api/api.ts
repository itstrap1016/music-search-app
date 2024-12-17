// src/api/lastfmApi.ts
import axios from 'axios';

const API_KEY = 'b44ffe2e3e6d8d28b43bb669915f5dc5'; // Last.fm에서 발급받은 API 키
const YOUTUBE_API_KEY = 'AIzaSyBTz7NB2Fsm0UIWOkP6IaqRDVN7A2SNWe4';

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
      limit: 1000,
    },
  });
  console.log('tracks', response.data);
  return response.data;
};

export const fetchAlbums = async (query: string) => {
  const response = await axiosInstance.get('', {
    params: {
      method: 'album.search',
      album: query,
      limit: 20,
    },
  });
  console.log('albums', response.data);
  return response.data;
};

export const fetchArtists = async (query: string) => {
  const response = await axiosInstance.get('', {
    params: {
      method: 'artist.search',
      artist: query,
      limit: 20,
    },
  });
  console.log('artists', response.data);
  return response.data;
};

export const getTrackInfo = async (track: string, artist: string) => {
  const response = await axiosInstance.get('', {
    params: {
      method: 'track.getInfo',
      track,
      artist,
    },
  });
  console.log('track.getInfo', response.data);
  return response.data;
};

export const getAlbumInfo = async (album: string, artist: string) => {
  const response = await axiosInstance.get('', {
    params: {
      method: 'album.getinfo',
      album,
      artist,
    },
  });
  console.log('album.getInfo', response.data);
  return response.data;
};

export const getArtistInfo = async (artist: string) => {
  const response = await axiosInstance.get('', {
    params: {
      method: 'artist.getinfo',
      artist,
    },
  });
  console.log('artist.getInfo', response.data);
  return response.data;
};

export const getFetchVideo = async (searchQuery: string) => {
  const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${encodeURIComponent(
    searchQuery,
  )}&type=video&key=${YOUTUBE_API_KEY}&maxResults=10`;
  const response = await axios.get(url);
  return response.data;
};
