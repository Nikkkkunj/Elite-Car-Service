import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './Components/header';
import Footer from './Components/footer';



function App() {
  return (
    <Router>
      <Header />
    
        <Routes>
          {/* Add your routes here */}
          <Route path="/" element={<div>Heyyyy</div>} />
        </Routes>
      <Footer />
    </Router>
  );
}

export default App;