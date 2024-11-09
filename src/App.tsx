import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { Home } from './pages/Home';
import { Chat } from './pages/Chat';
import { Symptoms } from './pages/Symptoms';
import { Medications } from './pages/Medications';
import { Records } from './pages/Records';
import { About } from './pages/About';
import { Emergency } from './pages/Emergency';

function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/chat" element={<Chat />} />
            <Route path="/symptoms" element={<Symptoms />} />
            <Route path="/medications" element={<Medications />} />
            <Route path="/records" element={<Records />} />
            <Route path="/about" element={<About />} />
            <Route path="/emergency" element={<Emergency />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}
export default App;