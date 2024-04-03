import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import UsersScreen from './UsersScreen';

function App() {
  return (
    <BrowserRouter>
      <div className="grid-container">
        <main className="main">
          <div className="content">
            <Routes>
              <Route path="/" element={<UsersScreen />} />
            </Routes>
          </div>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;
