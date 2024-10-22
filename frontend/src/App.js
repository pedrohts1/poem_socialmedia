import './App.css';
import { useContext } from 'react';
import Navbar from './components/Navbar';
import { Routes, Route, Navigate } from 'react-router-dom';
import Discover from './pages/Discover';
import Register from './pages/Register';
import Login from './pages/Login';
import UserBoard from './pages/UserBoard';

import { AuthContext } from './context/AuthContext';

import axios from 'axios'
import Error404 from './pages/Error404';

function App() {
  axios.defaults.baseURL = 'http://localhost:8003'
  axios.defaults.withCredentials = true

  const user_logged = useContext(AuthContext).currentUser

  return (
    <div className="App bg-primary relative mt-14">
      <Navbar/>
      <div className='w-full h-full'>
        <Routes>
          <Route path='/' element={user_logged ? <Navigate to='/descubra'/> : <Navigate to='/criar-conta'/>}/>
          <Route path='/descubra' element={<Discover/>}/>
          <Route path='/criar-conta' element={!user_logged ? <Register/> : <Navigate to='/poemas'/>}/>
          <Route path='/entrar-conta' element={!user_logged ? <Login/> : <Navigate to='/poemas'/>}/>

          <Route path='/poemas' element={user_logged ? <UserBoard/> : <Navigate to='/entrar-conta'/>}/>

          <Route path='/*' element={<Error404/>}/>
        </Routes>
      </div>
    </div>
  );
}

export default App;
