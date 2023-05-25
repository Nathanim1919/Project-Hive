import './App.css';
import HomePage from './pages/HomePage';
import RegistrationPage from './pages/RegistrationPage';
import { Route, Routes } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import ProjectDetailPage from './components/project/ProjectDetails';

function App() {
  return ( 
    <div className = "App" >

    <Routes>
      <Route path='/' element={<HomePage/>}/>
      <Route path='/register' element={<RegistrationPage/>}/>
      <Route path='/login' element={<LoginPage/>}/>
      <Route path='/user/:id' element={<DashboardPage/>}/>
      <Route path = '/user/:id/projects/:projectId' element = {< ProjectDetailPage />}
      />
    </Routes>
    </div>
  );
}

export default App;