import css from "./entrance.module.scss";
import {NavLink} from "react-router-dom";
import axios from "axios";
import { useState } from "react";
import {useContext} from 'react';
import {AuthContext} from '../../context';
import {useNavigate} from 'react-router-dom';


const Entrance = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");

    const{isAuth, setIsAuth} = useContext(AuthContext);

    let navigate = useNavigate();

    const handleSubmit = (e) => {

        e.preventDefault();
        console.log("отработала кнопка вход");

        const getData = async () => {

            console.log("запрос");

            await axios
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
                navigate("/");
                // window.location.replace("/");
                },
                {
                "Content-Type": "application/json",
                Authorization: "Bearer " + localStorage.getItem("token"),
                }
            )
            .catch((error) => {
                setMessage(error.response.data.message);
            });
        } 
        getData();
    };


    return(
        <>
            <h1 className={css.h1}>Вход</h1>
            <form className={css.registration} method="post" onSubmit={handleSubmit}>
                <input type="text" name="email" placeholder='E-mail' onChange={(e) => setEmail(e.target.value)} required />
                <input type="password" name="password" placeholder='Пароль' onChange={(e) => setPassword(e.target.value)} required /> 
                <button>Вход</button>
            </form>
            <p>Нет аккаунта? <NavLink to='/registration' className={css.navLink}>Зарегистрироваться</NavLink></p>
            <p className={css.message}>{message}</p>
        </>
    )
}

export {Entrance};