import './App.css';
import {Routes, Route} from 'react-router-dom';
import {Layout} from "./components/Layout";
import {Homepage} from "./components/Homepage";
import {NotFound} from "./components/NotFound";
import {ReportAbout} from "./components/ReportAbout";
import {Steal} from "./components/Steal";
import {Employees} from "./components/Employees";
import {Registration} from "./components/Registration";
import {Entrance} from "./components/Entrance";
import {Case} from "./components/Case";
import {Officer} from "./components/Officer";
import {AuthContext} from './context';
import {useContext} from 'react';
import { useState } from "react";
import axios from "axios";





function App() {

  const [isAuth, setIsAuth] = useState('false');
  // const [isAuth, setIsAuth] = useContext(AuthContext);

  const [cases, setCases] = useState('');

  // console.log("вход в приложение"+isAuth);

  if (localStorage.token)
    {
      const getData = async () => {

        const result = await 
                axios
                .get ('https://sf-final-project-be.herokuapp.com/api/auth/',
                {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: "Bearer " + localStorage.getItem('token'),

                    },
                })
                .then(
                    (response) => {
                      if(response.data.status==="OK"){
                        setIsAuth(true);
                      }
                      // console.log("проверка от сервера"+isAuth);
                })
                .catch((error) => {
                  if(error.response.status==="401")
                  {
                    setIsAuth(false);
                  }
                });
    }
    getData();
  }

  return (
    <>
    <AuthContext.Provider value={{
        isAuth,
        setIsAuth,
    }}>
      <Routes>
        <Route path='/' element={<Layout/>}>
          <Route index element={<Homepage/>}/>
          <Route path='/report-about' element={<ReportAbout/>}/>
          <Route path='/steal' element={<Steal/>}/>
          <Route path='/employees' element={<Employees/>}/>
          <Route path='/registration' element={<Registration/>}/>
          <Route path='/entrance' element={<Entrance/>}/>
          <Route path='/case/:id' element={<Case cases={cases}/>}/>
          <Route path='/officer/:id' element={<Officer/>}/>
          <Route path='*' element={<NotFound/>}/>
        </Route>
      </Routes>
    </AuthContext.Provider>
    </>
  );
}

export default App;
