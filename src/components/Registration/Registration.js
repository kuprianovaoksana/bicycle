import css from './registration.module.scss';
import {NavLink} from "react-router-dom";
import axios from "axios";
import { useState } from "react";
import {useNavigate} from 'react-router-dom';



const Registration = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [clientId, setClientId] = useState("");
    const [message, setMessage] = useState("");

    let navigate = useNavigate();


    const handleSubmit = (e) => {
        e.preventDefault();

        axios
        .post(
          "https://sf-final-project-be.herokuapp.com/api/auth/sign_up",
          { email, password, firstName, lastName, clientId },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        )
        .then(
          (response) => {
            setEmail("");
            setPassword("");
            setFirstName("");
            setLastName("");
            setClientId("");
            setMessage("Вы успешно зарегистрированы!");
            setTimeout(() => {
              // window.location.replace("/entrance");
              navigate("/entrance");
            }, 3000);
          },
          {
            "Content-Type": "application/json",
            Authorization: "Bearer " + localStorage.getItem("token"),
          }
        )
        .catch((error) => {
          setMessage(error.response.data.message);
        });
    };
  

      const changeMail = (e) => {
        setEmail(e.target.value);
      };
      const changePassword = (e) => {
        setPassword(e.target.value);
      };
      const changeName = (e) => {
        setFirstName(e.target.value);
      };
      const changeSurname = (e) => {
        setLastName(e.target.value);
      };
      const changeId = (e) => {
        setClientId(e.target.value);
      };

    return(
        <>
            <h1 className={css.h1}>Регистрация</h1>
            <form className={css.registration} method="post" onSubmit={handleSubmit}>
                <input type="text" name="email" placeholder='E-mail *' onChange={changeMail} required />
                <input type="text" name="name" placeholder='Имя'onChange={changeName}/> 
                <input type="text" name="surname" placeholder='Фамилия' onChange={changeSurname}/> 
                <input type="text" name="password" placeholder='Пароль *' onChange={changePassword} required /> 
                <input type="text" name="clientId" placeholder='ClientId *' onChange={changeId} required /> 
                <button>Регистрация</button>
            </form>
            <p>Есть аккаунт? <NavLink to='/entrance' className={css.navLink}>Войти</NavLink></p>
            <p className={css.message}>{message}</p>

        </>
    )
}

export {Registration};