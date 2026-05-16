import React, { useState } from 'react';
import Navigation from './components/Navigation';
import Sidebar from './components/Sidebar';
import Home from './components/Home';
import About from './components/About';
import Contact from './components/Contact';
import TopicPage from './components/TopicPage';
import QuestionDetail from './components/QuestionDetail';
import { interviewCategories, interviewMeta } from './data/interviewStore';
import './index.css';

const defaultCategory = interviewCategories[0];

function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [currentTopic, setCurrentTopic] = useState(defaultCategory?.id ?? null);
  const [currentSub, setCurrentSub] = useState(defaultCategory?.subs[0] ?? null);
  const [currentQuestionId, setCurrentQuestionId] = useState(null);
  const [darkMode, setDarkMode] = useState(false);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleTopicSelect = (topic, sub) => {
    setCurrentPage('topic');
    setCurrentTopic(topic);
    setCurrentSub(sub);
  };

  const handleQuestionSelect = (questionId) => {
    setCurrentQuestionId(questionId);
    setCurrentPage('question-detail');
  };

  const handleBackToQuestions = () => {
    setCurrentPage('topic');
    setCurrentQuestionId(null);
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
            onQuestionSelect={handleQuestionSelect}
          />
        )}
        {currentPage === 'question-detail' && (
          <QuestionDetail
            questionId={currentQuestionId}
            onBack={handleBackToQuestions}
          />
        )}
      </div>
    </div>
  );
}

export default App;
