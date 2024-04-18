
import './App.css';
import { Route, Routes } from 'react-router-dom';
import Dashboard from './Components/Dashboard';

function App() {
  return (
    <div className='main-container'>
    <Routes>
    <Route path='/' element={<Dashboard />} />
    </Routes>
    </div>
  );
}

export default App;
