import React, { useState } from 'react';
import Navigation from './components/Navigation';
import Sidebar from './components/Sidebar';
import Home from './components/Home';
import About from './components/About';
import Contact from './components/Contact';
import TopicPage from './components/TopicPage';
import './index.css';

function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [currentTopic, setCurrentTopic] = useState(null);
  const [currentSub, setCurrentSub] = useState(null);
  const [darkMode, setDarkMode] = useState(false);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleTopicSelect = (topic, sub) => {
    setCurrentPage('topic');
    setCurrentTopic(topic);
    setCurrentSub(sub);
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <div id="app" className={darkMode ? 'dark-mode' : ''}>
      <Navigation
        currentPage={currentPage}
        onPageChange={handlePageChange}
        darkMode={darkMode}
        onToggleDark={toggleDarkMode}
      />
      <div className="body">
        <Sidebar
          currentTopic={currentTopic}
          currentSub={currentSub}
          onTopicSelect={handleTopicSelect}
          isVisible={true}
        />
        {currentPage === 'home' && (
          <Home onTopicSelect={handleTopicSelect} onPageChange={handlePageChange} />
        )}
        {currentPage === 'about' && <About />}
        {currentPage === 'contact' && <Contact />}
        {currentPage === 'topic' && (
          <TopicPage
            currentTopic={currentTopic}
            currentSub={currentSub}
            onTopicSelect={handleTopicSelect}
          />
        )}
      </div>
    </div>
  );
}

export default App;
