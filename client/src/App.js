import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Upload from './pages/Upload';
import Admin from './pages/Admin';
import SignIn from './pages/Signin';
import SignUp from './pages/Signup';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path='/upload' element={<Upload />} />
        <Route path='/signin' element={<SignIn/>} />
        <Route path = '/signup' element = {<SignUp/>} />
        <Route path='/admin' element={<Admin/>} />
        <Route path="/" element={<Home />} />
      </Routes>
    </Router>
  );
};

export default App;