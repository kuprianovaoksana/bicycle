import './App.css';
import {Routes, Route} from 'react-router-dom';
import {Layout} from "./components/Homepage/Layout/Layout";
import {Homepage} from "./components/Homepage/Main/Homepage";
import {NotFound} from "./components/NotFound/NotFound";
import {ReportAbout} from "./components/ReportAbout/ReportAbout";
import {Steal} from "./components/Steals/Steal";
import {Employees} from "./components/Officers/Employees";
import {Registration} from "./components/Registration/Registration";
import {Entrance} from "./components/Entrance/Entrance";
import {Case} from "./components/Steals/Case/Case";
import {Officer} from "./components/Officers/Officer/Officer";
import {AuthContext} from './context/index';
import { useState } from "react";
import axios from "axios";
import { useEffect } from 'react';





function App() {

  const [isAuth, setIsAuth] = useState('false');
  // const [isAuth, setIsAuth] = useContext(AuthContext);

  const instance = axios.create({
      baseURL: 'https://sf-final-project-be.herokuapp.com/api/auth/',
      headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + localStorage.getItem("token"),
      },
  });

  useEffect(()=>{

    if (localStorage.token) {

      console.log("fetching");

      const getData = async () => {
        try {
          const response = await instance.get("/");
          const result = response.data;

          if ( result.status === "OK" )
          {
            setIsAuth(true);
          }
        } catch (error) {
          if ( error.response.status === "401" )
            {
              setIsAuth(false);
            }
        }
      };

      getData();
    }


  }, []);

  // if (localStorage.token) {

  //     // Fetching('https://sf-final-project-be.herokuapp.com/api/auth/');

  //   //   const getData = async () => {

  //   //     const result = await 
  //   //             axios
  //   //             .get ('https://sf-final-project-be.herokuapp.com/api/auth/',
  //   //             {
  //   //                 headers: {
  //   //                     "Content-Type": "application/json",
  //   //                     Authorization: "Bearer " + localStorage.getItem('token'),

  //   //                 },
  //   //             })
  //   //             .then(
  //   //                 (response) => {
  //   //                   if(response.data.status==="OK"){
  //   //                     setIsAuth(true);
  //   //                   }
  //   //                   // console.log("проверка от сервера"+isAuth);
  //   //             })
  //   //             .catch((error) => {
  //   //               if(error.response.status==="401")
  //   //               {
  //   //                 setIsAuth(false);
  //   //               }
  //   //             });
  //   // }
  //   // getData();

  //   console.log("fetching");

  //   const instance = axios.create({
  //     baseURL: 'https://sf-final-project-be.herokuapp.com/api/auth/',
  //     headers: {
  //     "Content-Type": "application/json",
  //     Authorization: "Bearer " + localStorage.getItem("token"),
  //     },
  //   });


  //     const getData = async () => {
  //       try {
  //         const response = await instance.get("/");
  //         const result = response.data;

  //         if ( result.status === "OK" )
  //         {
  //           setIsAuth(true);
  //         }
  //       } catch (error) {
  //         if ( error.response.status === "401" )
  //           {
  //             setIsAuth(false);
  //           }
  //       }
  //     };
  //     getData();

  // }

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
          <Route path='/case/:id' element={<Case/>}/>
          <Route path='/officer/:id' element={<Officer/>}/>
          <Route path='*' element={<NotFound/>}/>
        </Route>
      </Routes>
    </AuthContext.Provider>
    </>
  );
}

export default App;
