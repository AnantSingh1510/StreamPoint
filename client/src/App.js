import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import VideoPlayer from './components/VideoPlayer';
import LandingPage from './components/LandingPage';
import UploadVideo from './components/UploadVideo';
import VideoList from './components/VideoList';
import Navbar from './components/Navbar';
import ErrorPage from './components/ErrorPage';

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/upload" element={<UploadVideo />} />
        <Route path="/videos" element={<VideoList />} />
        <Route path="/watch" element={<VideoPlayer />} />
        <Route path='*' element={<ErrorPage/>} />
      </Routes>
    </Router>
  );
};

export default App;
