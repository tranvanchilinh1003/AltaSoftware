import React from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AppRouter from './routers/router';
function App() {
  return (
    <div className="Container">
      <BrowserRouter>
        <Routes>
          <Route
            path="/*"
            element={<AppRouter />}
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
