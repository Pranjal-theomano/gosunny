import React from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useParams } from 'react-router-dom';
// import Chat from './components/chats/chat';
// import InitialPage from './components/InitialPage/InitialPage';
import Assessment from './components/Assesment/Assesment';
import ChatBox from './components/ChatBox/ChatBox';
import { UIProvider } from './context/UiContext';
import HomePage from './components/Homepage/homepage';
import Chatbot from './components/chatbot/chatbot';

function App() {
  return (
    <UIProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<HomePage />} />
          {/* <Route path="/chat/:userId" element={<ChatPage />} /> */}
          <Route path="/InitialAssesment/:userId" element={<InitialAssesment/>} />
        </Routes>
      </BrowserRouter>
    </UIProvider>
  );
}

function InitialAssesment() {
  const { userId } = useParams();
  
  return (
    <div style={{ display: 'flex', height: '100vh' }}>
      <div style={{ flex: '2', borderRight: '1px solid #ccc' }}>
        <Assessment userId={userId} />
      </div>
      <div style={{ flex: '1' }}>
        <ChatBox />
        {/* <Chatbot /> */}
      </div>
    </div>
  );
}

export default App;
