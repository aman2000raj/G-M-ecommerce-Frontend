import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Routes,
} from 'react-router-dom';

import Home from './pages/Home';
import ProductDetails from './pages/ProductDetails';
import SideBar from './components/Sidebar';
import Header from './components/Header';
import Footer from './components/Footer';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';

const App = () => {
  return (
    <div className='overflow-hidden'>
      <Router>
        <Header />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/login' element={<SignIn />} />
          <Route path='/signup' element={<SignUp />} />
          <Route path='/product/:id' element={<ProductDetails />} />
        </Routes>
        <SideBar />
        <Footer />
      </Router>
    </div>
  );
};

export default App;
