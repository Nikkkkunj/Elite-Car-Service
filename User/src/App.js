import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './Components/header';
import Footer from './Components/footer';
import Dashboard from './pages/dash';



function App() {
  return (
    <Router>
      <Header />
    
        <Routes>
          {/* Add your routes here */}
          <Route path="/" element={<Dashboard />} />
          
        </Routes>
      <Footer />
    </Router>
  );
}

export default App;