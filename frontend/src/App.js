
import './App.css';
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './Components/1-Header/Header';
import Home from './Components/2-Home/Home';
import FormAjout from './Components/3-Form_Ajout/Form_Ajout';
import FormUpdate from './Components/4-Form_Update/Form_Update';

function App() {
  // const [page,setPage] = useState(1);
  return (
    <Router>
      <div>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/form" element={<FormAjout />} />
          <Route path="/update/:id" element={<FormUpdate />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
