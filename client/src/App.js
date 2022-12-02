import './App.css';
import { Outlet } from 'react-router-dom';
import NavigationBar from './components/Navigation';

function App() {
  return (
    <div className="App">
      <Outlet />
      <div className='sidebar'>
        <NavigationBar />
      </div>
    </div>
  );
}

export default App;
