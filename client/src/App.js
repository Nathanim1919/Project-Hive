import './App.css';
import HomePage from './pages/HomePage';
import RegistrationPage from './pages/RegistrationPage';
import { Route, Routes } from 'react-router-dom';
import LoginPage from './pages/LoginPage';

function App() {
  return ( <
    div className = "App" >



    <Routes>
    <Route path='/' element={<HomePage/>}/>
    <Route path='/register' element={<RegistrationPage/>}/>
    <Route path='/login' element={<LoginPage/>}/>
    </Routes>
    </div>
  );
}

export default App;