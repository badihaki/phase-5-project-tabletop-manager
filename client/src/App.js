import { useContext, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import './App.css';
import { UserContext } from './components/context components/UserContext';
import NavigationBar from './components/Navigation';

function App() {

  const { setUser } = useContext( UserContext )

  useEffect( ()=>{
    fetch('/me').then(r=>{
      if(r.ok){
        r.json().then(data=>{console.log(data)})
      }
      else{
        r.json().then(data=>{console.log(data)})
      }
    })
  }, [])

  return (
    <div className="App">
        <NavigationBar />
        <div className='detail'>
          <Outlet />
        </div>
    </div>
  );
}

export default App;
