import { Outlet } from 'react-router-dom';
import './App.css';
import NavigationBar from './components/Navigation';

function App() {
  return (
    <div className="App">
        <NavigationBar />
        <Outlet />
    </div>
  );
}

export default App;
