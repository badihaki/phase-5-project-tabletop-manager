import { useContext, useEffect } from 'react';
import { json, Outlet } from 'react-router-dom';
import './App.css';
import { GroupsContext } from './components/context components/GroupsContext';
import { UserContext } from './components/context components/UserContext';
import NavigationBar from './components/Navigation';

function App() {

  const { user, setUser } = useContext( UserContext )
  const { groups, setGroups } = useContext( GroupsContext )

  useEffect( ()=>{
    fetch('/me').then(r=>{
      if(r.ok){
        r.json().then(data=>{setUser(data)})
      }
      else{
        r.json().then(data=>{console.log(data)})
      }
    })
  }, [])

  useEffect(()=>{
    fetch('/groups').then(r=>{
      if(r.ok){
        r.json().then(data=>{setGroups(data)})
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
