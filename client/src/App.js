import React from 'react';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import './App.css';

import Strains from './components/strains';
import Terpenes from './components/terpenes';
import Layout from './components/layout';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/" element={<Strains />} />
          <Route path="/terpenes" element={<Terpenes />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
