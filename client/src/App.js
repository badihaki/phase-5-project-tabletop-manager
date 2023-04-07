import { useContext, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import './App.css';
import { CharactersContext } from './components/context components/CharactersContext';
import { GroupsContext } from './components/context components/GroupsContext';
import { UserContext } from './components/context components/UserContext';
import Home from './components/Home';
import NavigationBar from './components/Navigation';

function App() {

  const { user, setUser } = useContext( UserContext );
  const { groups, setGroups, setMemberships } = useContext( GroupsContext );
  const { characters, setCharacters } = useContext( CharactersContext );

  useEffect( ()=>{
    fetch('/api/me').then(r=>{
      if(r.ok){
        r.json().then(data=>{setUser(data)})
      }
      else{
        r.json().then(data=>{console.log(data)})
      }
    })
  }, [])

  useEffect(()=>{
    fetch('/api/groups').then(r=>{
      if(r.ok){
        r.json().then(data=>{setGroups(data)})
      }
      else{
        r.json().then(data=>{console.log(data)})
      }
    })
  }, [])

  useEffect( ()=>{
    if(user!=null){
      fetch('/api/characters').then(r=>{
        if(r.ok){
          r.json().then(data=>{
            setCharacters(data);
          })
        }
        else{
          r.json().then(data=>console.log(data))
        }
      })
    }
  }, [user] )

  return (
    <div className="App">
        <NavigationBar />
        <div id='detail'>
          <Outlet />
        </div>
    </div>
  );
}

export default App;
