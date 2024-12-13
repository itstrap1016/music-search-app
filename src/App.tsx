import React from 'react';
import { ThemeProvider } from 'styled-components';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Home from './pages/Home';
import { theme } from './styles/theme';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import TrackPopup from './components/TrackPopup';
import AlbumPopup from './components/AlbumPopup';
import ArtistPopup from './components/ArtistPopup';

const queryClient = new QueryClient();

const App: React.FC = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <Router>
          <Routes>
            <Route path="/" element={<Home />}>
              <Route path="tracks" element={<TrackPopup />} />
              <Route path="albums" element={<AlbumPopup />} />
              <Route path="artists" element={<ArtistPopup />} />
            </Route>
          </Routes>
        </Router>
      </ThemeProvider>
    </QueryClientProvider>
  );
};

export default App;
