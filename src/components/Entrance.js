import css from "./entrance.module.scss";
import {NavLink} from "react-router-dom";
import axios from "axios";
import { useState } from "react";
import {useContext} from 'react';
import {AuthContext} from '../context';


const Entrance = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");

    const{isAuth, setIsAuth} = useContext(AuthContext);


    const handleSubmit = (e) => {

        e.preventDefault();
        console.log("отработала кнопка вход"+isAuth);

        axios
        .post(
            "https://sf-final-project-be.herokuapp.com/api/auth/sign_in",
            { email, password },
            {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: "Bearer " + localStorage.getItem("token"),
                  },
            }
        )
        .then(
            (response) => {
            setEmail("");
            setPassword("");
            localStorage.setItem("token", response.data.data.token);
            setIsAuth(true);
            console.log("ответ от сервера"+response);
            console.log("установили аутентификацию"+isAuth);
            window.location.replace("/");
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


    return(
        <>
            <h1 className={css.h1}>Вход</h1>
            <form className={css.registration} method="post" onSubmit={handleSubmit}>
                <input type="text" name="email" placeholder='E-mail' onChange={(e) => setEmail(e.target.value)} required />
                <input type="text" name="password" placeholder='Пароль' onChange={(e) => setPassword(e.target.value)} required /> 
                <button>Вход</button>
            </form>
            <p>Нет аккаунта? <NavLink to='/registration' className={css.navLink}>Зарегистрироваться</NavLink></p>
            <p className={css.message}>{message}</p>
        </>
    )
}

export {Entrance};